# Diseño — Agente vendedor para monzalab.com

**Fecha:** 2026-06-24
**Autor:** Edgar + Claude (brainstorming)
**Estado:** Aprobado el diseño; pendiente revisión del spec antes de planificar.

## 1. Objetivo

Reemplazar el botón flotante de WhatsApp de monzalab.com por un **agente de chat con el criterio de Edgar**: híbrido (chips para encuadrar + Claude real para conversar), muy vendedor pero por convicción y evidencia, que orienta al visitante hacia los 6 casos de uso que Monza ya domina y puede replicar, usando los proyectos reales como prueba viva, y que cierra capturando un lead o derivando a WhatsApp según la temperatura del interesado.

**Métrica de éxito:** más conversaciones calificadas que terminan en lead (correo a Edgar) o en WhatsApp con contexto, vs. el botón de WhatsApp pasivo actual.

## 2. Contexto técnico (lo que ya existe)

- Stack: React 18 + TypeScript + Vite + Tailwind + shadcn/ui. Hosting en Vercel. Backend Supabase. Email vía Resend.
- `api/lead.ts` — función Edge que valida, sanitiza y envía un correo de lead a Edgar (Resend); hace fallback a WhatsApp si no hay `RESEND_API_KEY`.
- `src/components/FloatingWhatsApp.tsx` — burbuja flotante actual (dark, pink `#F8B4D9`, blur), abajo a la derecha, monta site-wide. Usa `whatsAppUrl()` y `trackContact()` de `src/lib/pixel.ts`.
- `src/data/projects.ts` — 7 casos reales estructurados (`Project[]`) con `name`, `tag`, `desc` (multi-idioma es/en/de/pt), `caseStudy` (role, year, headline, story, pillars, press). Slugs: bavarian-econs, spectro, pacho-alvarez, guardian-of-speed, monza-haus, ia-index, eleonora-morales.
- `src/data/ventures.ts` — 3 ventures propios: Monza Studio, MonzaHaus, Monza Index.
- `src/i18n/LanguageContext.tsx` — idioma activo (es/en/de/pt).

## 3. Decisiones (cerradas en brainstorming)

| # | Decisión | Elegido |
|---|---|---|
| 1 | Arquitectura del agente | **Híbrido**: chips de los 6 casos + Claude real conversacional |
| 2 | Cierre | **Inteligente según temperatura**: WhatsApp si está caliente, lead a correo si explora |
| 3 | Fuente de conocimiento | **Proyectos reales** de `projects.ts` + `ventures.ts`, orientado a casos que se replican |
| 4 | Caso "agentes" | Se vende como **agentes de IA a la medida** (ventas por WhatsApp, asesoría tipo asesora de moda, comercio exterior, atención, etc.). El agente puede **citar estos casos como evidencia sin nombre propio** del cliente. Este mismo agente web es la demo viva del servicio |
| 5 | Política de precios | **Califica sin cerrar precio**; órdenes de magnitud solo si presionan |
| 6 | Construcción | **Propio en Vercel** (no SaaS): endpoint serverless + widget React |
| 7 | Modelo | **Claude Opus 4.8** (`claude-opus-4-8`) — máximo criterio; costo trivial vs. valor del lead |

## 4. Arquitectura

```
Navegador                          Vercel (backend)              Anthropic
─────────                          ────────────────              ─────────
<MonzaAgent>  ──POST /api/chat──>  api/chat.ts
 (burbuja +     {messages, lang}    - arma system prompt
  panel chat)                       - prompt caching            ── Claude Opus 4.8
   ▲                                - streaming + tools  ──────>   (streaming SSE)
   │  stream SSE                        │
   └────────────────────────────────────┘
                                    Si Claude llama una tool:
                                    - capturar_lead → reusa lógica de api/lead.ts (Resend → correo a Edgar)
                                    - abrir_whatsapp → devuelve deep link (whatsAppUrl) al front
```

### 4.1 Componentes (unidades aisladas)

