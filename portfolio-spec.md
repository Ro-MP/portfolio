# SPEC — Portafolio web personal: Jose Rodrigo Marquez Picazo

> Documento pensado para trabajarse con un agente LLM. Define el QUÉ y el POR QUÉ (objetivo, contenido, flujo, diseño).

---

## 0. Cómo debe trabajar el agente con este spec

1. Lee el documento completo antes de proponer nada.
2. **No inventes datos.** Usa solo las métricas y hechos de este spec. Si falta algo, márcalo como `[PENDIENTE]` y pregúntame.
3. Si una decisión cambia el resultado de forma importante (estructura, tono, alcance), pregunta antes de ejecutar.
4. Entrega por etapas (ver sección 11) y espera mi validación entre una y otra.
5. Respeta las reglas de veracidad (sección 3.4) y de confidencialidad (sección 3.5) en todo el contenido que redactes.
6. Respuestas concisas y priorizadas: primero lo importante, después el detalle.

---

## 1. Objetivo

### 1.1 Objetivo principal
Tener un portafolio web que me posicione como **ingeniero backend/full-stack especializado en integraciones ERP, pipelines de datos y forecasting aplicado**, y que convierta visitas en conversaciones: entrevistas de trabajo y contacto profesional.

### 1.2 Objetivos secundarios
- Servir como pieza de credibilidad para el proyecto de forecasting de demanda (Demand Forecasting Platform).
- Demostrar criterio de ingeniería (decisiones y trade-offs), no solo una lista de tecnologías.
- Ser la "casa" de mi presencia profesional: CV, LinkedIn y GitHub apuntan aquí.

### 1.3 Criterios de éxito
- Un recruiter entiende en **menos de 30 segundos** quién soy, qué resuelvo y cómo contactarme.
- Un tech lead puede leer **un caso de estudio en ~3 minutos** y entender el problema, mis decisiones y el resultado.
- El sitio se percibe **formal, llamativo y auténtico** a la vez (ver sección 6).

### 1.4 Fuera de alcance (por ahora)
- Blog completo (solo se deja espacio previsto para 2-3 escritos de arquitectura en una fase posterior).
- Modo oscuro completo (opcional, fase posterior).
- Tienda, login, formularios complejos.

---

## 2. Audiencias

El portafolio habla a **empresas remotas (US/EU)**: recruiters y tech leads.

| Audiencia | Qué busca | Qué debe encontrar rápido |
|---|---|---|
| **Recruiters y tech leads** | Evidencia de rigor técnico, ownership e impacto | Casos de estudio con decisiones, diagrama, métricas; CV; GitHub |

> **Decisión D3:** el sitio es solo de credenciales y logros. **No ofrece servicios** ni usa lenguaje comercial o freelance (ver sección 3.6).

Los casos de estudio hablan en términos de **problema de negocio → solución → resultado**.

---

## 3. Perfil

### 3.1 Datos base
- **Nombre:** Jose Rodrigo Marquez Picazo (me presento como Rodrigo).
- **Ubicación:** Pachuca, Hidalgo, México. Abierto a reubicación y trabajo remoto.
- **Rol actual:** Software Engineer en RedSinergia (desde abril 2023). ~3.5 años de experiencia profesional.
- **Formación:** Ingeniería en Control y Automatización, IPN (2015-2020). Presidente de la sección estudiantil ISA-IPN.
- **Certificaciones:** MIT xPRO — Diseño y desarrollo de productos y servicios de IA (2025). IBM — RAG y Agentic AI (en curso).
- **Contacto público:** picazodeveloper@gmail.com · linkedin.com/in/rodrigomarquezp · GitHub `[PENDIENTE: URL]`.

### 3.2 Posicionamiento (línea guía)
> **Backend engineer: integraciones ERP, pipelines de datos y forecasting aplicado, con ownership de producto de punta a punta.**

Variantes de tagline a explorar (el agente propone 3-5 en inglés, yo elijo):
- Enfoque en problema: "I automate the operations that businesses still run by hand."
- Enfoque en ingeniería: "Distributed pipelines, ERP integrations, and applied forecasting."

