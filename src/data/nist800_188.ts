export const nist800_188Course = {
  id: 'nist800-188',
  title: 'NIST SP 800-188',
  description: 'Desidentificación de datasets gubernamentales (septiembre 2023)',
  modules: [
    {
      id: 'nist_m1',
      title: 'Introducción y Contexto Histórico',
      content: `
# NIST SP 800-188: De-Identifying Government Datasets

Publicación especial del NIST (septiembre de 2023) que orienta a las agencias del gobierno de EE.UU. sobre cómo **desidentificar datos** para ponerlos a disposición de investigadores y del público **minimizando el riesgo para la privacidad**. Sus técnicas y su gobernanza son aplicables a cualquier organización.

## ¿Por qué existe? (Cláusula 1)
Las leyes de datos abiertos empujan a publicar datos:
* **Evidence Act (2018):** Políticas públicas basadas en evidencia y figura del **Chief Data Officer**.
* **OPEN Government Data Act:** Publicar los datos gubernamentales en formatos abiertos.
* **Geospatial Data Act (2018):** Inventarios de datos geoespaciales.

El conflicto de fondo: **transparencia frente a privacidad**.

## Tres tradiciones de desidentificación (2.1)
1. **Limitación de la divulgación estadística (SDL):** Durante cuatro décadas, las agencias estadísticas han investigado métodos para publicar estadísticas sin revelar datos individuales.
2. **Años 90:** Aumento de la publicación de microdatos para investigación, especialmente en salud, con el enfoque de **eliminar identificadores** (por ejemplo, HIPAA).
3. **Años 2000:** La informática teórica y la criptografía desarrollan **modelos formales de privacidad**, como la **privacidad diferencial**.

## Advertencia del propio NIST
Técnicas como los datos totalmente sintéticos o la privacidad diferencial tienen todavía **uso limitado** en el gobierno por coste, tiempo y la sofisticación que exigen. Se espera que su uso crezca.

## Estructura del documento
* **Sección 2:** Terminología.
* **Sección 3:** Gobernanza y gestión.
* **Sección 4:** Pasos técnicos.
* **Sección 5:** Requisitos y evaluación de software.
* **Sección 6:** Conclusiones.
      `,
      quiz: {
        question: 'Según la NIST SP 800-188, ¿qué tradición de desidentificación surgió de la informática teórica y la criptografía en los años 2000?',
        options: [
          'La eliminación de 18 identificadores de HIPAA',
          'Los modelos formales de privacidad, como la privacidad diferencial',
          'La supresión de celdas en tablas estadísticas'
        ],
        answerIndex: 1,
        explanation: 'El documento describe tres tradiciones: la SDL de las agencias estadísticas, la eliminación de identificadores en microdatos de los 90 y los modelos formales de privacidad de los 2000.'
      }
    },
    {
      id: 'nist_m2',
      title: 'Terminología: Desidentificación, Divulgación y Modelos',
      content: `
# Terminología Clave (2.2)

## Procesos
* **Desidentificación:** Término general para cualquier proceso que elimina la asociación entre datos identificativos y su titular.
* **Reidentificación:** Proceso que atribuye información desidentificada a una persona concreta.
* **Riesgo de reidentificación:** Función de la **probabilidad** de que ocurra y del **impacto adverso** que causaría.
* **Redacción (supresión):** Eliminar información. Por sí sola **no da garantías formales** y puede introducir **sesgo**.
* **Anonimización:** Reservada para procesos **irreversibles**. El NIST **recomienda evitar el término**: muchos procesos «anonimizados» se revierten si aparece un dataset que enlaza atributos con identidades, y no se puede saber si ese dataset existe.
* **Pseudonimización:** Elimina la asociación con el titular y **añade** un seudónimo. En salud se dice «datos codificados». Permite enlazar observaciones en el tiempo, pero los seudónimos **aumentan el riesgo** de reidentificación por otras vías.

## Tipos de divulgación
* **De identidad:** Se identifica a un titular en el fichero publicado.
* **De atributo:** Se revela información sensible de un titular.
* **Inferencial:** Los datos permiten estimar una característica de alguien con más precisión que antes.

Formulación alternativa del NIST: hay **brecha de confidencialidad** cuando una inferencia sobre una entidad **mejora gracias al uso de sus propios datos**, a diferencia de las inferencias generales sobre la población.

## Identificadores
* **Directos:** Identifican de forma inequívoca (nombre, teléfono).
* **Cuasi-identificadores (indirectos):** Identifican por asociación con otra información.

## Modelos formales
* **Pérdida de privacidad (privacy loss)** y **presupuesto de privacidad (privacy budget):** Límite superior de la pérdida total aceptable en varias publicaciones.
* **Privacidad diferencial:** Definición matemática que acota cuánto puede aprenderse de un individuo por su presencia en los datos, añadiendo **ruido aleatorio**. Parámetro **ε** (o ρ): **cuanto más pequeño, más ruido y más privacidad**. No necesita clasificar qué es identificador: **protege todos los valores**.
* **k-anonimato:** Al menos **k** registros por cada combinación de cuasi-identificadores. Refinamientos: **l-diversidad** (diversidad del atributo sensible en cada clase) y **t-cercanía** (distribución cercana a la global).

**Diferencia crítica:** la privacidad diferencial es **composicional**. El k-anonimato **no lo es**: varias publicaciones pueden interactuar de forma impredecible y causar una pérdida catastrófica de privacidad.
      `,
      quiz: {
        question: '¿Por qué la NIST SP 800-188 recomienda evitar el término «anonimización»?',
        options: [
          'Porque está prohibido por la ley estadounidense.',
          'Porque implica irreversibilidad, y muchos procesos pueden revertirse si existe un dataset auxiliar enlazable, algo imposible de descartar.',
          'Porque es un sinónimo exacto de pseudonimización.'
        ],
        answerIndex: 1,
        explanation: 'El documento explica que muchos procedimientos pueden revertirse si se descubre un dataset que enlaza atributos con identidades. Como no se puede saber si ese dataset existe, recomienda hablar de desidentificación.'
      }
    },
    {
      id: 'nist_m3',
      title: 'Gobernanza: Objetivos, Riesgos e Impactos',
      content: `
# Gobernanza y Gestión del Riesgo (3.1–3.2)

## 3.1 Objetivos y usos previstos
Antes de desidentificar, las agencias deben **articular sus objetivos** de transparencia y limitación de la divulgación, y desarrollar un **plan escrito**. También conviene buscar asesoramiento legal sobre qué leyes aplican a los datos desidentificados.

## 3.2 Evaluar riesgos y beneficios
* El objetivo **no es eliminar el riesgo**, sino reducirlo cumpliendo los objetivos y decidir si el **riesgo residual** está justificado.
* Nadie en la evaluación debe poder **impedir** que un riesgo se documente y se discuta.
* Recursos del NIST: **NISTIR 8062**, el **Privacy Framework** y la metodología **PRAM**.
* Para la gobernanza, el NIST remite también a la [ISO/IEC 27559](/curso/27559/modulo/8).
* La distribución **controlada con acuerdos** que prohíben reidentificar reduce mucho el riesgo.

## 3.2.1 Probabilidad de reidentificación
* **KIRP (known inclusion):** Encontrar el registro de alguien que **se sabe** que está en la muestra. Se le llamaba «riesgo del fiscal».
* **UIRP (unknown inclusion):** Sin saber si está. Se le llamaba «riesgo del periodista».
* **RMP (record-matching):** Encontrar el registro de un individuo elegido de la población.
* **IP (inclusion probability):** Inferir que alguien **está** en el dataset.

Consideraciones clave:
* Cambiar la creencia del intruso (de un 50 % a un 90 %) **ya es una divulgación probabilística**.
* **Asumir intentos sostenidos y a escala mundial** de reidentificación, y dimensionar las medidas con una evaluación de riesgos.
* **No** rebajar el riesgo porque un dataset «parezca poco interesante»: puede ser un paso para reidentificar otro, o usarse para avergonzar a la agencia.
* Las **poblaciones vulnerables** y las zonas poco pobladas son más identificables.

## 3.2.2 a 3.2.4 Impactos y remediación
* **Individuos:** Fraude, robo de identidad, discriminación, violencia, daño psicológico.
* **Agencias:** Notificación obligatoria, daño reputacional, pérdida de confianza de los encuestados, sanciones.
* **Sociedad:** Desconfianza en el gobierno y en la investigación, y descrédito de la propia desidentificación.
* **Otros riesgos:** Sesgos e inexactitudes que llevan a **decisiones incorrectas**.
* **Remediación:** Educación a las víctimas, servicios de monitorización o emisión de nuevos identificadores.
      `,
      quiz: {
        question: 'Una agencia piensa que un dataset de horarios de autobús es «poco interesante» y relaja su desidentificación. ¿Qué dice la NIST SP 800-188?',
        options: [
          'Es correcto: el nivel de protección debe depender del interés del dataset.',
          'No es apropiado: un dataset inocuo puede ser un paso para reidentificar otro sensible o para avergonzar a la agencia.',
          'Los datasets de transporte no requieren desidentificación.'
        ],
        answerIndex: 1,
        explanation: 'El NIST indica que no es apropiado considerar el grado de explotación potencial al evaluar datos que se publicarán, porque los adversarios pueden tener incentivos para reidentificar datasets aparentemente inocuos.'
      }
    },
    {
      id: 'nist_m4',
      title: 'Ciclo de Vida y Modelos de Compartición',
      content: `
# Ciclo de Vida de los Datos y Modelos de Compartición (3.3–3.4)

## 3.3 Ciclo de vida
* Planificar la publicación **desde el principio** de cada nueva recogida: si un identificador no es necesario, **no se recoge**.
* Si se necesitan datos identificados internamente, se eliminan los identificadores antes de publicar, compartir o archivar.
* Contrapartida: eliminar identificadores para siempre puede impedir usos futuros, así que puede convenir conservar un dataset identificado o la información de enlace, bien protegidos.

**Qué debe documentar la agencia** sobre cada desidentificación: que las técnicas son **sólidas y generalmente aceptadas**, que el software es **fiable**, que el personal está **cualificado**, que las pruebas están **validadas** y que existe **monitorización continua**.

**Preguntas a documentar**, entre otras: ¿se recogen identificadores directos? ¿Dónde se desidentifica? ¿Se conserva el original? ¿Hay una clave para reidentificar? ¿Hay datasets que permitan reidentificar? ¿Hay un mecanismo para saber si alguien lo intenta?

## 3.4 Modelos de compartición
Combinan **seguridad** (quién ve los datos), **privacidad** (qué contienen) y **disociabilidad**.
* **Publicar y olvidar (release-and-forget):** Publicación en internet. Es difícil o imposible «retirar» los datos después.
* **Acuerdo de uso de datos (DUA):** Contrato vinculante que suele prohibir reidentificar, enlazar y redistribuir. Variantes: **investigador cualificado** y **click-through**.
* **Datos sintéticos con validación:** Se publica un dataset sintético y los análisis se validan contra los datos reales.
* **Enclave:** Los datos no salen. Los investigadores envían consultas y reciben resultados. Puede ser físico o virtual. *Ejemplo:* Los Federal Statistical Research Data Centers del Census Bureau.

## Publicaciones múltiples y muestras
* Cada publicación debe evaluarse **a la luz de las anteriores**: la combinación puede revelar identidades.
* Publicar solo una **muestra** reduce el riesgo, porque el intruso no sabe quién está, pero reduce la potencia estadística.
      `,
      quiz: {
        question: '¿Qué modelo de compartición describe el NIST cuando los datos nunca salen de un entorno segregado y los investigadores solo reciben resultados de sus consultas?',
        options: [
          'Release-and-forget',
          'Modelo de enclave',
          'Click-through'
        ],
        answerIndex: 1,
        explanation: 'En el modelo de enclave, los datos permanecen en un entorno controlado, físico o virtual, que acepta consultas de investigadores cualificados y devuelve solo resultados.'
      }
    },
    {
      id: 'nist_m5',
      title: 'Five Safes, Disclosure Review Boards y Estándares',
      content: `
# Marcos de Decisión y Estándares (3.5–3.9)

## 3.5 The Five Safes
Marco británico para diseñar y evaluar **sistemas de acceso a datos**:
1. **Safe projects:** ¿Es apropiado este uso de los datos?
2. **Safe people:** ¿Se puede confiar en que los investigadores los usarán adecuadamente?
3. **Safe data:** ¿Hay riesgo de divulgación en los propios datos?
4. **Safe settings:** ¿El entorno de acceso limita el uso no autorizado?
5. **Safe outputs:** ¿Los resultados estadísticos son no divulgativos?

Cada dimensión se evalúa **de forma independiente**. Si una falla (por ejemplo, un entorno inseguro), el proyecto no debe avanzar hasta resolverla.

## 3.6 Disclosure Review Boards (DRB)
Órganos que revisan las publicaciones de datos. Sus elementos clave son:
* **Misión y carta** escritas.
* **Miembros diversos**, incluida la dirección.
* **Solicitudes por escrito** con metodología, riesgos y plan de mitigación.
* Revisión de la metodología **y** del resultado. El DRB puede **rechazar** una publicación aunque se haya seguido un procedimiento aprobado.
* Aprobaciones que **no son indefinidas**.
* **Registros** fiables de solicitudes, aprobaciones y datos publicados.
* Mecanismo de **resolución de disputas** y **SLA**.

**DRB frente a IRB:** el IRB protege a los sujetos de investigación y aprueba **antes**. El DRB protege a titulares, instituciones y sociedad, y suele intervenir **después** de la investigación y antes de publicar.

## 3.7 Estándares de desidentificación
* **Prescriptivos:** Un procedimiento fijo. *Ejemplo:* **HIPAA Safe Harbor**, que elimina **18 tipos de identificadores**. Son fáciles de seguir, pero tienden a ser conservadores y **sin garantía matemática** de resultado.
* **Basados en riesgo:** Definen el resultado exigido. *Ejemplo:* **HIPAA Expert Determination**: un experto determina que el riesgo es «muy pequeño» y documenta métodos y resultados. Dependen de expertos que conozcan las publicaciones previas.

## 3.9 Alternativas complementarias
* **Cifrado y control de acceso.**
* **Computación segura:** **Cifrado totalmente homomórfico (FHE)** y **computación multipartita (MPC)**.
* **Entornos de ejecución confiables (TEE):** Intel SGX, ARM TrustZone, AMD SEV.
* **Enclaves físicos:** Equipos sin red y con acceso físico restringido.

Incluso con computación segura, **los resultados pueden comprometer la privacidad** si no se protegen con un mecanismo formal.
      `,
      quiz: {
        question: 'En el marco Five Safes, un proyecto tiene investigadores de confianza, datos de bajo riesgo y resultados no divulgativos, pero el centro de acceso tiene seguridad interna deficiente. ¿Qué debe ocurrir?',
        options: [
          'Avanzar, porque 4 de 5 dimensiones son seguras.',
          'No avanzar hasta resolver la dimensión «Safe settings».',
          'Publicar los datos en internet para evitar el centro.'
        ],
        answerIndex: 1,
        explanation: 'Las dimensiones se evalúan de forma independiente, y el propio NIST usa este ejemplo: si el entorno no es seguro, el proyecto no debe avanzar hasta resolverlo.'
      }
    },
    {
      id: 'nist_m6',
      title: 'Pasos Técnicos (I): Objetivos, Inventario y Proceso',
      content: `
# Pasos Técnicos para la Desidentificación (4.1–4.3)

## 4.1 Objetivos de privacidad, utilidad y acceso
Preguntas previas: ¿De dónde vienen los datos? ¿Qué **promesas** se hicieron al recogerlos? ¿Qué requisitos legales aplican? ¿Cuál es el propósito y el uso previsto? ¿Qué modelo de compartición y qué estándar se usarán? ¿Qué nivel de riesgo se acepta?

Metas posibles de reidentificación: «nadie puede ser reidentificado», «solo unos pocos», «solo los valores atípicos», «un pequeño porcentaje compartido por todos»... Algunas son **incompatibles** entre sí.

## 4.2 Inventario de datos (data survey)
Cada **modalidad** requiere técnicas distintas:
* **Tabular:** La más estudiada, con identificadores y cuasi-identificadores. El k-anonimato es común, pero si se **clasifican mal** los cuasi-identificadores, la evaluación es incorrecta.
* **Fechas y horas:** Enlazan con la realidad externa (el paso del tiempo). Fechas públicas, como el nacimiento o la defunción, son de alto riesgo.
* **Geografía:** Algunos lugares son muy identificativos.
* **Texto no estructurado:** Puede contener nombres y cuasi-identificadores ocultos.
* **Fotos y vídeo:** Etiquetas visibles, metadatos y biometría.
* **Imagen médica:** Identificadores «quemados» en la imagen y metadatos DICOM.
* **Secuencias genéticas:** **No existe un método conocido para desidentificarlas de forma fiable.**

## 4.3 Proceso basado en eliminar identificadores y transformar cuasi-identificadores
Protocolo inspirado en El Emam y Malin:
1. Determinar el **umbral de riesgo** de reidentificación.
2. Determinar qué información puede identificar: directos, cuasi-identificadores y datos de alta dimensionalidad.
3. Determinar los **identificadores directos**.
4. **Enmascarar** los identificadores directos.
5. Realizar el **modelado de amenazas**.
6. Determinar la **exactitud mínima aceptable**.
7. Definir la transformación de los cuasi-identificadores, con especial atención a **fechas y geografía**.
8. Importar una muestra de prueba.
9. Revisar la desidentificación de prueba.
10. Transformar los cuasi-identificadores de todo el dataset.
11. **Evaluar el riesgo real** de reidentificación.
12. **Compararlo con el umbral.**
13. Si no pasa, **ajustar y repetir** los pasos 11 y 12 (más transformación o eliminación de valores atípicos).

Ventaja: conceptualmente sencillo y con larga tradición. Desventaja: **no se basa en métodos formales**.
      `,
      quiz: {
        question: 'Según la NIST SP 800-188, ¿qué tipo de dato NO tiene actualmente un método conocido para desidentificarse de forma fiable?',
        options: ['Fechas de nacimiento', 'Secuencias genéticas', 'Códigos postales'],
        answerIndex: 1,
        explanation: 'El documento afirma que no existe un método conocido para desidentificar de forma fiable las secuencias genéticas, que pueden identificar incluso a familiares mediante bases genealógicas.'
      }
    },
    {
      id: 'nist_m7',
      title: 'Pasos Técnicos (II): Técnicas de Transformación',
      content: `
# Técnicas de Transformación (4.3.1–4.3.7)

## 4.3.1 Identificadores directos
* **Eliminación:** Sustituir por NULL o NA.
* **Enmascaramiento:** XXXXXX o 999999.
* **Cifrado:** La clave puede descartarse o custodiarse aparte.
* **Hash con clave (keyed hash):** Por ejemplo, **HMAC SHA-256 con clave aleatoria de 256 bits**. **Un hash sin clave no protege**: se pueden probar todos los valores posibles.
* **Palabras clave:** «George Washington» → «PACIENTE». Cuidado: «PRESIDENTE» sería igual de identificativo.
* **Sustitutos realistas:** «George Washington» → «Abraham Polk». Ayuda a camuflar identificadores que se hayan escapado.

El cifrado, el hash con clave y los sustitutos son **pseudonimización**. En una tabla de correspondencias, los seudónimos deben asignarse **aleatoriamente** y la tabla debe estar **muy protegida**.

## 4.3.2 Nota de seguridad
Un error de procedimiento o la filtración de la clave **compromete todo el dataset**, y no hay forma de verificar que una clave no se ha filtrado. Por eso **no se recomienda** proteger identificadores directos con cifrado o hash.

## 4.3.3 Cuasi-identificadores numéricos
* **Top/bottom coding:** HIPAA Safe Harbor agrupa las edades de más de 89 años en «90 o más».
* **Microagregación:** Agrupar microdatos en grupos pequeños.
* **Generalizar categorías con conteos bajos:** «4 personas con ojos azules, verdes o avellana».
* **Supresión de celdas** por debajo de un umbral.
* **Borrado e imputación.**
* **Intercambio (swapping)** de atributos entre registros similares. Mantiene las estadísticas regionales, pero puede romper relaciones y **no tiene garantías formales**.
* **Adición de ruido:** Aumenta la varianza y provoca **sesgo de atenuación** en regresiones. Ciertas formas sí tienen garantías formales.

Las agencias deben **documentar** las técnicas y parámetros usados, porque sin transparencia los usuarios sacan conclusiones erróneas.

## 4.3.4 a 4.3.7 Fechas, geografía, genómica y texto
* **Fechas:** Generalizar al año (Safe Harbor), **desplazar** todas las fechas de una persona la misma cantidad aleatoria o perturbar los intervalos manteniendo el orden. Hay que conservar lo relevante, como el día de la semana o las edades clave (62 años para la jubilación).
* **Geografía:** El ruido necesario depende de la densidad: **±100 m** pueden bastar en ciudad y en zona rural pueden hacer falta **±5 km o más**. Hay que evitar incoherencias, como mover una casa al mar. Los patrones casa-trabajo reidentifican con muy pocos puntos. Caso real (2021): la compra de geolocalización «desidentificada» de una app de citas permitió identificar a un alto cargo religioso.
* **Texto narrativo:** Área de investigación activa. Los métodos de los 80 y 90 pueden no bastar en la era de los buscadores y las redes sociales.
      `,
      quiz: {
        question: '¿Por qué la NIST SP 800-188 advierte que un hash SIN clave (p. ej., SHA-256 del número de la seguridad social) no protege un identificador directo?',
        options: [
          'Porque SHA-256 está roto criptográficamente.',
          'Porque un atacante puede calcular el hash de todos los valores posibles (fuerza bruta) y encontrar coincidencias.',
          'Porque los hashes ocupan demasiado espacio.'
        ],
        answerIndex: 1,
        explanation: 'Si el espacio de valores posibles es limitado, como los números de la seguridad social, basta con calcular el hash de todos ellos. Por eso se necesita un hash con clave secreta, y aun así el NIST no recomienda este enfoque.'
      }
    },
    {
      id: 'nist_m8',
      title: 'Desafíos, Fallos y Monitorización Posterior',
      content: `
# Desafíos de la Desidentificación (4.3.8–4.3.13)

## 4.3.8 La agregación no garantiza privacidad
*Ejemplo del NIST:* Un colegio publica en octubre cuántos alumnos están por debajo, en y por encima del nivel de lectura. Un solo alumno nuevo llega el 15 de octubre y el colegio actualiza la tabla en noviembre. **Comparando ambas tablas** se deduce su nivel. Si alguien sabe quién es el alumno nuevo, ha descubierto un dato privado.

«Los datos agregados dan una **falsa sensación de seguridad**». La alternativa son primitivas de agregación con privacidad formal, basadas en ruido calibrado.

## 4.3.9 Alta dimensionalidad
Aunque se eliminen los identificadores, un patrón único de muchos valores puede enlazarse. *Ejemplo:* Narayanan y Shmatikov demostraron que **las películas que alguien ha visto** pueden identificarlo si existe otro dataset de valoraciones públicas.

## 4.3.10 Datos enlazados
Los seudónimos, los identificadores familiares o de dispositivo y la geografía **enlazan** registros. Una larga serie de mediciones de ritmo cardíaco es una «firma» única. Incluso las dependencias implícitas enlazan: si los nuevos empleados hacen un test en su primera semana, se pueden cruzar datasets por fechas.

## 4.3.11 Composición
Combinar publicaciones produce efectos **impredecibles**. La privacidad diferencial **compone**: publicar con ε = 1 y ε = 1,5 da una pérdida total de como máximo **ε = 2,5**. La mayoría de las otras técnicas no permiten calcularlo.

Surge cuando: el mismo dataset se da a varios usuarios, se publican instantáneas periódicas, la tecnología revela nuevos aspectos o un proceso judicial obliga a revelar partes sin desidentificar.

## 4.3.12 Fallos posibles
* Umbral de riesgo inadecuado. Hay que elegir el **más conservador** que cumpla los objetivos de utilidad.
* **Identificadores olvidados.** En caso de duda, asumir que son identificativos.
* **Amenazas no modeladas**, sobre todo datasets enlazables actuales y futuros.
* Transformaciones ineficaces. Mejor usar técnicas con un historial de éxito.
* **Fallo de utilidad:** Datos inútiles para su propósito, que obligan a nuevas publicaciones y a más riesgo de combinación.

## 4.3.13 Monitorización posterior
La identificabilidad **puede aumentar con el tiempo**, por ejemplo por una brecha en un dataset interno enlazable o por publicaciones de terceros. Hay que tener un **plan de acción**: recalcular la probabilidad, revisar políticas o notificar al público. Usar modelos que no dependan del conocimiento previo del intruso reduce esta carga.
      `,
      quiz: {
        question: 'Una agencia publica dos datasets del mismo origen con privacidad diferencial, con ε = 1 y ε = 1,5. ¿Cuál es la pérdida de privacidad total máxima?',
        options: ['ε = 1,5 (el mayor)', 'ε = 2,5 (la suma)', 'No se puede calcular'],
        answerIndex: 1,
        explanation: 'La privacidad diferencial es composicional: la pérdida total está acotada por la suma de los ε. Es una de sus ventajas principales frente a técnicas como el k-anonimato.'
      }
    },
    {
      id: 'nist_m9',
      title: 'Datos Sintéticos, Privacidad Diferencial y Consultas',
      content: `
# Datos Sintéticos y Consultas Interactivas (4.4–4.5)

## Tipos de datos (Tabla 3)
* **Parcialmente sintéticos:** Se reemplazan filas, columnas o celdas con valores de un modelo o con ruido. **Sin garantías formales.** Buena práctica: indicar que hay valores imputados sin revelar cuáles.
* **Datos de prueba:** Estructura válida sin intención de preservar inferencias. Deben ser **visiblemente artificiales** («FIRSTNAME1 LASTNAME2»).
* **Datos de prueba realistas:** Parecen reales pero **no derivan** de los datos confidenciales. Pueden confundirse con datos reales.
* **Totalmente sintéticos:** Sin correspondencia uno a uno con los registros originales. Se genera un modelo de alta fidelidad y se simula.

## Ventajas e inconvenientes de los totalmente sintéticos
* **Ventajas:** Difícil vincular registros con personas, garantías potencialmente **demostrables** y que se mantienen ante publicaciones futuras.
* **Inconvenientes:** Menos útiles para rendición de cuentas (las «personas» no existen), pueden no capturar interacciones que no estén en el modelo, los modelos de deep learning pueden **memorizar** datos de entrenamiento y los usuarios pueden no saber que son sintéticos (conviene marcarlo **en los propios datos**).
* **No tienen riesgo cero**: derivan de información no pública.
* Es **imposible** construir datos sintéticos que representen fielmente **todas** las propiedades del original con garantías fuertes de privacidad.

## 4.4.7 Privacidad diferencial en la práctica
* Idea: el resultado M(D) apenas cambia si se añade o quita a una persona p: M(D) ≈ M(D − p).
* **ε entre 0 e ∞:** Con ε = 0 la salida no depende de los datos. A **mayor ε, más exactitud y más pérdida de privacidad**.
* Muchos artículos usan **ε = 1** sin justificarlo. Elegir ε de forma fundamentada sigue siendo **investigación abierta**.
* No protege frente a inferencias que se harían **igualmente sin tus datos** (por ejemplo, «los de Vermont conducen 4x4»).
* **Despliegues reales:** OnTheMap del Census Bureau, el **Censo 2020** y el College Scorecard. En diciembre de 2022, el Census Bureau **pospuso** su aplicación a la American Community Survey.
* No existe aún una implementación que pueda usar alguien **sin experiencia** en privacidad diferencial.

## 4.5 Interfaz de consultas interactiva
* Resultados con ruido (por ejemplo, privacidad diferencial), revisión manual o consultas sobre datos sintéticos con aviso si difieren de los reales.
* **Cada consulta consume privacidad.** Con un presupuesto finito hay que añadir más ruido, aceptar más riesgo o dejar de responder, lo que puede generar **inequidad** entre los primeros y los últimos usuarios.
* Hay que **registrar consultas y resultados** para disuadir y detectar abusos.
* Alternativa: gastar el presupuesto una vez en generar un dataset sintético, lo que además da resultados consistentes para todos.
      `,
      quiz: {
        question: 'En privacidad diferencial, ¿qué ocurre al aumentar el parámetro ε?',
        options: [
          'Más ruido y más privacidad.',
          'Más exactitud y más pérdida de privacidad.',
          'No afecta a la privacidad, solo al rendimiento.'
        ],
        answerIndex: 1,
        explanation: 'Un ε mayor permite que la salida dependa más de los datos individuales: mejora la exactitud y aumenta la pérdida de privacidad. Con ε = 0 la salida no depende en absoluto de los datos.'
      }
    },
    {
      id: 'nist_m10',
      title: 'Validación, Software y Conclusiones',
      content: `
# Validación, Software y Conclusiones (4.6, 5 y 6)

## 4.6 Validar un dataset desidentificado
* **Utilidad:** Comparar estadísticas del original y del desidentificado, o recurrir a terceros de confianza. Fijar **objetivos de exactitud**: limitar la exactitud a lo necesario también protege la privacidad.
* **Privacidad:** Revisar datos **y metadatos**, comprobar el k-anonimato si se exige, cuestionar los supuestos por defecto del software y hacer **pruebas de intruso motivado** (ver el código de prácticas de anonimización del ICO británico).

## 4.6.3 Estudios de reidentificación
* **Micro (dirigidos):** Buscan a una persona concreta. Caso clásico: el gobernador **William Weld**, cuyo historial médico se enlazó con el censo electoral.
* **Macro (masivos):** Buscan reidentificar a muchos. *Ejemplo:* La simulación del Census Bureau sobre el Censo 2010.
* **Tasa de reidentificación condicional:** Enlaces confirmados entre enlaces sospechosos, que equivale a la **precisión**. Si supera el umbral, no se debe publicar fuera de un entorno controlado.
* Un intruso externo **no puede validar** sus enlaces porque no tiene los datos confidenciales. La agencia sí puede.

## 5. Software de desidentificación
* Evaluar primero la **técnica**: que sea adecuada y no esté superada, sin fiarse solo de «siempre lo hemos hecho así».
* Funciones de las herramientas: detectar identificadores, calcular el riesgo, desidentificar, mapear seudónimos y revelar seudónimos de forma selectiva.
* Una herramienta puede tratar bien las tablas e **ignorar el texto libre**, así que hay que validarla para las modalidades reales.
* Las herramientas de **enmascaramiento de datos** (pensadas para pruebas de software) **no deben usarse** para desidentificar datos destinados a publicación.
* Verificar: **corrección**, **contención** (sin fugas, ni siquiera por aritmética de coma flotante o por tiempos), **usabilidad**, **eficiencia**, **escalabilidad**, **repetibilidad** y **transparencia**.

## 5.4 Exactitud: casos reales
* **edX (MIT y Harvard):** El k-anonimato redujo el porcentaje de alumnas matriculadas del **29 % al 26 %**.
* **Dosificación de warfarina:** Niveles de privacidad diferencial eficaces contra ataques aumentaban en simulación el riesgo de ictus, hemorragias y mortalidad.

## 6. Conclusión: tres modelos
1. **Desidentificación tradicional:** Supresión de directos y manipulación de cuasi-identificadores.
2. **Datos sintéticos.**
3. **Interfaz de consultas.**

Se pueden **combinar**. Los modelos formales, como la privacidad diferencial, protegen con independencia de futuras publicaciones, pero son recientes. Hay que establecer **gobernanza**: DRB, formación, investigación y monitorización posterior.
      `,
      quiz: {
        question: '¿Por qué la NIST SP 800-188 desaconseja usar herramientas de enmascaramiento de datos (data masking) para preparar datasets de publicación?',
        options: [
          'Porque son demasiado lentas.',
          'Porque eliminan identificadores directos pero, en general, no tratan los cuasi-identificadores conforme a un análisis de riesgo.',
          'Porque están prohibidas por HIPAA.'
        ],
        answerIndex: 1,
        explanation: 'Estas herramientas se diseñaron para dar datos realistas a desarrolladores y testers con protección mínima. Sin controles adicionales, no deben usarse para datasets destinados a publicación.'
      }
    }
  ]
};