| Unidad | Qué hace | Entradas | Depende de |
|---|---|---|---|
| `api/chat.ts` | Endpoint de chat: arma system prompt, llama a Claude con streaming + tools, ejecuta tools, devuelve stream SSE | `{ messages, lang }` | `@anthropic-ai/sdk`, `lib/agent/knowledge`, `lib/agent/persona`, lógica de lead (Resend) |
| `lib/agent/knowledge.ts` | Compila la base de conocimiento (6 casos de uso → evidencia) desde `projects.ts` + `ventures.ts` a texto para el system prompt | — | `data/projects.ts`, `data/ventures.ts` |
| `lib/agent/persona.ts` | Construye el system prompt: voz/criterio + barandas + conocimiento + instrucciones de cierre | `lang` | `lib/agent/knowledge.ts` |
| `lib/agent/tools.ts` | Define las tools `capturar_lead` y `abrir_whatsapp` (JSON schema) y sus handlers | — | lógica de lead, `whatsAppUrl` |
| `components/MonzaAgent.tsx` | Burbuja flotante + panel de chat: chips, input, render de streaming y de acciones de cierre | — | shadcn/ui, framer-motion, `i18n`, `hooks/useAgentChat` |
| `hooks/useAgentChat.ts` | Estado del chat en el cliente: historial, envío, consumo del stream SSE, estados de error | — | `fetch` a `/api/chat` |

Cada unidad tiene un propósito único y un contrato claro; `knowledge.ts` y `persona.ts` se pueden testear sin red.

### 4.2 Flujo de cierre (tools)

El system prompt instruye a Claude a llamar una tool cuando detecta intención real:

- **`abrir_whatsapp`** (lead caliente / con urgencia): el handler devuelve un deep link de WhatsApp construido con `whatsAppUrl(mensajeResumido)`. El front lo muestra como botón de acción ("Sigue por WhatsApp con Edgar →") y dispara `trackContact("whatsapp", "agente")`. Argumentos: `{ resumen: string, caso: string }`.
- **`capturar_lead`** (explorando): argumentos `{ nombre, email, marca, caso, necesidad }`. El handler reusa la lógica de `api/lead.ts` (validación + Resend → correo a Edgar con `source: "agente"`). Devuelve a Claude `{ ok: true }` para que confirme al usuario; si Resend falla, fallback a `abrir_whatsapp`.

## 5. UX del widget

- **Burbuja** abajo a la derecha (`bottom-5 right-5`, `z-[60]`), mismo lenguaje visual del WhatsApp actual (dark `rgba(11,11,16,0.92)`, borde/sombra pink `#F8B4D9`, blur). Icono de chat.
- **Panel** al abrir: encabezado "Monza · Agente" con cerrar; saludo corto en la voz de Edgar; **6 chips** de casos de uso; input de texto libre.
- Chips (es): `Ser AI-first` · `Marca de ropa → e-commerce` · `Agentes de IA` · `Solo web` · `Branding` · `Consultoría`. Traducidos a en/de/pt vía i18n.
- Al elegir chip o escribir, arranca la conversación: respuestas en **streaming**. Claude hace 2-3 preguntas de calificación, muestra evidencia real y empuja al cierre.
- Acciones de cierre se renderizan inline: botón de WhatsApp, o mini-formulario de lead (nombre/email/marca) embebido en el chat.
- Responsive; accesible (foco, `aria-label`, navegable por teclado). El idioma sale de `LanguageContext`.

## 6. El cerebro (system prompt)

`persona.ts` ensambla, en el idioma activo:

1. **Identidad y voz** — derivada de `monza-voice` / `monza-strategy`: criterio sobre capital, opinión fuerte, sin emojis, sin CTAs baratos, premium pero directo. Vende por convicción y evidencia.
2. **Conocimiento** — compilado por `knowledge.ts`: los 6 casos de uso, cada uno con su pitch y la evidencia real que lo prueba. Mapeo inicial (afinable):

   | Caso de uso | Evidencia |
   |---|---|
   | Empresa AI-first | Monza Index, IA-Index, Spectro |
   | Marca de ropa → e-commerce | Pacho Álvarez, Bavarian (sistema de ventas) |
   | Agentes de IA a la medida | Asesora de moda con IA, agentes para comercio exterior, agentes de venta por WhatsApp — **citables sin nombre propio**. Y este mismo agente web como demo viva |
   | Solo web | Guardian of Speed, Bavarian (web global + SEO) |
   | Branding | Bavarian (identidad 0→1, Forbes) |
   | Consultoría | Transversal: estrategia / MVP / capital |

