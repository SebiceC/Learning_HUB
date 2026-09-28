import type { Question } from '../../types';

export const nist800_188Questions: Record<string, Question[]> = {
  nist_m1: [
    {
      question: '¿Qué conflicto de fondo aborda la NIST SP 800-188?',
      options: ['Transparencia y datos abiertos frente a protección de la privacidad.', 'Coste frente a rendimiento del hardware.', 'Nube pública frente a nube privada.'],
      answerIndex: 0,
      explanation: 'Leyes como la Evidence Act o la OPEN Government Data Act impulsan la publicación de datos, que debe equilibrarse con la privacidad.'
    },
    {
      question: '¿Por qué el NIST indica que los datos totalmente sintéticos y la privacidad diferencial tienen aún uso limitado en el gobierno?',
      options: ['Por coste, tiempo y la sofisticación que requieren.', 'Porque están prohibidos.', 'Porque no protegen la privacidad.'],
      answerIndex: 0,
      explanation: 'El documento señala estas limitaciones prácticas, aunque espera que su uso aumente.'
    }
  ],
  nist_m2: [
    {
      question: 'Los datos «codificados» en entornos sanitarios corresponden a:',
      options: ['Datos pseudonimizados.', 'Datos cifrados con AES.', 'Datos totalmente sintéticos.'],
      answerIndex: 0,
      explanation: 'El NIST indica que el término «coded» se usa en salud para describir datos pseudonimizados.'
    },
    {
      question: 'Revelar que un titular tiene un diagnóstico concreto a partir de un fichero publicado es una divulgación de:',
      options: ['Atributo', 'Identidad', 'Ninguna'],
      answerIndex: 0,
      explanation: 'La divulgación de atributo revela información sensible sobre un titular a partir de los datos publicados.'
    }
  ],
  nist_m3: [
    {
      question: 'La probabilidad de encontrar el registro de alguien que se SABE que está en la muestra se denomina:',
      options: ['KIRP (known inclusion re-identification probability)', 'UIRP', 'IP'],
      answerIndex: 0,
      explanation: 'KIRP (antes «riesgo del fiscal») supone que el intruso sabe que la persona está en el dataset.'
    },
    {
      question: 'Si un dato cambia la creencia de un intruso de que alguien está en el dataset del 50 % al 90 %, según el NIST:',
      options: ['Ya se ha producido una divulgación probabilística.', 'No hay divulgación porque no hay certeza.', 'Solo importa si llega al 100 %.'],
      answerIndex: 0,
      explanation: 'Las divulgaciones no son solo eventos discretos; cambiar la creencia probabilística del intruso ya es una divulgación.'
    }
  ],
  nist_m4: [
    {
      question: 'Según el principio de ciclo de vida del NIST, si un identificador no es necesario para ningún uso previsto:',
      options: ['No debería recogerse.', 'Debe recogerse por si acaso.', 'Debe publicarse.'],
      answerIndex: 0,
      explanation: 'Planificar la publicación desde la recogida permite no recoger identificadores innecesarios, lo que minimiza el riesgo.'
    },
    {
      question: 'Un acuerdo de uso de datos que se acepta con un clic antes de descargar un dataset es el modelo:',
      options: ['Click-through', 'Enclave', 'Release-and-forget'],
      answerIndex: 0,
      explanation: 'Es una variante del modelo DUA en la que el acuerdo se acepta mediante una licencia click-through.'
    }
  ],
  nist_m5: [
    {
      question: '¿Cuántos tipos de identificadores elimina el método Safe Harbor de HIPAA?',
      options: ['18', '5', '93'],
      answerIndex: 0,
      explanation: 'Safe Harbor es un estándar prescriptivo que exige eliminar 18 tipos de identificadores.'
    },
    {
      question: '¿Qué diferencia principal señala el NIST entre un DRB y un IRB?',
      options: ['El IRB aprueba antes de la investigación; el DRB suele intervenir después y antes de publicar datos.', 'Son exactamente lo mismo.', 'El DRB solo existe en empresas privadas.'],
      answerIndex: 0,
      explanation: 'El IRB protege a los sujetos de investigación antes de comenzar; el DRB protege a titulares, instituciones y sociedad antes de la publicación.'
    }
  ],
  nist_m6: [
    {
      question: 'En el proceso de 13 pasos, ¿qué se hace si el riesgo real supera el umbral?',
      options: ['Ajustar el procedimiento (más transformación o eliminar valores atípicos) y repetir la evaluación.', 'Publicar igualmente.', 'Subir el umbral.'],
      answerIndex: 0,
      explanation: 'El paso 13 indica ajustar el procedimiento y repetir los pasos 11 y 12 hasta cumplir el umbral.'
    },
    {
      question: '¿Por qué las fechas requieren especial atención al desidentificar?',
      options: ['Porque enlazan de forma inherente con la realidad externa (el paso del tiempo) y con registros públicos.', 'Porque ocupan mucho espacio.', 'Porque nunca son identificativas.'],
      answerIndex: 0,
      explanation: 'Fechas como el nacimiento o la defunción son de registro público y pueden enlazar registros entre sí.'
    }
  ],
  nist_m7: [
    {
      question: 'Agrupar a todas las personas mayores de 89 años en la categoría «90 o más» es un ejemplo de:',
      options: ['Top coding', 'Swapping', 'Microagregación'],
      answerIndex: 0,
      explanation: 'La codificación superior agrupa valores atípicos por encima de un umbral; Safe Harbor lo aplica a las edades.'
    },
    {
      question: '¿Por qué el ruido geográfico necesario suele ser mayor en zonas rurales que en ciudades?',
      options: ['Porque hay menos población y un desplazamiento pequeño no aporta suficiente ambigüedad.', 'Porque las coordenadas rurales son menos precisas.', 'No hay diferencia.'],
      answerIndex: 0,
      explanation: 'El NIST sugiere que ±100 m pueden bastar en ciudad, mientras que en zonas rurales puede hacer falta ±5 km o más.'
    }
  ],
  nist_m8: [
    {
      question: '¿Qué ilustra el ejemplo del colegio que actualiza su tabla de niveles de lectura?',
      options: ['Que la agregación no garantiza privacidad cuando hay publicaciones sucesivas.', 'Que las tablas deben actualizarse cada día.', 'Que los alumnos no deben hacer exámenes.'],
      answerIndex: 0,
      explanation: 'Comparando dos tablas agregadas se deduce el nivel del único alumno nuevo: la agregación da una falsa sensación de seguridad.'
    },
    {
      question: '¿Por qué debe monitorizarse un dataset después de publicarlo?',
      options: ['Porque su identificabilidad puede aumentar con el tiempo por nuevos datos o brechas.', 'Para contar las descargas.', 'No es necesario.'],
      answerIndex: 0,
      explanation: 'Nuevos datasets enlazables o brechas en datos internos pueden reidentificar datos que antes eran seguros.'
    }
  ],
  nist_m9: [
    {
      question: '¿Cómo recomienda el NIST indicar que un dataset es sintético?',
      options: ['Marcándolo en los propios datos, p. ej. con nombres como «SYNTHETIC PERSON».', 'Solo en un documento aparte.', 'No hace falta indicarlo.'],
      answerIndex: 0,
      explanation: 'La documentación puede separarse del dataset; marcar los propios datos evita confusiones.'
    },
    {
      question: '¿Cuál es el riesgo principal de una interfaz de consultas interactiva?',
      options: ['Cada consulta consume privacidad, y la pérdida se acumula.', 'Que es demasiado lenta.', 'Que no permite estadísticas.'],
      answerIndex: 0,
      explanation: 'Cada respuesta filtra algo de información; por eso se necesitan mecanismos como la privacidad diferencial, presupuestos y registro de consultas.'
    }
  ],
  nist_m10: [
    {
      question: '¿A qué métrica de record linkage equivale la tasa de reidentificación condicional?',
      options: ['Precisión (verdaderos positivos entre todos los positivos).', 'Exhaustividad (recall).', 'Exactitud total.'],
      answerIndex: 0,
      explanation: 'Es la proporción de enlaces confirmados sobre enlaces sospechosos, idéntica a la precisión.'
    },
    {
      question: 'En el caso edX, ¿qué efecto tuvo aplicar k-anonimato a los datos?',
      options: ['Introdujo sesgo: el porcentaje de alumnas bajó del 29 % al 26 %.', 'Ninguno.', 'Aumentó la exactitud.'],
      answerIndex: 0,
      explanation: 'La supresión necesaria para lograr k-anonimato alteró estadísticas relevantes, lo que muestra la necesidad de validar la exactitud.'
    }
  ]
};
