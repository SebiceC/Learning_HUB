export const iso27018Course = {
  id: '27018',
  title: 'ISO/IEC 27018:2019 PII en Nube Pública',
  description: 'Código de prácticas para proteger PII en nubes públicas que actúan como encargados del tratamiento',
  modules: [
    {
      id: '27018_m1',
      title: 'Contexto, Alcance y Roles',
      content: `
# ISO/IEC 27018:2019 — PII en la Nube Pública

Es un **código de prácticas** para proveedores de **nube pública que actúan como encargados del tratamiento de PII** (*PII processors*). Se basa en ISO/IEC 27002 y en los principios de privacidad de **ISO/IEC 29100**. La edición de 2019 es una revisión menor de la de 2014: corrige un error editorial del Anexo A.

> Nota de estudio: la edición 2019 está alineada con la estructura de ISO/IEC 27002:2013 (cláusulas 5 a 18). Los ejemplos son interpretaciones prácticas; consulta el texto oficial para la redacción exacta.

## El problema que resuelve
Las leyes de protección de datos varían por jurisdicción y reparten obligaciones de forma distinta entre el proveedor y el cliente. Para un proveedor que opera en muchos países, esto es un reto. La 27018 ofrece un **marco común de cumplimiento**.

## Roles (Cláusula 3)
* **PII principal (titular):** La persona física a la que se refieren los datos.
* **PII controller (responsable):** Determina los **fines y medios** del tratamiento.
* **PII processor (encargado):** Trata la PII **en nombre y según las instrucciones** del responsable.
* **Cliente cloud (CSC):** Puede ser una persona física que trata su propia PII (un titular) o una organización que trata la PII de muchas personas (un responsable).

**Punto clave:** El proveedor es encargado porque **no tiene autonomía** sobre el uso de los datos más allá de lo necesario para cumplir los objetivos del cliente. Si trata los datos de la **cuenta** del cliente (facturación, contacto) para sus propios fines, puede actuar como responsable, y esa actividad **no la cubre** esta norma.

## Objetivos de la norma
* Ayudar al proveedor a cumplir sus obligaciones como encargado.
* Dar **transparencia** para que los clientes elijan servicios bien gobernados.
* Facilitar el **acuerdo contractual** entre cliente y proveedor.
* Dar a los clientes un mecanismo para ejercer sus derechos de **auditoría y cumplimiento**, ya que auditar individualmente un entorno multi-tenant puede ser inviable.

## Definiciones útiles
* **Data breach:** Compromiso de seguridad que provoca la destrucción, pérdida, alteración, divulgación o acceso no autorizado, accidental o ilícito, a datos protegidos.
* **Tratamiento de PII:** Cualquier operación sobre PII: recogida, almacenamiento, alteración, consulta, divulgación, anonimización, pseudonimización, borrado...
      `,
      quiz: {
        question: 'Un proveedor de nube pública usa los datos de facturación de sus propios clientes para sus campañas comerciales. ¿Cubre la ISO 27018 esa actividad?',
        options: [
          'Sí, cubre todo lo que haga el proveedor.',
          'No: al tratar datos de cuenta para sus propios fines, el proveedor puede actuar como responsable, y esa actividad queda fuera del alcance.',
          'Sí, pero solo si los datos están cifrados.'
        ],
        answerIndex: 1,
        explanation: 'La introducción de la norma aclara que, al tratar datos de cuenta del cliente, el proveedor puede estar actuando como responsable (controller), y la 27018 no cubre esa actividad.'
      }
    },
    {
      id: '27018_m2',
      title: 'Requisitos de Protección y Selección de Controles',
      content: `
# Requisitos de Protección de PII y Selección de Controles

## Tres fuentes de requisitos (0.3)
1. **Legales, regulatorios y contractuales:** Obligaciones del encargado según las leyes aplicables y los compromisos contractuales. Pueden **imponer** controles concretos.
2. **Riesgos:** Se derivan de la evaluación de riesgos asociados a la PII. Referencias: **ISO/IEC 27005** para riesgos de seguridad e **ISO/IEC 29134** para evaluaciones de impacto de privacidad (PIA).
3. **Políticas corporativas:** La organización puede ir **voluntariamente** más allá de lo que exige la ley.

## Selección de controles (0.4)
* Los controles se eligen de esta norma, que incluye por referencia los de 27002, formando un **conjunto combinado**. Si hace falta, también de otros catálogos o de diseño propio.
* La selección depende de los criterios de aceptación de riesgo, las opciones de tratamiento y los contratos con clientes y proveedores.
* **Si un control no se selecciona, debe documentarse la justificación de su omisión.**
* La selección depende también del **rol real** del proveedor en la arquitectura cloud (ISO/IEC 17789). Los contratos deben especificar las responsabilidades de protección de PII de **todas** las partes: proveedor, subcontratistas y cliente.

## Privacy by Design
La implementación es más sencilla si la protección de PII se consideró **desde el diseño** del sistema, los servicios y las operaciones.

## Ciclo de vida de la PII (0.6)
La PII pasa por creación, almacenamiento, tratamiento, uso, transmisión y **destrucción o eliminación**. Los riesgos cambian en cada etapa y la protección importa en todas.

## Principios de ISO/IEC 29100 (base del Anexo A)
Consentimiento y elección · Legitimidad y especificación del propósito · Limitación de la recogida · Minimización de datos · Limitación de uso, retención y divulgación · Exactitud y calidad · Apertura, transparencia y aviso · Participación y acceso individual · Responsabilidad proactiva (*accountability*) · Seguridad de la información · Cumplimiento de la privacidad.
      `,
      quiz: {
        question: 'Un proveedor decide no implementar un control de la ISO 27018 porque no aplica a su servicio. ¿Qué debe hacer según la norma?',
        options: [
          'Nada; los controles son opcionales.',
          'Documentar la justificación de la omisión.',
          'Pedir permiso a ISO.'
        ],
        answerIndex: 1,
        explanation: 'La cláusula 0.4 indica que, cuando no se selecciona un control de la norma, debe documentarse la justificación de su omisión.'
      }
    },
    {
      id: '27018_m3',
      title: 'Políticas, Organización y Recursos Humanos (Cláusulas 5–7)',
      content: `
# Guía Sectorial: Políticas, Organización y Personas

Las cláusulas 5 a 18 siguen la estructura de ISO/IEC 27002:2013. Si un control de 27002 aplica sin cambios, la norma solo lo referencia. Cuando hace falta, añade **guía de implementación para PII en nube pública**.

## Cláusula 5: Políticas de seguridad de la información
* **5.1.1 Políticas:** Las políticas deben incluir una **declaración de compromiso** con el cumplimiento de la legislación de protección de PII aplicable y de los términos contractuales acordados con los clientes.
* Los contratos deben repartir claramente las responsabilidades entre el encargado, sus subcontratistas y el cliente, teniendo en cuenta el **tipo de servicio** (IaaS, PaaS, SaaS).
* *Ejemplo:* La política de seguridad del proveedor cita expresamente su compromiso con el RGPD y con los acuerdos de encargado del tratamiento (DPA).

## Cláusula 6: Organización de la seguridad
* **6.1.1 Roles y responsabilidades:** El proveedor debe designar un **punto de contacto** para que el cliente trate las cuestiones relativas al tratamiento de PII.
* *Ejemplo:* Una dirección de correo de privacidad y un responsable identificado en el contrato.

## Cláusula 7: Seguridad ligada a los recursos humanos
* **7.2.2 Concienciación y formación:** Informar al personal con acceso a PII de las **consecuencias** de incumplir las normas de privacidad y seguridad, tanto para él (disciplinarias) como para el proveedor (legales, reputacionales) y para los titulares (daño a las personas).
* *Ejemplo:* La formación anual incluye casos reales de sanciones por acceso indebido a datos de clientes.
      `,
      quiz: {
        question: 'Según la guía de la ISO 27018 para la cláusula 6.1.1, ¿qué debe designar el proveedor cloud?',
        options: [
          'Un auditor externo permanente.',
          'Un punto de contacto para que el cliente trate cuestiones sobre el tratamiento de PII.',
          'Un equipo de marketing de datos.'
        ],
        answerIndex: 1,
        explanation: 'La norma pide designar un punto de contacto para que el cliente pueda comunicarse con el proveedor sobre el tratamiento de su PII.'
      }
    },
    {
      id: '27018_m4',
      title: 'Control de Acceso y Criptografía (Cláusulas 9–10)',
      content: `
# Control de Acceso y Criptografía

## Cláusula 9: Control de acceso
Contexto: en la nube, el **cliente** suele gestionar las identidades de sus propios usuarios con las herramientas que le da el proveedor.

* **9.2.1 Registro y baja de usuarios:** Deben existir procedimientos para cuando se comprometen los controles de acceso de usuario, por ejemplo por **credenciales filtradas o corrompidas**.
* **9.2.x Gestión de accesos:** Altas, privilegios, secretos de autenticación, revisiones y retirada de derechos, adaptados al servicio.
* **9.4.2 Procedimientos seguros de inicio de sesión:** El proveedor debe ofrecer al cliente la capacidad de establecer inicios de sesión seguros para sus usuarios. *Ejemplo:* Soporte de MFA y de federación SAML/OIDC en el servicio.
* **9.4.x Restricción de acceso:** Utilidades privilegiadas, contraseñas y código fuente.

## Cláusula 10: Criptografía
* **10.1.1 Política de uso de controles criptográficos:** El proveedor debe **informar al cliente** de las circunstancias en que usa criptografía para proteger la PII que trata. También debe informarle de las capacidades de cifrado que ofrece para que el cliente aplique su propia protección.
* **10.1.2 Gestión de claves:** Aplica según 27002.
* *Ejemplo:* La documentación del servicio indica: «Los datos en reposo se cifran con AES-256; el cliente puede usar sus propias claves mediante el servicio de gestión de claves».

## Idea clave
La transparencia es un tema transversal: el cliente, que es el responsable, necesita **información** del encargado para evaluar sus propios riesgos y cumplir la ley.
      `,
      quiz: {
        question: 'Según la guía de la ISO 27018 para la cláusula 10.1.1, ¿qué debe hacer el proveedor respecto a la criptografía?',
        options: [
          'Mantener en secreto dónde usa cifrado, por seguridad.',
          'Informar al cliente de las circunstancias en que usa criptografía para proteger la PII.',
          'Cifrar solo si el cliente paga un suplemento.'
        ],
        answerIndex: 1,
        explanation: 'La norma pide al proveedor informar al cliente sobre cuándo y cómo usa criptografía para proteger la PII, para que este pueda evaluar la protección y complementarla.'
      }
    },
    {
      id: '27018_m5',
      title: 'Seguridad Física y Operaciones (Cláusulas 11–12)',
      content: `
# Seguridad Física y Seguridad de las Operaciones

## Cláusula 11: Seguridad física y del entorno
* **11.2.7 Eliminación o reutilización segura de equipos:** En la nube, el espacio de almacenamiento se **reasigna** entre clientes. Antes de reutilizarlo, la PII previa debe haberse eliminado de forma segura.
* **11.2.x:** Emplazamiento, suministros, cableado, mantenimiento, retirada de activos, equipos fuera de las instalaciones, equipos desatendidos y puesto despejado.

## Cláusula 12: Seguridad de las operaciones
* **12.1.x Procedimientos, gestión de cambios, capacidad y separación de entornos.**
* **12.3.1 Copias de seguridad:** El proveedor debe tener una política de respaldo que cubra la PII: frecuencia, verificación, restauración y **eliminación de respaldos** según los plazos acordados. *Ejemplo:* Los respaldos se guardan en una ubicación física distinta y se destruyen de forma segura al finalizar su retención.
* **12.4.1 Registro de eventos:** Establecer un proceso de **revisión de logs** con periodicidad definida. En la medida de lo posible, los registros deben indicar si la PII fue **modificada** (añadida, cambiada, borrada) y **por quién**.
* **12.4.2 Protección de la información de registro:** Los logs pueden contener PII, así que deben protegerse, por ejemplo con controles de acceso, y **eliminarse** tras un plazo definido y documentado.
* **12.4.3 Registros de administrador y operador:** Registrar la actividad de los administradores del proveedor.

## Por qué importan los logs en privacidad
1. Permiten **detectar** accesos indebidos a PII.
2. Sirven de **evidencia** ante un incidente o una auditoría.
3. Pero también **son PII**: guardarlos indefinidamente contradice el principio de minimización.
      `,
      quiz: {
        question: 'Según la guía de la ISO 27018 para la cláusula 12.4.2, ¿qué debe ocurrir con los logs que contienen PII?',
        options: [
          'Conservarse para siempre por si se necesitan.',
          'Protegerse y eliminarse tras un periodo definido y documentado.',
          'Publicarse para dar transparencia.'
        ],
        answerIndex: 1,
        explanation: 'Los registros pueden contener PII, por lo que deben protegerse y no conservarse indefinidamente: se borran tras un plazo definido.'
      }
    },
    {
      id: '27018_m6',
      title: 'Comunicaciones, Incidentes y Cumplimiento (Cláusulas 13–18)',
      content: `
# Comunicaciones, Incidentes y Cumplimiento

## Cláusula 13: Seguridad de las comunicaciones
* **13.2.1 Políticas de transferencia:** Cuando se usan **medios físicos** para transferir datos (discos enviados para migraciones masivas), se debe llevar un **registro** de los soportes entrantes y salientes con PII: tipo, remitente o destinatario, fecha y número de soportes.
* **13.2.x:** Acuerdos de transferencia, mensajería electrónica y acuerdos de confidencialidad.

## Cláusulas 14 y 15
El desarrollo seguro (14) y las relaciones con proveedores (15) aplican según 27002. Los subcontratistas se tratan con más detalle en el Anexo A.

## Cláusula 16: Gestión de incidentes
* **16.1.1 Responsabilidades y procedimientos:** Todo incidente de seguridad debe desencadenar una **revisión** para determinar si se ha producido una **brecha de datos que afecte a PII**.
* *Ejemplo:* El playbook de incidentes incluye el paso «¿Hubo acceso, pérdida o divulgación de PII de clientes?» y, si es así, activa la notificación al cliente (ver Anexo A).
* **16.1.2 a 16.1.7:** Reporte de eventos y debilidades, evaluación, respuesta, aprendizaje y recolección de evidencias.

## Cláusula 17: Continuidad
Aplica según 27002.

## Cláusula 18: Cumplimiento
* **18.2.1 Revisión independiente:** Como las auditorías individuales de cada cliente pueden ser inviables o arriesgadas en entornos multi-tenant, el proveedor debe poner a disposición de los clientes **evidencia independiente**, como certificaciones o informes de auditoría de terceros, antes de firmar el contrato y durante su vigencia.
* **18.2.2 / 18.2.3:** Cumplimiento de políticas y revisión técnica.
      `,
      quiz: {
        question: 'Tras detectar un incidente de ransomware, ¿qué paso adicional exige la guía de la ISO 27018 (16.1.1)?',
        options: [
          'Revisar si se ha producido una brecha de datos que afecte a PII.',
          'Pagar el rescate de inmediato.',
          'Reinstalar los servidores sin registrar nada.'
        ],
        answerIndex: 0,
        explanation: 'La norma exige que todo incidente de seguridad desencadene una revisión para determinar si hubo una brecha de datos con PII, porque eso activa obligaciones de notificación.'
      }
    },
    {
      id: '27018_m7',
      title: 'Anexo A (I): Consentimiento, Propósito y Transparencia',
      content: `
# Anexo A (Normativo) — Controles Extendidos (Parte 1)

El Anexo A añade controles **que no existen en 27002**, organizados según los principios de privacidad de ISO/IEC 29100. Es la parte más característica de la norma.

## Consentimiento y elección
* **Obligación de cooperar con los derechos de los titulares:** El proveedor debe ofrecer al cliente los medios para atender las solicitudes de los titulares: acceso, rectificación y supresión. *Ejemplo:* Una API para localizar y borrar todos los datos de un usuario final.

## Legitimidad y especificación del propósito
* **Propósito del encargado:** La PII se trata **solo según las instrucciones del cliente**.
* **Uso comercial por el encargado:** La PII **no** se usa para **marketing ni publicidad** sin el **consentimiento expreso** del titular. Ese consentimiento **no puede ser condición** para recibir el servicio.

## Limitación de la recogida
No añade controles. La recogida la decide el cliente como responsable.

## Minimización de datos
* **Borrado seguro de archivos temporales:** Los archivos y documentos temporales se borran o destruyen en un plazo definido y documentado.

## Limitación de uso, retención y divulgación
* **Notificación de divulgación de PII:** Si una autoridad solicita legalmente la PII, se notifica al cliente, **salvo que la ley lo prohíba** (por ejemplo, por secreto de una investigación penal).
* **Registro de divulgaciones:** Registrar qué PII se divulgó, a quién y cuándo.

## Exactitud y calidad
No añade controles.

## Apertura, transparencia y aviso
* **Divulgación del tratamiento subcontratado:** El uso de subcontratistas para tratar PII se comunica al cliente **antes** de usarlos. *Ejemplo:* Una página pública con la lista de subencargados y un aviso previo cuando cambia.
      `,
      quiz: {
        question: 'Según el Anexo A de la ISO 27018, ¿puede un proveedor cloud usar la PII de los usuarios de su cliente para publicidad dirigida?',
        options: [
          'Sí, si lo menciona en sus términos generales.',
          'Solo con el consentimiento expreso del titular, y ese consentimiento no puede ser condición para recibir el servicio.',
          'Sí, siempre que los datos estén pseudonimizados.'
        ],
        answerIndex: 1,
        explanation: 'El control de uso comercial prohíbe usar la PII para marketing o publicidad sin consentimiento expreso, que además no puede exigirse como condición del servicio.'
      }
    },
    {
      id: '27018_m8',
      title: 'Anexo A (II): Responsabilidad, Seguridad y Cumplimiento',
      content: `
# Anexo A (Normativo) — Controles Extendidos (Parte 2)

## Responsabilidad proactiva (Accountability)
* **Notificación de brechas de datos con PII:** El proveedor notifica **sin demora** al cliente las brechas que afecten a su PII, según lo acordado en el contrato. Así el cliente, como responsable, puede cumplir sus propias obligaciones de notificación ante autoridades y titulares.
* **Retención de políticas de seguridad:** Las copias de políticas y procedimientos de seguridad se conservan un periodo definido tras ser sustituidas, para investigaciones o auditorías posteriores.
* **Devolución, transferencia y eliminación de PII:** Política documentada sobre qué ocurre con la PII al terminar el contrato, comunicada al cliente.

## Seguridad de la información (controles adicionales)
* **Acuerdos de confidencialidad** para el personal con acceso a PII.
* **Restricción de copias impresas** (*hardcopy*) de material con PII.
* **Control y registro de la restauración de datos**, es decir, de quién restaura qué y cuándo.
* Protección de la PII en **soportes que salen de las instalaciones**.
* **Soportes portátiles sin cifrar:** No se usan salvo que sea inevitable, y en ese caso se documenta.
* **Cifrado de la PII transmitida por redes públicas.**
* **Destrucción segura del material impreso.**
* **Identificadores de usuario únicos** y **registro de usuarios autorizados**.
* **Gestión de IDs de usuario:** Los IDs desactivados o expirados **no se reasignan** a otras personas.
* **Medidas contractuales:** Los contratos con clientes especifican las medidas mínimas de seguridad.
* **Tratamiento subcontratado:** Los subcontratistas quedan obligados a las mismas medidas.
* **Acceso a espacio de almacenamiento previamente usado:** Se borra antes de asignarlo a otro cliente.

## Cumplimiento de la privacidad
* **Ubicación geográfica de la PII:** El proveedor especifica y documenta los **países** donde puede almacenarse la PII, incluidos los de sus subcontratistas.
* **Destino previsto de la PII:** La PII transmitida por redes de comunicación debe llegar a su destino previsto mediante controles adecuados.
      `,
      quiz: {
        question: 'Un cliente europeo necesita saber en qué países podrían almacenarse sus datos para cumplir las reglas de transferencias internacionales. ¿Qué control del Anexo A de la ISO 27018 le da esa información?',
        options: [
          'Ubicación geográfica de la PII',
          'Restricción de copias impresas',
          'Gestión de IDs de usuario'
        ],
        answerIndex: 0,
        explanation: 'El control de ubicación geográfica exige al proveedor especificar y documentar los países donde puede almacenarse la PII, incluidos los de sus subcontratistas.'
      }
    }
  ]
};
