/* El ecosistema de /shopify: Shopify en el centro y las ocho piezas que lo rodean.
 *
 * Cada pieza habla de lo que gana la tienda, no de cómo está hecha (Edgar, 26-sep-2026: «que los
 * copis sean muy orientados a los beneficios… la gente no necesita entender [la tecnología].
 * Necesita entender esos resultados»). Por eso aquí no aparecen «IA», «agentes» ni pasarelas:
 * lo prueba piezas.test.ts. */
import type { Lang } from "@/i18n/types";

type L = Record<Lang, string>;
const igual = (s: string): L => ({ es: s, en: s, de: s, pt: s });

export type IdPieza = "whatsapp" | "instagram" | "pauta" | "numeros" | "clientes" | "fotos" | "catalogo" | "tiendas";

export interface Pieza {
  id: IdPieza;
  /** corto: va debajo del ícono en la órbita */
  nombre: L;
  titulo: L;
  texto: L;
}

export const CENTRO = { nombre: { es: "Tu tienda", en: "Your store", de: "Dein Store", pt: "A tua loja" } as L };

export const PIEZAS: Pieza[] = [
  {
    id: "whatsapp",
    nombre: igual("WhatsApp"),
    titulo: {
      es: "Nadie se queda sin respuesta",
      en: "Nobody waits for an answer",
      de: "Niemand wartet auf eine Antwort",
      pt: "Ninguém fica sem resposta",
    },
    texto: {
      es: "Contesta, asesora y cierra la venta a cualquier hora, con la voz de tu marca. La venta no se enfría esperando.",
      en: "It replies, advises and closes the sale at any hour, in your brand's voice. No sale goes cold while someone waits.",
      de: "Antwortet, berät und schließt den Verkauf zu jeder Uhrzeit ab, in der Stimme deiner Marke. Kein Verkauf kühlt beim Warten ab.",
      pt: "Responde, aconselha e fecha a venda a qualquer hora, com a voz da tua marca. A venda não arrefece à espera.",
    },
  },
  {
    id: "instagram",
    nombre: igual("Instagram"),
    titulo: {
      es: "El interés no se pierde",
      en: "Interest never slips away",
      de: "Kein Interesse geht verloren",
      pt: "O interesse não se perde",
    },
    texto: {
      es: "Cada comentario tiene respuesta y la conversación pasa al mensaje directo cuando toca.",
      en: "Every comment gets an answer, and the conversation moves to DMs when it's time.",
      de: "Jeder Kommentar bekommt eine Antwort, und das Gespräch wandert in die DMs, wenn es so weit ist.",
      pt: "Cada comentário tem resposta e a conversa passa para a mensagem direta quando é altura.",
    },
  },
  {
    id: "pauta",
    nombre: { es: "Pauta", en: "Ads", de: "Ads", pt: "Anúncios" },
    titulo: {
      es: "El presupuesto va a lo que vende",
      en: "Your budget goes to what sells",
      de: "Dein Budget fließt in das, was verkauft",
      pt: "O orçamento vai para o que vende",
    },
    texto: {
      es: "La pauta se decide con las ventas reales y el margen al lado, no con los likes.",
      en: "Ad spend is decided with real sales and the margin beside it, not with likes.",
      de: "Das Budget richtet sich nach echten Verkäufen und der Marge daneben, nicht nach Likes.",
      pt: "Os anúncios decidem-se com as vendas reais e a margem ao lado, não com os likes.",
    },
  },
  {
    id: "numeros",
    nombre: { es: "Números", en: "Numbers", de: "Zahlen", pt: "Números" },
    titulo: {
      es: "Sabes qué es rentable",
      en: "You know what's profitable",
      de: "Du weißt, was sich rechnet",
      pt: "Sabes o que é rentável",
    },
    texto: {
      es: "Margen real, qué se agota y qué cliente se enfría, en un tablero que abres cuando quieras. Sin esperar el informe del mes.",
      en: "Real margin, what's running out and which customers are going cold, on a dashboard you open whenever you want. No waiting for the monthly report.",
      de: "Echte Marge, was ausgeht und welche Kunden abkühlen, in einem Dashboard, das du öffnest, wann du willst. Ohne auf den Monatsbericht zu warten.",
      pt: "Margem real, o que se esgota e que clientes estão a arrefecer, num painel que abres quando quiseres. Sem esperar pelo relatório do mês.",
    },
  },
  {
    id: "clientes",
    nombre: { es: "Clientes", en: "Customers", de: "Kunden", pt: "Clientes" },
    titulo: {
      es: "Quien ya te compró, vuelve",
      en: "Past customers come back",
      de: "Wer gekauft hat, kommt wieder",
      pt: "Quem já comprou, compra outra vez",
    },
    texto: {
      es: "Bienvenida, carrito abandonado, recompra y cumpleaños trabajan solos. Casi siempre hay más ventas en tu lista que en la pauta nueva.",
      en: "Welcome, abandoned cart, repeat purchase and birthday run on their own. There's almost always more revenue in your list than in new ads.",
      de: "Willkommen, verlassener Warenkorb, Wiederkauf und Geburtstag laufen von allein. In deiner Liste steckt fast immer mehr Umsatz als in neuen Ads.",
      pt: "Boas-vindas, carrinho abandonado, recompra e aniversário trabalham sozinhos. Quase sempre há mais vendas na tua lista do que em anúncios novos.",
    },
  },
  {
    id: "fotos",
    nombre: { es: "Fotos", en: "Photos", de: "Fotos", pt: "Fotos" },
    titulo: {
      es: "Producto nuevo, fotos listas",
      en: "New product, photos ready",
      de: "Neues Produkt, fertige Fotos",
      pt: "Produto novo, fotos prontas",
    },
    texto: {
      es: "Cada prenda nueva sale con sus fotos y sus escenas sin esperar una sesión. Cambiamos la escena, nunca el producto.",
      en: "Every new piece launches with its photos and scenes without waiting for a shoot. We change the scene, never the product.",
      de: "Jedes neue Teil startet mit Fotos und Szenen, ohne auf ein Shooting zu warten. Wir ändern die Szene, nie das Produkt.",
      pt: "Cada peça nova sai com as suas fotos e cenas sem esperar por uma sessão. Mudamos a cena, nunca o produto.",
    },
  },
  {
    id: "catalogo",
    nombre: { es: "Catálogo", en: "Catalog", de: "Katalog", pt: "Catálogo" },
    titulo: {
      es: "Lo que llega, se vende",
      en: "What arrives, sells",
      de: "Was ankommt, wird verkauft",
      pt: "O que chega, vende-se",
    },
    texto: {
      es: "De la bodega a la ficha publicada, con título, tallas y fotos, sin quitarle horas a tu equipo.",
      en: "From the warehouse to the live product page, with title, sizes and photos, without taking hours from your team.",
      de: "Vom Lager zur fertigen Produktseite, mit Titel, Größen und Fotos, ohne deinem Team Stunden zu kosten.",
      pt: "Do armazém à ficha publicada, com título, tamanhos e fotos, sem tirar horas à tua equipa.",
    },
  },
  {
    id: "tiendas",
    nombre: { es: "Tiendas", en: "Stores", de: "Läden", pt: "Lojas" },
    titulo: {
      es: "Tienda y web, una sola",
      en: "Store and web, as one",
      de: "Laden und Web, eins",
      pt: "Loja e site, uma só",
    },
    texto: {
      es: "Un solo inventario y una sola lista de clientes entre la tienda física y la web. Nada se vende dos veces.",
      en: "One inventory and one customer list across your physical stores and your website. Nothing gets sold twice.",
      de: "Ein Bestand und eine Kundenliste für Laden und Website. Nichts wird doppelt verkauft.",
      pt: "Um só inventário e uma só lista de clientes entre a loja física e o site. Nada se vende duas vezes.",
    },
  },
];

