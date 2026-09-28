export const iso27017Course = {
  id: '27017',
  title: 'ISO/IEC 27017:2026 Cloud Security',
  description: 'Controles de seguridad basados en ISO/IEC 27002:2022 para servicios en la nube',
  modules: [
    {
      id: '27017_m1',
      title: 'Introducción, Alcance y Estructura',
      content: `
# ISO/IEC 27017:2026 — Seguridad en Servicios Cloud

La ISO/IEC 27017 es un **código de buenas prácticas**: no es certificable por sí sola, sino que se usa junto a un SGSI (ISO 27001) para seleccionar e implementar controles adaptados a la nube. La segunda edición (julio de 2026) sustituye a la de 2015 y está alineada con **ISO/IEC 27002:2022**.

> Nota de estudio: los ejemplos de este curso son interpretaciones prácticas. Para la redacción exacta de cada control, consulta el texto oficial de la norma.

## 1. Alcance
La norma proporciona dos tipos de contenido:
* **Guía adicional** para los controles relevantes de ISO/IEC 27002:2022, aplicada al contexto cloud.
* **Controles adicionales (CLD)** con su guía, que solo tienen sentido en servicios en la nube.

Aplica tanto a **clientes (CSC)** como a **proveedores (CSP)** y a todos los modelos de despliegue, **incluida la nube privada**. En ese caso, puede ser necesario adaptarla a las relaciones entre los departamentos internos de la organización.

Es un **documento horizontal**: sirve de base común para cualquier sector que provea o use servicios cloud.

## 2. Referencias normativas
* **ISO/IEC 22123-1:** Vocabulario de cloud computing.
* **ISO/IEC 27002:2022:** Controles de seguridad de la información.

## 3. Abreviaturas clave
* **CSC (Cloud Service Customer):** Cliente del servicio cloud (tu empresa).
* **CSP (Cloud Service Provider):** Proveedor del servicio cloud.
* **CSN (Cloud Service Partner):** Socio del servicio cloud (auditor, integrador, broker...).
* **CSU (Cloud Service User):** Usuario del servicio, persona o entidad que actúa en nombre del CSC.
* **RTO / RPO:** Tiempo objetivo de recuperación / Punto objetivo de recuperación.

## Estructura del documento (Cláusula 4.2)
* Sigue la estructura de 27002:2022: cuatro **temas** (Organizacionales, Personas, Físicos, Tecnológicos) en las cláusulas 5 a 8, con los mismos **atributos**.
* Si un control de 27002 aplica igual a CSC y CSP, solo se hace referencia a él. Por eso algunos controles (como 5.6 o 5.11) **no aparecen** en el índice: se aplican tal cual.
* Los controles exclusivos de la nube llevan el prefijo **CLD** (*CLouD service extended controls*).
* La guía tiene dos formatos: **Tipo 1**, con columnas separadas para CSC y CSP, y **Tipo 2**, con una guía común para ambos.

## ¿Qué cambió respecto a 2015?
* Cambian el título y el alcance.
* Los controles se presentan con la taxonomía de temas y atributos de 27002:2022.
* Algunos controles se fusionaron, otros se eliminaron y se introdujeron varios nuevos. El **Anexo A** recoge la correspondencia con la edición de 2015.
      `,
      quiz: {
        question: 'Estás estudiando la ISO 27017:2026 y buscas guía cloud para el control 5.6 «Contacto con grupos de interés especial», pero no aparece en el índice. ¿Qué significa?',
        options: [
          'Que el control fue eliminado y ya no aplica en la nube.',
          'Que el control de 27002:2022 aplica a CSC y CSP sin necesidad de guía adicional.',
          'Que solo aplica a nubes privadas.'
        ],
        answerIndex: 1,
        explanation: 'La cláusula 4.2 indica que, cuando un control de 27002:2022 aplica a CSC y CSP sin información adicional, solo se hace referencia a él. Que no tenga guía cloud no significa que no aplique.'
      }
    },
    {
      id: '27017_m2',
      title: 'Conceptos Cloud y Responsabilidad Compartida',
      content: `
# Conceptos Específicos de Cloud (Cláusula 4.3)

## 4.3.1 Relaciones con proveedores
Proveer y usar un servicio cloud es **una relación con un proveedor**: el CSC es el adquirente y el CSP el suministrador. Por eso aplican los controles 5.19 a 5.22 de 27002:2022.

**La cadena de suministro cloud:** un CSP puede ofrecer un servicio SaaS construido sobre el IaaS de otro CSP. En ese caso es **CSC respecto al primero y CSP respecto a sus propios clientes**, y debe aplicar los controles de ambos roles. La serie **ISO/IEC 27036** (en especial la parte 4) profundiza en la seguridad de estas relaciones.

## 4.3.2 Relación entre CSC y CSP
* Los datos del CSC se almacenan, transmiten y procesan en el servicio cloud. **Los procesos de negocio del CSC dependen de la seguridad del CSP.**
* **Antes de contratar**, el CSC debe analizar las diferencias entre sus requisitos de seguridad y las capacidades que ofrece el servicio.
* Si los controles del CSP son fijos y no configurables, el CSC puede tener que **añadir controles propios** para mitigar el riesgo.
* El CSP debe aportar la información y el soporte técnico necesarios para que el CSC cumpla sus requisitos.

## Modelos de despliegue
Privada, pública, **multi-cloud** (el CSC orquesta varios CSP), **federada** (varios CSP comparten recursos mediante colaboración), **híbrida**, **híbrida multi-cloud** e **inter-cloud** (un CSP combina servicios de varios CSP). Estos modelos no son excluyentes y se pueden combinar (ver ISO/IEC 5140).

## El modelo de responsabilidad compartida
* **IaaS:** el CSC gestiona SO, middleware, aplicaciones y datos. El CSP gestiona virtualización, servidores, red y almacenamiento físico.
* **PaaS:** el CSC gestiona aplicaciones y datos. El CSP gestiona todo desde el SO hacia abajo.
* **SaaS:** el CSC gestiona sobre todo identidades, accesos, configuración y sus datos. El CSP gestiona la aplicación y toda la infraestructura.
* **Siempre del CSC:** sus datos, quién accede a ellos y cómo configura el servicio.

## 4.3.3 Gestión de riesgos
CSC y CSP deben tener procesos de gestión de riesgos (ver ISO 27001, ISO 27005 e ISO 31000). Los controles de 27017 dan al CSC guía sobre:
* Las medidas de seguridad al **usar** servicios cloud.
* La **información y capacidades** que debe obtener del CSP.
      `,
      quiz: {
        question: 'Una empresa SaaS de facturación aloja su aplicación sobre la infraestructura IaaS de un gran proveedor cloud. Según la cláusula 4.3.1, ¿qué rol(es) tiene?',
        options: [
          'Solo CSP, porque vende un servicio cloud.',
          'Solo CSC, porque compra infraestructura.',
          'Ambos: CSC frente al proveedor IaaS y CSP frente a sus clientes.'
        ],
        answerIndex: 2,
        explanation: 'La norma describe explícitamente la cadena de suministro cloud: un CSP que construye sobre otro CSP es cliente del primero y proveedor de sus propios clientes, así que debe aplicar los controles de ambos roles.'
      }
    },
    {
      id: '27017_m3',
      title: 'Controles Organizacionales: Gobierno, Activos y Acceso (5.1–5.18)',
      content: `
# Cláusula 5 (Parte 1): Gobierno, Activos y Acceso

Guía cloud para los controles organizacionales de 27002:2022. El formato típico es: qué hace el **CSC** y qué hace el **CSP**.

## Gobierno y roles
* **5.1 Políticas:** El CSC define una política para el **uso** de servicios cloud. El CSP amplía la suya para cubrir la **provisión** del servicio. *Ejemplo:* Política que exige que todo servicio cloud nuevo pase por evaluación de seguridad.
* **5.2 Roles y responsabilidades:** Hay que acordar la asignación de responsabilidades entre CSC y CSP (ver el control CLD 5.38). *Ejemplo:* Matriz RACI de quién parchea, quién respalda y quién monitoriza.
* **5.3 Segregación de funciones:** *Ejemplo:* Los administradores cloud del CSC están separados de los usuarios comunes (CSU).
* **5.4 Responsabilidades de la dirección:** La dirección debe respaldar las reglas de uso de la nube.
* **5.5 Contacto con autoridades:** El CSC identifica las autoridades relevantes para la operación combinada CSC+CSP. El CSP informa de **las ubicaciones geográficas** de su organización y de dónde puede almacenar datos.
* **5.7 Inteligencia de amenazas:** *Ejemplo:* El CSP comparte alertas de campañas dirigidas a su plataforma y el CSC vigila amenazas típicas de cloud, como el robo de credenciales o las malas configuraciones.
* **5.8 Seguridad en proyectos:** Incluir la evaluación del servicio cloud en los proyectos que lo adopten.

## Activos e información
* **5.9 Inventario:** El inventario del CSC incluye la información alojada en la nube. El CSP identifica los **datos del CSC** y los **datos derivados del servicio** (logs, metadatos).
* **5.10 Uso aceptable:** *Ejemplo:* Lista de servicios cloud aprobados y prohibición de subir datos confidenciales a servicios no autorizados.
* **5.12 / 5.13 Clasificación y etiquetado:** El CSP documenta las funciones que permiten al CSC clasificar y etiquetar. *Ejemplo:* Etiquetas (*tags*) de clasificación en buckets y recursos.
* **5.14 Transferencia de información:** *Ejemplo:* Cifrar en tránsito las cargas y exportaciones de datos hacia y desde el CSP.

## Identidad y acceso
* **5.15 Control de acceso:** La política de acceso del CSC cubre las cuentas de administración cloud. El CSP ofrece mecanismos para restringir el acceso.
* **5.16 Gestión de identidades:** El CSP ofrece funciones de alta y baja de usuarios. *Ejemplo:* Federación con el directorio corporativo (SSO) para que las bajas de RRHH se propaguen a la nube.
* **5.17 Información de autenticación:** El CSP informa de sus procedimientos de gestión de secretos, incluido el restablecimiento de contraseñas.
* **5.18 Derechos de acceso:** *Ejemplo:* Revisión trimestral de quién tiene roles de administrador en la consola cloud.
      `,
      quiz: {
        question: '¿Qué información debe facilitar el CSP al CSC en relación con el control 5.5 «Contacto con autoridades»?',
        options: [
          'Los nombres de los empleados del CSP con acceso a los datos.',
          'Las ubicaciones geográficas de su organización y los países donde puede almacenar los datos del CSC.',
          'El código fuente del hipervisor.'
        ],
        answerIndex: 1,
        explanation: 'Conocer las ubicaciones permite al CSC saber qué jurisdicciones y autoridades pueden intervenir sobre sus datos, algo clave para requisitos legales como la transferencia internacional.'
      }
    },
    {
      id: '27017_m4',
      title: 'Proveedores y Cadena de Suministro Cloud (5.19–5.23)',
      content: `
# Cláusula 5 (Parte 2): Relaciones con Proveedores

## 5.19 Seguridad en las relaciones con proveedores
* **CSC:** Trata al CSP como un proveedor más: evalúa su capacidad de seguridad antes de contratar y la incluye en su política de proveedores.
* **CSP:** Aplica la misma disciplina a sus propios proveedores, incluidos otros CSP (*peer CSPs*).

## 5.20 Seguridad en los acuerdos con proveedores
El acuerdo (contrato, SLA, términos del servicio) debe dejar claras las responsabilidades de seguridad. Elementos típicos:
* Reparto de responsabilidades (ver CLD 5.38).
* Ubicación del procesamiento y almacenamiento de datos.
* Plazos y canales de notificación de incidentes.
* Condiciones de **terminación**: devolución y eliminación de datos.
* *Ejemplo:* Revisar el anexo de seguridad del contrato antes de firmar, no después del primer incidente.

## 5.21 Seguridad en la cadena de suministro TIC
Como los servicios cloud se construyen unos sobre otros, el CSP debe exigir a los CSP de los que depende niveles de seguridad coherentes con los que promete a sus clientes, y ser transparente al respecto.

## 5.22 Seguimiento y gestión de cambios en los servicios del proveedor
* **CSP:** Informa al CSC de los cambios que puedan afectar a su seguridad. *Ejemplo:* Retirada de una función, nuevo subcontratista o cambio de región.
* **CSC:** Monitoriza el cumplimiento del servicio y evalúa el impacto de esos cambios.

## 5.23 Seguridad de la información en el uso de servicios cloud
Este control nació en 27002:2022 y es el **ancla natural** de 27017. Exige procesos para todo el ciclo de vida del servicio cloud:
1. **Adquisición:** Requisitos de seguridad y criterios de selección.
2. **Uso:** Configuración segura y responsabilidades.
3. **Gestión:** Monitorización, revisión y cambios.
4. **Salida:** Estrategia de salida, portabilidad y borrado de datos.

*Ejemplo:* Un procedimiento de «onboarding cloud» con checklist de seguridad y un plan de salida documentado para cada servicio crítico.
      `,
      quiz: {
        question: '¿Qué control de 27002:2022, reforzado por 27017, exige definir procesos de adquisición, uso, gestión y SALIDA de servicios cloud?',
        options: [
          '5.19 Seguridad en las relaciones con proveedores',
          '5.23 Seguridad de la información en el uso de servicios cloud',
          '8.20 Seguridad de redes'
        ],
        answerIndex: 1,
        explanation: 'El control 5.23, nuevo en 27002:2022, cubre el ciclo de vida completo del uso de servicios cloud, incluida la estrategia de salida.'
      }
    },
    {
      id: '27017_m5',
      title: 'Incidentes, Continuidad y Cumplimiento (5.24–5.37)',
      content: `
# Cláusula 5 (Parte 3): Incidentes, Continuidad y Cumplimiento

## Gestión de incidentes (5.24–5.28)
* **5.24 Planificación:** CSC y CSP acuerdan qué incidentes se notifican, en qué plazo y por qué canal. El CSP define el **alcance** de lo que notificará.
* **5.25 Evaluación de eventos:** El CSC necesita saber qué eventos le comunicará el CSP para clasificarlos en su propio proceso.
* **5.26 Respuesta:** Respuesta coordinada, con puntos de contacto definidos en ambas partes.
* **5.27 Lecciones aprendidas:** Compartir los hallazgos relevantes del análisis post-incidente.
* **5.28 Recolección de evidencias:** En un entorno multi-tenant, el CSC no puede hacer forense libremente sobre la infraestructura. Deben **acordarse procedimientos** para solicitar evidencias digitales al CSP.

## Continuidad (5.29–5.30)
* **5.29 Seguridad durante la disrupción:** Mantener los controles de seguridad también en crisis.
* **5.30 Preparación TIC para la continuidad:** El CSC verifica que el **RTO y el RPO** del CSP cubren sus necesidades. *Ejemplo:* Si el negocio exige RPO de 1 hora y el servicio solo replica cada 24 horas, hay una brecha que tratar, por ejemplo con respaldos propios o réplica en otra región.

## Cumplimiento (5.31–5.36)
* **5.31 Requisitos legales:** El CSC debe considerar que pueden aplicar las leyes de las jurisdicciones donde opera el CSP. El CSP informa de ellas. Incluye regulaciones sobre criptografía.
* **5.32 Propiedad intelectual:** *Ejemplo:* Licencias de software comercial instalado en máquinas virtuales IaaS, que a veces no permiten su uso en nube pública.
* **5.33 Protección de registros:** El CSP informa de cómo protege los registros que genera sobre el uso del servicio.
* **5.34 Privacidad y PII:** Remite a normas específicas: [ISO/IEC 27018](/curso/27018) para encargados en nube pública e [ISO/IEC 27701](/curso/27701) para el sistema de gestión de privacidad.
* **5.35 Revisión independiente:** Auditar individualmente a un CSP suele ser inviable. El CSP aporta **evidencia documentada**, como certificaciones ISO 27001/27017 o informes de auditoría de terceros.
* **5.36 Cumplimiento de políticas:** El CSC revisa que su uso de la nube cumple sus propias políticas.

## 5.37 Procedimientos operativos documentados
Documentar las operaciones críticas, cuyo error puede causar daños **irrecuperables** en la nube: eliminar entornos, restaurar respaldos o cambiar permisos masivamente.

La edición de 2015 dedicaba a la seguridad operacional del administrador un control propio (CLD.12.1.5). En 2026 muchos de esos contenidos se fusionan en controles de 27002. El **Anexo A** tiene la correspondencia exacta.
      `,
      quiz: {
        question: 'Tu empresa quiere auditar in situ los centros de datos de un gran proveedor de nube pública, y este lo rechaza. Según 5.35, ¿cuál es la vía habitual?',
        options: [
          'Rescindir el contrato inmediatamente.',
          'Confiar en evidencia documentada del CSP, como certificaciones e informes de auditorías independientes.',
          'Realizar pruebas de penetración sin autorización.'
        ],
        answerIndex: 1,
        explanation: 'En entornos multi-tenant, las auditorías individuales de cada cliente suelen ser inviables e incluso aumentan el riesgo. Por eso el CSP aporta evidencia independiente, como certificaciones o informes de terceros.'
      }
    },
    {
      id: '27017_m6',
      title: 'Controles CLD Organizacionales: 5.38 y 5.39',
      content: `
# Controles Exclusivos Cloud (Organizacionales)

La edición de 2026 incluye **cuatro controles CLD**: dos organizacionales (5.38 y 5.39) y dos tecnológicos (8.35 y 8.36).

## 5.38 CLD — Roles y responsabilidades compartidos en un entorno cloud
Ya existía en 2015 como **CLD.6.3.1**.
* **Propósito:** Que las responsabilidades de seguridad compartidas estén **asignadas, documentadas, comunicadas e implementadas** por CSC y CSP.
* **CSC:** Define o amplía sus políticas y procedimientos según el uso que hace del servicio y comunica a sus usuarios sus roles.
* **CSP:** Documenta y comunica sus capacidades, roles y responsabilidades de seguridad, así como las que espera que asuma el CSC.
* *Ejemplo:* Publicar y mantener una matriz de responsabilidad compartida por cada servicio, del estilo «el proveedor cifra el disco; el cliente gestiona las claves y los permisos».

**Error clásico:** Asumir que «está en la nube, así que la seguridad es del proveedor». Buena parte de las fugas en cloud vienen de **configuraciones del cliente**, como un bucket público o credenciales expuestas.

## 5.39 CLD — Acuerdo sobre roles y responsabilidades del socio del servicio cloud (CSN)
**Nuevo en la edición de 2026.**
* **Contexto:** En la práctica intervienen terceros: integradores, brokers, proveedores de servicios gestionados, auditores o desarrolladores.
* **Propósito:** Que los roles y responsabilidades de seguridad del **CSN** estén **acordados** con el CSC y el CSP.
* *Ejemplo:* Un partner que administra la cuenta cloud de tu empresa debe tener un acuerdo que defina qué accesos tiene, qué registros conserva, cómo notifica incidentes y qué ocurre con sus accesos al terminar el contrato.

## Relación entre ambos
5.38 reparte responsabilidades entre CSC y CSP, y 5.39 incorpora al tercer actor. Sin 5.39, un socio con permisos de administrador puede quedar fuera de todos los contratos y controles.
      `,
      quiz: {
        question: 'Un integrador externo tiene permisos de administrador en la cuenta cloud de tu empresa, pero ningún documento define sus obligaciones de seguridad. ¿Qué control CLD de la edición 2026 aborda esta situación?',
        options: [
          '5.38 CLD Roles y responsabilidades compartidos',
          '5.39 CLD Acuerdo sobre roles y responsabilidades del socio del servicio cloud',
          '8.35 CLD Segregación en entornos virtuales'
        ],
        answerIndex: 1,
        explanation: 'El control 5.39, nuevo en 2026, trata específicamente de acordar los roles y responsabilidades de seguridad de los socios del servicio cloud (CSN), como integradores o proveedores gestionados.'
      }
    },
    {
      id: '27017_m7',
      title: 'Controles de Personas y Físicos (Cláusulas 6 y 7)',
      content: `
# Cláusulas 6 y 7: Personas y Entorno Físico

## Controles de personas (Cláusula 6)
* **6.1 Selección (screening):** El CSP aplica verificaciones de antecedentes al personal con acceso a los datos o sistemas de los clientes.
* **6.2 Términos y condiciones de empleo:** Incluir las obligaciones sobre el tratamiento de datos de clientes.
* **6.3 Concienciación, educación y formación:** El CSC forma a su personal en el **uso seguro** de los servicios cloud y en los riesgos específicos. El CSP forma a su personal en la protección de los datos del CSC. *Ejemplo:* Formación sobre cómo evitar exponer públicamente un recurso de almacenamiento.
* **6.4 Proceso disciplinario / 6.5 Responsabilidades tras la baja:** *Ejemplo:* Al salir un administrador cloud, revocar sus claves de API y tokens, no solo su usuario.
* **6.6 Acuerdos de confidencialidad:** Cubren el acceso a datos de clientes.
* **6.7 Trabajo remoto:** La administración cloud suele hacerse en remoto, así que hay que proteger las conexiones a la consola.
* **6.8 Reporte de eventos:** El CSP ofrece canales para que el CSC le reporte eventos de seguridad, y al revés.

## Controles físicos (Cláusula 7)
En cloud, **la mayoría de los controles físicos los implementa el CSP**. El CSC se apoya en la **evidencia** que este aporta, como certificaciones o informes de auditoría.
* **7.1 a 7.8:** Perímetros, acceso físico, oficinas, monitorización, amenazas ambientales, áreas seguras, puesto despejado y emplazamiento de equipos.
* **7.9 Activos fuera de las instalaciones:** Considerar que los datos del CSC residen fuera de sus instalaciones.
* **7.10 Medios de almacenamiento:** Gestión segura de los soportes que contienen datos del CSC.
* **7.11 a 7.13:** Suministros, cableado y mantenimiento de equipos.
* **7.14 Eliminación o reutilización segura de equipos:** El CSP garantiza que los recursos, como discos o memoria, se **borran de forma segura antes de reasignarse** a otro cliente. El CSC pide información sobre estos procedimientos.

## Idea clave
El CSC no puede controlar la puerta del centro de datos, pero **sí es responsable de verificar** que el CSP la controla. Eso se consigue con cláusulas contractuales y evidencia independiente.
      `,
      quiz: {
        question: 'En un servicio de nube pública, ¿cómo cumple normalmente el CSC con los controles físicos del tema 7?',
        options: [
          'Instalando sus propias cámaras en el centro de datos del proveedor.',
          'Apoyándose en la evidencia que aporta el CSP (certificaciones, informes de auditoría) sobre sus controles físicos.',
          'Los controles físicos no aplican en cloud.'
        ],
        answerIndex: 1,
        explanation: 'Los controles físicos los implementa el CSP, y el CSC verifica su existencia y eficacia mediante evidencia documentada e independiente.'
      }
    },
    {
      id: '27017_m8',
      title: 'Controles Tecnológicos I: Acceso, Capacidad y Datos (8.1–8.19)',
      content: `
# Cláusula 8 (Parte 1): Controles Tecnológicos

## Acceso y autenticación
* **8.1 Dispositivos de usuario final:** Proteger los equipos desde los que se accede a la consola y las API cloud.
* **8.2 Derechos de acceso privilegiado:** El CSC usa autenticación robusta para las cuentas de administración cloud. El CSP ofrece esa capacidad. *Ejemplo:* MFA obligatorio en la cuenta raíz y uso de roles temporales en lugar de claves permanentes.
* **8.3 Restricción del acceso a la información:** El CSP proporciona controles para que el CSC restrinja el acceso a sus datos y funciones.
* **8.5 Autenticación segura:** *Ejemplo:* Federación de identidades y políticas de acceso condicional.

## Operación
* **8.6 Gestión de capacidad:** El CSP monitoriza la capacidad total para evitar incidentes por agotamiento de recursos. El CSC vigila sus cuotas y su consumo.
* **8.7 Protección contra malware:** Cada parte en su capa. En IaaS, el CSC protege sus máquinas virtuales.
* **8.8 Gestión de vulnerabilidades técnicas:** El CSP informa al CSC de las vulnerabilidades que afectan al servicio. En IaaS, el CSC parchea el sistema operativo.
* **8.9 Gestión de la configuración (nuevo en 27002:2022):** Clave en cloud. *Ejemplo:* Infraestructura como código revisada y detección de desviaciones (*drift*) respecto a una línea base segura.

## Datos
* **8.10 Eliminación de información:** El CSP describe cómo y cuándo borra los datos del CSC, en particular **al terminar el servicio**. El CSC verifica que puede exportarlos antes. Es un tema que en 2015 cubría el control CLD.8.1.5 de retorno y eliminación de activos.
* **8.11 Enmascaramiento de datos / 8.12 Prevención de fugas (DLP):** *Ejemplo:* Enmascarar datos reales en entornos de pruebas cloud.
* **8.13 Copias de seguridad:** El CSP especifica sus capacidades de respaldo: alcance, frecuencia, ubicación y cifrado. Si el servicio no respalda los datos del CSC, **es responsabilidad del CSC** hacerlo.
* **8.14 Redundancia:** *Ejemplo:* Desplegar en varias zonas de disponibilidad.

## Registro y monitorización
* **8.15 Registro (logging):** El CSP ofrece capacidades de registro al CSC, como logs de auditoría de la API. El CSC las activa y protege.
* **8.16 Actividades de monitorización:** El CSC monitoriza su uso del servicio. Ver el **Anexo B** sobre monitorización de servicios cloud.
* **8.17 Sincronización de relojes:** El CSP informa de la fuente de tiempo que usa, para poder correlacionar sus logs con los del CSC.
* **8.18 Programas de utilidad privilegiados / 8.19 Instalación de software:** Controlar las herramientas que pueden saltarse los controles del sistema.
      `,
      quiz: {
        question: 'Contratas un SaaS cuyo contrato indica que el proveedor NO respalda los datos de los clientes frente a borrados accidentales. Según 8.13, ¿quién debe garantizar las copias de seguridad?',
        options: [
          'El CSP, en cualquier caso.',
          'El CSC, porque el servicio no cubre el respaldo de sus datos.',
          'Nadie; en SaaS no hacen falta respaldos.'
        ],
        answerIndex: 1,
        explanation: 'El CSP debe especificar sus capacidades de respaldo. Si estas no cubren los datos del CSC, la responsabilidad recae sobre el CSC, que debe implementar su propia estrategia de copias.'
      }
    },
    {
      id: '27017_m9',
      title: 'Controles Tecnológicos II: Redes, Criptografía y Desarrollo (8.20–8.34)',
      content: `
# Cláusula 8 (Parte 2): Redes, Criptografía y Desarrollo

## Redes
* **8.20 Seguridad de redes:** La **red virtual** debe diseñarse y protegerse con el mismo rigor que una física. La edición de 2015 tenía un control específico para alinear la gestión de redes físicas y virtuales (CLD.13.1.4).
* **8.21 Seguridad de los servicios de red:** El CSP documenta sus mecanismos, como la protección DDoS o el cifrado entre centros de datos.
* **8.22 Segregación de redes:** El CSP separa las redes de distintos clientes y su red interna de administración. El CSC segmenta sus propios entornos. *Ejemplo:* VPC separadas para producción y desarrollo, con reglas mínimas entre ellas.
* **8.23 Filtrado web:** Control del acceso a sitios externos desde el entorno.

## Criptografía
* **8.24 Uso de criptografía:** El CSC aplica cifrado cuando su análisis de riesgos lo justifica. El CSP informa de **dónde y cómo** usa criptografía y qué opciones de gestión de claves ofrece.
* *Ejemplo:* Uso de claves gestionadas por el cliente (**BYOK/HYOK**) para datos altamente sensibles, de modo que el CSC controla el ciclo de vida de sus claves.
* Consideración: la criptografía también está sujeta a regulación en algunas jurisdicciones (5.31).

## Desarrollo y cambios
* **8.25 Ciclo de vida de desarrollo seguro:** El CSP informa de sus prácticas de desarrollo seguro cuando el CSC las necesita para su evaluación de riesgos.
* **8.26 a 8.29:** Requisitos de seguridad de aplicaciones, arquitectura segura, codificación segura y pruebas.
* **8.30 Desarrollo externalizado:** Aplica si el CSC encarga desarrollos que se despliegan en la nube.
* **8.31 Separación de entornos:** Desarrollo, pruebas y producción separados, incluso dentro de la misma cuenta cloud.
* **8.32 Gestión de cambios:** El CSP informa al CSC de los cambios en el servicio que puedan afectarle negativamente: qué cambia, cuándo y con qué impacto.
* **8.33 Información de prueba:** No usar datos reales de producción en pruebas sin protección adecuada.
* **8.34 Protección durante auditorías y pruebas:** Las pruebas técnicas del CSC, como un pentest, deben seguir las reglas del CSP para no afectar a otros clientes.
      `,
      quiz: {
        question: 'Un banco quiere que el proveedor cloud nunca pueda descifrar sus datos sin su intervención. ¿Qué enfoque de 8.24 es el más adecuado?',
        options: [
          'Usar las claves por defecto gestionadas íntegramente por el proveedor.',
          'Usar claves gestionadas por el cliente (BYOK/HYOK), controlando su ciclo de vida.',
          'No cifrar para evitar complejidad.'
        ],
        answerIndex: 1,
        explanation: 'Con claves gestionadas por el cliente, el CSC controla la generación, rotación y revocación de las claves, lo que reduce la dependencia del CSP para proteger la confidencialidad.'
      }
    },
    {
      id: '27017_m10',
      title: 'Controles CLD Tecnológicos: 8.35, 8.36 y Anexos',
      content: `
# Controles Exclusivos Cloud (Tecnológicos) y Anexos

## 8.35 CLD — Segregación en entornos de computación virtual
Ya existía en 2015 como **CLD.9.5.1**.
* **Propósito:** Que el entorno virtual de un CSC quede **protegido de otros CSC** y de personas no autorizadas, aunque compartan la misma infraestructura física (**multi-tenancy**).
* **CSP:** Aplica aislamiento lógico de cómputo, almacenamiento, red y memoria entre clientes, y también entre los clientes y su propia administración interna.
* **CSC:** Configura correctamente los mecanismos de aislamiento que ofrece el servicio.
* *Ejemplo:* Que la base de datos de tu empresa y la de tu competidor se ejecuten en el mismo servidor físico sin posibilidad de acceso cruzado.
* En 2015 existía además un control de **endurecimiento de máquinas virtuales** (CLD.9.5.2). La correspondencia exacta en la nueva edición está en el Anexo A.

## 8.36 CLD — Detección y prevención del uso no autorizado de servicios cloud
**Nuevo en la edición de 2026.**
* **Propósito:** Detectar y prevenir el uso de servicios cloud **no autorizado**.
* *Ejemplos (CSC):* Detectar *shadow IT* (departamentos que contratan servicios sin aprobación) o el uso indebido de una cuenta comprometida, como crear máquinas para minar criptomonedas.
* *Ejemplos (CSP):* Detectar patrones anómalos de uso o abuso de su plataforma y ofrecer al CSC mecanismos de alerta.

## Anexo A (informativo) — Correspondencia con 27017:2015
Relaciona los controles de 2015 con los de 2026. Los siete controles CLD de 2015 eran:
* CLD.6.3.1 Responsabilidades compartidas → hoy **5.38**
* CLD.8.1.5 Retorno y eliminación de activos
* CLD.9.5.1 Segregación en entornos virtuales → hoy **8.35**
* CLD.9.5.2 Endurecimiento de máquinas virtuales
* CLD.12.1.5 Seguridad operacional del administrador
* CLD.12.4.5 Monitorización de servicios cloud
* CLD.13.1.4 Alineación de la gestión de redes físicas y virtuales

Los que no conservan un control CLD propio se **fusionaron o eliminaron**. Si migras un SGSI de 2015 a 2026, usa el Anexo A para actualizar tu Declaración de Aplicabilidad.

## Anexo B (informativo) — Monitorización de servicios cloud
Amplía la orientación sobre qué y cómo monitorizar en servicios cloud: actividad de la API, cambios de configuración, accesos privilegiados y consumo de recursos.
      `,
      quiz: {
        question: 'Un atacante roba las credenciales de un desarrollador y lanza cientos de máquinas virtuales para minar criptomonedas en la cuenta de la empresa. ¿Qué control CLD nuevo de 2026 busca detectar y prevenir esto?',
        options: [
          '8.35 CLD Segregación en entornos virtuales',
          '8.36 CLD Detección y prevención del uso no autorizado de servicios cloud',
          '5.38 CLD Roles y responsabilidades compartidos'
        ],
        answerIndex: 1,
        explanation: 'El control 8.36 se centra en detectar y prevenir el uso no autorizado de servicios cloud, ya sea por cuentas comprometidas o por servicios contratados sin aprobación.'
      }
    }
  ]
};
