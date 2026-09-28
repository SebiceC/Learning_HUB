import type { Course, Question, RelatedStandard } from './types';

export interface LoadedCourse {
  course: Course;
  extraQuestions: Record<string, Question[]>;
}

export interface CatalogEntry {
  id: string;
  name: string;
  shortName: string;
  category: string;
  desc: string;
  // Must match course.modules.length; checked in development when the course loads
  moduleCount: number;
  related: RelatedStandard[];
  // Set for courses created by scripts/generate-course.ts
  generated?: { source: string; model: string; date: string };
  // Course content and questions are code-split: each standard is its own chunk
  load: () => Promise<LoadedCourse>;
}

const builtIn: CatalogEntry[] = [
  {
    id: '27001', name: 'ISO/IEC 27001:2022', shortName: '27001', category: 'Gestión de la Seguridad',
    desc: 'Sistema de Gestión de Seguridad de la Información (SGSI)', moduleCount: 12,
    related: [
      { id: '27017', reason: 'Añade guía cloud sobre los controles del Anexo A.' },
      { id: '27701', reason: 'Sistema de gestión de privacidad, integrable con el SGSI.' },
    ],
    load: async () => {
      const [{ iso27001Course }, { iso27001Questions }] = await Promise.all([
        import('./data/iso27001'), import('./data/questions/iso27001'),
      ]);
      return { course: iso27001Course, extraQuestions: iso27001Questions };
    },
  },
  {
    id: '27017', name: 'ISO/IEC 27017:2026', shortName: '27017', category: 'Seguridad Cloud',
    desc: 'Controles de seguridad para servicios en la nube', moduleCount: 10,
    related: [
      { id: '27001', reason: 'El SGSI donde se seleccionan e implementan estos controles.' },
      { id: '27018', reason: 'Protección de PII cuando el proveedor cloud es encargado (control 5.34).' },
    ],
    load: async () => {
      const [{ iso27017Course }, { iso27017Questions }] = await Promise.all([
        import('./data/iso27017'), import('./data/questions/iso27017'),
      ]);
      return { course: iso27017Course, extraQuestions: iso27017Questions };
    },
  },
  {
    id: '27018', name: 'ISO/IEC 27018:2019', shortName: '27018', category: 'Seguridad Cloud',
    desc: 'Protección de PII en nubes públicas (encargados)', moduleCount: 8,
    related: [
      { id: '27017', reason: 'Controles de seguridad cloud generales, complementarios.' },
      { id: '27701', reason: 'Sistema de gestión de privacidad; su Anexo E mapea con la 27018.' },
    ],
    load: async () => {
      const [{ iso27018Course }, { iso27018Questions }] = await Promise.all([
        import('./data/iso27018'), import('./data/questions/iso27018'),
      ]);
      return { course: iso27018Course, extraQuestions: iso27018Questions };
    },
  },
  {
    id: '27559', name: 'ISO/IEC 27559:2022', shortName: '27559', category: 'Privacidad y Desidentificación',
    desc: 'Marco de desidentificación de datos', moduleCount: 8,
    related: [
      { id: 'nist800-188', reason: 'Guía técnica del NIST que cita la 27559 como referencia de gobernanza.' },
      { id: '27701', reason: 'La desidentificación es un control de minimización del PIMS.' },
    ],
    load: async () => {
      const [{ iso27559Course }, { iso27559Questions }] = await Promise.all([
        import('./data/iso27559'), import('./data/questions/iso27559'),
      ]);
      return { course: iso27559Course, extraQuestions: iso27559Questions };
    },
  },
  {
    id: '27701', name: 'ISO/IEC 27701:2025', shortName: '27701', category: 'Privacidad y Desidentificación',
    desc: 'Sistema de Gestión de Información de Privacidad (PIMS)', moduleCount: 9,
    related: [
      { id: '27001', reason: 'Estructura armonizada: ambos sistemas se integran fácilmente.' },
      { id: '27018', reason: 'Controles para encargados en nube pública (Anexo E).' },
      { id: '27559', reason: 'Cómo desidentificar datos al final del tratamiento.' },
    ],
    load: async () => {
      const [{ iso27701Course }, { iso27701Questions }] = await Promise.all([
        import('./data/iso27701'), import('./data/questions/iso27701'),
      ]);
      return { course: iso27701Course, extraQuestions: iso27701Questions };
    },
  },
  {
    id: 'nist800-188', name: 'NIST SP 800-188', shortName: 'NIST', category: 'Privacidad y Desidentificación',
    desc: 'Desidentificación de datasets gubernamentales', moduleCount: 10,
    related: [
      { id: '27559', reason: 'Marco ISO de gobernanza de la desidentificación.' },
    ],
    load: async () => {
      const [{ nist800_188Course }, { nist800_188Questions }] = await Promise.all([
        import('./data/nist800_188'), import('./data/questions/nist800_188'),
      ]);
      return { course: nist800_188Course, extraQuestions: nist800_188Questions };
    },
  },
];

// Courses generated from PDFs (npm run generar): metadata is bundled, content loads on demand
const generatedMeta = import.meta.glob<Omit<CatalogEntry, 'load'>>('./data/generated/*.meta.json', { eager: true, import: 'default' });
const generatedCourses = import.meta.glob<LoadedCourse>('./data/generated/*.course.json', { import: 'default' });

const generated: CatalogEntry[] = Object.entries(generatedMeta).flatMap(([path, meta]) => {
  const load = generatedCourses[path.replace('.meta.json', '.course.json')];
  if (!load) {
    console.warn(`Falta el contenido del curso generado ${path}`);
    return [];
  }
  if (builtIn.some(entry => entry.id === meta.id)) {
    console.warn(`El curso generado ${path} usa el id de un curso integrado («${meta.id}») y se ignora`);
    return [];
  }
  return [{ ...meta, load }];
});

export const catalog: CatalogEntry[] = [...builtIn, ...generated];

export const getEntry = (id: string) => catalog.find(entry => entry.id === id);

export const totalModules = catalog.reduce((sum, entry) => sum + entry.moduleCount, 0);