### 3.3 Fortalezas a comunicar (por prioridad)
1. **Pipelines distribuidos sobre sistemas ERP reales** (orquestador/worker/callback con tareas paralelas; reintentos y checkpoints).
2. **Impacto cuantificado** en automatización de procesos de negocio.
3. **Producto completo de punta a punta:** propuesta, diseño, desarrollo y despliegue (Demand Forecasting Platform).
4. **Amplitud útil:** backend, frontend, nube y Android nativo en producción.
5. **Flujo de trabajo con agentes de IA** (specs, planes, revisión) como práctica de ingeniería.

### 3.4 Métricas y hechos verificados (única fuente permitida)
- **Pipeline de sincronización SAP B1:** rediseño con patrón orquestador/worker/callback; ~70% menos tiempo de sync; ~150,000 productos en ~30 sucursales.
- **Forecasting de demanda:** piloto con un cliente de 2,000+ productos en 32 sucursales; análisis por producto de ~10 min a segundos; generación automática de requisiciones de compra en SAP.
- **Distribución de mercancía entrante:** reemplaza un proceso manual en Excel de ~1-2 hrs por documento; ~6 documentos/día; ~6-8 hrs/día ahorradas.
- **Carga masiva de documentos:** ~500 productos por archivo; validación de existencia y duplicados; reintentos y checkpoints por ítem; sustituyó un rol dedicado a captura manual.
- **WMS (Android):** ~200 usuarios/día; 2,000+ operaciones diarias de picking/packing y traspasos; mejora de ~30% en recepción de mercancía; integración con escáneres y impresoras Zebra; escaneo por lotes mediante QR.
- **TMS (Android):** GPS de choferes, evidencia fotográfica, firma del cliente, modo offline; ~10 usuarios activos; pausado a la espera de requisitos del portal web.
- **Automatización de timbrado de facturas (CFDI)** y carga masiva de órdenes de compra, con manejo de errores y estados.

### 3.5 Reglas de veracidad y confidencialidad (obligatorias)
**Veracidad — NO afirmar:**
- "Cloud Architect" (usar "backend/full-stack engineer con ownership de infraestructura en AWS").
- "Infrastructure as code" sin nombrar la herramienta.
- Que el forecast "previene quiebres de inventario" ni cifras de precisión: **aún no hay métrica formal de precisión** (`[PENDIENTE: backtest]`). Hoy solo puede decirse que reduce el tiempo de análisis y fue adoptado en un piloto.
- Que el piloto de 2,000+ productos / 32 sucursales es una operación general: es **un piloto con un cliente**.
- El TMS como producto en operación amplia: tiene ~10 usuarios y está pausado.

**Confidencialidad:**
- Anonimizar clientes y datos de RedSinergia. Capturas y demos solo con **datos sintéticos o anonimizados**.
- Publicar el proyecto de forecasting y los casos de RedSinergia está `[PENDIENTE: confirmar con mi empleador]`. Hasta entonces, redactar con nombres genéricos.
- El sitio se despliega con `noindex` hasta que yo confirme que el contenido es seguro.

### 3.6 Reglas de contenido (empleador y clientes)
1. **Cero lenguaje comercial:** nada de servicios, tarifas, "available for projects" ni "freelance". El contacto se enmarca como "Get in touch".
2. **Cero nombres de cliente** (incluido "Farmagana"). El proyecto se llama **Demand Forecasting Platform**.
3. **Sin identificadores de industria que delaten al cliente:** "multi-branch retail/distribution" en vez de "farmacéutico" `[PENDIENTE: confirmar]`.
4. **Empleador:** no aparece en las páginas de caso (se habla de "my current role") `[PENDIENTE: ¿se menciona en una línea neutral de experiencia?]`.
5. **Nota de confidencialidad** en footer y casos: "Case studies are anonymized; any screenshots use synthetic data."
6. No se redacta que algo "sustituyó un rol": se expresa como horas liberadas.

### 3.7 Voz y tono
- Primera persona, directo, sin humo ("I built / I decided / I would do differently").
- Formal en estructura, humano en detalles: una frase personal por sección está bien; no abusar.
- Preferir datos concretos sobre adjetivos ("~70% menos tiempo" > "mejoré significativamente").
- Evitar jerga vacía ("passionate", "rockstar", "synergy").

