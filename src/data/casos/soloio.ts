/* Caso soloio (/work/soloio). Sale de docs/internal/portada/prototipo/caso-soloio.html.
 * Cláusula 8.5: Alejandra autorizó web y campaña. Su web nueva todavía no está en su dominio:
 * se escribe «soloio.com» y NUNCA la URL de la vista previa. Sin etiquetas de estado (Edgar, 28-sep).
 * Las fotos de campaña son de la marca (van con la nota de autorización). */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const igual = (s: string): T => ({ es: s, en: s, de: s, pt: s });
const M = "/v2/caso-soloio";

export const caso: Caso = {
  slug: "soloio",
  nombre: igual("soloio"),
  categoria: "studio",
  seo: {
    titulo: t(
      "soloio: catálogo, CRM y contenido con IA | Monza Lab",
      "soloio: catalog, CRM and AI content | Monza Lab",
      "soloio: Katalog, CRM und KI-Content | Monza Lab",
      "soloio: catálogo, CRM e conteúdo com IA | Monza Lab",
    ),
    descripcion: t(
      "Una marca de lino estampado con 4 + 1 tiendas en un solo sistema: catálogo, CRM, correo, pauta, 13 modelos propios hechos con IA y asesor en WhatsApp.",
      "A printed linen brand with 4 + 1 stores in one system: catalog, CRM, email, ads, 13 AI-made in-house models and a WhatsApp advisor.",
      "Eine Leinenmarke mit 4 + 1 Stores in einem System: Katalog, CRM, E-Mail, Anzeigen, 13 eigene KI-Models und ein WhatsApp-Berater.",
      "Uma marca de linho estampado com 4 + 1 lojas num só sistema: catálogo, CRM, email, publicidade, 13 modelos próprios feitos com IA e assessor no WhatsApp.",
    ),
  },
  hero: {
    linea1: igual("soloio"),
    linea2: t("lino estampado", "printed linen", "bedrucktes Leinen", "linho estampado"),
    frase: t(
      "Cuatro tiendas y una tienda en línea, conectándose en un solo sistema que vende.",
      "Four stores and an online store, connecting into one system that sells.",
      "Vier Stores und ein Onlineshop, verbunden in einem System, das verkauft.",
      "Quatro lojas e uma loja online, ligadas num só sistema que vende.",
    ),
    pastillas: [
      t("Moda de lino", "Linen fashion", "Leinenmode", "Moda de linho"),
      t("4 + 1 tiendas", "4 + 1 stores", "4 + 1 Stores", "4 + 1 lojas"),
      igual("Colombia"),
    ],
    enlace: { href: "https://soloio.com", texto: igual("soloio.com ↗") },
    web: { barra: "soloio.com", escritorio: `${M}/web-escritorio-larga.webp`, celular: `${M}/web-celular-larga.webp` },
    fantasma: "soloio",
  },
  producimos: {
    titulo: t("Siete cosas, conectadas en un solo sistema.", "Seven things, connected in one system.", "Sieben Dinge, verbunden in einem System.", "Sete coisas, ligadas num só sistema."),
    items: [
      { icono: "catalogo", nombre: t("Catálogo", "Catalog", "Katalog", "Catálogo"), texto: t(
        "El catálogo en línea cruzado con el sistema de las 4 + 1 tiendas: el mismo nombre, precio e inventario en todos lados.",
        "The online catalog matched with the system of the 4 + 1 stores: the same name, price and inventory everywhere.",
        "Der Onlinekatalog, abgeglichen mit dem System der 4 + 1 Stores: überall derselbe Name, Preis und Bestand.",
        "O catálogo online cruzado com o sistema das 4 + 1 lojas: o mesmo nome, preço e inventário em todo o lado.") },
      { icono: "crm", nombre: igual("CRM"), texto: t(
        "Una sola base con los clientes de las cuatro tiendas y de la tienda en línea, que se actualiza sola.",
        "A single base with the customers of the four stores and the online store, updating itself.",
        "Eine einzige Basis mit den Kunden der vier Stores und des Onlineshops, die sich selbst aktualisiert.",
        "Uma só base com os clientes das quatro lojas e da loja online, que se atualiza sozinha.") },
      { icono: "correo", nombre: t("Correo", "Email", "E-Mail", "Email"), texto: t(
        "La bienvenida y las campañas a quien ya compró, con baja en un clic.",
        "The welcome and campaigns to those who already bought, with one-click unsubscribe.",
        "Willkommen und Kampagnen an alle, die schon gekauft haben, mit Abmeldung per Klick.",
        "As boas-vindas e as campanhas a quem já comprou, com saída num clique.") },
      { icono: "pauta", nombre: t("Pauta", "Ads", "Anzeigen", "Publicidade"), texto: t(
        "Anuncios en Meta y Google, en Colombia y Miami, medidos contra las ventas.",
        "Ads on Meta and Google, in Colombia and Miami, measured against sales.",
        "Anzeigen auf Meta und Google, in Kolumbien und Miami, gemessen an den Verkäufen.",
        "Anúncios no Meta e no Google, na Colômbia e em Miami, medidos contra as vendas.") },
      { icono: "contenido", nombre: t("Contenido", "Content", "Content", "Conteúdo"), texto: t(
        "13 modelos propios hechos con inteligencia artificial, elegidos por mercado. El detalle del lino, siempre real.",
        "13 in-house models made with artificial intelligence, chosen by market. The linen detail, always real.",
        "13 eigene Models, mit künstlicher Intelligenz erstellt und nach Markt ausgewählt. Das Leinen-Detail, immer echt.",
        "13 modelos próprios feitos com inteligência artificial, escolhidos por mercado. O detalhe do linho, sempre real.") },
      { icono: "web", nombre: igual("Website"), texto: t(
        "La web nueva, con el color de cada tienda y una ficha de producto pensada para el lino.",
        "The new website, with the color of each store and a product page designed for linen.",
        "Die neue Website, mit der Farbe jedes Stores und einer Produktseite, die für Leinen gedacht ist.",
        "O site novo, com a cor de cada loja e uma ficha de produto pensada para o linho.") },
      { icono: "agente", nombre: t("Agente de IA", "AI agent", "KI-Agent", "Agente de IA"), texto: t(
        "Un asesor en WhatsApp, Instagram y Messenger que lee el catálogo y el inventario de las tiendas en vivo.",
        "An advisor on WhatsApp, Instagram and Messenger who reads the catalog and the stores' inventory live.",
        "Ein Berater auf WhatsApp, Instagram und Messenger, der Katalog und Bestand der Stores live liest.",
        "Um assessor no WhatsApp, Instagram e Messenger que lê o catálogo e o inventário das lojas em tempo real.") },
    ],
  },
  hace: {
    titulo: t("Lo construimos, lo producimos y lo operamos.", "We build it, produce it and run it.", "Wir bauen, produzieren und betreiben es.", "Construímos, produzimos e operamos."),
    items: [
      { verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"), texto: t(
        "La web nueva, la ficha de producto para el lino y la voz del asesor, con la marca de soloio.",
        "The new website, the product page for linen and the advisor's voice, with the soloio brand.",
        "Die neue Website, die Produktseite für Leinen und die Stimme des Beraters, mit der Marke soloio.",
        "O site novo, a ficha de produto para o linho e a voz do assessor, com a marca soloio.") },
      { verbo: t("Construye", "Builds", "Baut", "Constrói"), texto: t(
        "El catálogo conectado con las tiendas, la base única de clientes, el correo, la web nueva y el asesor.",
        "The catalog connected to the stores, the single customer base, email, the new website and the advisor.",
        "Den mit den Stores verbundenen Katalog, die einheitliche Kundenbasis, die E-Mails, die neue Website und den Berater.",
        "O catálogo ligado às lojas, a base única de clientes, o email, o site novo e o assessor.") },
      { verbo: t("Produce", "Produces", "Produziert", "Produz"), texto: t(
        "Las fotos de cada prenda en modelos propios y los anuncios con la fotografía de la marca.",
        "The photos of every garment on in-house models and the ads with the brand's photography.",
        "Die Fotos jedes Teils an eigenen Models und die Anzeigen mit der Fotografie der Marke.",
        "As fotos de cada peça em modelos próprios e os anúncios com a fotografia da marca.") },
      { verbo: t("Opera", "Runs", "Betreibt", "Opera"), texto: t(
        "La pauta en Meta y Google y el correo a los clientes.",
        "The Meta and Google ads and the emails to customers.",
        "Die Anzeigen auf Meta und Google und die E-Mails an die Kunden.",
        "A publicidade no Meta e no Google e o email aos clientes.") },
      { verbo: t("Mide", "Measures", "Misst", "Mede"), texto: t(
        "Qué vende de verdad cada anuncio, contra las ventas de la tienda.",
        "What each ad really sells, against the store's sales.",
        "Was jede Anzeige wirklich verkauft, gemessen an den Verkäufen des Shops.",
        "O que cada anúncio vende de verdade, contra as vendas da loja.") },
    ],
  },
  reto: {
    titulo: t(
      "Crecer en línea sin que la marca se vea como cualquier otra.",
      "Growing online without the brand looking like any other.",
      "Online wachsen, ohne dass die Marke aussieht wie jede andere.",
      "Crescer online sem que a marca pareça uma qualquer.",
    ),
    items: [
      { titulo: t("Cuatro tiendas y una tienda en línea.", "Four stores and an online store.", "Vier Stores und ein Onlineshop.", "Quatro lojas e uma loja online."), texto: t(
        "Cada canal llevaba sus clientes y su catálogo por su lado, y lo que pasaba en uno no se veía en el otro.",
        "Each channel kept its customers and its catalog on its own, and what happened in one was not visible in the other.",
        "Jeder Kanal führte Kunden und Katalog für sich, und was im einen passierte, war im anderen nicht zu sehen.",
        "Cada canal levava os seus clientes e o seu catálogo à parte, e o que acontecia num não se via no outro.") },
      { titulo: t("En el lino, la foto es el producto.", "With linen, the photo is the product.", "Bei Leinen ist das Foto das Produkt.", "No linho, a foto é o produto."), texto: t(
        "La trama, el color y la caída tienen que verse como son, en cada prenda y en cada uno de sus colores.",
        "The weave, the color and the drape have to look as they are, on every garment and in each of its colors.",
        "Webart, Farbe und Fall müssen so aussehen, wie sie sind, bei jedem Teil und in jeder seiner Farben.",
        "A trama, a cor e o caimento têm de se ver como são, em cada peça e em cada uma das suas cores.") },
      { titulo: t("Clientes dentro y fuera de Colombia.", "Customers in and outside Colombia.", "Kunden in und außerhalb Kolumbiens.", "Clientes dentro e fora da Colômbia."), texto: t(
        "Gente que compra en línea a cualquier hora y que espera la misma marca que encuentra en las tiendas.",
        "People who buy online at any hour and expect the same brand they find in the stores.",
        "Menschen, die zu jeder Uhrzeit online kaufen und dieselbe Marke erwarten, die sie in den Stores finden.",
        "Pessoas que compram online a qualquer hora e esperam a mesma marca que encontram nas lojas.") },
    ],
  },
  piezas: {
    titulo: t("Seis piezas, un solo sistema.", "Six pieces, one system.", "Sechs Teile, ein System.", "Seis peças, um só sistema."),
    lede: t(
      "Cada pieza sirve sola, y conectadas se hablan entre sí. Toca cualquiera para ver qué hace y qué le resuelve al negocio.",
      "Each piece works on its own, and connected they talk to each other. Tap any of them to see what it does and what it solves for the business.",
      "Jedes Teil funktioniert allein, und verbunden sprechen sie miteinander. Tippe auf eines, um zu sehen, was es tut und was es dem Geschäft löst.",
      "Cada peça funciona sozinha e, ligadas, falam entre si. Toca em qualquer uma para ver o que faz e o que resolve ao negócio.",
    ),
    centro: t("Un solo sistema", "One system", "Ein System", "Um só sistema"),
    centroSub: t("tiendas y tienda en línea", "stores and online store", "Stores und Onlineshop", "lojas e loja online"),
    items: [
      {
        pestana: t("Catálogo", "Catalog", "Katalog", "Catálogo"),
        clave: t("01 · Catálogo conectado", "01 · Connected catalog", "01 · Verbundener Katalog", "01 · Catálogo ligado"),
        titulo: t("Lo que se ve en línea es lo que de verdad hay.", "What you see online is what is really there.", "Was online zu sehen ist, gibt es wirklich.", "O que se vê online é o que realmente existe."),
        texto: t(
          "El catálogo de la tienda en línea se cruza con el sistema de las tiendas: el nombre de cada prenda, su precio y su inventario dicen lo mismo en los dos lados.",
          "The online store's catalog is matched with the stores' system: each garment's name, price and inventory say the same on both sides.",
          "Der Katalog des Onlineshops wird mit dem System der Stores abgeglichen: Name, Preis und Bestand jedes Teils stimmen auf beiden Seiten überein.",
          "O catálogo da loja online cruza-se com o sistema das lojas: o nome de cada peça, o preço e o inventário dizem o mesmo dos dois lados."),
        resuelve: t("Nadie compra en línea una prenda que ya no está, ni ve un precio distinto al de la tienda.", "Nobody buys online a garment that is gone, or sees a different price than in the store.", "Niemand kauft online ein Teil, das nicht mehr da ist, oder sieht einen anderen Preis als im Store.", "Ninguém compra online uma peça que já não existe, nem vê um preço diferente do da loja."),
        visual: { tipo: "fuentes", fuentes: [t("Las cuatro tiendas", "The four stores", "Die vier Stores", "As quatro lojas"), t("Tienda en línea", "Online store", "Onlineshop", "Loja online")], total: t("Un solo catálogo", "One catalog", "Ein Katalog", "Um só catálogo") },
      },
      {
        pestana: t("Clientes", "Customers", "Kunden", "Clientes"),
        clave: t("02 · Base única y correo", "02 · Single base and email", "02 · Einheitliche Basis und E-Mail", "02 · Base única e email"),
        titulo: t("Todos los clientes, en un solo lugar.", "Every customer, in one place.", "Alle Kunden an einem Ort.", "Todos os clientes, num só lugar."),
        texto: t(
          "Las compras de las cuatro tiendas y de la tienda en línea quedan en una misma base que se actualiza sola y alimenta el correo: la bienvenida y las campañas a quien ya compró, con baja en un clic.",
          "Purchases from the four stores and the online store land in one base that updates itself and feeds the email: the welcome and campaigns to those who already bought, with one-click unsubscribe.",
          "Käufe aus den vier Stores und dem Onlineshop landen in einer Basis, die sich selbst aktualisiert und die E-Mails speist: Willkommen und Kampagnen an alle, die schon gekauft haben, mit Abmeldung per Klick.",
          "As compras das quatro lojas e da loja online ficam numa mesma base que se atualiza sozinha e alimenta o email: as boas-vindas e as campanhas a quem já comprou, com saída num clique."),
        resuelve: t("La marca sabe quién le compra, dónde y cada cuánto.", "The brand knows who buys, where and how often.", "Die Marke weiß, wer wo und wie oft kauft.", "A marca sabe quem lhe compra, onde e com que frequência."),
        visual: { tipo: "fuentes", fuentes: [t("Tiendas", "Stores", "Stores", "Lojas"), t("En línea", "Online", "Online", "Online"), t("Correo", "Email", "E-Mail", "Email")], total: t("Una sola base de clientes", "One customer base", "Eine Kundenbasis", "Uma só base de clientes") },
      },
      {
        pestana: t("Pauta", "Ads", "Anzeigen", "Publicidade"),
        clave: t("03 · Pauta en Meta y Google", "03 · Meta and Google ads", "03 · Anzeigen auf Meta und Google", "03 · Publicidade no Meta e no Google"),
        titulo: t("Anuncios con la fotografía de la marca, medidos contra las ventas.", "Ads with the brand's photography, measured against sales.", "Anzeigen mit der Fotografie der Marke, gemessen an den Verkäufen.", "Anúncios com a fotografia da marca, medidos contra as vendas."),
        texto: t(
          "Los anuncios salen de la fotografía de campaña de soloio, y Meta, Google y la medición quedan conectados a la tienda para ver qué vende de verdad.",
          "The ads come from soloio's campaign photography, and Meta, Google and measurement are connected to the store to see what really sells.",
          "Die Anzeigen entstehen aus der Kampagnenfotografie von soloio, und Meta, Google und die Messung sind mit dem Shop verbunden, um zu sehen, was wirklich verkauft.",
          "Os anúncios saem da fotografia de campanha da soloio, e o Meta, o Google e a medição ficam ligados à loja para ver o que vende de verdade."),
        resuelve: t("El presupuesto va a lo que vende, no a lo que tiene más likes.", "The budget goes to what sells, not to what gets the most likes.", "Das Budget geht an das, was verkauft, nicht an das mit den meisten Likes.", "O orçamento vai para o que vende, não para o que tem mais likes."),
        visual: { tipo: "par", atras: `${M}/campana-terraza.webp`, frente: `${M}/campana-cena.webp`, alt: t("Fotografía de campaña de soloio", "soloio campaign photography", "Kampagnenfotografie von soloio", "Fotografia de campanha da soloio") },
      },
      {
        pestana: t("Fotos", "Photos", "Fotos", "Fotos"),
        clave: t("04 · Sistema de fotos con IA", "04 · AI photo system", "04 · KI-Fotosystem", "04 · Sistema de fotos com IA"),
        titulo: t("Cada prenda en su color exacto, en modelos propios.", "Every garment in its exact color, on in-house models.", "Jedes Teil in seiner genauen Farbe, an eigenen Models.", "Cada peça na sua cor exata, em modelos próprios."),
        texto: t(
          "Los colores salen de una foto real y se miden contra su referencia; los modelos se hicieron con inteligencia artificial y los eligió la marca. El detalle del lino siempre se fotografía real, y todo va sobre el fondo de la web.",
          "Colors come from a real photo and are checked against their reference; the models were made with artificial intelligence and chosen by the brand. The linen detail is always photographed for real, and everything sits on the website's background.",
          "Die Farben stammen aus einem echten Foto und werden an ihrer Referenz gemessen; die Models wurden mit künstlicher Intelligenz erstellt und von der Marke ausgewählt. Das Leinen-Detail wird immer echt fotografiert, und alles steht auf dem Hintergrund der Website.",
          "As cores saem de uma foto real e medem-se contra a sua referência; os modelos foram feitos com inteligência artificial e escolhidos pela marca. O detalhe do linho fotografa-se sempre real, e tudo vai sobre o fundo do site."),
        resuelve: t("Una prenda nueva puede salir con su set completo sin montar una sesión de fotos.", "A new garment can go out with its full set without staging a photo shoot.", "Ein neues Teil kann mit seinem kompletten Set erscheinen, ohne ein Fotoshooting.", "Uma peça nova pode sair com o seu set completo sem montar uma sessão fotográfica."),
        visual: { tipo: "grande", texto: "13", sub: t("Modelos propios, elegidos por mercado", "In-house models, chosen by market", "Eigene Models, nach Markt ausgewählt", "Modelos próprios, escolhidos por mercado") },
      },
      {
        pestana: t("Web nueva", "New website", "Neue Website", "Site novo"),
        clave: t("05 · Web nueva", "05 · New website", "05 · Neue Website", "05 · Site novo"),
        titulo: t("La marca, en línea, como se ve en sus tiendas.", "The brand online, as it looks in its stores.", "Die Marke online, so wie in ihren Stores.", "A marca, online, como se vê nas suas lojas."),
        texto: t(
          "Una web nueva con el color de cada tienda y una ficha de producto pensada para el lino.",
          "A new website with the color of each store and a product page designed for linen.",
          "Eine neue Website mit der Farbe jedes Stores und einer Produktseite, die für Leinen gedacht ist.",
          "Um site novo com a cor de cada loja e uma ficha de produto pensada para o linho."),
        resuelve: t("Quien llega por un anuncio encuentra la misma marca que ve en la calle.", "Whoever arrives from an ad finds the same brand they see on the street.", "Wer über eine Anzeige kommt, findet dieselbe Marke wie auf der Straße.", "Quem chega por um anúncio encontra a mesma marca que vê na rua."),
        visual: { tipo: "cel", src: `${M}/web-movil.webp`, alt: t("La web nueva de soloio en el celular", "soloio's new website on a phone", "Die neue Website von soloio auf dem Handy", "O site novo da soloio no telemóvel") },
      },
      {
        pestana: t("Asesor", "Advisor", "Berater", "Assessor"),
        clave: t("06 · Asesor de WhatsApp", "06 · WhatsApp advisor", "06 · WhatsApp-Berater", "06 · Assessor de WhatsApp"),
        titulo: t("Un asesor con el conocimiento de las tiendas.", "An advisor with the stores' knowledge.", "Ein Berater mit dem Wissen der Stores.", "Um assessor com o conhecimento das lojas."),
        texto: t(
          "Contesta en WhatsApp, Instagram y Messenger con lo que sabe el equipo de tiendas sobre cada prenda, leyendo el catálogo y el inventario en vivo. Cuando una conversación necesita a una persona, la toma el equipo.",
          "Answers on WhatsApp, Instagram and Messenger with what the store team knows about each garment, reading the catalog and inventory live. When a conversation needs a person, the team takes over.",
          "Antwortet auf WhatsApp, Instagram und Messenger mit dem, was das Storeteam über jedes Teil weiß, und liest Katalog und Bestand live. Braucht ein Gespräch einen Menschen, übernimmt das Team.",
          "Responde no WhatsApp, Instagram e Messenger com o que a equipa das lojas sabe sobre cada peça, lendo o catálogo e o inventário em tempo real. Quando uma conversa precisa de uma pessoa, a equipa assume."),
        resuelve: t("Nadie se queda sin respuesta, tampoco de noche.", "Nobody is left without an answer, not even at night.", "Niemand bleibt ohne Antwort, auch nicht nachts.", "Ninguém fica sem resposta, nem de noite."),
        visual: { tipo: "grande", texto: "24/7", sub: t("Asesor en WhatsApp, Instagram y Messenger", "Advisor on WhatsApp, Instagram and Messenger", "Berater auf WhatsApp, Instagram und Messenger", "Assessor no WhatsApp, Instagram e Messenger") },
      },
    ],
  },
  tecnologia: {
    titulo: t("Todo conectado, con inteligencia artificial adentro.", "Everything connected, with artificial intelligence inside.", "Alles verbunden, mit künstlicher Intelligenz im Inneren.", "Tudo ligado, com inteligência artificial lá dentro."),
    lede: t(
      "Cada herramienta hace lo suyo; el sistema las hace hablar entre sí. En rosa, donde trabaja la inteligencia artificial. Toca cualquiera.",
      "Each tool does its job; the system makes them talk to each other. In pink, where artificial intelligence works. Tap any of them.",
      "Jedes Werkzeug macht seine Arbeit; das System lässt sie miteinander sprechen. In Rosa: wo künstliche Intelligenz arbeitet. Tippe auf eines.",
      "Cada ferramenta faz o seu; o sistema põe-nas a falar entre si. Em rosa, onde trabalha a inteligência artificial. Toca em qualquer uma.",
    ),
    centro: { titulo: t("La operación de soloio", "soloio's operation", "Der Betrieb von soloio", "A operação da soloio"), sub: t("tiendas y tienda en línea", "stores and online store", "Stores und Onlineshop", "lojas e loja online") },
    nodos: [
      { id: "fotos", nombre: t("Fotos con IA", "AI photos", "KI-Fotos", "Fotos com IA"), corto: t("Fotos IA", "AI photos", "KI-Fotos", "Fotos IA"), tipo: "ia",
        hace: t(
          "13 modelos propios hechos con inteligencia artificial, elegidos por mercado. Cada prenda en su color exacto; el detalle del lino siempre se fotografía real.",
          "13 in-house models made with artificial intelligence, chosen by market. Every garment in its exact color; the linen detail is always photographed for real.",
          "13 eigene Models, mit künstlicher Intelligenz erstellt und nach Markt ausgewählt. Jedes Teil in seiner genauen Farbe; das Leinen-Detail wird immer echt fotografiert.",
          "13 modelos próprios feitos com inteligência artificial, escolhidos por mercado. Cada peça na sua cor exata; o detalhe do linho fotografa-se sempre real."),
        con: ["shopify", "web"] },
      { id: "asesor", nombre: t("Asesor de WhatsApp", "WhatsApp advisor", "WhatsApp-Berater", "Assessor de WhatsApp"), corto: t("Asesor", "Advisor", "Berater", "Assessor"), tipo: "ia",
        hace: t(
          "Contesta en WhatsApp, Instagram y Messenger con el conocimiento de producto del equipo de tiendas, leyendo el catálogo y el inventario en vivo.",
          "Answers on WhatsApp, Instagram and Messenger with the store team's product knowledge, reading the catalog and inventory live.",
          "Antwortet auf WhatsApp, Instagram und Messenger mit dem Produktwissen des Storeteams und liest Katalog und Bestand live.",
          "Responde no WhatsApp, Instagram e Messenger com o conhecimento de produto da equipa das lojas, lendo o catálogo e o inventário em tempo real."),
        con: ["whatsapp", "shopify", "base"] },
      { id: "shopify", nombre: igual("Shopify"), icono: "shopify", tipo: "herramienta",
        hace: t("La tienda en línea: el catálogo, los pedidos y los pagos.", "The online store: catalog, orders and payments.", "Der Onlineshop: Katalog, Bestellungen und Zahlungen.", "A loja online: o catálogo, as encomendas e os pagamentos."),
        con: ["odoo", "web"] },
      { id: "odoo", nombre: igual("Odoo"), icono: "odoo", tipo: "herramienta",
        hace: t(
          "El sistema de las cuatro tiendas: inventario, caja y clientes. El catálogo en línea se cruza con él para que los dos digan lo mismo.",
          "The four stores' system: inventory, checkout and customers. The online catalog is matched with it so both say the same.",
          "Das System der vier Stores: Bestand, Kasse und Kunden. Der Onlinekatalog wird damit abgeglichen, damit beide dasselbe sagen.",
          "O sistema das quatro lojas: inventário, caixa e clientes. O catálogo online cruza-se com ele para que os dois digam o mesmo."),
        con: ["base"] },
      { id: "base", nombre: t("Base de clientes", "Customer base", "Kundenbasis", "Base de clientes"), corto: t("Clientes", "Customers", "Kunden", "Clientes"), tipo: "herramienta",
        hace: t(
          "Los clientes de las tiendas y de la tienda en línea en un solo lugar, que se actualiza solo.",
          "Customers from the stores and the online store in one place, updating itself.",
          "Die Kunden aus den Stores und dem Onlineshop an einem Ort, der sich selbst aktualisiert.",
          "Os clientes das lojas e da loja online num só lugar, que se atualiza sozinho."),
        con: ["shopify", "klaviyo"] },
      { id: "klaviyo", nombre: igual("Klaviyo"), icono: "klaviyo", tipo: "herramienta",
        hace: t(
          "El correo: la bienvenida y las campañas a quien ya compró, con baja en un clic.",
          "Email: the welcome and campaigns to those who already bought, with one-click unsubscribe.",
          "E-Mail: Willkommen und Kampagnen an alle, die schon gekauft haben, mit Abmeldung per Klick.",
          "O email: as boas-vindas e as campanhas a quem já comprou, com saída num clique."),
        con: [] },
      { id: "meta", nombre: t("Instagram y Meta", "Instagram and Meta", "Instagram und Meta", "Instagram e Meta"), corto: igual("Meta"), icono: "meta", tipo: "herramienta",
        hace: t(
          "Los anuncios y el Instagram de la marca, con su fotografía de campaña.",
          "The brand's ads and Instagram, with its campaign photography.",
          "Die Anzeigen und das Instagram der Marke, mit ihrer Kampagnenfotografie.",
          "Os anúncios e o Instagram da marca, com a sua fotografia de campanha."),
        con: ["shopify"] },
      { id: "google", nombre: t("Google Ads y Analytics", "Google Ads and Analytics", "Google Ads und Analytics", "Google Ads e Analytics"), corto: igual("Google"), icono: "google", tipo: "herramienta",
        hace: t(
          "Los anuncios de búsqueda y la medición, conectados a las ventas de la tienda.",
          "Search ads and measurement, connected to the store's sales.",
          "Suchanzeigen und Messung, verbunden mit den Verkäufen des Shops.",
          "Os anúncios de pesquisa e a medição, ligados às vendas da loja."),
        con: ["shopify"] },
      { id: "whatsapp", nombre: igual("WhatsApp"), icono: "whatsapp", tipo: "herramienta",
        hace: t(
          "Donde escriben los clientes, y donde trabaja el asesor.",
          "Where customers write, and where the advisor works.",
          "Wo die Kunden schreiben und wo der Berater arbeitet.",
          "Onde os clientes escrevem, e onde trabalha o assessor."),
        con: [] },
      { id: "web", nombre: t("Web nueva", "New website", "Neue Website", "Site novo"), corto: igual("Web"), icono: "vercel", tipo: "herramienta",
        hace: t(
          "La web nueva de la marca: el color de cada tienda y una ficha pensada para el lino.",
          "The brand's new website: the color of each store and a product page designed for linen.",
          "Die neue Website der Marke: die Farbe jedes Stores und eine Produktseite für Leinen.",
          "O site novo da marca: a cor de cada loja e uma ficha pensada para o linho."),
        con: [], img: `${M}/web-escritorio.webp` },
    ],
  },
  galeria: {
    titulo: t("La web nueva y la fotografía de la marca.", "The new website and the brand's photography.", "Die neue Website und die Fotografie der Marke.", "O site novo e a fotografia da marca."),
    items: [
      { src: "/v2/portafolio/soloio.jpg", forma: "web", pie: t("La web nueva", "The new website", "Die neue Website", "O site novo"), alt: t("La web nueva de soloio en escritorio y en el celular", "soloio's new website on desktop and mobile", "Die neue Website von soloio auf Desktop und Handy", "O site novo da soloio no computador e no telemóvel") },
      { src: `${M}/web-movil.webp`, forma: "cel", pie: t("En el celular", "On mobile", "Auf dem Handy", "No telemóvel"), alt: t("La web nueva en el celular", "The new website on a phone", "Die neue Website auf dem Handy", "O site novo no telemóvel") },
      { src: `${M}/campana-jardin.webp`, forma: "alta", pie: t("Campaña de la marca", "Brand campaign", "Kampagne der Marke", "Campanha da marca"), alt: t("Fotografía de campaña de soloio en un jardín", "soloio campaign photo in a garden", "Kampagnenfoto von soloio in einem Garten", "Fotografia de campanha da soloio num jardim") },
      { src: `${M}/campana-iglesia.webp`, forma: "alta", pie: t("Campaña de la marca", "Brand campaign", "Kampagne der Marke", "Campanha da marca"), alt: t("Fotografía de campaña de soloio frente a una iglesia", "soloio campaign photo in front of a church", "Kampagnenfoto von soloio vor einer Kirche", "Fotografia de campanha da soloio em frente a uma igreja") },
      { src: `${M}/campana-boda.webp`, forma: "alta", pie: t("Campaña de la marca", "Brand campaign", "Kampagne der Marke", "Campanha da marca"), alt: t("Fotografía de campaña de soloio en una boda", "soloio campaign photo at a wedding", "Kampagnenfoto von soloio auf einer Hochzeit", "Fotografia de campanha da soloio num casamento") },
      { src: `${M}/web-escritorio.webp`, forma: "ancha", pie: t("La portada nueva", "The new homepage", "Die neue Startseite", "A nova página inicial"), alt: t("La portada de la web nueva de soloio", "The homepage of soloio's new website", "Die Startseite der neuen Website von soloio", "A página inicial do site novo da soloio") },
    ],
    nota: t(
      "Las fotos de campaña son de soloio. Se muestran con su autorización.",
      "The campaign photos belong to soloio. Shown with their permission.",
      "Die Kampagnenfotos gehören soloio. Gezeigt mit ihrer Genehmigung.",
      "As fotos de campanha são da soloio. Mostradas com a sua autorização.",
    ),
  },
  cambio: {
    titulo: t("Una marca de lino, operada como un solo sistema.", "A linen brand, run as one system.", "Eine Leinenmarke, betrieben als ein System.", "Uma marca de linho, operada como um só sistema."),
    items: [
      { cifra: "4+1", negrita: t("Cuatro tiendas y la tienda en línea", "Four stores and the online store", "Vier Stores und der Onlineshop", "Quatro lojas e a loja online"), texto: t(
        ", en una sola base de clientes que se actualiza sola.",
        ", in a single customer base that updates itself.",
        ", in einer einzigen Kundenbasis, die sich selbst aktualisiert.",
        ", numa só base de clientes que se atualiza sozinha.") },
      { cifra: "13", negrita: t("Modelos propios", "In-house models", "Eigene Models", "Modelos próprios"), texto: t(
        ", hechos con inteligencia artificial y elegidos por mercado.",
        ", made with artificial intelligence and chosen by market.",
        ", mit künstlicher Intelligenz erstellt und nach Markt ausgewählt.",
        ", feitos com inteligência artificial e escolhidos por mercado.") },
      { cifra: "3", negrita: t("Canales para el asesor:", "Channels for the advisor:", "Kanäle für den Berater:", "Canais para o assessor:"), texto: t(
        " WhatsApp, Instagram y Messenger.",
        " WhatsApp, Instagram and Messenger.",
        " WhatsApp, Instagram und Messenger.",
        " WhatsApp, Instagram e Messenger.") },
    ],
  },
  cierre: {
    eyebrow: t("Tu marca", "Your brand", "Deine Marke", "A tua marca"),
    titulo: t("¿Te imaginas tu marca", "Can you picture your brand", "Kannst du dir deine Marke", "Imaginas a tua marca"),
    resaltado: t("funcionando así?", "working like this?", "so vorstellen?", "a funcionar assim?"),
    lede: t("Cuéntame qué vendes y te digo qué conectaría primero.", "Tell me what you sell and I'll tell you what I'd connect first.", "Erzähl mir, was du verkaufst, und ich sage dir, was ich zuerst verbinden würde.", "Conta-me o que vendes e digo-te o que ligaria primeiro."),
    enlace: { href: "/shopify", texto: t("Ver cómo funciona Studio →", "See how Studio works →", "So funktioniert Studio →", "Ver como funciona o Studio →") },
  },
  tarjeta: {
    etiqueta: t("Moda de lino · el website nuevo y su operación", "Linen fashion · the new website and its operation", "Leinenmode · die neue Website und ihr Betrieb", "Moda de linho · o site novo e a sua operação"),
    imagen: "/v2/portafolio/soloio.jpg",
    imagenCel: "/v2/portafolio/soloio-m.jpg",
  },
};
