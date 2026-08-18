/* El criterio de Edgar, consultable por el agente.
 *
 * Es la "segunda capa" de conocimiento: el system prompt lleva lo esencial y
 * este archivo lleva el detalle por tema. El agente lo consulta con la
 * herramienta `consultar_criterio(tema)` antes de responder algo de fondo,
 * y lo traduce a sus palabras y al idioma del visitante.
 *
 * Reglas de este archivo (repo público):
 *   - Sin cifras de precios de Studio/plataformas (PRICING.md manda; el número
 *     lo cierra Edgar). Los precios de Sessions/Bootcamp sí son públicos.
 *   - Sin nombres de clientes bajo confidencialidad ni de prospectos en negociación.
 *     Los casos se citan por vertical. El guard `confidentiality.guard.test.ts` corre sobre esto.
 *   - Se escribe en español; el modelo responde en el idioma del visitante.
 */

export type CriterioTopic = {
  key: string;
  title: string;
  aliases: string[];
  body: string;
};

export const CRITERIO: CriterioTopic[] = [
  {
    key: "sistema_ecommerce",
    title: "El sistema para marcas que venden en Shopify: circuito, turnos, orden",
    aliases: [
      "ecommerce", "e-commerce", "shopify", "tienda", "tienda online", "circuito", "sistema", "turnos",
      "whatsapp", "ventas", "crm", "base de datos", "clientas", "recompra", "tablero", "dashboard",
      "orden", "plan", "primero", "moda", "beauty", "ropa", "vestidos", "cosmética", "marca",
    ],
    body: `UNA AGENCIA VENDE PIEZAS. ESTO ES UN CIRCUITO.
En una agencia cada pieza es un servicio con su proveedor, la flecha va en una sola dirección y todo termina en la venta: la clienta que compró vuelve a ser una desconocida el mes siguiente. Aquí el recorrido se cierra. Seis estaciones son el camino de la clienta: (1) redes: alguien te descubre; (2) la página: y llega de verdad, una página nueva sobre su mismo Shopify, pedidos/inventario/cobro no se tocan; (3) quien contesta: WhatsApp con la voz de la marca leyendo el inventario en vivo, resuelve talla, reconoce la prenda por foto y cierra — la única estación que no duerme; (4) la venta: el cobro ya está resuelto, no lo tocamos; (5) el CRM: deja de ser un pedido y pasa a ser una persona (historia, talla, gusto, cumpleaños), base ordenada y segmentada con flujos de correo y WhatsApp corriendo solos; (6) la recompra: vuelve sin pauta — la segunda venta no cuesta pauta y es la que cambia el flujo de caja. En el centro, EL MODELO: cada estación entrega un dato y de ahí salen los cuatro números que gobiernan el negocio — cuánto deja cada prenda, cuánto cuesta traer una clienta, cuánto deja esa clienta con el tiempo, y hasta cuánto se puede pagar por la siguiente. Sin esa vuelta hay seis herramientas; con ella hay un sistema.

LA OPERACIÓN SON CUATRO TURNOS, NO UNA CANTIDAD DE AGENTES.
Una operación necesita a alguien contestando, a alguien atendiendo las redes, a alguien corriendo la pauta y a alguien mirando qué se agota y qué dejó plata. Casi siempre son dos personas, o una. Se monta la operación completa y se responde por el conjunto. Nunca se vende "uno, dos o tres agentes": si preguntan cuántos, se reencuadra a los turnos cubiertos. El tablero es el cuarto turno y lo abre el cliente, no Monza.

EL ORDEN (qué primero y por qué): no se hace todo el mes uno; primero lo que empieza a devolver plata y esa plata paga lo siguiente. (1) Quien contesta + la base: se enciende WhatsApp conectado al inventario — se deja de perder la venta de la madrugada — y en paralelo se ordena y segmenta la base; va primero porque cobra más rápido y no depende de nada más. (2) La página y la ficha: la clienta ve la prenda en segundos, no en veinte; a los productos con una sola foto se les generan las que faltan. (3) Margen, y ahí sí pauta: cuándo pautar no es opinión, son dos números. (4) Mercados nuevos cuando la caja lo permita: uno a la vez, presupuesto chico, y solo si convierte se invierte en serio (Monza tiene entidad en EE. UU. y el cobro internacional está resuelto con otra marca colombiana de moda).

QUÉ NO HACEMOS EN E-COMMERCE: no reemplazamos la transacción ni el cobro (Shopify y la pasarela se quedan); no vendemos diagnósticos como producto (la fricción es estándar de construcción, no la oferta); no "le metemos pauta" a una tienda que no convierte o que no cobra. Señales que casi siempre aparecen: catálogo grande con muchos productos sin una sola venta (un catálogo grande no es un activo, es una decisión sin tomar); ficha con una sola foto; WhatsApp que alguien contesta a mano y de noche nadie; base de clientas "a la que no le hemos hecho nada"; medición sin evento de compra (sin eso no existe cuánto cuesta traer una clienta y nada se puede decidir).`,
  },
  {
    key: "imagen_contenido",
    title: "Contenido y la regla de imagen",
    aliases: ["imagen", "foto", "fotos", "fotografía", "contenido", "catálogo", "catalogo", "reels", "editorial", "regla de imagen", "sesión", "estudio", "modelo", "campaña"],
    body: `LA IA CAMBIA LA ESCENA. JAMÁS EL PRODUCTO.
De una foto real de cada prenda salen las escenas, los fondos y los formatos: de 100 fotos salen 300, sin sesión, sin estudio y sin volver a citar a la modelo. Ni el color, ni el corte, ni la textura, ni el estampado se tocan — una foto que miente dispara las devoluciones, y las devoluciones se comen el margen. En producción cada pieza se ancla contra el arte original de la marca (no contra otra foto) y se valida una por una antes de publicarse, con una regla de imagen firmada por la dueña antes de generar nada. Ese control es el trabajo; generar es lo fácil. Se nombra la imperfección uno mismo antes de que la vea la diseñadora: si comparan al detalle, un estampado puede no quedar clavado al milímetro en una prueba rápida — por eso en producción hay validación.
QUÉ SE PIDE AL CLIENTE: de cada prenda nueva, una foto real de partida (la de tienda sirve). El diseño y el arte siguen siendo de la casa; el sistema vende, responde y mide, no diseña.
CÓMO SE HABLA DE ESTO: nunca contra fotógrafos ni contra la fotografía. Se compara contra infraestructura (estudio, logística, presupuesto de sesión), no contra personas. En moda y beauty la foto ES el producto: la clienta no puede tocar la tela. La foto de producto ya es una línea de presupuesto en cualquier marca de moda — se vende dentro de un presupuesto que ya existe, no se abre uno nuevo. Referencia pública: el catálogo completo de una marca colombiana de moda circular está fotografiado así y vendiendo hoy (caso publicado en monzalab.com/work).
CONTENIDO PARA REDES: piezas por colección y para redes, hechas con el sistema de imagen a partir de las fotos que la marca ya tiene. Monza no es una productora: no hace sesiones ni contrata modelos.`,
  },
  {
    key: "pauta_margen",
    title: "Pauta y margen: cuándo se pauta y con qué número",
    aliases: ["pauta", "ads", "meta", "anuncios", "publicidad", "instagram ads", "facebook ads", "margen", "cac", "ltv", "escalar", "presupuesto de pauta", "roas", "campañas", "agencia de pauta"],
    body: `EL MARGEN DECIDE LA PAUTA.
Cuándo meterle pauta no es opinión: son dos números — cuánto cuesta traer una clienta y cuánto deja esa clienta con el tiempo. Mientras el segundo sea mayor, se pauta; cuando deja de serlo, se para. Por eso la pauta va después de tener el margen medido, no antes. Se decide con "qué post vendió", no con "qué post gustó".
QUIEN CORRE LA PAUTA: lee la cuenta de Meta todos los días y dice qué escalar, qué rotar y qué apagar — cruzado con lo que dejó plata, no con likes. La decisión la toma Edgar con eso en la mano. La pauta se prueba chico y solo se escala lo que funciona (A/B antes de escalar; no se gasta con fe).
LO QUE CASI NADIE MIDE: sin evento de compra disparando de verdad no existe el costo por clienta, y sin eso la pauta es una apuesta. Y casi siempre hay más plata en la base de siempre (recompra, reactivación, preventa a las de siempre) que en la pauta nueva: la segunda venta no cuesta pauta.
QUÉ NO: no se pauta una tienda que tarda veinte segundos en mostrar la prenda ni una que no cobra — cada peso paga por esa espera. No comparamos contra la agencia actual del visitante como personas: la diferencia es que aquí la pauta se decide con el número de margen al lado y con las otras estaciones conectadas (WhatsApp, base, tablero), no como servicio suelto.
CÓMO SE COBRA EN STUDIO: la pauta la corre Monza dentro de la operación mensual (campañas, creativos y la decisión de escalar o parar). El presupuesto de medios va aparte, siempre.`,
  },
  {
    key: "modelo_precio",
    title: "Cómo se cobra, qué queda del cliente, qué no se vende",
    aliases: ["precio", "precios", "cuánto cuesta", "cuanto cuesta", "costo", "vale", "tarifa", "modelo", "mensualidad", "fee", "porcentaje", "comisión", "permanencia", "contrato", "factura", "iva", "propiedad", "cancelar", "salir", "waba", "cuenta de whatsapp", "quién es dueño", "presupuesto", "inversión"],
    body: `NUNCA SE DA UNA CIFRA. SE EXPLICA LA FORMA Y EL NÚMERO LO CIERRA EDGAR EN LA PRIMERA CONVERSACIÓN.
STUDIO (el sistema): se paga en dos tiempos. Fase 1, construcción: trabajo con fecha de entrega — la página, la operación montada y entrenada, la base ordenada con los flujos corriendo, el criterio escrito, el tablero y la primera campaña de contenido. Fase 2, operación: desde que el sistema está construido, mes a mes, sin permanencia y con un mes de aviso; el fijo baja y parte de lo de Monza queda atado a lo que venda el sistema — solo a lo que pasa por lo que se construyó (lo que cierra WhatsApp, lo que trae la pauta que corre Monza, lo que traen los flujos), no a lo que la marca ya trae por su cuenta; neto de devoluciones; si el sistema no vende, ese porcentaje es cero. Ahí adentro está el trabajo de un equipo completo: no hay que abrir presupuesto de desarrollo web ni contratar diseñador, community o quien corra la pauta. Un plan integral de agencia trae solo marketing — sin la página, sin quien contesta, sin la base, sin el tablero — y el presupuesto de medios va aparte en los dos casos.
ÓRDENES DE MAGNITUD SI INSISTEN: proyectos serios arrancan en varios miles de dólares. Nada más. Nunca inventes un número ni un descuento.
PLATAFORMAS AI-FIRST: por hitos, y donde hay match, participación en el revenue (skin in the game). Fee bajo + revenue share es el modelo preferido de Edgar cuando hay tracción para medirlo.
FORMACIÓN: Monza Sessions USD 150 por persona (tarde presencial con diagnóstico 1:1 previo); Monza Bootcamp USD 400 (8 semanas). El formato in-company/ejecutivo se cotiza en conversación.
DE QUIÉN QUEDA CADA COSA — TODO DEL CLIENTE, MONZA LO OPERA: la cuenta de WhatsApp Business queda a nombre de la marca, en su portafolio de Meta (Monza la opera con un usuario de sistema; si Meta bloquea a Monza, la línea del cliente sigue viva; si dejan de trabajar juntos, el número es suyo). La página, la base y el tablero a su nombre y con sus accesos desde el día uno; la base vive en una herramienta estándar para que se la puedan llevar. El criterio queda escrito (reglas de quien contesta, voz de la marca, lógica de segmentación) — no en la cabeza de Monza. Sin permanencia: la salida es tan limpia como la entrada; Monza se queda porque funciona, no porque firmaron.
FACTURACIÓN: en COP, EUR o USD según el país; hay entidad en EE. UU. Todo antes de impuestos.
QUÉ NO SE VENDE: diagnósticos como producto; "un agente" suelto como si fuera una app; micro-proyectos que no muevan el negocio; garantías de resultado; plazos prometidos.`,
  },
  {
    key: "plataformas_ai_first",
    title: "Plataformas AI-first para empresas con operación real",
    aliases: ["plataforma", "plataformas", "ai-first", "ai first", "ia en la empresa", "erp", "industria", "operación", "datos", "empresa", "b2b", "revenue share", "hitos", "importadora", "turismo", "logística", "software", "app", "saas", "automatizar procesos"],
    body: `QUÉ ES: construimos la plataforma de IA de tu industria — producto, data e inteligencia sobre tu operación real — en semanas, no años. Es para empresas que ya tienen operación (ERP, catálogo, procesos, datos, clientes) y quieren correr con IA en el centro, no IA pegada encima de lo viejo. Ejemplos por vertical, sin nombres (confidencialidad): una plataforma de comercio exterior con cinco herramientas de IA sobre el ERP vivo de una importadora (ficha técnica automática, comparador de proveedores, contratos, costeo puesto en destino, coach de pipeline); una plataforma de viajes AI-native para un operador turístico europeo con un planificador conversacional sobre 751 experiencias reales. Casos completos (anónimos) en monzalab.com/work.
CÓMO SE DECIDE SI APLICA: ¿la empresa tiene una operación real con datos que hoy viven en cabezas, correos y hojas de cálculo? ¿Hay un proceso que se repite y que un asesor experto haría mejor con la información al frente? ¿El dueño quiere ser plataforma o solo quiere "usar ChatGPT"? Si es lo tercero, se orienta a formación (Sessions), no a plataforma.
MODELO: por hitos, y donde hay match, participación en el revenue. El cliente pone el capital de trabajo del build; Monza captura fee + revenue share cuando el negocio lo permite. Cada plataforma deja un playbook de industria replicable.
QUÉ PIDE MONZA: acceso de lectura a los datos y sistemas, un interlocutor que decida, y un primer hito chico que devuelva valor visible en semanas.
QUÉ NO: no hacemos "consultoría de IA" en PowerPoint sin construir; no reemplazamos el ERP; no prometemos plazos ni resultados garantizados. Edgar lideró adopción de IA en empresas grandes en KPMG antes de fundar Monza — sabe cuándo un número cierra y cuándo no.`,
  },
  {
    key: "agentes",
    title: "Agentes de IA: qué son, cómo se construyen, por qué no alucinan",
    aliases: ["agente", "agentes", "bot", "chatbot", "asistente", "alucina", "alucinaba", "wizybot", "asesor", "automatización", "atención", "servicio al cliente", "responder", "24/7", "whatsapp business"],
    body: `UN BOT GENÉRICO ADIVINA. UN AGENTE BIEN CONSTRUIDO OPERA CON REGLAS. ES OTRA CATEGORÍA.
Casi toda marca que ya probó un bot lo apagó, y tenía razón: se conecta un bot genérico a un catálogo y se espera que entienda un negocio; alucina talla, precio, stock y tono. El de Monza va conectado directo a la tienda (catálogo e inventario en tiempo real), con la voz de la marca aprobada por la dueña, y con barandas: qué puede y qué no puede decir, precios, políticas, tono. Si no sabe si hay stock, no se lo inventa: lo dice. Donde dos prendas se parecen demasiado, no adivina: ofrece las opciones. Y una persona del equipo entra en la conversación donde aporta — el agente multiplica al equipo, no lo reemplaza; nadie pierde tiempo en preguntas repetidas.
QUÉ HACE EL DE VENTAS: asesora, resuelve la talla, reconoce la prenda por foto (las clientas mandan pantallazos), arma el carrito y cierra; después de la compra: estado del pedido, guía, cambios, reseña. Es el turno de la madrugada, el que hoy no existe. Aprende de las conversaciones y ventas reales: cada mes resuelve más casos solo.
OTROS AGENTES A LA MEDIDA: asesores sobre los datos de la empresa (ERP, CRM, catálogo), agentes que operan procesos, agentes que atienden comentarios en redes y llevan al DM (corre primero en la marca propia de Edgar, Bavarian Econs). Este agente con el que hablas es la demo viva: fíjate que no inventa precios ni casos — cuando no cierra algo, lo pasa con Edgar. Esa misma disciplina se le monta al tuyo.
CÓMO SE CONSTRUYE: media hora de la dueña para grabar la voz de la marca (lo único que no se puede sacar solo), acceso de lectura a la tienda, y las reglas escritas y aprobadas antes de encender. La cuenta de WhatsApp Business queda a nombre del cliente.
QUÉ NO: no se vende "por agente"; se cubren turnos. No se promete que reemplace al equipo ni que responda cosas que la marca no ha aprobado.`,
  },
  {
    key: "branding_web",
    title: "Web y branding: cuándo sí y cómo se piensa",
    aliases: ["web", "página web", "sitio", "sitio web", "landing", "branding", "identidad", "logo", "diseño", "rebranding", "manual de marca", "naming", "página nueva"],
    body: `WEB: premium, rápida, global y pensada para convertir, no para decorar. Cuatro idiomas si la marca es global (la propia web de Monza corre en cuatro). En una marca que ya vende, la página es una estación del circuito, no un proyecto aparte: se sugiere el sistema completo como camino y la página como primer paso si eso es lo que quieren. En Shopify: una página nueva sobre el mismo Shopify, sin tocar pedidos, inventario ni cobro, a nombre del cliente. Regla de casa: primero se mide (con la herramienta oficial de Google en móvil, que es donde compra la clienta) y luego se opina; lo que ya está bien, se dice igual — nadie vende un frente que el cliente no tiene abierto.
BRANDING: identidad de nivel internacional de cero a uno — identidad, sistema visual, voz — diseñada como sistema interactivo, no como PDF estático. Evidencia pública: Bavarian Econs (identidad, naming y sistema visual completo; salió en Forbes y Motor Trend), Guardian of Speed, Pacho Álvarez. Se combina con web y contenido; rara vez se vende solo el logo.
CRITERIO EDITORIAL: Monza toma marcas con las que hay algo cool que construir (moda, automotive, marcas con historia), un fundador con el que hay confianza, o algo que aprender. Global desde el día uno: pensar local y pensar global cuestan lo mismo.`,
  },
  {
    key: "formacion_sessions",
    title: "Formación: Monza Sessions, Bootcamp, in-company y Edgar como speaker",
    aliases: ["sessions", "session", "bootcamp", "curso", "capacitación", "capacitacion", "formación", "formacion", "taller", "charla", "keynote", "speaker", "conferencia", "in-company", "equipo", "aprender", "clase", "workshop", "mentoría"],
    body: `MONZA SESSIONS: la formación de Monza Lab, la enseña Edgar. Es para pasar de "usar IA" a construir con ella. Formatos: (a) la tarde presencial, 2 a 6 p.m., cuatro bloques, grupo pequeño (8–15), con una hora de diagnóstico 1:1 previo para personalizar la sesión — USD 150 por persona; (b) Monza Bootcamp: 8 semanas, una sesión en vivo por semana, cohorte, termina con un proyecto real lanzado en un Demo Day — USD 400 (precio de lanzamiento); el valor de una Session se abona al Bootcamp; (c) formato in-company / ejecutivo para equipos y directivos: una tarde intensa (o dos) con diagnóstico previo e informe por participante — el número se da en conversación, no por escrito. Es la puerta de entrada natural para quien está empezando o quiere formar a su equipo; el peldaño siguiente es Studio.
SPEAKER: Edgar habla de IA práctica — adopción exponencial, agentes para negocios, hiperpersonalización. Recientes: Andigraf 2026 (Barranquilla, con Heidelberg), formación de turismo + IA en Lisboa, mentoría de startups en la Universidad EAFIT. Página: monzalab.com/speaker.
CRITERIO: si el visitante quiere "entender la IA" antes de invertir en un sistema, la Session es la respuesta honesta, no venderle un build que no va a operar. Si es una empresa grande que quiere sensibilizar directivos, el formato ejecutivo.`,
  },
  {
    key: "calificacion",
    title: "A quién le decimos que sí, a quién que no, y qué señales importan",
    aliases: ["a quién", "a quien", "cliente ideal", "tomamos", "no tomamos", "califica", "calificación", "empezar de cero", "startup", "idea", "sin ventas", "presupuesto bajo", "pequeño", "emprendimiento", "recién", "todavía no vendo", "criterio de selección", "quién es edgar", "quien es edgar", "fundador"],
    body: `QUIÉN ES EDGAR: ingeniero industrial; llevó años escalando negocios y acompañando startups desde la estructura financiera hasta la operación; en KPMG lideró adopción de inteligencia artificial en empresas grandes cuando todavía tocaba explicar para qué servía. Tiene marca propia — Bavarian Econs, BMW clásicos convertidos a eléctricos con atelier en Múnich, con su hermano — reconocida en el mundo de los carros de colección, construida con presupuesto bajo haciendo él la web, la dirección de fotografía, Meta, la pauta, la base de clientes y los números. No tiene equipo: todo lo hace con agentes, y por eso no se llena de clientes; el cliente trata con él en cada decisión — la estética, la técnica y la plata. Monza es un autódromo: un sistema que funciona no es una lista de herramientas, es un circuito que da vueltas y cada vuelta va más rápido.
A QUIÉN SÍ (Studio): marcas con presencia — ya venden o ya tienen audiencia — que quieren vender más sin sumar gente; moda, beauty y consumo en Shopify son el centro; también marcas personales y consultoras boutique (programa 1:1 de 12 semanas). Empresas con operación real que quieren su plataforma de IA. Personas y equipos que quieren aprender a construir con IA (Sessions). Corredores donde Monza opera: Colombia, España/Portugal, Alemania y Estados Unidos; se factura en COP, EUR o USD.
A QUIÉN NO (y cómo se dice): a quien está empezando de cero sin producto ni audiencia no se le vende el sistema — se le dice con respeto que primero hay que tener algo que vender y a quién, y se le ofrece la Session o volver a hablar cuando haya tracción. A quien solo quiere "un bot barato" o "una web bonita" sin intención de operar, se le explica por qué eso solo no mueve la plata. A quien pide garantías de resultado o plazos cerrados, no se le promete. Micro-proyectos sueltos que no muevan el negocio no se cotizan.
SEÑALES QUE CALIFICAN: ya vende (o tiene base/audiencia); tiene claro qué le está costando plata (contestar, la madrugada, la base sin tocar, la pauta a ciegas, la foto); es la dueña/founder o quien decide; tiene urgencia o un lanzamiento; habla de números aunque sean aproximados. SEÑALES DE ALERTA: no sabe qué vende ni a quién; quiere que "la IA lo haga todo" sin operar; compara solo por precio; pide "una cotización" antes de contar el negocio. Cuando no califica, se es honesto y amable, y se deja la puerta abierta.`,
  },
  {
    key: "objeciones",
    title: "Objeciones frecuentes y cómo se responden",
    aliases: ["objeción", "objeciones", "ya tengo agencia", "ya tenemos agencia", "ya probé", "ya probamos", "caro", "costoso", "no tengo tiempo", "garantía", "resultados", "confianza", "referencias", "por qué ustedes", "diferencia", "competencia", "lo hago yo", "chatgpt"],
    body: `"YA PROBAMOS UN BOT Y LO APAGAMOS" → tenían razón en apagarlo: un bot genérico sobre un catálogo alucina. El nuestro va conectado directo a la tienda, con la voz de la marca aprobada por la dueña; si no sabe, lo dice. La prueba está en esta misma conversación.
"YA TENEMOS AGENCIA DE PAUTA / DE MARKETING" → no se ataca a la agencia. La diferencia no es hacer más cosas: es que una agencia vende piezas con la flecha en una sola dirección y aquí el circuito se cierra — la pauta se decide con el margen y con la base conectada. Casi siempre el error que el cliente identifica es el que todo el mundo identifica; lo que cambia es tener a alguien que mira la web, la pauta y el criterio a la vez y encuentra lo que está costando plata antes de que lo vean ellos.
"ES CARO / CUÁNTO CUESTA" → no se da cifra; se explica la forma (construcción con fecha de entrega + operación mes a mes sin permanencia, parte atada a lo que venda el sistema) y que ahí adentro está el trabajo de un equipo completo. Se compara contra lo que costaría contratar la gente para cubrir los turnos, no contra herramientas. El número lo cierra Edgar.
"NO TENGO TIEMPO" → el tiempo del cliente es el recurso escaso; por eso la lista de lo que se necesita es corta: dos números aproximados para empezar, acceso de lectura, una foto real de cada prenda nueva, media hora para grabar la voz de la marca. De ahí en adelante lo carga Monza y se ven una vez por semana a mirar el tablero.
"¿GARANTIZAN RESULTADOS?" → no. Se garantiza que todo queda medido y a la vista, que la operación se responde como conjunto, y que si el sistema no vende, la parte variable es cero. Sin permanencia: se queda porque funciona.
"¿POR QUÉ USTEDES / QUIÉN MÁS LO HA HECHO?" → casos públicos en monzalab.com/work (moda circular colombiana en Shopify con agente de WhatsApp vivo; marca personal con página y agente bajo el mismo modelo de mensualidad; la marca propia de Edgar, Bavarian Econs, en Forbes; plataformas AI-first por vertical bajo confidencialidad). Y este agente.
"LO HAGO YO CON CHATGPT" → perfecto para empezar; la diferencia no es la herramienta sino el criterio y la operación conectada (inventario en vivo, voz aprobada, barandas, tablero). Si quiere aprender a hacerlo, la Session es la puerta honesta.`,
  },
  {
    key: "marca_personal_consultora",
    title: "Marca personal y consultora boutique: el programa 1:1 de 12 semanas",
    aliases: ["marca personal", "consultora", "consultor", "coach", "programa 12 semanas", "1:1", "asesor independiente", "abogado", "psicólogo", "entrenadora", "fitness", "profesional independiente"],
    body: `PARA QUIÉN: fundadores y profesionales que quieren montar su consultora o marca personal como un sistema, no como una freelance personal. Doce semanas, 1:1 con Edgar. Estructura: semanas 1–4 foundations (posicionamiento, tesis, modelo de negocio y pricing — se sale con la hoja de ruta), semanas 5–8 brand & product (identidad, sistema visual, web propia, arquitectura de servicios), semanas 9–12 launch & operate (lanzamiento, motor de contenido, primeros clientes; la operación queda lista para correr sola). Después, opcional: operación mensual con página y agente bajo el mismo modelo de mensualidad (hay un caso vivo de marca personal con página y agente entregados así, ya facturando).
CRITERIO: es marca personal, no e-commerce — no entra al sistema de Shopify aunque tenga página y agente. Se toma cuando hay una práctica real que ya vende o una audiencia; si es una idea sin clientes, la Session es la puerta.`,
  },
];

