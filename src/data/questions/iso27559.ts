import type { Question } from '../../types';

export const iso27559Questions: Record<string, Question[]> = {
  '27559_m1': [
    {
      question: '¿Qué norma describe las técnicas de desidentificación a las que la ISO 27559 aplica su marco de gobernanza?',
      options: ['ISO/IEC 20889', 'ISO/IEC 27002', 'ISO 9001'],
      answerIndex: 0,
      explanation: 'La 27559 ofrece el marco para gobernar el uso de las técnicas descritas en ISO/IEC 20889, que es también referencia normativa.'
    },
    {
      question: 'En la ISO 27559, el término «data principal» es más amplio que «PII principal» porque:',
      options: ['Incluye también organizaciones y dispositivos.', 'Solo se refiere a menores de edad.', 'Excluye a las personas físicas.'],
      answerIndex: 0,
      explanation: 'La introducción aclara que «data principal» abarca, por ejemplo, organizaciones y ordenadores, no solo personas.'
    }
  ],
  '27559_m2': [
    {
      question: '¿Cuál es la diferencia entre «shared data» y «released data» en la ISO 27559?',
      options: ['En shared data el custodio concede acceso a un conjunto fijo de entidades; en released data ya no controla directamente quién accede.', 'Son sinónimos.', 'Released data siempre está cifrada.'],
      answerIndex: 0,
      explanation: 'La distinción depende de si el custodio mantiene control sobre quién accede a los datos.'
    },
    {
      question: '¿Qué ocurre si el resultado del marco no cumple los criterios de aceptación?',
      options: ['Se publica de todas formas.', 'Se repite el proceso, p. ej. mejorando el entorno o transformando más los datos.', 'Se destruyen los datos originales.'],
      answerIndex: 1,
      explanation: 'El marco es iterativo: se ajustan contexto o datos hasta encontrar una solución aceptable para ambas partes.'
    }
  ],
  '27559_m3': [
    {
      question: 'Un portátil con datos desidentificados es robado a pesar de todos los controles. ¿Qué tipo de amenaza describe la norma?',
      options: ['Deliberada', 'Accidental', 'Ambiental'],
      answerIndex: 2,
      explanation: 'La amenaza ambiental cubre la pérdida o robo de los datos cuando todos los controles han fallado.'
    },
    {
      question: 'Según 6.2.2, ¿cómo debe ser la evaluación de los controles mitigadores del destinatario?',
      options: ['Detallada y basada en evidencias.', 'Una simple declaración verbal.', 'Opcional.'],
      answerIndex: 0,
      explanation: 'La norma exige que la evaluación sea detallada y basada en evidencias; puede apoyarse en auditorías de terceros o certificaciones.'
    }
  ],
  '27559_m4': [
    {
      question: '¿Cuál de estas es una obligación típica de un acuerdo escrito según 6.2.3?',
      options: ['Prohibir intentos de identificar a los titulares o de enlazar datos sin permiso.', 'Permitir compartir los datos con cualquiera.', 'Publicar los datos en redes sociales.'],
      answerIndex: 0,
      explanation: 'Los acuerdos escritos suelen prohibir la reidentificación y el enlace de datos, además de permitir auditorías y definir usos aceptables.'
    },
    {
      question: '¿Por qué los acuerdos escritos son menos eficaces cuando los datos se publican como datos abiertos?',
      options: ['Porque su exigibilidad frente a destinatarios desconocidos es limitada.', 'Porque los datos abiertos no tienen riesgo.', 'Porque la ley los prohíbe.'],
      answerIndex: 0,
      explanation: 'La propia norma advierte que la exigibilidad de las obligaciones puede ser menos efectiva al publicar datos abiertos.'
    }
  ],
  '27559_m5': [
    {
      question: 'La combinación «fecha de nacimiento + código postal + sexo» es un ejemplo de:',
      options: ['Identificadores indirectos (cuasi-identificadores).', 'Identificador directo.', 'Atributo no identificativo.'],
      answerIndex: 0,
      explanation: 'Por separado no identifican, pero combinados o enlazados con información externa pueden identificar a una persona.'
    },
    {
      question: '¿Por qué publicar solo una muestra de la población reduce el riesgo?',
      options: ['Porque el adversario no puede estar seguro de que una persona concreta esté en el dataset.', 'Porque las muestras están siempre cifradas.', 'No lo reduce.'],
      answerIndex: 0,
      explanation: 'La incertidumbre sobre la pertenencia reduce la probabilidad de una reidentificación correcta.'
    }
  ],
  '27559_m6': [
    {
      question: 'Si P(ataque) = 0,5 y P(identificación | ataque) = 0,2, ¿cuál es la identificabilidad resultante?',
      options: ['0,1', '0,7', '0,4'],
      answerIndex: 0,
      explanation: 'La identificabilidad se calcula como el producto: 0,5 × 0,2 = 0,1.'
    },
    {
      question: '¿Para qué sirven las pruebas adversariales (8.2.3)?',
      options: ['Para validar las suposiciones del cálculo intentando realmente reidentificar los datos.', 'Para publicar los datos más rápido.', 'Para cifrar el dataset.'],
      answerIndex: 0,
      explanation: 'Un ataque controlado, como la prueba de intruso motivado, puede descubrir cuasi-identificadores olvidados o supuestos incorrectos.'
    }
  ],
  '27559_m7': [
    {
      question: '¿Qué palanca de mitigación reduce el riesgo SIN reducir la utilidad de los datos?',
      options: ['Reconfigurar el entorno (p. ej. pasar a un enclave o reforzar acuerdos).', 'Suprimir columnas.', 'Añadir ruido.'],
      answerIndex: 0,
      explanation: 'Reconfigurar el entorno reduce la probabilidad de ataque manteniendo los datos intactos.'
    },
    {
      question: 'Convertir la edad «34» en el rango «30-39» es un ejemplo de:',
      options: ['Generalización', 'Pseudonimización', 'Muestreo'],
      answerIndex: 0,
      explanation: 'La generalización reduce la precisión de un valor para que coincida con más individuos.'
    }
  ],
  '27559_m8': [
    {
      question: 'Según 9.2.2, ¿qué práctica de roles es recomendable?',
      options: ['Que la revisión de la desidentificación sea independiente del equipo que la ejecuta.', 'Que una sola persona decida, ejecute y revise todo.', 'Que no haya roles definidos.'],
      answerIndex: 0,
      explanation: 'Asignar roles y responsabilidades claros, con revisión independiente, reduce errores y conflictos de interés.'
    },
    {
      question: '¿Qué debe existir según 9.4 por si se produce una reidentificación?',
      options: ['Un plan de mitigación: contención, evaluación del daño, notificación si procede y revisión de prácticas.', 'Nada, el riesgo ya fue aceptado.', 'Solo una disculpa pública.'],
      answerIndex: 0,
      explanation: 'La gobernanza incluye preparar la respuesta ante incidentes relacionados con los datos desidentificados.'
    }
  ]
};