---

## 4. Idioma
- **Principal: inglés** (público remoto US/EU).
- **Versión en español:** se implementa desde el inicio, con un selector EN | ES en el header.
- El agente redacta primero en inglés y me entrega una traducción de referencia al español para revisión.

---

## 5. Estructura del flujo (scroll principal)

Navegación fija y mínima: **Cases · About · Contact** + botón **CV** + selector de idioma **EN | ES**.

### 5.1 Hero
- **Propósito:** responder en 5 segundos quién soy y qué resuelvo.
- **Contenido:** foto mía, tagline, subtítulo de 1-2 líneas, dos CTAs: **"View case studies"** y **"Get in touch"**.
- **Movimiento:** texto que aparece por líneas; parallax muy leve en la foto.
- **Móvil:** foto arriba, texto y CTAs debajo; CTAs a ancho completo.

### 5.2 Franja de métricas
- **Propósito:** credibilidad inmediata.
- **Contenido:** 4 cifras con etiqueta corta (elegir de 3.4): ~70% menos tiempo de sync · 6-8 hrs/día ahorradas · 200+ usuarios diarios · 150k productos sincronizados.
- **Movimiento:** contadores que suben al entrar en pantalla (una sola vez).
- **Regla:** solo cifras de la sección 3.4.

### 5.3 Casos de estudio (núcleo del sitio)
- **Propósito:** demostrar criterio, no solo resultados.
- **Formato:** 2-3 tarjetas grandes y alternadas, cada una con un **loop de video corto** como portada, título orientado al problema, una métrica clave y enlace al caso completo.
- **Casos:**
  1. Demand Forecasting Platform — forecasting de demanda multi-tenant.
  2. WMS (Android).
  3. TMS (Android, pausado).
  4. Automatizaciones menores (sync SAP B1, carga masiva, distribución de mercancía, CFDI).
- **Estructura interna de cada caso:** ver sección 5.8.

### 5.4 (Eliminada)
La sección Services se elimina por la decisión D3 (ver sección 2).

### 5.5 About
- **Propósito:** autenticidad y confianza.
- **Contenido:** 1-2 fotos reales en contexto (trabajando / en operación), 3-4 líneas sobre quién soy, cómo trabajo (ownership, flujo con agentes de IA, comunicación) y qué busco. Mención breve de formación y certificaciones.
- **Movimiento:** reveal suave de las fotos.

### 5.6 Stack
- **Propósito:** referencia rápida, no protagonista.
- **Contenido:** tecnologías agrupadas por área (Backend, Cloud/DevOps, Frontend, Mobile, Datos/IA, SAP). **Solo lo que pueda defender en entrevista.** Sin barras de porcentaje ni "niveles".
- *(Nota: esto es el contenido de mis habilidades, no el stack con el que se construye el sitio.)*

### 5.7 Contact
- **Propósito:** un único próximo paso claro.
- **Contenido:** CTA principal `[PENDIENTE: email directo o agendar llamada]`, enlaces a CV, LinkedIn y GitHub.
- **Tono:** cálido, breve, con expectativa de respuesta (p. ej. "I reply within 48 hours").

### 5.8 Plantilla de un caso de estudio
1. **Contexto y problema** (2-3 líneas, en lenguaje de negocio).
2. **Mi rol** (qué hice yo concretamente).
3. **Decisiones y alternativas descartadas** (la parte que más pesa; incluye el porqué).
4. **Arquitectura** (diagrama; ver 6.5).
5. **Resultados** (métricas verificadas; "antes → después").
6. **Tecnologías del proyecto** (contenido a mostrar en el caso).
7. **Qué haría distinto** (criterio y madurez).
8. **Demo** (video corto o capturas con datos sintéticos).

