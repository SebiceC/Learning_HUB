import type { Question } from '../../types';

export const iso27018Questions: Record<string, Question[]> = {
  '27018_m1': [
    {
      question: 'Un proveedor de nube pública almacena la base de datos de clientes de una tienda online siguiendo sus instrucciones. ¿Qué rol tiene el proveedor?',
      options: ['Responsable del tratamiento (PII controller)', 'Encargado del tratamiento (PII processor)', 'Titular de los datos (PII principal)'],
      answerIndex: 1,
      explanation: 'El proveedor trata la PII en nombre y según las instrucciones del cliente, que es el responsable.'
    },
    {
      question: '¿En qué norma de privacidad se basan los principios que la ISO 27018 aplica al entorno cloud?',
      options: ['ISO/IEC 29100', 'ISO 9001', 'ISO/IEC 27035'],
      answerIndex: 0,
      explanation: 'El alcance indica que la norma implementa medidas de protección de PII en línea con los principios de privacidad de ISO/IEC 29100.'
    }
  ],
  '27018_m2': [
    {
      question: '¿Cuáles son las tres fuentes de requisitos de protección de PII según la cláusula 0.3?',
      options: ['Legales/contractuales, riesgos y políticas corporativas.', 'Precio, rendimiento y marca.', 'Hardware, software y red.'],
      answerIndex: 0,
      explanation: 'Los requisitos provienen de obligaciones legales, regulatorias y contractuales; de la evaluación de riesgos; y de las políticas voluntarias de la organización.'
    },
    {
      question: '¿Qué norma se cita para realizar evaluaciones de impacto de privacidad (PIA)?',
      options: ['ISO/IEC 29134', 'ISO/IEC 27017', 'ISO 31000'],
      answerIndex: 0,
      explanation: 'La introducción cita ISO/IEC 27005 para riesgos de seguridad e ISO/IEC 29134 para evaluaciones de impacto de privacidad.'
    }
  ],
  '27018_m3': [
    {
      question: 'Según la guía de 5.1.1, ¿qué debe incluir la política de seguridad del proveedor?',
      options: ['Una declaración de compromiso con la legislación de protección de PII y los términos contractuales.', 'Los precios del servicio.', 'Un listado de todos los clientes.'],
      answerIndex: 0,
      explanation: 'La política debe reflejar el compromiso de cumplir la legislación de protección de PII aplicable y lo acordado con los clientes.'
    },
    {
      question: 'Según la guía de 7.2.2, ¿qué debe conocer el personal con acceso a PII?',
      options: ['Solo su horario.', 'Las consecuencias de incumplir las normas de privacidad para él, para el proveedor y para los titulares.', 'Los datos personales de todos los clientes.'],
      answerIndex: 1,
      explanation: 'La concienciación debe incluir las posibles consecuencias disciplinarias, legales y el daño a las personas.'
    }
  ],
  '27018_m4': [
    {
      question: '¿Qué debe prever la guía de 9.2.1 sobre registro de usuarios?',
      options: ['Procedimientos para cuando las credenciales de usuario se ven comprometidas.', 'Que todos los usuarios compartan cuenta.', 'Que no existan bajas de usuario.'],
      answerIndex: 0,
      explanation: 'El proveedor debe tener procedimientos para situaciones en que los controles de acceso de usuario se comprometen, como contraseñas filtradas.'
    },
    {
      question: 'Ofrecer MFA y federación SAML/OIDC a los usuarios del cliente apoya la guía de:',
      options: ['9.4.2 Procedimientos seguros de inicio de sesión', '11.2.4 Mantenimiento de equipos', '13.2.3 Mensajería electrónica'],
      answerIndex: 0,
      explanation: 'El proveedor debe dar al cliente la capacidad de establecer inicios de sesión seguros para sus usuarios.'
    }
  ],
  '27018_m5': [
    {
      question: 'Según la guía de 12.4.1, ¿qué deberían permitir determinar los registros de eventos?',
      options: ['Si la PII fue añadida, modificada o borrada, y por quién.', 'La temperatura de los servidores.', 'El salario de los administradores.'],
      answerIndex: 0,
      explanation: 'Los registros deben, en lo posible, indicar cambios en la PII y quién los realizó, para detectar y investigar usos indebidos.'
    },
    {
      question: 'En la nube, el espacio de almacenamiento se reasigna entre clientes. ¿Qué exige la guía de 11.2.7?',
      options: ['Que la PII anterior se elimine de forma segura antes de reutilizar el espacio.', 'Que se venda el disco usado.', 'Nada, el cliente siguiente es responsable.'],
      answerIndex: 0,
      explanation: 'La eliminación o reutilización segura evita que datos residuales de un cliente sean accesibles para otro.'
    }
  ],
  '27018_m6': [
    {
      question: 'Se envían discos físicos con datos de clientes para una migración masiva. Según la guía de 13.2.1, ¿qué debe hacerse?',
      options: ['Llevar un registro de los soportes con PII que entran y salen.', 'Enviarlos por correo ordinario sin registro.', 'Borrar los datos antes de enviarlos.'],
      answerIndex: 0,
      explanation: 'Cuando se usan medios físicos, debe registrarse el tipo de soporte, remitente/destinatario, fecha y número de soportes.'
    },
    {
      question: '¿Por qué la ISO 27018 insiste en que el proveedor aporte evidencia independiente (18.2.1)?',
      options: ['Porque las auditorías individuales de cada cliente pueden ser inviables o arriesgadas en entornos multi-tenant.', 'Porque es más barato para el cliente.', 'Porque la ley prohíbe las auditorías.'],
      answerIndex: 0,
      explanation: 'La evidencia independiente, como certificaciones o informes de terceros, permite a los clientes verificar el cumplimiento sin auditar cada uno la infraestructura compartida.'
    }
  ],
  '27018_m7': [
    {
      question: 'La policía solicita legalmente datos de un usuario final de un cliente. Según el Anexo A, ¿qué debe hacer el proveedor?',
      options: ['Entregar los datos sin informar a nadie, en todos los casos.', 'Notificar al cliente, salvo que la ley lo prohíba, y registrar la divulgación.', 'Borrar los datos.'],
      answerIndex: 1,
      explanation: 'Los controles de notificación y registro de divulgaciones exigen informar al cliente (salvo prohibición legal) y dejar constancia de qué se divulgó, a quién y cuándo.'
    },
    {
      question: '¿Cuándo debe el proveedor informar al cliente del uso de subcontratistas que tratarán PII?',
      options: ['Antes de usarlos.', 'Solo si hay un incidente.', 'Nunca, es información confidencial.'],
      answerIndex: 0,
      explanation: 'El control de divulgación del tratamiento subcontratado exige comunicar su uso al cliente antes de que traten la PII.'
    }
  ],
  '27018_m8': [
    {
      question: 'Una cuenta de usuario de un empleado que se fue de la empresa queda desactivada. Según el Anexo A, ¿puede asignarse ese mismo ID a un nuevo empleado?',
      options: ['Sí, para ahorrar licencias.', 'No: los IDs desactivados o expirados no se reasignan a otras personas.', 'Sí, si se cambia la contraseña.'],
      answerIndex: 1,
      explanation: 'Reasignar IDs rompería la trazabilidad de los registros; la gestión de IDs de usuario lo prohíbe.'
    },
    {
      question: '¿Para qué sirve notificar sin demora al cliente una brecha de PII?',
      options: ['Para que el cliente, como responsable, pueda cumplir sus propias obligaciones de notificación.', 'Para reducir el precio del servicio.', 'No es necesario notificar.'],
      answerIndex: 0,
      explanation: 'El responsable del tratamiento necesita la información del encargado para notificar a autoridades y titulares dentro de los plazos legales.'
    }
  ]
};
