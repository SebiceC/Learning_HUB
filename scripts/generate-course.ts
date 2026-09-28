/**
 * Genera un curso (módulos + preguntas) a partir del PDF de una norma usando Claude.
 *
 * Uso:
 *   npm run generar -- ruta/a/norma.pdf [--id 27002] [--categoria "Seguridad Cloud"] [--force]
 *
 * Requiere la variable de entorno ANTHROPIC_API_KEY. El resultado se escribe en
 * src/data/generated/<id>.meta.json y <id>.course.json; la app los detecta automáticamente.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-5';
// USD per million tokens for claude-opus-5; cache writes (5 min TTL) are 1.25x input, reads 0.1x
const PRICE = { input: 5, output: 25, cacheWrite: 6.25, cacheRead: 0.5 };
// Request limit is 32 MB and base64 grows the file by ~4/3
const MAX_PDF_BYTES = 23 * 1024 * 1024;
const CONCURRENCY = 3;
const MAX_ATTEMPTS = 2;

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GENERATED_DIR = join(ROOT, 'src', 'data', 'generated');
const CATALOG_FILE = join(ROOT, 'src', 'catalog.ts');

// ---------- Types (mirror src/types.ts and src/catalog.ts) ----------

interface Question {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface Outline {
  id: string;
  name: string;
  shortName: string;
  category: string;
  desc: string;
  courseTitle: string;
  courseDescription: string;
  coverageNote: string;
  related: { id: string; reason: string }[];
  modules: { title: string; scope: string }[];
}

interface GeneratedModule {
  content: string;
  questions: Question[];
}

// ---------- CLI ----------

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    id: { type: 'string' },
    categoria: { type: 'string' },
    force: { type: 'boolean', default: false },
  },
});

function fail(message: string): never {
  console.error(`\n✗ ${message}`);
  process.exit(1);
}

const pdfPath = positionals[0];
if (!pdfPath) fail('Indica el PDF: npm run generar -- ruta/a/norma.pdf [--id 27002] [--categoria "..."] [--force]');
if (!existsSync(pdfPath) || !pdfPath.toLowerCase().endsWith('.pdf')) fail(`No se encuentra el PDF: ${pdfPath}`);
const pdfSize = statSync(pdfPath).size;
if (pdfSize > MAX_PDF_BYTES) fail(`El PDF ocupa ${(pdfSize / 1024 / 1024).toFixed(1)} MB; el máximo es ~23 MB.`);

const SLUG = /^[a-z0-9][a-z0-9-]*$/;
if (values.id && !SLUG.test(values.id)) fail('--id solo admite minúsculas, números y guiones (p. ej. 27002 o nist800-53).');

// ---------- Existing catalog (for ids, categories and related standards) ----------

interface KnownStandard { id: string; name: string; category: string }

// catalog.ts uses Vite-only APIs, so its entries are read as text. This relies on each entry starting
// with "id: '…', name: '…', shortName: '…', category: '…'" on one line, as it does today.
const builtIn: KnownStandard[] = [...readFileSync(CATALOG_FILE, 'utf8').matchAll(/id: '([^']+)', name: '([^']+)', shortName: '[^']*', category: '([^']+)'/g)]
  .map(([, id, name, category]) => ({ id, name, category }));
const generated: KnownStandard[] = existsSync(GENERATED_DIR)
  ? readdirSync(GENERATED_DIR)
      .filter(file => file.endsWith('.meta.json'))
      .map(file => JSON.parse(readFileSync(join(GENERATED_DIR, file), 'utf8')) as KnownStandard)
  : [];
if (builtIn.length === 0) fail('No se pudieron leer las normas de src/catalog.ts.');
const known = [...builtIn, ...generated];
const categories = [...new Set(known.map(s => s.category))];

// ---------- Prompts and schemas ----------

const SYSTEM_PROMPT = `Eres un formador experto en seguridad de la información, cloud y privacidad. Creas cursos de estudio en español a partir del texto de normas (ISO/IEC, NIST...) para una plataforma de aprendizaje. Los alumnos son profesionales técnicos que preparan implantaciones, auditorías o certificaciones.

Rigor:
- Usa solo lo que dice el documento adjunto y la numeración real de sus cláusulas, controles y anexos. No inventes requisitos, controles ni números; si el documento no cubre algo, no lo supongas.
- Explica con tus propias palabras. No copies el texto de la norma: como mucho, una cita literal breve (menos de 15 palabras) cuando sea imprescindible.
- Distingue requisitos ("debe", shall) de recomendaciones ("debería", should) cuando importe.

Formato del contenido de un módulo (Markdown):
- Empieza con un encabezado "# " y organiza con secciones "## ". No uses "###".
- Usa listas con "* ", negrita para términos clave y números de cláusula o control, y ejemplos prácticos introducidos con "*Ejemplo:*".
- Puedes usar citas "> " para notas. No uses tablas, HTML, bloques de código ni imágenes.
- Extensión orientativa: 600 a 1200 palabras.

Preguntas de un módulo:
- Exactamente 3 preguntas de opción múltiple, con 3 opciones y una sola correcta (answerIndex empieza en 0).
- Preferiblemente escenarios prácticos; distractores plausibles; varía la posición de la respuesta correcta.
- La explicación justifica la respuesta y cita la cláusula o control correspondiente.`;

const outlineSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'name', 'shortName', 'category', 'desc', 'courseTitle', 'courseDescription', 'coverageNote', 'related', 'modules'],
  properties: {
    id: { type: 'string', description: 'Identificador en minúsculas, solo letras, números y guiones. P. ej. "27002" o "nist800-53".' },
    name: { type: 'string', description: 'Nombre oficial con edición. P. ej. "ISO/IEC 27002:2022".' },
    shortName: { type: 'string', description: 'Etiqueta muy corta. P. ej. "27002" o "NIST".' },
    category: { type: 'string' },
    desc: { type: 'string', description: 'Descripción de una línea, máximo unos 60 caracteres.' },
    courseTitle: { type: 'string' },
    courseDescription: { type: 'string', description: 'Una frase que describa qué cubre el curso.' },
    coverageNote: { type: 'string', description: 'Qué partes de la norma contiene el PDF. Si es una muestra o un extracto parcial, dilo claramente.' },
    related: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'reason'],
        properties: {
          id: { type: 'string', enum: known.map(s => s.id) },
          reason: { type: 'string', description: 'Una frase: por qué se relacionan.' },
        },
      },
    },
    modules: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'scope'],
        properties: {
          title: { type: 'string' },
          scope: { type: 'string', description: 'Cláusulas o secciones que cubre y puntos clave que debe explicar.' },
        },
      },
    },
  },
};

const moduleSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['content', 'questions'],
  properties: {
    content: { type: 'string', description: 'Contenido del módulo en Markdown.' },
    questions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['question', 'options', 'answerIndex', 'explanation'],
        properties: {
          question: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          answerIndex: { type: 'integer' },
          explanation: { type: 'string' },
        },
      },
    },
  },
};

const outlineTask = `Analiza el documento adjunto y diseña el plan de un curso que cubra su contenido en un orden lógico de aprendizaje: entre 6 y 12 módulos, o menos si el documento es corto. Cada módulo debe tener un alcance claro y sin solapes con los demás.

Categorías existentes en la plataforma: ${categories.map(c => `"${c}"`).join(', ')}. Usa una de ellas si encaja; si no, propone una nueva breve.

Normas ya disponibles en la plataforma (para "related", elige de 0 a 3 que estén realmente relacionadas):
${known.map(s => `- ${s.id}: ${s.name}`).join('\n')}`;

function moduleTask(outline: Outline, index: number) {
  const plan = outline.modules.map((m, i) => `${i + 1}. ${m.title}: ${m.scope}`).join('\n');
  const current = outline.modules[index];
  return `Curso: ${outline.courseTitle} (${outline.name}).

Plan completo del curso:
${plan}

Escribe ahora el módulo ${index + 1}: «${current.title}».
Alcance: ${current.scope}

Cubre solo este alcance; los demás temas se tratan en sus propios módulos.`;
}

// ---------- API calls ----------

// Created in main() so a missing API key is reported with a readable message
let client: Anthropic;
const pdfBase64 = readFileSync(pdfPath).toString('base64');
const totals = { input: 0, output: 0, cacheWrite: 0, cacheRead: 0 };

async function generate<T>(label: string, schema: object, task: string, maxTokens: number): Promise<T> {
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: maxTokens,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high', format: { type: 'json_schema', schema: schema as Record<string, unknown> } },
    // If a safety classifier declines, the API retries on Anthropic's recommended fallback model
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          // Identical PDF block in every request: after the first one, it is read from the prompt cache
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 }, cache_control: { type: 'ephemeral' } },
          { type: 'text', text: task },
        ],
      },
    ],
  });

  const message = await stream.finalMessage();
  totals.input += message.usage.input_tokens;
  totals.output += message.usage.output_tokens;
  totals.cacheWrite += message.usage.cache_creation_input_tokens ?? 0;
  totals.cacheRead += message.usage.cache_read_input_tokens ?? 0;

  if (message.stop_reason === 'refusal') {
    throw new Error(`${label}: Claude rechazó la petición (${message.stop_details?.category ?? 'sin categoría'}).`);
  }
  if (message.stop_reason === 'max_tokens') {
    throw new Error(`${label}: la respuesta se cortó por max_tokens.`);
  }
  const text = message.content.flatMap(block => (block.type === 'text' ? [block.text] : [])).join('');
  return JSON.parse(text) as T;
}

class ValidationError extends Error {}

// Retries content problems (invalid JSON, failed validation); API errors are already retried by the SDK
async function withRetry<T>(label: string, run: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await run();
    } catch (error) {
      const retryable = error instanceof SyntaxError || error instanceof ValidationError;
      if (!retryable || attempt >= MAX_ATTEMPTS) throw error;
      console.warn(`  ! ${label}: ${(error as Error).message} Reintentando…`);
    }
  }
}

function validateOutline(outline: Outline) {
  if (outline.modules.length === 0 || outline.modules.length > 15) {
    throw new ValidationError(`el plan tiene ${outline.modules.length} módulos (se esperan entre 1 y 15).`);
  }
}

function validateModule(module: GeneratedModule) {
  if (module.content.trim().length < 300) throw new ValidationError('el contenido es demasiado corto.');
  if (module.questions.length !== 3) throw new ValidationError(`tiene ${module.questions.length} preguntas en lugar de 3.`);
  for (const q of module.questions) {
    if (q.options.length < 3 || q.options.length > 4) throw new ValidationError('una pregunta no tiene 3 o 4 opciones.');
    if (!Number.isInteger(q.answerIndex) || q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      throw new ValidationError('una pregunta tiene un answerIndex fuera de rango.');
    }
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

const elapsed = (start: number) => {
  const seconds = Math.round((Date.now() - start) / 1000);
  return seconds >= 60 ? `${Math.floor(seconds / 60)}m ${seconds % 60}s` : `${seconds}s`;
};

// ---------- Main ----------

async function main() {
  client = new Anthropic();
  const source = basename(pdfPath);
  const started = Date.now();
  console.log(`Generando curso desde «${source}» con ${MODEL}. Puede tardar varios minutos.\n`);

  console.log('1/2 Analizando el documento y planificando módulos…');
  const outline = await withRetry('Plan', async () => {
    const result = await generate<Outline>('Plan', outlineSchema, outlineTask, 16000);
    validateOutline(result);
    return result;
  });

  const id = values.id ?? outline.id.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
  if (!SLUG.test(id)) fail(`El id propuesto «${outline.id}» no es válido. Indica uno con --id.`);
  const metaFile = join(GENERATED_DIR, `${id}.meta.json`);
  const courseFile = join(GENERATED_DIR, `${id}.course.json`);
  if (builtIn.some(s => s.id === id)) fail(`Ya existe un curso integrado con id «${id}». Usa --id para elegir otro.`);
  if (existsSync(metaFile) && !values.force) fail(`Ya existe ${basename(metaFile)}. Usa --force para sobrescribirlo o --id para elegir otro.`);

  console.log(`    ${outline.name} · ${outline.modules.length} módulos · ${values.categoria ?? outline.category}`);
  outline.modules.forEach((m, i) => console.log(`    ${i + 1}. ${m.title}`));

  console.log('\n2/2 Escribiendo módulos y preguntas…');
  const generateModule = (index: number) => {
    const label = `Módulo ${index + 1}`;
    return withRetry(label, async () => {
      const moduleStart = Date.now();
      const result = await generate<GeneratedModule>(label, moduleSchema, moduleTask(outline, index), 32000);
      validateModule(result);
      console.log(`    ✓ ${index + 1}/${outline.modules.length} ${outline.modules[index].title} (${elapsed(moduleStart)})`);
      return result;
    });
  };
  // The first module writes the PDF to the prompt cache; the rest run in parallel and read it
  const first = await generateModule(0);
  const rest = await mapWithConcurrency(outline.modules.slice(1), CONCURRENCY, (_, i) => generateModule(i + 1));
  const modules = [first, ...rest];

  const date = new Date().toISOString().slice(0, 10);
  const notice = `> Curso generado automáticamente con Claude a partir de «${source}» (${date}). Puede contener errores: contrástalo con el texto oficial de la norma. ${outline.coverageNote}`;

  const courseModules = modules.map((module, index) => {
    let content = module.content.trim();
    if (index === 0) {
      // Place the notice right after the module's first heading
      const lines = content.split('\n');
      const headingIndex = lines.findIndex(line => line.startsWith('# '));
      lines.splice(headingIndex + 1, 0, '', notice);
      content = lines.join('\n');
    }
    const [quiz, ...extra] = module.questions;
    return { id: `${id}_m${index + 1}`, title: outline.modules[index].title, content, quiz, extra };
  });

  const meta = {
    id,
    name: outline.name,
    shortName: outline.shortName,
    category: values.categoria ?? outline.category,
    desc: outline.desc,
    moduleCount: courseModules.length,
    related: outline.related.filter(rel => rel.id !== id),
    generated: { source, model: MODEL, date },
  };
  const course = {
    course: {
      id,
      title: outline.courseTitle,
      description: outline.courseDescription,
      modules: courseModules.map(({ extra: _extra, ...module }) => module),
    },
    extraQuestions: Object.fromEntries(courseModules.map(module => [module.id, module.extra])),
  };

  mkdirSync(GENERATED_DIR, { recursive: true });
  writeFileSync(metaFile, `${JSON.stringify(meta, null, 2)}\n`);
  writeFileSync(courseFile, `${JSON.stringify(course, null, 2)}\n`);

  const cost =
    (totals.input * PRICE.input + totals.output * PRICE.output + totals.cacheWrite * PRICE.cacheWrite + totals.cacheRead * PRICE.cacheRead) / 1_000_000;
  console.log(`\n✓ Curso generado en ${elapsed(started)}:`);
  console.log(`    src/data/generated/${basename(metaFile)}`);
  console.log(`    src/data/generated/${basename(courseFile)}`);
  console.log(`\nTokens: ${totals.input.toLocaleString('es')} entrada · ${totals.cacheWrite.toLocaleString('es')} escritos en caché · ${totals.cacheRead.toLocaleString('es')} leídos de caché · ${totals.output.toLocaleString('es')} salida`);
  console.log(`Coste aproximado: ${cost.toFixed(2)} USD (tarifas de ${MODEL}; puede variar si interviene el modelo de respaldo)`);
  console.log('\nRevisa el contenido y ejecuta `npm run dev` para verlo en la app.');
}

main().catch(error => {
  if (error instanceof Anthropic.AuthenticationError) {
    fail('La API key no es válida o falta. Define la variable de entorno ANTHROPIC_API_KEY con una key de la consola de Anthropic.');
  }
  if (error instanceof Anthropic.APIError) {
    fail(`Error de la API de Anthropic (${error.status ?? 'sin estado'}): ${error.message}`);
  }
  if (error instanceof Anthropic.AnthropicError) {
    fail(`${error.message}\nDefine la variable de entorno ANTHROPIC_API_KEY con una key de la consola de Anthropic.`);
  }
  fail(error instanceof Error ? error.message : String(error));
});