export const COPY_ECO = {
  antetitulo: { es: "El ecosistema", en: "The ecosystem", de: "Das Ökosystem", pt: "O ecossistema" },
  titulo: {
    es: "Tu tienda, hablándose entre sí.",
    en: "Your store, all talking to each other.",
    de: "Dein Store, in dem alles miteinander spricht.",
    pt: "A tua loja, tudo a falar entre si.",
  },
  sub: {
    es: "Shopify cobra y despacha. Alrededor conectamos todo lo demás, y cada pieza decide con lo que de verdad pasa en tu tienda. Por eso cuesta menos operarla y todo responde más rápido.",
    en: "Shopify charges and ships. Around it we connect everything else, and every piece decides with what's really happening in your store. That's why it costs less to run and everything responds faster.",
    de: "Shopify kassiert und versendet. Drumherum verbinden wir alles andere, und jedes Teil entscheidet mit dem, was in deinem Store wirklich passiert. Deshalb kostet der Betrieb weniger und alles reagiert schneller.",
    pt: "A Shopify cobra e envia. Em redor ligamos todo o resto, e cada peça decide com o que realmente acontece na tua loja. Por isso custa menos operá-la e tudo responde mais depressa.",
  },
  piezas: {
    es: "Las piezas del ecosistema",
    en: "The pieces of the ecosystem",
    de: "Die Teile des Ökosystems",
    pt: "As peças do ecossistema",
  },
  pausar: { es: "Pausar el recorrido", en: "Pause the tour", de: "Rundgang pausieren", pt: "Pausar o percurso" },
  seguir: { es: "Seguir el recorrido", en: "Resume the tour", de: "Rundgang fortsetzen", pt: "Continuar o percurso" },
} satisfies Record<string, L>;

/** Posición de la pieza i de n en la órbita, en % del cuadro: la primera arriba y en sentido horario. */
export const orbita = (i: number, n: number, radio: number) => {
  const a = (2 * Math.PI * i) / n;
  return { x: 50 + radio * Math.sin(a), y: 50 - radio * Math.cos(a) };
};
