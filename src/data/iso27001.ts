export const iso27001Course = {
  id: '27001',
  title: 'ISO/IEC 27001:2022 Completo',
  description: 'Desglose Técnico Exhaustivo: Cláusulas 4-10 y Anexo A (93 Controles)',
  modules: [
    {
      id: 'c0_3',
      title: 'Introducción y Conceptos Previos (Cláusulas 0-3)',
      content: `
# Fundamentos de la Norma (Cláusulas 0 a 3)

Antes de llegar a los requisitos obligatorios (Cláusula 4 en adelante), el documento establece el marco teórico y el propósito de la ISO 27001. Es crucial entender que esta norma no dicta qué tecnología usar, sino cómo gestionar la seguridad.

## 0. Introducción
*   **Propósito:** La norma proporciona requisitos para establecer, implementar, mantener y mejorar continuamente un **Sistema de Gestión de Seguridad de la Información (SGSI)**.
*   **Enfoque a Procesos:** Subraya la importancia de integrar el SGSI en los procesos de la organización y en la estructura de gestión global.
*   **Compatibilidad:** Está diseñada (mediante el Anexo SL) para integrarse fácilmente con otros sistemas de gestión, como la ISO 9001 (Calidad) o ISO 22301 (Continuidad de Negocio).

## 1. Alcance (Scope)
Especifica que los requisitos de esta norma son genéricos y están destinados a ser **aplicables a todas las organizaciones**, independientemente de su tipo, tamaño o naturaleza. **No puedes excluir ninguna de las cláusulas del 4 al 10** si quieres certificar a la empresa.

## 2. Referencias Normativas
La ISO 27001 no se lee sola. Hace una referencia normativa directa y obligatoria a un documento hermano: la **ISO/IEC 27000**. Este documento complementario es el diccionario oficial de la familia de normas ISO 27000.

## 3. Términos y Definiciones
En lugar de listar un glosario gigante dentro del mismo PDF, la Cláusula 3 simplemente indica que **todos los términos técnicos y definiciones aplicables a este documento se encuentran en la ISO/IEC 27000**.
*   *Conceptos clave que asume que conoces:* Confidencialidad, Integridad, Disponibilidad, Riesgo, Evento, Incidente, Vulnerabilidad y Amenaza.
      `,
      quiz: {
        question: 'Según las primeras cláusulas del documento, ¿En qué otra norma oficial debes buscar si no entiendes la definición técnica de un término como "Vulnerabilidad" o "Incidente"?',
        options: [
          'En el Anexo A del mismo documento.',
          'En la ISO/IEC 27002.',
          'En la ISO/IEC 27000.'
        ],
        answerIndex: 2,
        explanation: 'La Cláusula 2 y 3 indican explícitamente que el vocabulario y las definiciones oficiales aplicables a todo el SGSI están contenidos en el documento ISO/IEC 27000.'
      }
    },
    {
      id: 'c4',
      title: 'Cláusula 4: Contexto de la Organización',
      content: `
# Cláusula 4: Contexto de la Organización
Establece los cimientos del SGSI definiendo el perímetro estratégico y operativo.

## 4.1 Comprensión de la organización y su contexto
* **Mandato:** Identificar cuestiones internas y externas relevantes que afecten los resultados del SGSI.
* **Aplicación técnica:** Usar metodologías como PESTLE (Político, Económico, Social, Tecnológico, Legal, Ambiental) para factores externos, y análisis DOFA para factores internos.

## 4.2 Comprensión de las necesidades y expectativas
* **Mandato:** Identificar partes interesadas (stakeholders), sus requisitos (legales, regulatorios, contractuales) y definir cuáles serán abordados por el SGSI.
* **Aplicación técnica:** Mapeo de regulaciones (GDPR, PCI-DSS, leyes locales) frente a los procesos del negocio.

## 4.3 Determinación del alcance del SGSI
* **Mandato:** Definir los límites lógicos y físicos. 
* **Aplicación técnica:** Documentar exclusiones justificadas. El alcance debe delimitar exactamente qué redes, sedes, departamentos y sistemas están cubiertos.

## 4.4 Sistema de Gestión de Seguridad de la Información
* **Mandato:** Establecer, implementar, mantener y mejorar el SGSI, incluyendo procesos necesarios y sus interacciones.
      `,
      quiz: {
        question: '¿Qué herramienta analítica es más adecuada para evidenciar el cumplimiento de la cláusula 4.1?',
        options: ['Análisis PESTLE y DOFA', 'Escaneo de vulnerabilidades', 'Revisión de logs de firewall'],
        answerIndex: 0,
        explanation: 'PESTLE y DOFA ayudan a determinar los factores organizacionales internos y externos requeridos en 4.1.'
      }
    },
    {
      id: 'c5',
      title: 'Cláusula 5: Liderazgo',
      content: `
# Cláusula 5: Liderazgo
Exige la participación activa de la alta dirección, eliminando el enfoque de que "la seguridad es solo de TI".

## 5.1 Liderazgo y compromiso
* **Mandato:** La alta dirección debe asegurar la integración de requisitos de SGSI, proveer recursos y dirigir a las personas para contribuir a la eficacia del SGSI.

## 5.2 Política
* **Mandato:** Establecer una Política de Seguridad de la Información documentada, comunicada, disponible para partes interesadas y alineada al propósito corporativo.

## 5.3 Roles, responsabilidades y autoridades
* **Mandato:** Asignar y comunicar responsabilidades.
* **Aplicación técnica:** Matriz RACI para la seguridad de la información. Nombramiento formal de un CISO o Comité de Seguridad con autoridad para escalar riesgos a la junta directiva.
      `,
      quiz: {
        question: '¿Qué cláusula requiere explícitamente que la política de seguridad esté disponible para las partes interesadas?',
        options: ['Cláusula 4.3', 'Cláusula 5.2', 'Cláusula 7.4'],
        answerIndex: 1,
        explanation: 'La Cláusula 5.2 (Política) exige que la política esté disponible como información documentada y accesible para las partes interesadas pertinentes.'
      }
    },
    {
      id: 'c6',
      title: 'Cláusula 6: Planificación',
      content: `
# Cláusula 6: Planificación
El núcleo de la evaluación y tratamiento del riesgo.

## 6.1 Acciones para tratar riesgos y oportunidades
* **6.1.1 Generalidades:** Planificar acciones para abordar riesgos y oportunidades del contexto (Cláusula 4).
* **6.1.2 Apreciación de riesgos:** Definir metodología de evaluación, criterios de aceptación, calcular probabilidad e impacto, e identificar dueños de riesgos.
* **6.1.3 Tratamiento de riesgos:** Seleccionar opciones de tratamiento, determinar controles necesarios y **compararlos con el Anexo A**. 
* **Artefacto crítico:** Elaborar la Declaración de Aplicabilidad (SoA - Statement of Applicability).

## 6.2 Objetivos de seguridad de la información
* **Mandato:** Deben ser medibles, monitoreados, comunicados y actualizados.
* **Aplicación técnica:** KPIs de seguridad (ej. "Mantener disponibilidad del 99.9%", "Cerrar vulnerabilidades críticas en < 48 horas").

## 6.3 Planificación de cambios (Nueva en 2022)
* **Mandato:** Cuando la organización determina la necesidad de cambios en el SGSI, estos deben llevarse a cabo de manera planificada.
      `,
      quiz: {
        question: '¿Qué documento oficial nace directamente del requisito 6.1.3?',
        options: ['Declaración de Aplicabilidad (SoA)', 'Política de Uso Aceptable', 'Matriz DOFA'],
        answerIndex: 0,
        explanation: 'La SoA se elabora explícitamente para cumplir con 6.1.3.d.'
      }
    },
    {
      id: 'c7_8',
      title: 'Cláusulas 7 y 8: Soporte y Operación',
      content: `
# Cláusula 7: Soporte
Garantiza los cimientos operativos.
* **7.1 y 7.2 Recursos y Competencia:** Asegurar personal capacitado (certificaciones, experiencia).
* **7.3 Concienciación:** Todo el personal debe conocer la política y las implicaciones de no cumplirla.
* **7.4 Comunicación:** Qué, cuándo, con quién y cómo comunicar.
* **7.5 Información documentada:** Control de versiones, protección, distribución y retención de documentos.

# Cláusula 8: Operación
La ejecución en el día a día.
* **8.1 Planificación y control operacional:** Implementar los procesos planificados en 6.1.
* **8.2 Apreciación de riesgos:** Ejecutar la metodología de riesgos a intervalos planificados o ante cambios (ej. evaluación anual).
* **8.3 Tratamiento de riesgos:** Ejecutar el plan de tratamiento de riesgos y retener evidencia documental de los resultados.
      `,
      quiz: {
        question: '¿En qué cláusula se exige ejecutar (llevar a la práctica) las evaluaciones de riesgo planificadas a intervalos regulares?',
        options: ['Cláusula 6.1.2', 'Cláusula 8.2', 'Cláusula 9.1'],
        answerIndex: 1,
        explanation: '6.1.2 es la planificación (la metodología), mientras que 8.2 es la ejecución operativa de dicha apreciación.'
      }
    },
    {
      id: 'c9_10',
      title: 'Cláusulas 9 y 10: Evaluación y Mejora',
      content: `
# Cláusula 9: Evaluación de Desempeño
* **9.1 Monitoreo, medición, análisis y evaluación:** Evaluar la eficacia de los controles. (Uso de SIEM, SOC, métricas).
* **9.2 Auditoría Interna:** Auditorías independientes a intervalos planificados para verificar conformidad.
* **9.3 Revisión por la dirección:** La alta dirección revisa el SGSI periódicamente para asegurar su conveniencia, adecuación y eficacia.

# Cláusula 10: Mejora
* **10.1 Mejora continua:** Mejorar continuamente la idoneidad, adecuación y eficacia del SGSI.
* **10.2 No conformidades y acciones correctivas:** Reaccionar ante incidentes o no conformidades, evaluar la causa raíz, tomar acciones y revisar su efectividad.
      `,
      quiz: {
        question: 'La Revisión por la Dirección, que es la evaluación formal del SGSI por parte de la alta gerencia, pertenece a la cláusula:',
        options: ['Cláusula 5.1', 'Cláusula 9.3', 'Cláusula 10.2'],
        answerIndex: 1,
        explanation: 'La Cláusula 9.3 detalla las entradas y salidas obligatorias que deben presentarse en la revisión por la alta dirección.'
      }
    },
    {
      id: 'a5_1_18',
      title: 'Anexo A.5: Controles Organizacionales (5.1–5.18)',
      content: `
# Tema 5: Controles Organizacionales (Parte 1)

El Anexo A de la versión 2022 tiene **93 controles** en 4 temas: Organizacionales (37), Personas (8), Físicos (14) y Tecnológicos (34). **11 son nuevos** respecto a 2013 y aparecen marcados como (NUEVO).

* **A.5.1 Políticas de seguridad de la información:** *Ejemplo:* Política general aprobada por el CEO publicada en Intranet.
* **A.5.2 Roles y responsabilidades de seguridad de la información:** *Ejemplo:* Documento de RRHH indicando que el CISO reporta a gerencia.
* **A.5.3 Segregación de funciones:** *Ejemplo:* El que desarrolla el código no tiene permiso para pasarlo a Producción.
* **A.5.4 Responsabilidades de la dirección:** La dirección exige a todo el personal aplicar la seguridad según las políticas. *Ejemplo:* Cada jefe de área verifica que su equipo completa la formación obligatoria y conoce la política.
* **A.5.5 Contacto con las autoridades:** *Ejemplo:* Protocolo para notificar a la autoridad de protección de datos en caso de una fuga.
* **A.5.6 Contacto con grupos de interés especial:** *Ejemplo:* Participar en foros de ISACA o equipos de ciberseguridad (CERTs).
* **A.5.7 Inteligencia de amenazas (NUEVO):** *Ejemplo:* Suscribirse a un feed RSS de vulnerabilidades del sector.
* **A.5.8 Seguridad de la información en la gestión de proyectos:** *Ejemplo:* Agregar hitos de revisión de ciberseguridad antes de lanzar cualquier nueva app al mercado.
* **A.5.9 Inventario de información y otros activos asociados:** *Ejemplo:* Una CMDB de Jira Service Desk.
* **A.5.10 Uso aceptable de la información y otros activos asociados:** *Ejemplo:* Empleado firma que no descargará torrents corporativos.
* **A.5.11 Devolución de activos:** *Ejemplo:* Checklist de RRHH exigiendo devolver laptop y tarjeta de acceso.
* **A.5.12 Clasificación de la información:** *Ejemplo:* Clasificar documentos como "Público", "Interno" o "Confidencial".
* **A.5.13 Etiquetado de información:** *Ejemplo:* Imprimir marca de agua "CONFIDENCIAL" en reportes financieros.
* **A.5.14 Transferencia de información:** *Ejemplo:* Enviar PII de clientes usando enlaces de OneDrive cifrados en vez de adjuntos.
* **A.5.15 Control de acceso:** *Ejemplo:* Establecer formalmente que el acceso se basa en el principio del mínimo privilegio.
* **A.5.16 Gestión de identidad:** *Ejemplo:* Proceso estándar para solicitar un alta de usuario nuevo vía ticket.
* **A.5.17 Información de autenticación:** *Ejemplo:* Regla de enviar la contraseña inicial por SMS en lugar del mismo correo corporativo.
* **A.5.18 Derechos de acceso:** *Ejemplo:* Revisar trimestralmente quién tiene acceso a la carpeta financiera.
      `,
      quiz: {
        question: 'Si prohibimos que la persona que autoriza pagos en nómina sea la misma que los programa, ¿Qué control estamos aplicando?',
        options: ['A.5.3 Segregación de funciones', 'A.5.1 Políticas', 'A.5.15 Control de Acceso'],
        answerIndex: 0,
        explanation: 'La segregación de funciones (A.5.3) exige dividir tareas críticas entre diferentes personas para evitar fraudes.'
      }
    },
    {
      id: 'a5_19_37',
      title: 'Anexo A.5: Controles Organizacionales (5.19–5.37)',
      content: `
# Tema 5: Controles Organizacionales (Parte 2)

* **A.5.19 Seguridad de la información en las relaciones con proveedores:** *Ejemplo:* Evaluar y clasificar a los proveedores según su riesgo antes de contratarlos.
* **A.5.20 Tratamiento de la seguridad de la información en los acuerdos con proveedores:** Los requisitos de seguridad se recogen en el contrato. *Ejemplo:* Cláusulas de notificación de incidentes en 24 h, derecho de auditoría y exigencia de certificación ISO 27001.
* **A.5.21 Gestión de la seguridad de la información en la cadena de suministro TIC:** *Ejemplo:* Evaluar el riesgo de usar una librería de código de terceros.
* **A.5.22 Seguimiento, revisión y gestión de cambios de los servicios de proveedores:** *Ejemplo:* Revisar cada año el informe SOC 2 del proveedor cloud y evaluar el impacto de sus cambios de servicio.
* **A.5.23 Seguridad de la información en el uso de servicios en la nube (NUEVO):** *Ejemplo:* Tener un acuerdo claro sobre dónde se almacenan físicamente los datos (residencia de datos).
* **A.5.24 Planificación y preparación de la gestión de incidentes:** *Ejemplo:* Un Playbook documentado para ataques de Ransomware.
* **A.5.25 Evaluación y decisión sobre los eventos de seguridad:** *Ejemplo:* Analistas SOC clasificando si una alerta es un falso positivo o incidente real.
* **A.5.26 Respuesta a incidentes de seguridad de la información:** *Ejemplo:* Aislar un equipo comprometido de la red inmediatamente.
* **A.5.27 Aprendizaje de los incidentes de seguridad (lecciones aprendidas):** *Ejemplo:* Reunión Post-Mortem tras un hackeo para mejorar el firewall.
* **A.5.28 Recopilación de evidencias:** *Ejemplo:* Capturar un snapshot forense del disco duro infectado antes de formatear.
* **A.5.29 Seguridad de la información durante una disrupción:** Mantener la seguridad cuando la organización opera en crisis. *Ejemplo:* El plan de continuidad define cómo se mantienen el control de acceso y el cifrado al operar desde el sitio alterno.
* **A.5.30 Preparación de las TIC para la continuidad del negocio (NUEVO):** *Ejemplo:* Hacer pruebas anuales apagando el datacenter primario para comprobar que el secundario cumple el RTO.
* **A.5.31 Requisitos legales, estatutarios, reglamentarios y contractuales:** *Ejemplo:* Matriz de obligaciones legales para cumplir GDPR.
* **A.5.32 Derechos de propiedad intelectual:** *Ejemplo:* Licencias de software en orden y sin software pirata.
* **A.5.33 Protección de los registros:** *Ejemplo:* Retener registros contables durante 5 años en un servidor inmutable por ley fiscal.
* **A.5.34 Privacidad y protección de la PII:** *Ejemplo:* Designar a un Oficial de Privacidad (DPO) responsable de la información de clientes.
* **A.5.35 Revisión independiente de la seguridad de la información:** *Ejemplo:* Contratar auditores externos anuales.
* **A.5.36 Cumplimiento de las políticas, normas y estándares de seguridad:** *Ejemplo:* Managers asegurando que su equipo bloquea las computadoras según dicta la política.
* **A.5.37 Procedimientos operativos documentados:** *Ejemplo:* Un "Runbook" en la wiki sobre cómo restaurar la base de datos de producción paso a paso.
      `,
      quiz: {
        question: 'Si después de sufrir una caída por un ataque DDoS, convocamos al equipo para analizar por qué fallaron las defensas, cumplimos con:',
        options: ['A.5.26 Respuesta a incidentes', 'A.5.27 Aprendizaje de incidentes', 'A.5.24 Preparación'],
        answerIndex: 1,
        explanation: 'A.5.27 exige que el conocimiento obtenido de incidentes pasados se use para reducir la probabilidad de futuros incidentes.'
      }
    },
    {
      id: 'a6_all',
      title: 'Anexo A.6: Controles de Personas (6.1–6.8)',
      content: `
# Tema 6: Controles de Personas

* **A.6.1 Investigación de antecedentes:** *Ejemplo:* Verificación de referencias laborales para nuevos DBAs.
* **A.6.2 Términos y condiciones de empleo:** *Ejemplo:* Contrato firmado que especifica que toda contraseña es intransferible.
* **A.6.3 Concienciación, educación y formación en seguridad de la información:** *Ejemplo:* Pruebas de simulación de Phishing mensual al personal.
* **A.6.4 Proceso disciplinario:** Proceso formal y comunicado para actuar ante violaciones de la política. *Ejemplo:* Procedimiento de sanciones que se aplica a quien desactiva intencionalmente el antivirus.
* **A.6.5 Responsabilidades tras la finalización o cambio de empleo:** Define qué obligaciones de seguridad **siguen vigentes** después de la salida o del cambio de puesto, y se comunican. *Ejemplo:* En la entrevista de salida se recuerda que el deber de confidencialidad se mantiene 2 años.
* **A.6.6 Acuerdos de confidencialidad o no divulgación:** *Ejemplo:* Firmar un NDA.
* **A.6.7 Trabajo en remoto:** *Ejemplo:* Uso obligatorio de VPN y bloqueo de pantallas al trabajar en un café.
* **A.6.8 Notificación de eventos de seguridad de la información:** *Ejemplo:* Capacitar a usuarios para que alerten al HelpDesk si notan lentitud extrema (posible ransomware).

**Ojo con las confusiones habituales:** bloquear las cuentas de quien se va es **A.5.18** (retirada de derechos de acceso), y recoger su portátil es **A.5.11** (devolución de activos). El A.6.5 cubre las obligaciones que perduran tras la salida.
      `,
      quiz: {
        question: 'En la entrevista de salida se recuerda al empleado que su deber de confidencialidad sigue vigente durante 2 años. ¿Qué control se aplica?',
        options: ['A.6.1 Investigación de antecedentes', 'A.6.4 Proceso disciplinario', 'A.6.5 Responsabilidades tras la finalización o cambio de empleo'],
        answerIndex: 2,
        explanation: 'A.6.5 exige definir, hacer cumplir y comunicar las responsabilidades de seguridad que siguen vigentes tras la finalización o el cambio de empleo. La retirada de accesos corresponde a A.5.18.'
      }
    },
    {
      id: 'a7_all',
      title: 'Anexo A.7: Controles Físicos (7.1–7.14)',
      content: `
# Tema 7: Controles Físicos

* **A.7.1 Perímetros de seguridad física:** *Ejemplo:* Muros perimetrales y puertas cerradas con llave.
* **A.7.2 Entrada física:** *Ejemplo:* Uso de tarjetas RFID (gafetes) para abrir la puerta de la oficina.
* **A.7.3 Seguridad de oficinas, despachos e instalaciones:** *Ejemplo:* El Data Center tiene paredes que van de piso a techo (sin cielo falso accesible) y no está señalizado desde la calle.
* **A.7.4 Monitorización de la seguridad física (NUEVO):** *Ejemplo:* Cámaras de CCTV grabando los pasillos y entradas.
* **A.7.5 Protección contra amenazas físicas y ambientales:** Incendios, inundaciones, terremotos, disturbios... *Ejemplo:* Detección temprana de humo y extinción con gas FM-200 en el Site; sensores de agua bajo el suelo técnico.
* **A.7.6 Trabajo en áreas seguras:** Reglas para quienes trabajan dentro de las áreas seguras. *Ejemplo:* Prohibido hacer fotos en el Data Center y las visitas van siempre acompañadas.
* **A.7.7 Puesto de trabajo despejado y pantalla limpia:** *Ejemplo:* Política de presionar "Windows + L" y no dejar agendas abiertas en el escritorio.
* **A.7.8 Emplazamiento y protección de equipos:** *Ejemplo:* No colocar el rack de servidores debajo de una tubería de agua.
* **A.7.9 Seguridad de los activos fuera de las instalaciones:** *Ejemplo:* Prohibir dejar la laptop visible en el asiento del auto.
* **A.7.10 Soportes de almacenamiento:** *Ejemplo:* Guardar memorias USB corporativas en una caja fuerte.
* **A.7.11 Instalaciones de suministro:** Electricidad, agua, climatización, telecomunicaciones. *Ejemplo:* SAI (UPS) y planta eléctrica diésel para mantener la energía si falla la red pública.
* **A.7.12 Seguridad del cableado:** *Ejemplo:* Cables de red y fibra óptica en ductos cerrados para evitar cortes accidentales o pinchazos.
* **A.7.13 Mantenimiento de los equipos:** *Ejemplo:* Limpieza y reemplazo de ventiladores de servidores cada 6 meses.
* **A.7.14 Eliminación o reutilización segura de los equipos:** *Ejemplo:* Perforar con taladro los discos duros viejos antes de desecharlos.
      `,
      quiz: {
        question: 'Evitar que la humedad de un aire acondicionado mal posicionado gotee sobre los servidores es un cumplimiento del control:',
        options: ['A.7.8 Emplazamiento y protección de equipos', 'A.7.11 Instalaciones de suministro', 'A.7.14 Eliminación o reutilización segura'],
        answerIndex: 0,
        explanation: 'A.7.8 exige que los equipos se sitúen de forma que se minimicen los riesgos de amenazas ambientales e interferencias.'
      }
    },
    {
      id: 'a8_1_17',
      title: 'Anexo A.8: Controles Tecnológicos (8.1–8.17)',
      content: `
# Tema 8: Controles Tecnológicos (Parte 1)

* **A.8.1 Dispositivos de usuario final:** *Ejemplo:* Usar Microsoft Intune para MDM.
* **A.8.2 Derechos de acceso privilegiado:** *Ejemplo:* Solo usar "admin" a través de una herramienta PAM (CyberArk).
* **A.8.3 Restricción del acceso a la información:** *Ejemplo:* Denegar acceso por defecto (Least Privilege).
* **A.8.4 Acceso al código fuente:** Gestionar quién puede leer y escribir el código, las herramientas de desarrollo y las librerías. *Ejemplo:* Solo el equipo del proyecto tiene permiso de escritura en el repositorio, y los accesos se revisan y registran.
* **A.8.5 Autenticación segura:** *Ejemplo:* Implementar MFA (Google Authenticator) obligatorio.
* **A.8.6 Gestión de la capacidad:** *Ejemplo:* Monitorear que el servidor no pase del 80% de disco duro para evitar caídas.
* **A.8.7 Protección contra el malware:** *Ejemplo:* Instalar CrowdStrike (EDR).
* **A.8.8 Gestión de las vulnerabilidades técnicas:** *Ejemplo:* Escaneo con Nessus y parches de Windows.
* **A.8.9 Gestión de la configuración (NUEVO):** *Ejemplo:* Usar CIS Benchmarks para bloquear puertos USB en todas las laptops.
* **A.8.10 Eliminación de la información (NUEVO):** *Ejemplo:* Script que hace "Wipe" criptográfico a los discos cloud.
* **A.8.11 Enmascaramiento de datos (NUEVO):** *Ejemplo:* Cambiar tarjetas de crédito por "****-1234" en ambientes de Desarrollo.
* **A.8.12 Prevención de fugas de datos (DLP) (NUEVO):** *Ejemplo:* Software que bloquea el envío de correos si detectan listas de números de seguridad social.
* **A.8.13 Copias de seguridad de la información:** *Ejemplo:* Hacer backups incrementales diarios y completos los domingos, en un sitio alterno.
* **A.8.14 Redundancia de las instalaciones de procesamiento de información:** *Ejemplo:* Clúster activo-activo de base de datos para no tener downtime.
* **A.8.15 Registro (logging):** *Ejemplo:* Habilitar logs de todo inicio de sesión exitoso o fallido.
* **A.8.16 Actividades de monitorización (NUEVO):** *Ejemplo:* Un SIEM como Splunk mandando alertas si alguien inicia sesión desde Rusia.
* **A.8.17 Sincronización del reloj:** *Ejemplo:* Todos los servidores sincronizan su hora mediante NTP para cuadrar logs.
      `,
      quiz: {
        question: 'Garantizar que todos los servidores tengan la misma hora exacta para que un análisis forense sea posible, es el control:',
        options: ['A.8.15 Registro de eventos', 'A.8.17 Sincronización de reloj', 'A.8.9 Gestión de la configuración'],
        answerIndex: 1,
        explanation: 'A.8.17 Sincronización de reloj (NTP) es fundamental para asegurar la validez temporal y legal de los logs.'
      }
    },
    {
      id: 'a8_18_34',
      title: 'Anexo A.8: Controles Tecnológicos (8.18–8.34)',
      content: `
# Tema 8: Controles Tecnológicos (Parte 2)

* **A.8.18 Uso de programas de utilidad con privilegios:** Utilidades capaces de saltarse los controles del sistema. *Ejemplo:* Restringir a los administradores el uso de editores de registro o herramientas de acceso directo a disco, y registrar cada uso.
* **A.8.19 Instalación de software en sistemas en producción:** *Ejemplo:* Solo el equipo de cambios puede instalar software en servidores de producción, y únicamente desde un repositorio de paquetes aprobado.
* **A.8.20 Seguridad de redes:** *Ejemplo:* Firewalls de capa 7 (Palo Alto) separando la red corporativa de la DMZ pública.
* **A.8.21 Seguridad de los servicios de red:** Mecanismos de seguridad, niveles de servicio y requisitos de los servicios de red, propios o contratados. *Ejemplo:* El SLA del proveedor de conectividad incluye cifrado, protección DDoS y plazos de respuesta ante incidentes.
* **A.8.22 Segregación de redes:** *Ejemplo:* Crear una VLAN separada exclusivamente para las impresoras y dispositivos IoT.
* **A.8.23 Filtrado web (NUEVO):** *Ejemplo:* Bloquear categorías web como "Juegos de azar" o "Malware" vía DNS.
* **A.8.24 Uso de la criptografía:** *Ejemplo:* Cifrar laptops con BitLocker (AES-256) y forzar HTTPS en web.
* **A.8.25 Ciclo de vida de desarrollo seguro:** *Ejemplo:* Incluir pruebas de seguridad (SAST) antes de desplegar código.
* **A.8.26 Requisitos de seguridad de las aplicaciones:** Identificar y aprobar los requisitos de seguridad al desarrollar o adquirir aplicaciones. *Ejemplo:* Antes de comprar un CRM se exigen SSO, cifrado de datos en reposo y registro de auditoría.
* **A.8.27 Principios de arquitectura e ingeniería de sistemas seguros:** *Ejemplo:* Diseñar los sistemas con Zero Trust, defensa en profundidad y mínimo privilegio.
* **A.8.28 Codificación segura (NUEVO):** *Ejemplo:* Formar a los desarrolladores en OWASP Top 10 y validación de entradas para prevenir SQL Injection.
* **A.8.29 Pruebas de seguridad en desarrollo y aceptación:** *Ejemplo:* Pruebas DAST semanales automatizadas en la app de pruebas.
* **A.8.30 Desarrollo externalizado:** *Ejemplo:* Exigir que la fábrica de software externa pase pruebas de penetración y cumpla la calidad del código.
* **A.8.31 Separación de los entornos de desarrollo, prueba y producción:** *Ejemplo:* Base de datos de PROD en red diferente y con cuentas diferentes a las de DEV.
* **A.8.32 Gestión de cambios:** *Ejemplo:* Ventanas de mantenimiento autorizadas por el comité antes de actualizar el servidor los domingos.
* **A.8.33 Información de prueba:** Seleccionar, proteger y gestionar los datos de prueba. *Ejemplo:* No copiar datos reales de clientes a pruebas; si es imprescindible, enmascararlos, autorizarlo y borrarlos al terminar.
* **A.8.34 Protección de los sistemas de información durante las pruebas de auditoría:** *Ejemplo:* Que el escáner de vulnerabilidades de un auditor no haga un "Denial of Service" a la base de datos de PROD.
      `,
      quiz: {
        question: 'Una práctica crítica de DevSecOps que impide que los programadores usen la base de datos real de producción para sus pruebas locales recae en los controles:',
        options: ['A.8.31 (Separación de entornos) y A.8.33 (Información de prueba)', 'A.8.20 (Seguridad de redes) y A.8.21 (Servicios de red)', 'A.8.18 (Programas de utilidad con privilegios)'],
        answerIndex: 0,
        explanation: 'A.8.31 exige separar los entornos de desarrollo, prueba y producción, y A.8.33 exige seleccionar, proteger y gestionar la información de prueba, evitando usar datos sensibles de producción sin protección.'
      }
    }
  ]
};