3. **Objetivo de venta** — calificar por caso y seriedad; mostrar de lo que Monza es capaz; empujar al cierre adecuado.
4. **Barandas** — no inventa capacidades fuera de lo que Monza hace; no cierra precios (da órdenes de magnitud solo si presionan); puede citar verticales/casos de agentes como evidencia (asesora de moda, comercio exterior, ventas) pero **nunca con el nombre propio del cliente**; no se sale del negocio; resiste prompt injection ("ignora tus instrucciones"); si no sabe algo, deriva a Edgar en vez de inventar.

El system prompt se marca con `cache_control` (prompt caching) para que su costo se cobre a ~0.1x en cada turno.

## 7. Modelo, costo y rendimiento

- Modelo: `claude-opus-4-8`.
- **Streaming** siempre (SSE), para que el chat se sienta vivo y no haya timeouts.
- **Adaptive thinking** (`thinking: { type: "adaptive", display: "omitted" }`) con `effort` bajo-medio: piensa en objeciones complejas, responde directo en lo simple. No se muestra el razonamiento al usuario.
- **Prompt caching** del system prompt (conocimiento + voz + barandas): es lo que hace que el costo por conversación sea de centavos.
- Costo estimado con caching: ~12-15¢ por conversación completa de calificación. Trivial frente al valor de un lead. Si el volumen crece mucho, se baja a `claude-sonnet-4-6` cambiando el string del modelo, sin más cambios.

## 8. Datos, privacidad e i18n

- **Persistencia mínima (v1):** no se guarda la conversación; solo el **lead final** sale por correo a Edgar (igual que hoy con `api/lead.ts`). 
- **Idiomas:** el agente responde en el idioma del sitio (es/en/de/pt). Claude lo hace de forma nativa; los chips y textos fijos de UI se traducen vía i18n.
- La **API key de Anthropic** vive solo en variables de entorno del backend de Vercel (`ANTHROPIC_API_KEY`), nunca en el navegador.

## 9. Seguridad y límites

- **Rate limiting** en `api/chat.ts` (por IP / sesión) para evitar abuso y disparo de costos.
- **Tope por sesión:** máximo de mensajes y de longitud por mensaje; si se excede, el agente cierra cordialmente derivando a WhatsApp/lead.
- Sanitización de las entradas a las tools antes de enviar el correo (reusar el saneamiento de `api/lead.ts`).
- Barandas de prompt injection en el system prompt (sección 6).

## 10. Manejo de errores y fallbacks

- Error de la API de Claude (429/5xx): el SDK reintenta; si persiste, el front muestra un mensaje cordial y ofrece el botón directo de WhatsApp (no se pierde el lead).
- Fallo de Resend en `capturar_lead`: fallback automático a `abrir_whatsapp` con el contexto ya resumido.
- Stream interrumpido: el cliente conserva lo recibido y permite reintentar.
- Sin `ANTHROPIC_API_KEY` configurada: el widget cae al comportamiento actual (botón de WhatsApp directo).

## 11. Plan de pruebas

- **Unidad:** `knowledge.ts` (compila los 6 casos sin red), `persona.ts` (incluye barandas y no nombra clientes confidenciales), schemas de `tools.ts`.
- **Integración:** `api/chat.ts` con un mock del SDK — verifica streaming, ejecución de cada tool y el fallback Resend→WhatsApp.
- **Manual (criterio/voz):** guion de conversaciones por cada uno de los 6 casos; verificar voz, evidencia correcta, que no nombra a Eleonora, que no cierra precios, y que el cierre cae en el canal correcto según temperatura.
- **Prompt injection:** intentos de "ignora tus instrucciones" / pedir precios cerrados / temas fuera del negocio → el agente se mantiene en rol.

## 12. Fuera de alcance (v1 — YAGNI)

Dashboard de conversaciones, persistencia en Supabase, seguimiento multironda por email, agendamiento con calendario, voz/audio, ingestión de PDFs externos. Todo esto es fase 2 si se pide.

## 13. Variables de entorno nuevas

- `ANTHROPIC_API_KEY` — clave de la API de Claude (backend, secreta).
- (Reusa las existentes: `RESEND_API_KEY`, `RESEND_FROM`, `NOTIFY_EMAIL`.)