### 5.9 Contenido previsto para los casos
- **Demand Forecasting Platform:** plataforma de forecasting de demanda, multi-tenant; el cliente solo registra su conexión a SAP Service Layer y la plataforma hace el resto; forecasting de series de tiempo con intervalos de confianza; frontend con gráficas que combinan histórico y pronóstico; despliegue en AWS. Resultado hoy: análisis por producto de ~10 min a segundos y requisiciones automáticas en SAP. `[PENDIENTE: backtest con métrica vs. baseline]`.
- **Automatización — Pipeline SAP B1:** problema de sincronización masiva y lenta; rediseño con orquestador, workers paralelos y callback; ~70% menos tiempo en ~150k productos / ~30 sucursales. `[PENDIENTE: alternativas que se evaluaron y por qué se descartaron]`.
- **WMS/TMS:** digitalización de operación de almacén y transporte; escáneres y impresoras industriales; operación sin conexión; evidencia de entrega.

---

## 6. Estructura visual

### 6.1 Dirección general
**Formal en estructura, cálido en detalles.** Rejilla disciplinada, mucho aire, jerarquía tipográfica clara. La calidez viene del color, las fotos reales y la voz en primera persona; lo "llamativo" viene de pocos momentos de alto impacto bien ubicados (hero, métricas, diagramas animados), no de efectos en todas partes.

### 6.2 Principios
1. Una sola idea protagonista por pantalla.
2. Contraste de ritmo: secciones claras alternadas con 1-2 secciones oscuras (métricas y/o contacto).
3. Un solo color de acento, usado con intención (acciones y datos clave).
4. Fotos reales en contexto, nunca stock.
5. Móvil primero: todo debe leerse y accionarse bien con una mano.

### 6.3 Tipografía (propuesta; el agente puede sugerir alternativas equivalentes)
- **Titulares:** serif con carácter (propuesta: Fraunces).
- **Texto y UI:** sans limpia (propuesta: DM Sans).
- **Datos técnicos, cifras, etiquetas:** monoespaciada (propuesta: DM Mono).
- Escala sugerida: títulos grandes y generosos, texto de cuerpo entre 16 y 18 px, interlineado cómodo (~1.6).

### 6.4 Layout
- Ancho de lectura máximo de ~1100-1200 px; texto corrido máximo ~70 caracteres por línea.
- Espaciado vertical amplio entre secciones; múltiplos de 8 px para consistencia.
- Tarjetas con bordes suaves, sombra mínima y borde fino en lugar de sombras pesadas.
- Móvil: una columna, navegación colapsada, CTAs a ancho completo, targets táctiles ≥ 44 px.

### 6.5 Imágenes, video y diagramas
- **Fotos (3 mínimo):** retrato profesional, trabajando, y en contexto de operación (almacén, dispositivos, pantalla). Tratamiento cálido y coherente entre ellas.
- **Video:** loops mudos de 10-15 s para portadas de casos, con imagen de portada mientras cargan; demo largo (~2 min) alojado fuera del sitio y enlazado o incrustado.
- **Diagramas:** rediseñar mis diagramas de arquitectura (modelo C4) en formato vectorial con la paleta del sitio; animación de "dibujo" al hacer scroll.
- **Capturas:** con datos sintéticos o anonimizados; marco de dispositivo discreto.
- **Peso:** definir un presupuesto de peso por página; los medios pesados se cargan de forma diferida.

### 6.6 Movimiento (nivel: moderado)
- **Reveals al scroll:** aparecer + subir ~20 px, ~400-600 ms, curva suave.
- **Contadores** en la franja de métricas (una vez).
- **Diagramas** que se dibujan al entrar en pantalla.
- **Videos** que reproducen al entrar en pantalla y se pausan al salir.
- **Microinteracciones:** hover en tarjetas y botones, estados de foco visibles.
- **Reglas:** máximo una animación protagonista por pantalla; respetar la preferencia de "reducir movimiento" del sistema (alternativa estática); nada que bloquee la lectura o retrase el contenido.

---

## 7. Paleta de colores (propuesta)

Intención: cálida y humana, pero sobria. Base crema con tinta oscura, un acento terracota y un ámbar de apoyo para detalles.

