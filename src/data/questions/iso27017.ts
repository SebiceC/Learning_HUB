import type { Question } from '../../types';

export const iso27017Questions: Record<string, Question[]> = {
  '27017_m1': [
    {
      question: '¿Con qué edición de la ISO/IEC 27002 está alineada la ISO 27017:2026?',
      options: ['ISO/IEC 27002:2013', 'ISO/IEC 27002:2022', 'Ninguna, es independiente'],
      answerIndex: 1,
      explanation: 'La edición 2026 da guía adicional para los controles de 27002:2022 y sigue su estructura de temas y atributos.'
    },
    {
      question: '¿Qué indica el prefijo «CLD» en un control de la ISO 27017?',
      options: ['Que es un control obligatorio para certificar.', 'Que es un control adicional específico de servicios cloud, que no existe en 27002.', 'Que solo aplica a nubes privadas.'],
      answerIndex: 1,
      explanation: 'Los controles CLD (CLouD service extended controls) se añaden a los de 27002 para cubrir riesgos propios de la nube.'
    }
  ],
  '27017_m2': [
    {
      question: 'En un servicio SaaS, ¿qué sigue siendo responsabilidad del cliente (CSC)?',
      options: ['Parchear el sistema operativo de los servidores.', 'Gestionar identidades, accesos, configuración del servicio y sus datos.', 'La seguridad física del centro de datos.'],
      answerIndex: 1,
      explanation: 'En SaaS el proveedor gestiona la aplicación y la infraestructura, pero el cliente sigue siendo responsable de quién accede, cómo configura el servicio y sus datos.'
    },
    {
      question: 'Si los controles de seguridad de un CSP son fijos y no cubren un requisito del CSC, ¿qué recomienda la norma (4.3.2)?',
      options: ['Asumir el riesgo sin más.', 'Que el CSC implemente controles adicionales propios para mitigar el riesgo.', 'Exigir al CSP que cambie su plataforma para todos sus clientes.'],
      answerIndex: 1,
      explanation: 'Cuando los controles del CSP están preestablecidos, el CSC puede tener que implementar controles propios adicionales.'
    }
  ],
  '27017_m3': [
    {
      question: 'Según la guía de 5.9, además de los datos del cliente, ¿qué otra categoría de información debe identificar el CSP en su inventario?',
      options: ['Los datos derivados del servicio cloud (logs, metadatos).', 'Las nóminas del cliente.', 'El código fuente de sus competidores.'],
      answerIndex: 0,
      explanation: 'El CSP debe distinguir los datos del CSC y los datos derivados del uso del servicio, como registros y metadatos.'
    },
    {
      question: 'Federar la consola cloud con el directorio corporativo para que las bajas de RRHH se propaguen automáticamente apoya el control:',
      options: ['5.16 Gestión de identidades', '5.32 Propiedad intelectual', '5.12 Clasificación'],
      answerIndex: 0,
      explanation: 'La gestión del ciclo de vida de las identidades (altas y bajas) corresponde a 5.16; el CSP proporciona las funciones y el CSC las usa.'
    }
  ],
  '27017_m4': [
    {
      question: '¿Qué debería incluir un acuerdo con un proveedor cloud según 5.20?',
      options: ['Solo el precio.', 'Reparto de responsabilidades, ubicación de datos, notificación de incidentes y condiciones de terminación.', 'La lista de empleados del proveedor.'],
      answerIndex: 1,
      explanation: 'El acuerdo debe dejar claros los requisitos y responsabilidades de seguridad, incluyendo qué ocurre con los datos al terminar el servicio.'
    },
    {
      question: 'Un CSP añade un nuevo subcontratista que tratará datos de clientes. Según 5.22, ¿qué debe hacer?',
      options: ['Nada, es una decisión interna.', 'Informar al CSC de los cambios que puedan afectar a su seguridad.', 'Esperar a que el CSC lo descubra en una auditoría.'],
      answerIndex: 1,
      explanation: 'El seguimiento y gestión de cambios en los servicios del proveedor requiere que el CSP comunique cambios relevantes para la seguridad del CSC.'
    }
  ],
  '27017_m5': [
    {
      question: 'El negocio exige RPO de 1 hora, pero el SaaS solo replica cada 24 horas. Según 5.30, ¿qué debe hacer el CSC?',
      options: ['Nada, el proveedor es responsable.', 'Identificar la brecha y tratarla, por ejemplo con copias propias o réplica adicional.', 'Cambiar el RPO del negocio a 24 horas sin análisis.'],
      answerIndex: 1,
      explanation: 'El CSC debe verificar que el RTO y RPO del proveedor cubren sus necesidades y tratar cualquier brecha.'
    },
    {
      question: 'Para la protección de PII en la nube, el control 5.34 remite principalmente a:',
      options: ['ISO/IEC 27018 e ISO/IEC 27701', 'ISO 9001', 'ISO 22301'],
      answerIndex: 0,
      explanation: 'La privacidad se trata en normas específicas: 27018 para encargados en nube pública y 27701 para el sistema de gestión de privacidad.'
    }
  ],
  '27017_m6': [
    {
      question: '¿Qué control CLD de la edición 2026 ya existía en 2015 como CLD.6.3.1?',
      options: ['5.38 Roles y responsabilidades compartidos', '5.39 Roles del socio del servicio cloud', '8.36 Uso no autorizado'],
      answerIndex: 0,
      explanation: 'El control de responsabilidades compartidas CSC/CSP (CLD.6.3.1 en 2015) es el 5.38 en la edición 2026.'
    },
    {
      question: '¿Cuál es el error clásico que el control 5.38 ayuda a evitar?',
      options: ['Pensar que «en la nube, la seguridad es solo del proveedor».', 'Usar demasiados proveedores.', 'Cifrar los datos en tránsito.'],
      answerIndex: 0,
      explanation: 'Documentar y comunicar el reparto de responsabilidades evita que el cliente descuide su parte, como la configuración o los accesos.'
    }
  ],
  '27017_m7': [
    {
      question: 'Según 7.14, antes de reasignar un disco o memoria a otro cliente, el CSP debe:',
      options: ['Reiniciarlo.', 'Garantizar que los datos del cliente anterior se han borrado de forma segura.', 'Cambiarle la etiqueta.'],
      answerIndex: 1,
      explanation: 'En entornos compartidos, la eliminación segura antes de la reutilización evita que un cliente acceda a datos residuales de otro.'
    },
    {
      question: 'Al salir un administrador cloud de la empresa, ¿qué es imprescindible revocar además de su usuario (6.5)?',
      options: ['Sus claves de API, tokens y credenciales programáticas.', 'Su acceso a la cafetería.', 'Nada más.'],
      answerIndex: 0,
      explanation: 'Las credenciales programáticas permiten acceso sin iniciar sesión, por lo que deben revocarse para cumplir las responsabilidades tras la baja.'
    }
  ],
  '27017_m8': [
    {
      question: '¿Por qué es importante que el CSP informe de su fuente de tiempo (8.17)?',
      options: ['Para facturar correctamente.', 'Para que el CSC pueda correlacionar sus registros con los del proveedor.', 'Para cumplir con el horario laboral.'],
      answerIndex: 1,
      explanation: 'La sincronización de relojes es clave para correlacionar eventos entre sistemas del CSC y del CSP durante una investigación.'
    },
    {
      question: 'Detectar desviaciones (drift) de la infraestructura como código respecto a una línea base segura aplica el control:',
      options: ['8.9 Gestión de la configuración', '8.6 Gestión de capacidad', '8.7 Protección contra malware'],
      answerIndex: 0,
      explanation: 'La gestión de la configuración, nueva en 27002:2022, es especialmente relevante en cloud, donde los errores de configuración son una causa frecuente de incidentes.'
    }
  ],
  '27017_m9': [
    {
      question: '¿Qué exige el control 8.32 al CSP respecto a los cambios en el servicio?',
      options: ['No hacer nunca cambios.', 'Informar al CSC de los cambios que puedan afectarle negativamente.', 'Pedir permiso individual a cada cliente.'],
      answerIndex: 1,
      explanation: 'El CSC necesita conocer los cambios relevantes (qué, cuándo, impacto) para gestionar sus propios riesgos.'
    },
    {
      question: 'Antes de lanzar un pentest contra tus sistemas en un IaaS público, ¿qué debes considerar según 8.34?',
      options: ['Nada, el sistema es tuyo.', 'Las reglas del proveedor para no afectar a otros clientes ni a la plataforma.', 'Desactivar los registros para no dejar rastro.'],
      answerIndex: 1,
      explanation: 'Las pruebas técnicas deben planificarse para no afectar a la infraestructura compartida, siguiendo las políticas del CSP.'
    }
  ],
  '27017_m10': [
    {
      question: '¿Qué riesgo propio de la multi-tenancy aborda el control 8.35?',
      options: ['Que un cliente acceda a datos o recursos de otro cliente en la misma infraestructura.', 'Que el cliente olvide pagar.', 'Que el proveedor cambie de nombre.'],
      answerIndex: 0,
      explanation: 'La segregación en entornos virtuales protege el entorno de cada cliente frente a otros clientes y a personas no autorizadas.'
    },
    {
      question: 'Un departamento contrata un servicio cloud con la tarjeta de empresa sin pasar por TI. ¿Qué control nuevo de 2026 ayuda a detectarlo?',
      options: ['8.36 Detección y prevención del uso no autorizado de servicios cloud', '5.39 Roles del socio cloud', '8.35 Segregación virtual'],
      answerIndex: 0,
      explanation: 'El shadow IT es un uso no autorizado de servicios cloud, precisamente lo que 8.36 busca detectar y prevenir.'
    }
  ]
};
