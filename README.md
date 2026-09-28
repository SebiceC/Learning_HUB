# Learning HUB

Plataforma de estudio en español para normas y marcos de referencia de seguridad de la información, seguridad cloud y privacidad, de distintas fuentes (ISO/IEC, NIST y otras). Cada norma es un curso con módulos, preguntas de autoevaluación y un examen final, y el progreso se guarda en el navegador. Se pueden añadir nuevas normas generando el curso desde su PDF con IA.

Cursos disponibles:

| Norma | Tema | Módulos |
|---|---|---|
| ISO/IEC 27001:2022 | Sistema de Gestión de Seguridad de la Información (SGSI) | 12 |
| ISO/IEC 27017:2026 | Controles de seguridad para servicios cloud | 10 |
| ISO/IEC 27018:2019 | Protección de PII en nubes públicas | 8 |
| ISO/IEC 27559:2022 | Marco de desidentificación de datos | 8 |
| ISO/IEC 27701:2025 | Sistema de Gestión de Información de Privacidad (PIMS) | 9 |
| NIST SP 800-188 | Desidentificación de datasets gubernamentales | 10 |

## Funcionalidades

- **Cursos por módulos** con contenido en Markdown y 3 preguntas por módulo, con explicación de cada respuesta.
- **Examen final** por norma: 10 preguntas aleatorias, nota mínima del 70 % y revisión de respuestas.
- **Progreso persistente** (localStorage): módulos completados, respuestas, mejor nota y posición en cada curso. Se puede reintentar un módulo o reiniciar una norma.
- **Búsqueda global** sin distinguir tildes ni mayúsculas (p. ej. `8.24`, `consentimiento`).
- **URLs compartibles** para cada módulo (`/curso/27017/modulo/3`) y examen (`/curso/27017/examen`), con soporte del botón atrás.
- **Mapa del ecosistema** y enlaces entre normas relacionadas.
- **Diseño adaptable** con índice en cajón lateral en móvil.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · react-markdown · lucide-react · oxlint · Anthropic SDK (solo en el script de generación de cursos)

Cada curso se carga bajo demanda (`import()` dinámico): la página de inicio no descarga el contenido de los cursos ni el renderizador de Markdown.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # comprobación de tipos + build de producción en dist/
npm run lint     # oxlint
npm run preview  # sirve el build de producción
npm run generar -- norma.pdf  # genera un curso desde un PDF (ver más abajo)
```

## Estructura

```
src/
├── catalog.ts            # Metadatos de cada norma y su carga bajo demanda
├── data/
│   ├── iso27001.ts …     # Contenido de cada curso (módulos en Markdown + pregunta principal)
│   ├── questions/        # Preguntas adicionales por módulo
│   └── generated/        # Cursos generados desde PDF (npm run generar)
├── lib/
│   ├── courses.ts        # Carga y caché de cursos
│   ├── progress.ts       # Progreso persistente
│   ├── router.ts         # Enrutado con History API
│   └── search.ts         # Índice y búsqueda
└── components/           # Dashboard, CourseView, ExamView, EcosystemMap…
```

### Añadir o ampliar un curso

1. Crea o edita el archivo del curso en `src/data/` (cada módulo tiene `id`, `title`, `content` y `quiz`).
2. Añade las preguntas extra en `src/data/questions/`, con el `id` del módulo como clave.
3. Registra la norma en `src/catalog.ts` con su `moduleCount` (en desarrollo se avisa por consola si no coincide).

Los enlaces entre cursos dentro del contenido se escriben como rutas de la app, p. ej. `[ISO/IEC 27018](/curso/27018)`.

### Generar un curso desde un PDF con IA

El script `scripts/generate-course.ts` envía el PDF de una norma a Claude (`claude-opus-5`) y genera un curso completo: plan de módulos, contenido en Markdown y 3 preguntas por módulo. La API key no forma parte de la web; el script se ejecuta en tu equipo.

```bash
# PowerShell: $env:ANTHROPIC_API_KEY = "sk-ant-..."   ·   bash: export ANTHROPIC_API_KEY=sk-ant-...
npm run generar -- ruta/a/norma.pdf
npm run generar -- ruta/a/norma.pdf --id 27002 --categoria "Gestión de la Seguridad"
```

- **Salida:** `src/data/generated/<id>.meta.json` (metadatos) y `<id>.course.json` (contenido). La app los detecta automáticamente con `import.meta.glob`; no hay que tocar `catalog.ts`.
- **Opciones:** `--id` fija el identificador (si no, lo propone Claude), `--categoria` fuerza la categoría del inicio y `--force` sobrescribe un curso generado existente.
- **Coste y tiempo:** el script muestra los tokens usados y el coste aproximado al terminar. Una norma de ~100 páginas suele costar unos pocos dólares y tardar varios minutos. El PDF se reutiliza desde la caché de prompts entre módulos para abaratarlo.
- **Límites:** hasta ~23 MB y 600 páginas por PDF.
- **Revisión:** los cursos generados se marcan como «Generado con IA» e incluyen un aviso en el primer módulo. Revisa el contenido antes de publicarlo: puede contener errores, y si el PDF es un extracto parcial el curso solo cubrirá esa parte.

## Despliegue

Es una SPA estática: basta con publicar `dist/`. Como usa rutas reales, el hosting debe redirigir cualquier ruta a `index.html`; ya están incluidas las configuraciones para **Vercel** (`vercel.json`) y **Netlify** (`public/_redirects`).

## Aviso

Material de estudio con explicaciones y ejemplos propios. **No reproduce ni sustituye el texto oficial** de ninguna norma. Muchas normas (como las ISO/IEC) están protegidas por derechos de autor y deben adquirirse a través de su organismo emisor o de los organismos nacionales de normalización; otras, como las publicaciones del NIST, son de acceso público. Los PDFs de las normas no se incluyen en este repositorio.