| Rol | Nombre | Hex | Uso |
|---|---|---|---|
| Fondo principal | Crema | `#FAF5EC` | Fondo de secciones claras |
| Superficie | Papel | `#F2EADB` | Tarjetas, bloques, franjas |
| Texto principal | Tinta | `#1C2430` | Titulares y cuerpo |
| Texto secundario | Tinta suave | `#4A5565` | Subtítulos, metadatos |
| Acento principal | Terracota | `#B84A24` | Botones, enlaces, cifras clave |
| Acento de apoyo | Ámbar | `#E3A33B` | Detalles, resaltados, sobre fondo oscuro |
| Fondo oscuro | Tinta profunda | `#1B2433` | Secciones oscuras (métricas, contacto) |
| Texto sobre oscuro | Crema claro | `#F4EBDD` | Texto en secciones oscuras |
| Apoyo | Salvia | `#6F8F72` | Diagramas, estados positivos, detalles |
| Líneas | Arena | `#E2D6C1` | Bordes y separadores |

**Proporción orientativa:** ~60% crema/papel · ~25% tinta (texto y secciones oscuras) · ~10% terracota · ~5% ámbar/salvia.

**Accesibilidad:** el agente debe **verificar contraste WCAG AA** (≥ 4.5:1 en texto normal, ≥ 3:1 en texto grande y elementos de UI) de cada combinación usada y ajustar tonos si alguna no cumple. El ámbar y la salvia no deben usarse para texto pequeño sobre fondo claro.

---

## 8. Requisitos no funcionales (agnósticos de stack)

- **Rendimiento:** carga inicial rápida en móvil y red media; objetivo orientativo de contenido principal visible en < 2.5 s.
- **Accesibilidad:** nivel AA; navegación por teclado; texto alternativo en imágenes; subtítulos o transcripción en videos con voz.
- **Responsive:** móvil primero; probar desde ~360 px hasta escritorio ancho.
- **SEO básico:** títulos y descripciones por página, estructura semántica, imagen para compartir en redes.
- **Idiomas:** inglés primero; estructura preparada para sumar español.
- **Privacidad:** sin recolección de datos personales innecesaria; si se agrega analítica, que sea respetuosa y se decida después.
- **Mantenibilidad:** agregar un caso o servicio nuevo no debe requerir rehacer el diseño.

---

## 9. Insumos que yo proveeré

- Fotos (retrato, trabajando, en contexto).
- Capturas de proyectos con datos sintéticos o anonimizados.
- Videos o grabaciones de demo.
- Diagramas de arquitectura (C4) existentes o su descripción.
- Confirmación sobre qué puedo publicar de RedSinergia y del proyecto de forecasting.
- Enlace de GitHub y forma de contacto preferida.

---

## 10. Decisiones pendientes (no resolver sin consultarme)

- ~~Stack técnico y hosting~~ → Angular + AWS (S3 + CloudFront), Terraform. Pendiente: dominio (DNS en Hostinger) y analítica.
- Tagline final y versión definitiva del posicionamiento.
- ~~Casos de la primera versión~~ → los 4 casos (forecasting, WMS, TMS, automatizaciones).
- Si se publica con nombres reales o anonimizados.
- Si habrá sección de escritos/design docs en la primera versión.

---

## 11. Entregables y etapas

Entregar por etapas; esperar mi validación entre cada una.

1. **Etapa 1 — Copy y estructura:** tagline (3-5 opciones), textos de Hero, métricas, About y Contact; esqueleto de los casos. Marcar todo `[PENDIENTE]`.
2. **Etapa 2 — Dirección visual:** confirmación de paleta (con verificación de contraste), tipografía, componentes base y reglas de movimiento.
3. **Etapa 3 — Maqueta:** Hero + un caso de estudio completo (Demand Forecasting Platform), en escritorio y móvil.
4. **Etapa 4 — Resto del sitio:** secciones restantes y segundo caso.
5. **Etapa 5 — Pulido:** animaciones, rendimiento, accesibilidad y revisión de veracidad/confidencialidad.

---

## 12. Criterios de aceptación

- Todas las cifras del sitio provienen de la sección 3.4 y ninguna afirmación viola la 3.5.
- Un visitante identifica quién soy, qué resuelvo y cómo contactarme en < 30 s.
- Cada caso de estudio incluye decisiones y alternativas, no solo resultados.
- Ningún texto ofrece servicios ni usa lenguaje comercial (sección 3.6).
- La paleta cumple contraste AA y el sitio respeta "reducir movimiento".
- El sitio se ve bien y es usable en móvil.
- Los medios pesados no degradan la carga inicial.
- No hay datos reales de clientes expuestos.
