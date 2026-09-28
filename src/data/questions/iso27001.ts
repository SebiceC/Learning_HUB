import type { Question } from '../../types';

export const iso27001Questions: Record<string, Question[]> = {
  c0_3: [
    {
      question: '¿Puede una organización que busca la certificación excluir la cláusula 7 (Soporte) porque «no le aplica»?',
      options: ['Sí, si lo justifica en la SoA.', 'No: las cláusulas 4 a 10 son obligatorias para certificar.', 'Sí, si es una pyme.'],
      answerIndex: 1,
      explanation: 'Los requisitos de las cláusulas 4 a 10 son genéricos y aplicables a todas las organizaciones; no pueden excluirse si se quiere certificar. Solo los controles del Anexo A pueden declararse no aplicables con justificación.'
    },
    {
      question: '¿Qué permite que la ISO 27001 se integre fácilmente con ISO 9001 o ISO 22301?',
      options: ['Que todas usan el mismo software.', 'La estructura común de alto nivel (Anexo SL / estructura armonizada).', 'Que las publica el mismo comité técnico.'],
      answerIndex: 1,
      explanation: 'Las normas de sistemas de gestión de ISO comparten una estructura de cláusulas y textos comunes (Anexo SL), lo que facilita implantar sistemas integrados.'
    }
  ],
  c4: [
    {
      question: 'Un banco identifica que debe cumplir PCI-DSS y la ley local de protección de datos. ¿En qué cláusula se recogen estos requisitos de partes interesadas?',
      options: ['4.2', '6.2', '9.2'],
      answerIndex: 0,
      explanation: 'La cláusula 4.2 exige identificar las partes interesadas y sus requisitos (legales, regulatorios y contractuales) relevantes para el SGSI.'
    },
    {
      question: '¿Qué debe hacerse con los sistemas o sedes que quedan fuera del alcance del SGSI (4.3)?',
      options: ['Nada, no se mencionan.', 'Documentar el alcance y justificar las exclusiones, considerando interfaces y dependencias.', 'Eliminarlos de la organización.'],
      answerIndex: 1,
      explanation: 'El alcance debe estar documentado con sus límites; las exclusiones deben justificarse y deben considerarse las interfaces con actividades fuera del alcance.'
    }
  ],
  c5: [
    {
      question: '¿Cuál es la principal idea que introduce la cláusula 5 respecto a la seguridad?',
      options: ['Que la seguridad es responsabilidad exclusiva del área de TI.', 'Que la alta dirección debe liderar y comprometerse activamente con el SGSI.', 'Que el CISO debe aprobar todos los presupuestos de la empresa.'],
      answerIndex: 1,
      explanation: 'La cláusula 5 exige liderazgo y compromiso de la alta dirección: integrar el SGSI en los procesos, proveer recursos y dirigir a las personas.'
    },
    {
      question: 'Nombrar formalmente a un CISO y definir a quién reporta es evidencia de:',
      options: ['5.3 Roles, responsabilidades y autoridades', '7.2 Competencia', '4.4 Sistema de gestión'],
      answerIndex: 0,
      explanation: 'La cláusula 5.3 exige asignar y comunicar las responsabilidades y autoridades de los roles relevantes para la seguridad de la información.'
    }
  ],
  c6: [
    {
      question: '«Cerrar las vulnerabilidades críticas en menos de 48 horas» es un ejemplo de:',
      options: ['Un objetivo de seguridad medible (6.2)', 'Un criterio de aceptación del riesgo (6.1.2)', 'Una no conformidad (10.2)'],
      answerIndex: 0,
      explanation: 'La cláusula 6.2 exige objetivos de seguridad medibles, monitorizados, comunicados y actualizados.'
    },
    {
      question: 'En el tratamiento de riesgos (6.1.3), ¿para qué se comparan los controles elegidos con el Anexo A?',
      options: ['Para copiar el Anexo A completo sin análisis.', 'Para verificar que no se ha omitido ningún control necesario.', 'Para eliminar los controles que no estén en el Anexo A.'],
      answerIndex: 1,
      explanation: 'La comparación con el Anexo A sirve como comprobación de que no se han pasado por alto controles necesarios; la organización puede además usar controles propios.'
    }
  ],
  c7_8: [
    {
      question: 'Que todo el personal conozca la política de seguridad y las consecuencias de incumplirla corresponde a:',
      options: ['7.3 Concienciación', '7.5 Información documentada', '8.1 Planificación operacional'],
      answerIndex: 0,
      explanation: 'La cláusula 7.3 exige que las personas conozcan la política, su contribución a la eficacia del SGSI y las implicaciones de no cumplir sus requisitos.'
    },
    {
      question: 'Controlar versiones, distribución y retención de los procedimientos del SGSI es un requisito de:',
      options: ['7.4 Comunicación', '7.5 Información documentada', '9.2 Auditoría interna'],
      answerIndex: 1,
      explanation: 'La cláusula 7.5 regula la creación, actualización y control (versiones, acceso, distribución, retención) de la información documentada.'
    }
  ],
  c9_10: [
    {
      question: 'Tras una auditoría interna se detecta que no se hacen las revisiones de accesos planificadas. ¿Qué exige la cláusula 10.2?',
      options: ['Ocultar el hallazgo hasta la siguiente auditoría.', 'Reaccionar, analizar la causa raíz, tomar acciones correctivas y revisar su eficacia.', 'Despedir al responsable.'],
      answerIndex: 1,
      explanation: 'La cláusula 10.2 exige tratar las no conformidades: corregirlas, analizar sus causas, implantar acciones correctivas y verificar su eficacia.'
    },
    {
      question: '¿Qué característica deben tener los auditores internos del SGSI (9.2)?',
      options: ['Deben ser siempre externos.', 'Deben asegurar la objetividad e imparcialidad del proceso de auditoría.', 'Deben pertenecer al área auditada.'],
      answerIndex: 1,
      explanation: 'La norma exige seleccionar auditores y realizar auditorías que aseguren la objetividad e imparcialidad; no hace falta que sean externos, pero no deben auditar su propio trabajo.'
    }
  ],
  a5_1_18: [
    {
      question: 'Suscribirse a boletines de vulnerabilidades del sector y analizar su relevancia para la empresa es el control nuevo:',
      options: ['A.5.7 Inteligencia de amenazas', 'A.5.6 Contacto con grupos de interés', 'A.5.9 Inventario de activos'],
      answerIndex: 0,
      explanation: 'A.5.7, nuevo en la versión 2022, exige recopilar y analizar información sobre amenazas para producir inteligencia accionable.'
    },
    {
      question: 'Revisar trimestralmente quién tiene acceso a la carpeta de nóminas es evidencia de:',
      options: ['A.5.12 Clasificación', 'A.5.18 Derechos de acceso', 'A.5.10 Uso aceptable'],
      answerIndex: 1,
      explanation: 'A.5.18 cubre la provisión, revisión, modificación y retirada de los derechos de acceso según la política.'
    }
  ],
  a5_19_37: [
    {
      question: 'Definir dónde se almacenan físicamente los datos y cómo se sale de un proveedor SaaS corresponde al control nuevo:',
      options: ['A.5.23 Seguridad para el uso de servicios cloud', 'A.5.29 Seguridad durante la disrupción', 'A.5.33 Protección de registros'],
      answerIndex: 0,
      explanation: 'A.5.23, nuevo en 2022, exige procesos para adquirir, usar, gestionar y salir de servicios cloud según los requisitos de seguridad.'
    },
    {
      question: 'Capturar una imagen forense de un disco comprometido antes de reinstalarlo es aplicar:',
      options: ['A.5.26 Respuesta a incidentes', 'A.5.28 Recolección de evidencias', 'A.5.37 Procedimientos operativos'],
      answerIndex: 1,
      explanation: 'A.5.28 exige procedimientos para identificar, recoger, adquirir y preservar evidencias relacionadas con eventos de seguridad.'
    }
  ],
  a6_all: [
    {
      question: 'Las simulaciones periódicas de phishing al personal son evidencia de:',
      options: ['A.6.3 Concienciación, educación y formación', 'A.6.1 Investigación de antecedentes', 'A.6.6 Acuerdos de confidencialidad'],
      answerIndex: 0,
      explanation: 'A.6.3 exige que el personal reciba concienciación, educación y formación adecuadas y actualizadas en seguridad de la información.'
    },
    {
      question: 'Exigir VPN y bloqueo de pantalla cuando se trabaja desde una cafetería corresponde a:',
      options: ['A.6.7 Trabajo remoto', 'A.7.9 Equipos fuera de las instalaciones', 'A.6.2 Términos de empleo'],
      answerIndex: 0,
      explanation: 'A.6.7 exige medidas de seguridad cuando el personal trabaja en remoto para proteger la información accedida, procesada o almacenada fuera de las instalaciones.'
    }
  ],
  a7_all: [
    {
      question: '¿Qué control físico es nuevo en la versión 2022 del Anexo A?',
      options: ['A.7.4 Monitorización de la seguridad física', 'A.7.1 Perímetros de seguridad física', 'A.7.12 Seguridad del cableado'],
      answerIndex: 0,
      explanation: 'A.7.4 (monitorización de la seguridad física, p. ej. CCTV o alarmas) es uno de los 11 controles nuevos de la ISO 27001:2022.'
    },
    {
      question: 'Destruir físicamente los discos duros antes de desechar servidores antiguos cumple con:',
      options: ['A.7.10 Medios de almacenamiento', 'A.7.14 Eliminación segura o reutilización de equipos', 'A.7.13 Mantenimiento de equipos'],
      answerIndex: 1,
      explanation: 'A.7.14 exige verificar que los equipos con soportes de almacenamiento no contienen información sensible ni software licenciado antes de su eliminación o reutilización.'
    }
  ],
  a8_1_17: [
    {
      question: 'Sustituir los números de tarjeta por «****-1234» en los entornos de desarrollo es el control nuevo:',
      options: ['A.8.11 Enmascaramiento de datos', 'A.8.12 Prevención de fugas de datos', 'A.8.10 Eliminación de información'],
      answerIndex: 0,
      explanation: 'A.8.11, nuevo en 2022, exige enmascarar datos según la política de control de acceso y los requisitos del negocio y legales.'
    },
    {
      question: 'Exigir MFA para todos los accesos remotos es evidencia de:',
      options: ['A.8.5 Autenticación segura', 'A.8.2 Derechos de acceso privilegiado', 'A.8.16 Actividades de monitorización'],
      answerIndex: 0,
      explanation: 'A.8.5 exige tecnologías y procedimientos de autenticación segura según las restricciones de acceso y la política de control de acceso.'
    }
  ],
  a8_18_34: [
    {
      question: 'Bloquear por DNS las categorías web de malware y apuestas corresponde al control nuevo:',
      options: ['A.8.23 Filtrado web', 'A.8.22 Segregación de redes', 'A.8.20 Seguridad de redes'],
      answerIndex: 0,
      explanation: 'A.8.23, nuevo en 2022, exige gestionar el acceso a sitios web externos para reducir la exposición a contenido malicioso.'
    },
    {
      question: 'Crear una VLAN separada solo para impresoras y dispositivos IoT aplica:',
      options: ['A.8.22 Segregación de redes', 'A.8.24 Uso de criptografía', 'A.8.32 Gestión de cambios'],
      answerIndex: 0,
      explanation: 'A.8.22 exige segregar en las redes los grupos de servicios, usuarios y sistemas de información.'
    }
  ]
};