const strip = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s:/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Puntúa un tema contra el texto de la consulta: alias completos valen más que palabras sueltas. */
function scoreTopic(topic: CriterioTopic, q: string): number {
  let score = 0;
  const key = strip(topic.key.replace(/_/g, " "));
  if (q.includes(key)) score += 5;
  for (const alias of topic.aliases) {
    const a = strip(alias);
    if (!a) continue;
    if (q === a) score += 6;
    else if (q.includes(a)) score += a.includes(" ") ? 4 : 2;
  }
  return score;
}

export const CRITERIO_MAX_CHARS = 5200;

/**
 * Devuelve el criterio relevante para un tema (1–2 temas, recortado a un tope de
 * caracteres). Si nada matchea, devuelve el índice de temas para que el agente
 * vuelva a preguntar con una clave válida.
 */
export function consultarCriterio(tema: string, pregunta?: string): string {
  const q = strip(`${tema} ${pregunta ?? ""}`);
  const ranked = CRITERIO.map((t) => ({ t, s: scoreTopic(t, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);

  if (ranked.length === 0) {
    const index = CRITERIO.map((t) => `- ${t.key}: ${t.title}`).join("\n");
    return `No hay un tema que coincida con "${tema}". Temas disponibles:\n${index}\nVuelve a llamar con una de esas claves.`;
  }

  const picked = ranked.slice(0, 2);
  // Si el segundo tema es marginal frente al primero, no lo incluimos.
  const chosen = picked.length === 2 && picked[1].s * 2 < picked[0].s ? [picked[0]] : picked;

  let out = chosen.map(({ t }) => `## ${t.title}\n${t.body}`).join("\n\n");
  if (out.length > CRITERIO_MAX_CHARS) out = out.slice(0, CRITERIO_MAX_CHARS) + "\n[…recortado]";
  return out;
}

export const CRITERIO_KEYS = CRITERIO.map((t) => t.key);
