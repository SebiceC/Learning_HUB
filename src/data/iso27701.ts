export const iso27701Course = {
  id: '27701',
  title: 'ISO/IEC 27701:2025 PIMS',
  description: 'Sistema de Gestión de Información de Privacidad: requisitos y guía',
  modules: [
    {
      id: '27701_m1',
      title: 'Introducción: una Norma Independiente',
      content: `
# ISO/IEC 27701:2025 — Sistema de Gestión de Privacidad (PIMS)

La 27701 especifica requisitos para **establecer, implementar, mantener y mejorar continuamente** un **Sistema de Gestión de Información de Privacidad (PIMS)**, y da guía para implementarlos.

> Nota de estudio: los ejemplos son interpretaciones prácticas; consulta el texto oficial para la redacción exacta.

## El gran cambio de 2025
La edición de 2019 era una **extensión** de ISO 27001/27002: solo podía implantarse sobre un SGSI existente. La segunda edición (2025) se ha **redactado como una norma de sistema de gestión independiente** (*stand-alone*).
* Ya **no es obligatorio** tener un SGSI ISO 27001 para implantar un PIMS.
* Sigue la **estructura armonizada** de ISO, así que se **integra fácilmente** con 27001 y otros sistemas de gestión.
* Su única referencia normativa es **ISO/IEC 29100**, el marco de privacidad.

## ¿Para quién es?
* **Responsables del tratamiento (PII controllers)**, incluidos los **corresponsables**.
* **Encargados del tratamiento (PII processors)**, incluidos los que usan **subencargados** y los que actúan como subencargados.
* Cualquier tipo y tamaño de organización: pública, privada o sin ánimo de lucro.

## Roles básicos
* **Titular (PII principal):** La persona física a la que se refieren los datos.
* **Responsable (PII controller):** Decide el **por qué** y el **cómo** del tratamiento.
* **Encargado (PII processor):** Trata los datos **en nombre** del responsable y según sus instrucciones.

## ¿Qué aporta?
Cumplir la norma permite **generar evidencia** de cómo se trata la PII, útil ante socios, clientes y reguladores, y verificable de forma independiente mediante certificación.

## Correspondencias incluidas
Con **ISO/IEC 29100**, **ISO/IEC 27018**, **ISO/IEC 29151** y el **RGPD** de la UE. Pueden interpretarse considerando los requisitos legales locales.
      `,
      quiz: {
        question: 'Una organización sin certificación ISO 27001 quiere implantar un PIMS según la ISO 27701:2025. ¿Es posible?',
        options: [
          'No, la 27701 siempre requiere un SGSI 27001 previo.',
          'Sí: la edición 2025 es una norma de sistema de gestión independiente.',
          'Solo si es un encargado del tratamiento.'
        ],
        answerIndex: 1,
        explanation: 'El prólogo de la edición 2025 indica que se ha redactado como norma de sistema de gestión independiente. La dependencia de 27001 era propia de la edición 2019.'
      }
    },
    {
      id: '27701_m2',
      title: 'Cláusula 4: Contexto de la Organización',
      content: `
# Cláusula 4: Contexto de la Organización

## 4.1 Comprensión de la organización y su contexto
* Determinar las cuestiones **internas y externas** que afectan a la capacidad de lograr los resultados del PIMS.
* **Específico de privacidad:** Determinar el **rol** de la organización en cada tratamiento, como **responsable, corresponsable o encargado**. Una misma organización puede tener varios roles.
* Considerar la **legislación y regulación de privacidad** aplicable, las decisiones judiciales, los contratos y el contexto de la organización.
* *Ejemplo:* Una empresa de nóminas es encargada para los datos de los empleados de sus clientes y responsable para los datos de sus propios empleados.

## 4.2 Necesidades y expectativas de las partes interesadas
Incluir a los **titulares de los datos**, a las **autoridades de protección de datos**, a los clientes y a los socios. Sus requisitos de privacidad (legales y contractuales) forman parte del PIMS.

## 4.3 Alcance del PIMS
* Definir límites y aplicabilidad: qué tratamientos de PII, procesos, ubicaciones y sistemas se incluyen.
* **Documentado** y coherente con los roles identificados en 4.1.
* *Ejemplo:* «El PIMS cubre el tratamiento de datos de clientes de la plataforma de e-commerce en la UE, en calidad de responsable».

## 4.4 Sistema de gestión de información de privacidad
Establecer, implementar, mantener y mejorar continuamente el PIMS, incluidos los procesos necesarios y sus interacciones.

## Integración con 27001
Si ya tienes un SGSI, estas cláusulas se pueden **integrar**: mismo análisis de contexto, pero ampliado con la dimensión de privacidad y con los **riesgos para las personas**, no solo para la organización.
      `,
      quiz: {
        question: 'Según la cláusula 4.1 de la ISO 27701, ¿qué debe determinar específicamente la organización respecto a sus tratamientos de PII?',
        options: [
          'Su cuota de mercado.',
          'Su rol en cada tratamiento: responsable, corresponsable o encargado.',
          'El sistema operativo de sus servidores.'
        ],
        answerIndex: 1,
        explanation: 'Determinar el rol es fundamental porque de él dependen los controles aplicables: los responsables y los encargados tienen obligaciones distintas.'
      }
    },
    {
      id: '27701_m3',
      title: 'Cláusula 5: Liderazgo y Política de Privacidad',
      content: `
# Cláusula 5: Liderazgo

## 5.1 Liderazgo y compromiso
La **alta dirección** debe demostrar liderazgo:
* Asegurar que la política y los objetivos de privacidad se establecen y son compatibles con la dirección estratégica.
* Integrar los requisitos del PIMS en los **procesos de negocio**.
* Asegurar los **recursos** necesarios.
* Comunicar la importancia de una gestión eficaz de la privacidad.
* Promover la **mejora continua**.

## 5.2 Política de privacidad
La alta dirección establece una política de privacidad que:
* Es adecuada al propósito de la organización.
* Proporciona un marco para fijar **objetivos de privacidad**.
* Incluye el compromiso de cumplir los requisitos aplicables, incluidos los **legales**.
* Incluye el compromiso de mejora continua.
* Está **documentada**, se comunica internamente y está disponible para las partes interesadas.

**Ojo:** esta política interna del sistema de gestión **no es lo mismo** que el aviso de privacidad que se muestra a los usuarios en una web, aunque deben ser coherentes.

## 5.3 Roles, responsabilidades y autoridades
* Asignar responsabilidades para que el PIMS cumpla la norma y para **informar** a la dirección de su desempeño.
* *Ejemplo:* Designar un responsable de privacidad o un Delegado de Protección de Datos (DPO) con acceso directo a la dirección, y definir quién atiende las solicitudes de los titulares.
      `,
      quiz: {
        question: '¿Cuál es la diferencia entre la «política de privacidad» de la cláusula 5.2 y el aviso de privacidad de una web?',
        options: [
          'Son exactamente el mismo documento.',
          'La 5.2 es la política interna del sistema de gestión (compromisos y marco de objetivos); el aviso web informa a los titulares sobre el tratamiento.',
          'El aviso web es obligatorio por la 27701 y la política no.'
        ],
        answerIndex: 1,
        explanation: 'La política de la cláusula 5.2 es el documento de dirección del PIMS: compromisos, marco para los objetivos y mejora continua. Los avisos a los titulares son otro instrumento, relacionado con los controles de información.'
      }
    },
    {
      id: '27701_m4',
      title: 'Cláusula 6: Riesgos de Privacidad y Objetivos',
      content: `
# Cláusula 6: Planificación

## 6.1.1 General
Determinar los riesgos y oportunidades a abordar para que el PIMS logre sus resultados, prevenir efectos no deseados y mejorar continuamente.

## 6.1.2 Evaluación de riesgos de privacidad
La diferencia clave frente a un SGSI: se evalúan los **riesgos para los titulares** (las personas), no solo para la organización.
* Definir criterios de riesgo y de aceptación.
* Identificar los riesgos asociados al **tratamiento de PII**. *Ejemplo:* Recoger más datos de los necesarios, usarlos para otros fines, conservarlos demasiado tiempo o transferirlos a países sin garantías.
* Analizar consecuencias y probabilidad, y evaluar y priorizar.
* Herramienta típica: la **evaluación de impacto de privacidad (PIA / EIPD)**, ver ISO/IEC 29134.

## 6.1.3 Tratamiento de riesgos de privacidad
* Seleccionar opciones de tratamiento.
* Determinar los **controles** necesarios y **compararlos con el Anexo A**, para no omitir ninguno necesario.
* Documentar qué controles aplican y por qué, y justificar las exclusiones, al estilo de la **Declaración de Aplicabilidad** de 27001.
* Obtener la aprobación del plan y la aceptación del riesgo residual por parte de los propietarios del riesgo.

## 6.2 Objetivos de privacidad
Coherentes con la política, **medibles** si es posible, monitorizados y comunicados. Para cada uno se planifica qué se hará, con qué recursos, quién, cuándo y cómo se evaluará.
* *Ejemplo:* «Responder al 100 % de las solicitudes de acceso de titulares en menos de 30 días».

## 6.3 Planificación de cambios
Los cambios en el PIMS se realizan **de forma planificada**.
      `,
      quiz: {
        question: '¿Cuál es la diferencia principal entre la evaluación de riesgos de privacidad (27701, 6.1.2) y la clásica evaluación de riesgos de seguridad?',
        options: [
          'Ninguna; son idénticas.',
          'La de privacidad considera los riesgos para los titulares de los datos (las personas), no solo para la organización.',
          'La de privacidad solo considera riesgos físicos.'
        ],
        answerIndex: 1,
        explanation: 'El foco del PIMS es el impacto sobre las personas. Un tratamiento puede ser seguro para la empresa y aun así dañar la privacidad de los titulares, por ejemplo por un uso excesivo de sus datos.'
      }
    },
    {
      id: '27701_m5',
      title: 'Cláusulas 7–10: Soporte, Operación, Evaluación y Mejora',
      content: `
# Cláusulas 7 a 10: El Ciclo PDCA del PIMS

## Cláusula 7: Soporte
* **7.1 Recursos:** Los necesarios para el PIMS.
* **7.2 Competencia:** Personal competente en privacidad, con evidencia documentada. *Ejemplo:* Formación del equipo de atención al cliente para reconocer una solicitud de ejercicio de derechos.
* **7.3 Concienciación:** El personal conoce la política, su contribución y las consecuencias de no cumplir.
* **7.4 Comunicación:** Qué, cuándo, con quién y cómo comunicar, internamente y externamente (autoridades, titulares).
* **7.5 Información documentada:** Crear, actualizar y controlar documentos y registros.

## Cláusula 8: Operación
* **8.1 Planificación y control operacional.**
* **8.2 Evaluación de riesgos de privacidad** a intervalos planificados y cuando hay cambios significativos. *Ejemplo:* Un nuevo producto que usa datos de geolocalización.
* **8.3 Tratamiento de riesgos de privacidad:** Implementar el plan.

## Cláusula 9: Evaluación del desempeño
* **9.1 Seguimiento, medición, análisis y evaluación.** *Ejemplo:* Indicadores como el tiempo medio de respuesta a solicitudes o el número de incidentes con PII.
* **9.2 Auditoría interna:** Programa de auditorías para verificar la conformidad y la eficacia.
* **9.3 Revisión por la dirección:** Entradas (estado de las acciones, cambios, desempeño, resultados de auditoría...) y resultados (decisiones de mejora y cambios).

## Cláusula 10: Mejora
* **10.1 Mejora continua.**
* **10.2 No conformidad y acción correctiva:** Reaccionar, analizar las causas, corregir y evaluar la eficacia.

## Cláusula 11: Información adicional sobre los anexos
Explica el papel de los anexos: **A** (controles, normativo), **B** (guía de implementación, normativo) y **C a F** (correspondencias, informativos).
      `,
      quiz: {
        question: 'Tu empresa lanza una app que usará geolocalización de los usuarios. Según la cláusula 8.2 de la ISO 27701, ¿qué debe hacerse?',
        options: [
          'Nada hasta la próxima auditoría anual.',
          'Realizar una evaluación de riesgos de privacidad, porque es un cambio significativo.',
          'Solo actualizar el aviso de cookies.'
        ],
        answerIndex: 1,
        explanation: 'La evaluación de riesgos se realiza a intervalos planificados y también cuando se proponen u ocurren cambios significativos, como un nuevo tratamiento de datos sensibles.'
      }
    },
    {
      id: '27701_m6',
      title: 'Anexo A: Controles para Responsables (I)',
      content: `
# Anexo A — Controles para Responsables del Tratamiento (Parte 1)

El Anexo A (normativo) contiene los objetivos de control y controles de referencia del PIMS. La guía de implementación está en el **Anexo B**. En la edición de 2019 los controles de responsables estaban en el Anexo A (A.7) y los de encargados en el Anexo B (B.8). El **Anexo F** recoge la correspondencia.

## Condiciones para la recogida y el tratamiento
* **Identificar y documentar el propósito** de cada tratamiento.
* **Identificar la base jurídica** (consentimiento, contrato, obligación legal, interés legítimo...).
* **Determinar cuándo y cómo obtener el consentimiento**, y **registrarlo** para poder demostrarlo.
* Realizar una **evaluación de impacto de privacidad** cuando proceda (nuevos tratamientos o cambios).
* **Contratos con encargados:** Deben incluir los controles aplicables.
* **Corresponsables:** Acordar el reparto de responsabilidades.
* **Registros del tratamiento:** Mantener la documentación necesaria (similar al registro de actividades del RGPD).

## Obligaciones con los titulares
* **Informar** a los titulares de forma clara y accesible: qué datos, para qué, con qué base, cuánto tiempo, sus derechos...
* Ofrecer mecanismos para **modificar o retirar el consentimiento**.
* Ofrecer mecanismos para **oponerse** al tratamiento.
* Permitir el **acceso, la rectificación y la supresión**.
* **Informar a terceros** a quienes se comunicó la PII de las rectificaciones o supresiones.
* **Proporcionar una copia** de la PII tratada.
* **Gestionar las solicitudes** con procedimientos definidos.
* **Decisiones automatizadas:** Cumplir las obligaciones cuando se toman decisiones basadas solo en tratamiento automatizado.

*Ejemplo:* Un portal de privacidad donde el usuario descarga sus datos, retira el consentimiento de marketing y solicita la baja, con plazos de respuesta monitorizados.
      `,
      quiz: {
        question: 'Un usuario retira su consentimiento para recibir marketing. ¿Qué exige el PIMS al responsable del tratamiento?',
        options: [
          'Ignorarlo si el usuario aceptó los términos originalmente.',
          'Disponer de un mecanismo para retirar el consentimiento y actuar en consecuencia, manteniendo registro.',
          'Pedirle que envíe una carta certificada.'
        ],
        answerIndex: 1,
        explanation: 'Entre las obligaciones con los titulares está ofrecer mecanismos para modificar o retirar el consentimiento, y gestionarlos con procedimientos definidos.'
      }
    },
    {
      id: '27701_m7',
      title: 'Anexo A: Controles para Responsables (II)',
      content: `
# Anexo A — Controles para Responsables (Parte 2)

## Privacidad desde el diseño y por defecto
* **Limitar la recogida** a lo adecuado, pertinente y necesario para los fines.
* **Limitar el tratamiento** a lo necesario para los fines identificados.
* **Exactitud y calidad:** Mantener la PII exacta, completa y actualizada.
* **Objetivos de minimización** y mecanismos para cumplirlos, como la desidentificación.
* **Desidentificación y supresión al final del tratamiento:** Cuando la PII ya no se necesita, se elimina o se transforma de modo que no identifique.
* **Archivos temporales:** Se eliminan en plazos definidos.
* **Retención:** No conservar la PII más tiempo del necesario.
* **Eliminación:** Políticas y procedimientos de borrado seguro.
* **Controles de transmisión:** Asegurar que la PII transmitida llega a su destino previsto.

*Ejemplo:* Un formulario de registro que solo pide email y contraseña. La fecha de nacimiento es opcional y se explica para qué se usa. Las cuentas inactivas se anonimizan tras 3 años.

## Compartición, transferencia y divulgación
* **Identificar la base** para las transferencias de PII entre jurisdicciones.
* **Países y organizaciones** a los que puede transferirse la PII: identificarlos y documentarlos.
* **Registros de transferencias** de PII.
* **Registros de divulgaciones** a terceros: qué, a quién y cuándo.

## Por qué «por defecto» importa
La configuración por defecto debe ser la **más protectora**. *Ejemplo:* El perfil de una red social es privado hasta que el usuario decide hacerlo público, y no al revés.
      `,
      quiz: {
        question: 'Una app pide nombre, email, teléfono, dirección y fecha de nacimiento para un simple boletín por email. ¿Qué principio del Anexo A se vulnera?',
        options: [
          'Controles de transmisión',
          'Limitar la recogida (minimización / privacidad desde el diseño)',
          'Registros de transferencias'
        ],
        answerIndex: 1,
        explanation: 'Para enviar un boletín basta el email. Pedir datos no necesarios vulnera la limitación de la recogida, parte de la privacidad desde el diseño y por defecto.'
      }
    },
    {
      id: '27701_m8',
      title: 'Anexo A: Controles para Encargados del Tratamiento',
      content: `
# Anexo A — Controles para Encargados del Tratamiento

## Condiciones para la recogida y el tratamiento
* **Acuerdo con el cliente:** El contrato refleja el papel del encargado en ayudar al cliente, que es el responsable, a cumplir sus obligaciones.
* **Fines de la organización:** Tratar la PII **solo** para los fines expresados en las instrucciones documentadas del cliente.
* **Uso para marketing y publicidad:** **No** usar la PII para marketing ni publicidad sin consentimiento previo del titular, que no puede ser condición del servicio.
* **Instrucción infractora:** **Informar al cliente** si una instrucción vulnera, en opinión del encargado, la legislación aplicable.
* **Obligaciones del cliente:** Proporcionarle la información necesaria para demostrar su cumplimiento.
* **Registros del tratamiento:** Mantener los registros del tratamiento realizado por cuenta del cliente.

## Obligaciones con los titulares
Proporcionar al cliente los medios para **cumplir sus obligaciones** con los titulares. *Ejemplo:* Funciones para exportar o borrar los datos de un usuario concreto.

## Privacidad desde el diseño y por defecto
* **Archivos temporales:** Se eliminan en plazos definidos.
* **Devolución, transferencia o eliminación** de la PII al terminar el servicio, de forma segura.
* **Controles de transmisión.**

## Compartición, transferencia y divulgación
* **Base para las transferencias** entre jurisdicciones, e informar al cliente.
* **Países y organizaciones** a los que puede transferirse la PII.
* **Registros** de divulgaciones a terceros.
* **Notificar al cliente** las solicitudes de divulgación (por ejemplo, de autoridades), salvo prohibición legal.
* **Divulgaciones legalmente vinculantes:** Rechazar las que no lo sean, y consultar con el cliente.
* **Subencargados:** Informar al cliente antes de usarlos, contratarlos con obligaciones equivalentes y notificar los cambios para que el cliente pueda oponerse.

## Relación con ISO/IEC 27018
Muchos de estos controles coinciden con los de [ISO/IEC 27018](/curso/27018). El **Anexo E** mapea 27701 con 27018 y 29151. Un proveedor de nube pública suele implantar ambas: la 27701 como sistema de gestión y la 27018 como código de prácticas específico.
      `,
      quiz: {
        question: 'Un cliente ordena a su encargado del tratamiento cruzar datos de una forma que el encargado considera ilegal. ¿Qué exige el Anexo A de la 27701?',
        options: [
          'Ejecutar la instrucción, porque el cliente es el responsable.',
          'Informar al cliente de que la instrucción infringe, en su opinión, la legislación aplicable.',
          'Borrar todos los datos del cliente.'
        ],
        answerIndex: 1,
        explanation: 'El control de instrucción infractora exige al encargado informar al cliente cuando, en su opinión, una instrucción vulnera la legislación o regulación aplicable.'
      }
    },
    {
      id: '27701_m9',
      title: 'Anexos B–F, Seguridad y Transición desde 2019',
      content: `
# Anexos de Guía y Correspondencia

## Anexo A — también seguridad de la información
Al ser independiente, la norma **no puede heredar** los controles de seguridad del SGSI de 27001. Su Anexo A incorpora también los **controles de seguridad de la información** necesarios para proteger la PII: control de acceso, cifrado, respaldos, registro, gestión de incidentes, etc. Si la organización ya tiene un SGSI, puede **reutilizar** esos controles.

## Anexo B (normativo) — Guía de implementación
Explica **cómo** implementar cada control del Anexo A, tanto para responsables como para encargados.

## Anexos informativos de correspondencia
* **Anexo C:** Correspondencia con los principios de **ISO/IEC 29100**.
* **Anexo D:** Correspondencia con el **RGPD**, artículo por artículo. Es muy útil para usar el PIMS como marco de cumplimiento del RGPD, aunque certificar 27701 **no equivale** automáticamente a cumplir el RGPD.
* **Anexo E:** Correspondencia con **ISO/IEC 27018** y **ISO/IEC 29151**.
* **Anexo F:** Correspondencia con **ISO/IEC 27701:2019**, clave para migrar.

## Transición 2019 → 2025
1. Revisar el **Anexo F** para trasladar los controles de A.7 y B.8 a la nueva numeración.
2. Revisar el alcance y el contexto: el PIMS ya no es una «extensión» del SGSI, sino un sistema propio, **integrable** con él.
3. Actualizar la evaluación de riesgos, la declaración de controles aplicables y los procedimientos.
4. Coordinar con la entidad certificadora el calendario de transición.

## Mapa mental del ecosistema de privacidad
* **29100:** Principios y vocabulario de privacidad.
* **27701:** Sistema de gestión (PIMS), certificable.
* **[27018](/curso/27018):** Código de prácticas para encargados en nube pública.
* **29151:** Código de prácticas para la protección de PII (general).
* **[27559](/curso/27559) / 20889:** Desidentificación (marco / técnicas).
      `,
      quiz: {
        question: 'Tu organización está certificada en 27701:2019 y debe migrar a la edición 2025. ¿Qué anexo te ayuda a trasladar los controles antiguos a la nueva estructura?',
        options: [
          'Anexo D (RGPD)',
          'Anexo F (correspondencia con ISO/IEC 27701:2019)',
          'Anexo C (ISO/IEC 29100)'
        ],
        answerIndex: 1,
        explanation: 'El Anexo F es la tabla de correspondencia entre la edición 2019 y la 2025, esencial para planificar la transición.'
      }
    }
  ]
};
