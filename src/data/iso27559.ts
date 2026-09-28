export const iso27559Course = {
  id: '27559',
  title: 'ISO/IEC 27559:2022 De-identification',
  description: 'Marco de desidentificación de datos para mejorar la privacidad',
  modules: [
    {
      id: '27559_m1',
      title: 'Introducción, Alcance y Disponibilidad de Datos',
      content: `
# ISO/IEC 27559:2022 — Marco de Desidentificación

La desidentificación permite **usar datos con PII sin identificar ni comprometer la privacidad** de las personas. La 27559 ofrece un **marco de implementación** para gobernar el uso adecuado de las técnicas de desidentificación. Las técnicas en sí se describen en **ISO/IEC 20889**.

> Nota de estudio: los ejemplos son interpretaciones prácticas; consulta el texto oficial para la redacción exacta.

## Alcance (Cláusula 1)
Marco para **identificar y mitigar los riesgos de reidentificación** y los riesgos del ciclo de vida de los datos desidentificados. Aplica a organizaciones de cualquier tipo y tamaño que sean **responsables** del tratamiento de PII, o **encargados** que actúan en su nombre.

## Referencias normativas
* **ISO/IEC 27000:** Vocabulario del SGSI.
* **ISO/IEC 20889:** Terminología y clasificación de técnicas de desidentificación.
* **ISO 31000:** Gestión del riesgo.

## Idea central
La desidentificación **no es solo transformar datos**. Requiere evaluar:
1. **El entorno:** Qué información adicional tiene un adversario, qué posibilidades de ataque existen y qué motivación hay para reidentificar.
2. **Los datos:** Cómo esa información adicional podría usarse para revelar PII, por identificación directa o por **inferencia**.

## Tres formas de poner datos a disposición (Figura 1)
* **Uso y reutilización (interno):** El custodio mantiene la supervisión y los datos se usan dentro de la organización.
* **Compartición externa:** El custodio mantiene la supervisión, pero el destinatario es externo. *Ejemplo:* Un portal de acceso virtual o un centro de datos físico.
* **Publicación externa:** El custodio **transfiere la supervisión** al destinatario externo. *Ejemplo:* Datos abiertos.

El marco puede aplicarse **en cualquier punto del ciclo de vida**: al diseñar la recogida, al reutilizar internamente, al compartir o al archivar.

**Término a destacar:** la norma usa **«data principal»**, más amplio que «PII principal». Incluye también organizaciones y dispositivos.
      `,
      quiz: {
        question: 'Un hospital publica un dataset en un portal de datos abiertos, de modo que ya no controla quién lo descarga. ¿Qué modo de disponibilidad describe la ISO 27559?',
        options: [
          'Uso y reutilización interna',
          'Compartición externa',
          'Publicación externa (external release)'
        ],
        answerIndex: 2,
        explanation: 'En la publicación externa, el custodio transfiere la supervisión de los datos al destinatario y ya no controla directamente quién accede.'
      }
    },
    {
      id: '27559_m2',
      title: 'Términos Clave y Visión General del Marco',
      content: `
# Términos y Estructura del Marco

## Términos clave (Cláusula 3)
* **Custodio (custodian):** Persona o entidad que tiene la custodia, el control o la posesión de la información.
* **Destinatario (data recipient):** Quien accede a los datos, o a quien se comparten o publican.
* **Adversario:** Individuo o unidad que puede explotar vulnerabilidades, **intencionadamente o no**. En la literatura se usan como sinónimos atacante, intruso o *snooper*.
* **Modelado de amenazas:** Técnica sistemática para exponer circunstancias o eventos que pueden causar daño.
* **PIA (evaluación de impacto de privacidad):** Proceso de identificar, analizar, evaluar, consultar, comunicar y planificar el tratamiento de los impactos en la privacidad.
* **Población definida:** Conjunto del que se extrae el dataset y que contribuye a la capacidad del adversario para identificar.
* **Muestra (sample):** Dataset que es solo una proporción de la población, de modo que el adversario **no puede estar seguro** de que una entidad concreta esté en él.
* **Divulgación (disclosure):** Revelar información confidencial o PII explotando una vulnerabilidad.
* **Datos compartidos (shared data):** Dataset al que el custodio ha concedido acceso a un **conjunto fijo** de entidades.
* **Datos publicados (released data):** Dataset en el que el custodio **ya no controla directamente** quién accede.
* **Modelo de privacidad de datos:** Enfoque de aplicación de técnicas que permite **calcular la identificabilidad**.
* **Acuerdo escrito:** Acuerdo de compartición de datos, memorando de entendimiento, contrato...
* **Gobernanza de la desidentificación:** Sistema para dirigir y controlar el proceso de desidentificación.

## Las cuatro partes del marco (Cláusula 5)
1. **Contexto (Cláusula 6):** Evaluar el entorno y las circunstancias en que se ponen a disposición los datos. El riesgo también se gestiona con **controles contextuales**.
2. **Datos (Cláusula 7):** Evaluar los datos para decidir cómo limitar lo que se pone a disposición, por ejemplo transformándolos.
3. **Identificabilidad (Cláusula 8):** Depende del **riesgo de contexto** (la probabilidad de un ataque) y del **riesgo de los datos** (la probabilidad de divulgación si hay ataque). Debe quedar **por debajo de una tolerancia predefinida**.
4. **Gobernanza (Cláusula 9):** Procedimientos documentados antes, durante y después de poner los datos a disposición.

**Es un proceso iterativo:** si el resultado no cumple los criterios de aceptación, se repite. Por ejemplo, mejorando las prácticas de seguridad del entorno para poder entregar datos con **más utilidad**.
      `,
      quiz: {
        question: 'Según la cláusula 5 de la ISO 27559, ¿de qué depende la identificabilidad?',
        options: [
          'Solo del número de columnas del dataset.',
          'Del riesgo de contexto (probabilidad de ataque) y del riesgo de los datos (probabilidad de divulgación si hay ataque).',
          'Solo de si los datos están cifrados.'
        ],
        answerIndex: 1,
        explanation: 'La norma define la identificabilidad como función del riesgo de contexto y del riesgo de los datos, y exige que quede por debajo de una tolerancia predefinida.'
      }
    },
    {
      id: '27559_m3',
      title: 'Evaluación del Contexto (I): Modelado de Amenazas',
      content: `
# Cláusula 6: Evaluación del Contexto (Parte 1)

## 6.1 General
El custodio **debe** evaluar el contexto en que los datos se ponen a disposición, ya sea con acceso compartido o entregando una copia. Esto incluye el **entorno** y las **circunstancias**, como el nivel de transparencia. Recuerda: la divulgación **solo ocurre si el ataque tiene éxito**.

*Ejemplo:* Usar checklists para categorizar el riesgo del entorno e integrarlas en una matriz de riesgo estándar (probabilidad de ataque frente a impacto).

## 6.2.1 Modelado de amenazas
Proceso **objetivo y estructurado** para evaluar el entorno: personas y sus motivos, otros datos a los que tienen acceso, infraestructura y gobernanza (controles de ISO/IEC 27002 e ISO/IEC 27701, políticas de acceso...). Se trata de esbozar el **quién, por qué y cómo** de una posible divulgación.

Tipos de amenaza:
* **Deliberada:** Intento dirigido de un **insider** del destinatario de revelar PII.
* **Accidental:** Divulgación no intencionada. *Ejemplo:* Un analista reconoce a su vecino mientras trabaja con los datos.
* **Ambiental:** Pérdida o robo de los datos cuando **todos los controles han fallado**.

## 6.2.2 Prácticas de seguridad y privacidad
* Las prácticas del destinatario influyen en la probabilidad de que un **empleado desleal** reidentifique los datos. Sin controles fuertes, puede ignorar el contrato.
* También influyen en la probabilidad de que un **externo** acceda, directamente o robando credenciales de un insider.
* La evaluación de controles mitigadores **debe ser detallada y basada en evidencias**.
* Para no imponer cargas excesivas, se pueden considerar **auditorías de terceros, certificaciones** y análisis previos.
      `,
      quiz: {
        question: 'Un investigador que trabaja con un dataset desidentificado reconoce por casualidad a un familiar por la combinación de sus datos. Según 6.2.1, ¿qué tipo de amenaza es?',
        options: ['Deliberada', 'Accidental', 'Ambiental'],
        answerIndex: 1,
        explanation: 'La norma describe como accidental la divulgación no intencionada, por ejemplo cuando un destinatario reconoce a un individuo mientras trabaja con los datos.'
      }
    },
    {
      id: '27559_m4',
      title: 'Evaluación del Contexto (II): Motivos, Transparencia e Impacto',
      content: `
# Cláusula 6: Evaluación del Contexto (Parte 2)

## 6.2.3 Motivos y capacidad para reidentificar
Los motivos del destinatario se controlan en parte con formación, concienciación y **obligaciones en acuerdos escritos** (ver ISO/IEC 23751), siempre que sean **exigibles**. Obligaciones típicas:
* Formación en riesgos de divulgación para quien accede a los datos.
* **Prohibir intentos de identificar** a los titulares o de **enlazar** datos que amplíen sus perfiles sin permiso expreso.
* Permitir **auditorías** o comprobaciones puntuales, posiblemente por terceros.
* Prohibir compartir con otros destinatarios sin permiso.
* Definir el **entorno** de acceso: infraestructura y gobernanza esperadas.
* Definir los **casos de uso aceptables**.

Nota: en la publicación como **datos abiertos**, la exigibilidad de estas obligaciones puede ser menos efectiva.

## 6.3 Transparencia y evaluación de impacto
El custodio **debe** evaluar el impacto de una divulgación, que determina la **tolerancia** al evaluar la identificabilidad. Factores:
* Ser transparente y dialogar con las partes interesadas.
* Si los datos son **muy sensibles**, íntimos o proceden de **poblaciones vulnerables**, o pueden ser estigmatizantes.
* El daño potencial a los titulares.
* La **confiabilidad** del destinatario: acuerdos, historial, incentivos.
* Si los fines de la compartición están alineados con el **interés de los titulares**.
* Si el destinatario evaluará sus usos, por ejemplo con PIAs.
* Posibles vulneraciones de principios legales o derechos fundamentales.

## 6.3.2 Transparencia y participación
Publicar una descripción de la compartición y su justificación, y estar abierto a opiniones para comprender y, si procede, atender las preocupaciones.

**Relación clave:** a mayor impacto potencial, **menor tolerancia** a la identificabilidad y, por tanto, más transformación o más controles.
      `,
      quiz: {
        question: 'Según 6.3, si un dataset contiene información de salud mental de una población vulnerable, ¿qué efecto tiene sobre la tolerancia de identificabilidad?',
        options: [
          'La tolerancia aumenta, porque los datos son valiosos.',
          'La tolerancia disminuye: el mayor impacto potencial exige un umbral de identificabilidad más estricto.',
          'No tiene efecto.'
        ],
        answerIndex: 1,
        explanation: 'La evaluación de impacto determina la tolerancia. Datos sensibles o de poblaciones vulnerables implican más daño potencial y, por tanto, un umbral más estricto.'
      }
    },
    {
      id: '27559_m5',
      title: 'Evaluación de los Datos y Modelado de Ataques',
      content: `
# Cláusula 7: Evaluación de los Datos

## 7.2 Características de los datos
* **Titulares de datos (data principals):** A quién se refieren los datos: personas, organizaciones o dispositivos. Poblaciones pequeñas o grupos con rasgos únicos aumentan el riesgo.
* **Tipos de atributos:**
    * **Identificadores directos:** Identifican por sí solos. *Ejemplo:* Nombre, número de documento, email.
    * **Identificadores indirectos (cuasi-identificadores):** Identifican **en combinación** o enlazados con información externa. *Ejemplo:* Fecha de nacimiento + código postal + sexo.
    * **Otros atributos:** Incluidos los **sensibles**, que no identifican pero cuya revelación causa daño (diagnóstico, ingresos).
* **Tipo de dataset:** Por ejemplo, datos transversales frente a longitudinales. Los longitudinales, con muchos eventos por persona, suelen ser más identificables.
* El **Anexo A** ofrece ejemplos de identificadores.

## 7.3 Modelado de ataques
* **Riesgo máximo frente a medio:** El riesgo máximo mide el registro **más expuesto** y es apropiado para la **publicación**, donde un adversario puede atacar al registro más vulnerable. El riesgo medio promedia sobre todos los registros y puede ser adecuado en **compartición controlada**, donde el ataque dirigido es menos probable gracias a los controles.
* **Ataque basado en población o en muestra:** Si el adversario **sabe** que la persona está en el dataset, el riesgo es mayor. Si el dataset es una **muestra** de la población, hay incertidumbre sobre la pertenencia, y eso reduce el riesgo.
* **Modelos de privacidad de datos:** Permiten **calcular** la identificabilidad.
    * **k-anonimato:** Cada combinación de cuasi-identificadores aparece en al menos k registros.
    * **Privacidad diferencial:** Limita matemáticamente cuánto puede cambiar un resultado por la presencia o ausencia de un individuo.
      `,
      quiz: {
        question: 'Vas a publicar un dataset como datos abiertos. Según el modelado de ataques de 7.3, ¿qué medida de riesgo es más apropiada?',
        options: [
          'Riesgo medio, porque es más representativo.',
          'Riesgo máximo, porque un adversario puede atacar al registro más vulnerable.',
          'Ninguna; los datos abiertos no tienen riesgo.'
        ],
        answerIndex: 1,
        explanation: 'En una publicación no hay controles contextuales que limiten los ataques dirigidos, así que se evalúa el peor caso (riesgo máximo). El riesgo medio suele reservarse para entornos de compartición controlada.'
      }
    },
    {
      id: '27559_m6',
      title: 'Evaluación de la Identificabilidad',
      content: `
# Cláusula 8.2: Evaluar la Identificabilidad

## 8.2.2 Cuantificar la identificabilidad
Se combinan los dos riesgos del marco:

**P(identificación) = P(identificación | ataque) × P(ataque)**

* **P(ataque):** Viene de la evaluación del **contexto**: amenazas deliberadas, accidentales o ambientales, controles y motivos.
* **P(identificación | ataque):** Viene de la evaluación de los **datos**: cuasi-identificadores, tamaño de las clases de equivalencia y modelo de ataque.

El resultado se compara con una **tolerancia (umbral)** definida según el impacto (6.3).

*Ejemplo ilustrativo:* Si la tolerancia es 0,1 y el contexto garantiza que P(ataque) = 1, como en una publicación abierta, cada registro debe ser indistinguible de al menos 10, ya que 1/10 = 0,1. Si la compartición es controlada y el contexto reduce P(ataque) a 0,3, el requisito sobre los datos se relaja.

## El Anexo B
Ofrece **ejemplos de umbrales de referencia** (*threshold identifiability benchmarks*) para fijar la tolerancia según la sensibilidad y el contexto.

## 8.2.3 Pruebas adversariales
Además del cálculo, se puede **atacar deliberadamente** el dataset para comprobar si se puede reidentificar, por ejemplo con una prueba de «intruso motivado»:
* Personas competentes intentan reidentificar usando fuentes disponibles.
* Sirve para **validar** las suposiciones del cálculo y descubrir cuasi-identificadores olvidados.

## Idea clave
La identificabilidad **no es una propiedad solo de los datos**: el mismo dataset puede ser aceptable en un enclave seguro y excesivamente arriesgado como datos abiertos.
      `,
      quiz: {
        question: 'El mismo dataset desidentificado se evalúa como aceptable para un enclave de investigación seguro, pero no para publicarlo en internet. ¿Por qué, según la ISO 27559?',
        options: [
          'Porque en internet los datos ocupan más espacio.',
          'Porque la identificabilidad depende también del contexto: en el enclave, la probabilidad de ataque es menor.',
          'Es un error; un dataset tiene siempre la misma identificabilidad.'
        ],
        answerIndex: 1,
        explanation: 'La identificabilidad combina el riesgo de los datos con la probabilidad de ataque. Los controles del enclave reducen esa probabilidad, así que el mismo dataset puede cumplir el umbral allí y no en una publicación abierta.'
      }
    },
    {
      id: '27559_m7',
      title: 'Mitigación: Entorno, Transformación y Reevaluación',
      content: `
# Cláusula 8.3: Mitigación

Si la identificabilidad supera la tolerancia, hay **dos palancas** que pueden combinarse y después se **reevalúa**.

## 8.3.2 Reconfigurar el entorno
Reducir P(ataque) **sin tocar los datos**, lo que preserva su utilidad:
* Pasar de publicación a **compartición controlada** o a un enclave.
* Reforzar los **acuerdos escritos**, las auditorías y la formación.
* Mejorar los controles de seguridad del destinatario: acceso, registro, prohibición de exportar.

## 8.3.3 Transformar los datos
Reducir P(identificación | ataque). Técnicas descritas en **ISO/IEC 20889**:
* **Supresión:** Enmascaramiento, supresión local de valores o supresión de registros completos (valores atípicos).
* **Generalización:** Redondeo, codificación superior/inferior (*top/bottom coding*), combinación de categorías. *Ejemplo:* Edad 34 → rango 30-39.
* **Aleatorización:** Adición de ruido, permutación o microagregación.
* **Muestreo:** Publicar solo una muestra, lo que introduce incertidumbre de pertenencia.
* **Pseudonimización:** Sustituir identificadores por seudónimos. **Es reversible** con información adicional (una tabla o una clave), así que los datos siguen considerándose personales.
* **Datos sintéticos:** Datos generados a partir de un modelo.

## 8.3.4 Reevaluación
Tras mitigar, se **recalcula** la identificabilidad. El ciclo se repite hasta cumplir la tolerancia o concluir que el caso de uso no es viable.

## Equilibrio riesgo-utilidad
Cada transformación **reduce la utilidad**. Por eso el marco prefiere a menudo combinar controles de contexto con transformaciones moderadas, en lugar de destruir el valor analítico de los datos.

**Pseudonimización frente a anonimización:** la pseudonimización mantiene un vínculo recuperable. La anonimización pretende que la reidentificación **no sea razonablemente posible**, y eso siempre depende del contexto y de los medios disponibles.
      `,
      quiz: {
        question: 'Sustituyes el nombre de los pacientes por un UUID y guardas en otro servidor una tabla que permite recuperar los nombres. ¿Qué técnica aplicaste y cómo deben tratarse los datos?',
        options: [
          'Anonimización; ya no son datos personales.',
          'Pseudonimización; sigue siendo reversible, así que los datos siguen siendo personales.',
          'Generalización; los datos quedan fuera de toda regulación.'
        ],
        answerIndex: 1,
        explanation: 'La pseudonimización es reversible con información adicional (la tabla de correspondencias), por lo que los datos siguen considerándose personales y requieren protección.'
      }
    },
    {
      id: '27559_m8',
      title: 'Gobernanza de la Desidentificación',
      content: `
# Cláusula 9: Gobernanza de la Desidentificación

La gobernanza garantiza que las evaluaciones y mitigaciones se hagan de forma **consistente y eficaz, ahora y en el futuro**.

## 9.2 Antes de poner los datos a disposición
* **9.2.2 Asignar roles y responsabilidades:** Quién decide, quién ejecuta la desidentificación y quién la revisa. *Ejemplo:* Un comité de revisión de divulgaciones, independiente del equipo que transforma los datos.
* **9.2.3 Principios, políticas y procedimientos:** Documentar metodologías, tolerancias aceptables, criterios de aceptación y plantillas de acuerdos.
* **9.2.4 Identificar y gestionar una divulgación:** Registrar qué datos se entregan, a quién, con qué transformaciones, bajo qué acuerdo y con qué evaluación de riesgo.
* **9.2.5 Comunicación con partes interesadas:** Transparencia sobre las prácticas de compartición.

## 9.3 Después de poner los datos a disposición
* **9.3.2 Monitorizar el entorno de datos:** La identificabilidad **cambia con el tiempo**. Aparecen nuevos datasets públicos, técnicas de ataque y otras publicaciones propias que pueden combinarse. *Ejemplo:* Revisar periódicamente las publicaciones pasadas y el cumplimiento de los acuerdos por parte de los destinatarios.

## 9.4 Mitigación en caso de incidente
Tener un plan para cuando se produce una reidentificación o una violación de un acuerdo: contención, evaluación del daño, notificación si procede y revisión de las prácticas.

## Anexos
* **Anexo A (informativo):** Ejemplos de identificadores.
* **Anexo B (informativo):** Ejemplos de umbrales de identificabilidad.

## Relación con otras normas
* **ISO/IEC 20889:** El «qué» (técnicas).
* **ISO/IEC 27559:** El «cómo gobernarlo» (proceso basado en riesgo).
* **[NIST SP 800-188](/curso/nist800-188):** Guía del gobierno de EE.UU. que cita la 27559 como referencia de gobernanza.
      `,
      quiz: {
        question: 'Dos años después de publicar un dataset desidentificado, aparece un nuevo dataset público que podría enlazarse con él. ¿Qué parte de la gobernanza de la ISO 27559 aborda esta situación?',
        options: [
          '9.2.2 Asignar roles y responsabilidades',
          '9.3.2 Monitorizar el entorno de datos',
          'Ninguna; una vez publicado, el custodio no tiene obligaciones.'
        ],
        answerIndex: 1,
        explanation: 'La identificabilidad cambia con el tiempo. La monitorización posterior (9.3.2) permite detectar cambios en el entorno, como nuevos datos enlazables, y actuar en consecuencia.'
      }
    }
  ]
};
