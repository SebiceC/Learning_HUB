import type { Question } from '../../types';

export const iso27701Questions: Record<string, Question[]> = {
  '27701_m1': [
    {
      question: '¿Cuál es la única referencia normativa de la ISO 27701:2025?',
      options: ['ISO/IEC 29100', 'ISO/IEC 27001', 'ISO/IEC 27002'],
      answerIndex: 0,
      explanation: 'La edición 2025 solo tiene como referencia normativa el marco de privacidad ISO/IEC 29100.'
    },
    {
      question: '¿Con qué regulación incluye la 27701 una correspondencia específica?',
      options: ['El RGPD de la Unión Europea.', 'La ley Sarbanes-Oxley.', 'PCI-DSS.'],
      answerIndex: 0,
      explanation: 'La norma incluye correspondencias con ISO/IEC 29100, 27018, 29151 y el RGPD.'
    }
  ],
  '27701_m2': [
    {
      question: 'Una empresa de nóminas trata datos de empleados de sus clientes y de sus propios empleados. ¿Qué roles tiene?',
      options: ['Solo encargado.', 'Encargado para los datos de sus clientes y responsable para los de sus empleados.', 'Solo responsable.'],
      answerIndex: 1,
      explanation: 'Una organización puede tener varios roles según el tratamiento; la cláusula 4.1 exige determinarlos.'
    },
    {
      question: '¿Qué partes interesadas específicas de privacidad deben considerarse en 4.2?',
      options: ['Titulares de los datos y autoridades de protección de datos, entre otras.', 'Solo los accionistas.', 'Solo los proveedores de hardware.'],
      answerIndex: 0,
      explanation: 'Los titulares y los reguladores son partes interesadas clave cuyos requisitos forman parte del PIMS.'
    }
  ],
  '27701_m3': [
    {
      question: '¿Quién debe establecer la política de privacidad del PIMS (5.2)?',
      options: ['La alta dirección.', 'El proveedor de hosting.', 'Cada empleado individualmente.'],
      answerIndex: 0,
      explanation: 'La política es responsabilidad de la alta dirección, como parte de su liderazgo y compromiso.'
    },
    {
      question: 'Designar un Delegado de Protección de Datos con acceso directo a la dirección es evidencia de:',
      options: ['5.3 Roles, responsabilidades y autoridades', '7.5 Información documentada', '9.2 Auditoría interna'],
      answerIndex: 0,
      explanation: 'La cláusula 5.3 exige asignar responsabilidades y autoridades, incluida la de informar sobre el desempeño del PIMS.'
    }
  ],
  '27701_m4': [
    {
      question: '¿Qué herramienta es típica para evaluar los riesgos de privacidad de un nuevo tratamiento?',
      options: ['Una evaluación de impacto de privacidad (PIA / EIPD).', 'Un escaneo de puertos.', 'Un análisis de costes.'],
      answerIndex: 0,
      explanation: 'La PIA (ver ISO/IEC 29134) evalúa los impactos del tratamiento sobre los titulares.'
    },
    {
      question: '«Responder el 100 % de las solicitudes de acceso en menos de 30 días» es un ejemplo de:',
      options: ['Objetivo de privacidad (6.2)', 'Criterio de riesgo (6.1.2)', 'Acción correctiva (10.2)'],
      answerIndex: 0,
      explanation: 'Los objetivos de privacidad deben ser coherentes con la política y medibles cuando sea posible.'
    }
  ],
  '27701_m5': [
    {
      question: '¿Qué cláusula exige auditorías internas del PIMS?',
      options: ['9.2', '7.3', '4.3'],
      answerIndex: 0,
      explanation: 'La cláusula 9.2 exige un programa de auditorías internas para verificar conformidad y eficacia.'
    },
    {
      question: 'Formar al equipo de atención al cliente para reconocer una solicitud de ejercicio de derechos es evidencia de:',
      options: ['7.2 Competencia', '8.3 Tratamiento de riesgos', '10.1 Mejora continua'],
      answerIndex: 0,
      explanation: 'La cláusula 7.2 exige personal competente en privacidad, con evidencia documentada.'
    }
  ],
  '27701_m6': [
    {
      question: 'Antes de tratar datos, un responsable debe identificar y documentar:',
      options: ['El propósito y la base jurídica del tratamiento.', 'El color corporativo.', 'Solo el volumen de datos.'],
      answerIndex: 0,
      explanation: 'Las condiciones para la recogida y el tratamiento incluyen identificar el propósito y la base jurídica.'
    },
    {
      question: 'Un usuario rectifica su dirección. El responsable había comunicado sus datos a una empresa de mensajería. ¿Qué debe hacer?',
      options: ['Informar a ese tercero de la rectificación.', 'Nada más.', 'Borrar todos los datos del usuario.'],
      answerIndex: 0,
      explanation: 'Entre las obligaciones con los titulares está informar a terceros a quienes se comunicó la PII de rectificaciones o supresiones.'
    }
  ],
  '27701_m7': [
    {
      question: '¿Qué significa «privacidad por defecto»?',
      options: ['Que la configuración por defecto es la más protectora de la privacidad.', 'Que todos los perfiles son públicos por defecto.', 'Que no se piden permisos.'],
      answerIndex: 0,
      explanation: 'Por defecto debe aplicarse la opción más protectora; el titular decide si la relaja.'
    },
    {
      question: 'Anonimizar las cuentas inactivas tras 3 años aplica el control de:',
      options: ['Desidentificación y supresión al final del tratamiento / retención.', 'Registros de transferencias.', 'Contratos con encargados.'],
      answerIndex: 0,
      explanation: 'Cuando la PII ya no es necesaria, debe eliminarse o transformarse para que no identifique, sin conservarla más de lo necesario.'
    }
  ],
  '27701_m8': [
    {
      question: '¿Puede un encargado usar la PII que trata para sus propias campañas de publicidad?',
      options: ['No, salvo consentimiento previo del titular que no puede ser condición del servicio.', 'Sí, siempre.', 'Sí, si la anonimiza parcialmente.'],
      answerIndex: 0,
      explanation: 'El control de uso para marketing y publicidad lo prohíbe sin consentimiento previo del titular.'
    },
    {
      question: 'Un encargado quiere cambiar de subencargado. ¿Qué debe hacer?',
      options: ['Notificar el cambio al cliente para que pueda oponerse.', 'Hacerlo sin avisar.', 'Pedir permiso a la autoridad de control.'],
      answerIndex: 0,
      explanation: 'Los controles sobre subencargados exigen informar al cliente de los cambios para que pueda objetar.'
    }
  ],
  '27701_m9': [
    {
      question: '¿Certificar ISO 27701 equivale automáticamente a cumplir el RGPD?',
      options: ['No: el Anexo D mapea la norma con el RGPD, pero el cumplimiento legal debe evaluarse aparte.', 'Sí, siempre.', 'Solo para encargados.'],
      answerIndex: 0,
      explanation: 'La correspondencia con el RGPD es una ayuda muy útil, pero la certificación no sustituye la evaluación de cumplimiento legal.'
    },
    {
      question: '¿Qué anexo de la 27701:2025 contiene la guía de implementación de los controles?',
      options: ['Anexo B (normativo)', 'Anexo C (informativo)', 'Anexo F (informativo)'],
      answerIndex: 0,
      explanation: 'El Anexo B da la guía de implementación para responsables y encargados; los anexos C a F son correspondencias.'
    }
  ]
};
