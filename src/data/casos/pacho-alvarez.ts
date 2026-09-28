/* Caso Pacho Álvarez · /work/pacho-alvarez
 * Fuente: docs/internal/portada/prototipo/caso-pacho-alvarez.html (28-sep-2026). */
import type { Caso, T } from "./tipos";

const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });
const P = "/v2/caso-pacho-alvarez";

export const caso: Caso = {
  slug: "pacho-alvarez",
  nombre: t("Pacho Álvarez", "Pacho Álvarez", "Pacho Álvarez", "Pacho Álvarez"),
  categoria: "studio",
  seo: {
    titulo: t(
      "Pacho Álvarez: marca y web de un piloto del Dakar | Monza Lab",
      "Pacho Álvarez: brand and web of a Dakar driver | Monza Lab",
      "Pacho Álvarez: Marke und Web eines Dakar-Piloten | Monza Lab",
      "Pacho Álvarez: marca e web de um piloto do Dakar | Monza Lab",
    ),
    descripcion: t(
      "La marca personal y la web de un piloto del Rally Dakar, con su historia, su conferencia y sus líneas de negocio. Hecha por Monza Lab.",
      "The personal brand and website of a Rally Dakar driver, with his story, his talk and his business lines. Made by Monza Lab.",
      "Die Personal Brand und Website eines Rallye-Dakar-Piloten, mit seiner Geschichte, seinem Vortrag und seinen Geschäftsfeldern. Von Monza Lab.",
      "A marca pessoal e o site de um piloto do Rally Dakar, com a sua história, a sua conferência e as suas linhas de negócio. Feito pela Monza Lab.",
    ),
  },
  hero: {
    linea1: t("Pacho", "Pacho", "Pacho", "Pacho"),
    linea2: t("Álvarez", "Álvarez", "Álvarez", "Álvarez"),
    frase: t(
      "Un piloto del Dakar con una web donde la persona y el piloto aparecen en la misma foto, y se descubren con la mano.",
      "A Dakar rider with a website where the person and the rider appear in the same photo, and you reveal them with your hand.",
      "Ein Dakar-Fahrer mit einer Website, auf der der Mensch und der Fahrer im selben Foto erscheinen und sich mit der Hand entdecken lassen.",
      "Um piloto do Dakar com uma web onde a pessoa e o piloto aparecem na mesma foto, e se descobrem com a mão.",
    ),
    pastillas: [
      t("Rally Dakar 2026", "Rally Dakar 2026", "Rallye Dakar 2026", "Rally Dakar 2026"),
      t("Marca personal", "Personal brand", "Persönliche Marke", "Marca pessoal"),
      t("Colombia", "Colombia", "Kolumbien", "Colômbia"),
    ],
    enlace: {
      href: "https://www.pachoalvarez.com",
      texto: t("Ver la web ↗", "See the website ↗", "Zur Website ↗", "Ver a web ↗"),
    },
    web: { barra: "pachoalvarez.com", escritorio: `${P}/web-escritorio-larga.webp`, celular: `${P}/web-celular-larga.webp` },
    fantasma: "Dakar",
  },
  producimos: {
    titulo: t(
      "Cuatro cosas, funcionando juntas.",
      "Four things, working together.",
      "Vier Dinge, die zusammen funktionieren.",
      "Quatro coisas, a funcionar juntas.",
    ),
    items: [
      {
        icono: "web",
        nombre: t("Website", "Website", "Website", "Website"),
        texto: t(
          "Una web inmersiva con su historia en cuatro actos: al pasar el mouse por su cara aparece el casco.",
          "An immersive website with his story in four acts: move the mouse over his face and the helmet appears.",
          "Eine immersive Website mit seiner Geschichte in vier Akten: Fährt die Maus über sein Gesicht, erscheint der Helm.",
          "Uma web imersiva com a sua história em quatro atos: ao passar o rato pela cara dele aparece o capacete.",
        ),
      },
      {
        icono: "marca",
        nombre: t("Marca", "Brand", "Marke", "Marca"),
        texto: t(
          "La dirección creativa de su marca personal: el piloto y la persona, en la misma foto.",
          "The creative direction of his personal brand: the rider and the person, in the same photo.",
          "Die Creative Direction seiner persönlichen Marke: der Fahrer und der Mensch, im selben Foto.",
          "A direção criativa da sua marca pessoal: o piloto e a pessoa, na mesma foto.",
        ),
      },
      {
        icono: "tablero",
        nombre: t("Líneas de negocio", "Business lines", "Geschäftsbereiche", "Linhas de negócio"),
        texto: t(
          "Conferencias, alianzas anuales con marcas y Fast Sunday, cada una con su puerta y su precio pensado.",
          "Talks, yearly brand partnerships and Fast Sunday, each with its own door and a well-thought price.",
          "Vorträge, Jahrespartnerschaften mit Marken und Fast Sunday, jeweils mit eigener Tür und durchdachtem Preis.",
          "Conferências, parcerias anuais com marcas e Fast Sunday, cada uma com a sua porta e o seu preço pensado.",
        ),
      },
      {
        icono: "whatsapp",
        nombre: t("WhatsApp", "WhatsApp", "WhatsApp", "WhatsApp"),
        texto: t(
          "Todo llega a su WhatsApp, con el mensaje ya escrito según lo que la persona busca.",
          "Everything reaches his WhatsApp, with the message already written for what the person is looking for.",
          "Alles landet in seinem WhatsApp, mit der Nachricht schon vorformuliert, je nachdem, was die Person sucht.",
          "Tudo chega ao WhatsApp dele, com a mensagem já escrita conforme o que a pessoa procura.",
        ),
      },
    ],
  },
  hace: {
    titulo: t(
      "Le damos forma a su historia y la ponemos a vender.",
      "We give his story shape and put it to work selling.",
      "Wir geben seiner Geschichte Form und bringen sie zum Verkaufen.",
      "Damos forma à sua história e pomo-la a vender.",
    ),
    items: [
      {
        verbo: t("Diseña", "Designs", "Gestaltet", "Desenha"),
        texto: t(
          "La marca y la web: la portada que se toca y la historia en cuatro actos.",
          "The brand and the website: the touchable cover and the story in four acts.",
          "Die Marke und die Website: das Titelbild zum Anfassen und die Geschichte in vier Akten.",
          "A marca e a web: a capa que se toca e a história em quatro atos.",
        ),
      },
      {
        verbo: t("Construye", "Builds", "Baut", "Constrói"),
        texto: t(
          "La web, la página de la conferencia «Del caos al control» y el contacto directo por WhatsApp.",
          "The website, the page for his talk «Del caos al control» (From chaos to control) and direct contact on WhatsApp.",
          "Die Website, die Seite zum Vortrag «Del caos al control» (Vom Chaos zur Kontrolle) und den direkten Kontakt per WhatsApp.",
          "A web, a página da conferência «Del caos al control» (Do caos ao controlo) e o contacto direto por WhatsApp.",
        ),
      },
      {
        verbo: t("Ordena", "Organizes", "Ordnet", "Organiza"),
        texto: t(
          "Sus tres líneas de negocio, cada una con su mensaje y su precio pensado.",
          "His three business lines, each with its own message and a well-thought price.",
          "Seine drei Geschäftsbereiche, jeder mit eigener Botschaft und durchdachtem Preis.",
          "As suas três linhas de negócio, cada uma com a sua mensagem e o seu preço pensado.",
        ),
      },
      {
        verbo: t("Lanza", "Launches", "Startet", "Lança"),
        texto: t(
          "La salida al mercado de la conferencia y de las alianzas con marcas.",
          "The market launch of the talk and of the brand partnerships.",
          "Den Marktstart des Vortrags und der Partnerschaften mit Marken.",
          "A chegada ao mercado da conferência e das parcerias com marcas.",
        ),
      },
    ],
  },
  reto: {
    titulo: t(
      "Una historia enorme, contada a pedazos.",
      "A huge story, told in bits and pieces.",
      "Eine riesige Geschichte, nur in Stücken erzählt.",
      "Uma história enorme, contada aos bocados.",
    ),
    items: [
      {
        titulo: t("Quince años en las motos.", "Fifteen years on motorbikes.", "Fünfzehn Jahre auf Motorrädern.", "Quinze anos nas motas."),
        texto: t(
          "De las primeras carreras de niño al Rally Dakar 2026: una historia larga que en redes se cuenta en publicaciones sueltas.",
          "From his first races as a kid to the 2026 Rally Dakar: a long story that on social media gets told in scattered posts.",
          "Von den ersten Rennen als Kind bis zur Rallye Dakar 2026: eine lange Geschichte, die in den sozialen Netzwerken in einzelnen Posts erzählt wird.",
          "Das primeiras corridas em criança ao Rally Dakar 2026: uma história longa que nas redes se conta em publicações soltas.",
        ),
      },
      {
        titulo: t("Varias cosas que ofrecer.", "Several things to offer.", "Mehrere Angebote.", "Várias coisas para oferecer."),
        texto: t(
          "Conferencias para empresas y universidades, alianzas con marcas y una marca propia, cada una para un público distinto.",
          "Talks for companies and universities, brand partnerships and his own brand, each for a different audience.",
          "Vorträge für Unternehmen und Universitäten, Partnerschaften mit Marken und eine eigene Marke, jede für ein anderes Publikum.",
          "Conferências para empresas e universidades, parcerias com marcas e uma marca própria, cada uma para um público diferente.",
        ),
      },
      {
        titulo: t("La cabeza, no la moto.", "The mind, not the bike.", "Der Kopf, nicht das Motorrad.", "A cabeça, não a mota."),
        texto: t(
          "Lo que lo hace distinto es cómo piensa en medio del caos. Había que mostrarlo sin tener que explicarlo.",
          "What makes him different is how he thinks in the middle of chaos. It had to be shown without having to explain it.",
          "Was ihn besonders macht, ist, wie er mitten im Chaos denkt. Das musste man zeigen, ohne es erklären zu müssen.",
          "O que o torna diferente é como pensa no meio do caos. Era preciso mostrá-lo sem ter de o explicar.",
        ),
      },
    ],
  },
  piezas: {
    titulo: t("Cinco piezas, una sola marca.", "Five pieces, one brand.", "Fünf Teile, eine Marke.", "Cinco peças, uma só marca."),
    lede: t(
      "Cada pieza tiene su trabajo, y juntas llevan a quien llega hasta una conversación con él. Toca cualquiera para ver qué hace y qué le resuelve.",
      "Each piece has its job, and together they take whoever arrives all the way to a conversation with him. Tap any of them to see what it does and what it solves.",
      "Jedes Teil hat seine Aufgabe, und zusammen führen sie jeden, der ankommt, bis zu einem Gespräch mit ihm. Tippe auf eines, um zu sehen, was es macht und was es löst.",
      "Cada peça tem o seu trabalho, e juntas levam quem chega até uma conversa com ele. Toca em qualquer uma para ver o que faz e o que resolve.",
    ),
    centro: t("Una sola marca", "One brand", "Eine Marke", "Uma só marca"),
    centroSub: t("tres líneas de negocio", "three business lines", "drei Geschäftsbereiche", "três linhas de negócio"),
    items: [
      {
        pestana: t("Portada", "Cover", "Titelbild", "Capa"),
        clave: t("01 · La portada que se toca", "01 · The touchable cover", "01 · Das Titelbild zum Anfassen", "01 · A capa que se toca"),
        titulo: t(
          "La persona y el piloto, en la misma foto.",
          "The person and the rider, in the same photo.",
          "Der Mensch und der Fahrer, im selben Foto.",
          "A pessoa e o piloto, na mesma foto.",
        ),
        texto: t(
          "Al pasar el mouse, o el dedo, debajo de la cara aparece el casco. La idea de la marca se descubre con la mano, sin que nadie la tenga que explicar.",
          "Move the mouse, or your finger, and the helmet appears beneath the face. The brand idea is discovered by hand, without anyone having to explain it.",
          "Fährt man mit der Maus oder dem Finger darüber, erscheint unter dem Gesicht der Helm. Die Idee der Marke entdeckt man mit der Hand, ohne dass jemand sie erklären muss.",
          "Ao passar o rato, ou o dedo, aparece o capacete por baixo da cara. A ideia da marca descobre-se com a mão, sem que ninguém a tenha de explicar.",
        ),
        resuelve: t(
          "Quien entra entiende en un segundo que detrás del piloto hay una persona.",
          "Anyone who lands understands in one second that behind the rider there is a person.",
          "Wer die Seite öffnet, versteht in einer Sekunde, dass hinter dem Fahrer ein Mensch steht.",
          "Quem entra percebe num segundo que por trás do piloto há uma pessoa.",
        ),
        visual: {
          tipo: "cubre",
          src: `${P}/hero-luz.webp`,
          posicion: "50% 20%",
          alt: t(
            "La portada de la web de Pacho con la luz encendida: debajo de la cara aparece el casco",
            "The cover of Pacho's website with the light on: the helmet appears beneath the face",
            "Das Titelbild von Pachos Website mit eingeschaltetem Licht: Unter dem Gesicht erscheint der Helm",
            "A capa da web do Pacho com a luz acesa: por baixo da cara aparece o capacete",
          ),
        },
      },
      {
        pestana: t("Historia", "Story", "Geschichte", "História"),
        clave: t("02 · La historia en cuatro actos", "02 · The story in four acts", "02 · Die Geschichte in vier Akten", "02 · A história em quatro atos"),
        titulo: t(
          "El camino completo, en su voz.",
          "The whole journey, in his voice.",
          "Der ganze Weg, in seiner Stimme.",
          "O caminho completo, na sua voz.",
        ),
        texto: t(
          "Una página que cuenta la historia de principio a fin, de los orígenes al Dakar, y cierra con los números del rally.",
          "A page that tells the story from start to finish, from his beginnings to the Dakar, and closes with the rally's numbers.",
          "Eine Seite, die die Geschichte von Anfang bis Ende erzählt, von den Anfängen bis zur Dakar, und mit den Zahlen der Rallye endet.",
          "Uma página que conta a história do princípio ao fim, das origens ao Dakar, e fecha com os números do rali.",
        ),
        resuelve: t(
          "La historia se cuenta entera, no a pedazos.",
          "The story is told whole, not in bits and pieces.",
          "Die Geschichte wird ganz erzählt, nicht in Stücken.",
          "A história conta-se inteira, não aos bocados.",
        ),
        visual: {
          tipo: "cubre",
          src: `${P}/piloto-numeros.webp`,
          alt: t(
            "Los números del Rally Dakar en la página El piloto",
            "The Rally Dakar numbers on the rider page",
            "Die Zahlen der Rallye Dakar auf der Fahrerseite",
            "Os números do Rally Dakar na página do piloto",
          ),
        },
      },
      {
        pestana: t("Conferencia", "Talk", "Vortrag", "Conferência"),
        clave: t("03 · La conferencia", "03 · The talk", "03 · Der Vortrag", "03 · A conferência"),
        titulo: t(
          "Una conferencia con nombre propio.",
          "A talk with a name of its own.",
          "Ein Vortrag mit eigenem Namen.",
          "Uma conferência com nome próprio.",
        ),
        texto: t(
          "«Del caos al control»: cinco pilares del Dakar llevados a la vida y a los negocios, con una versión para universidades, jóvenes y empresas.",
          "«Del caos al control» (From chaos to control): five pillars from the Dakar applied to life and business, with a version for universities, young people and companies.",
          "«Del caos al control» (Vom Chaos zur Kontrolle): fünf Säulen der Dakar, übertragen auf das Leben und das Geschäft, mit einer Version für Universitäten, junge Leute und Unternehmen.",
          "«Del caos al control» (Do caos ao controlo): cinco pilares do Dakar levados à vida e aos negócios, com uma versão para universidades, jovens e empresas.",
        ),
        resuelve: t(
          "Quien la contrata sabe qué va a recibir antes de escribir.",
          "Whoever books it knows what they will get before writing.",
          "Wer ihn bucht, weiß vor der ersten Nachricht, was er bekommt.",
          "Quem a contrata sabe o que vai receber antes de escrever.",
        ),
        visual: {
          tipo: "cubre",
          src: `${P}/conferencia.webp`,
          alt: t(
            "La página de la conferencia Del caos al control",
            "The page for the talk Del caos al control",
            "Die Seite zum Vortrag Del caos al control",
            "A página da conferência Del caos al control",
          ),
        },
      },
      {
        pestana: t("Negocio", "Business", "Geschäft", "Negócio"),
        clave: t("04 · Las líneas de negocio", "04 · The business lines", "04 · Die Geschäftsbereiche", "04 · As linhas de negócio"),
        titulo: t(
          "Tres líneas, cada una con su puerta.",
          "Three lines, each with its own door.",
          "Drei Bereiche, jeder mit eigener Tür.",
          "Três linhas, cada uma com a sua porta.",
        ),
        texto: t(
          "Conferencias, alianzas anuales con marcas y Fast Sunday, su marca de estilo de vida, separadas para que cada público encuentre lo suyo y con su precio pensado.",
          "Talks, yearly brand partnerships and Fast Sunday, his lifestyle brand, kept apart so each audience finds what it needs, each with a well-thought price.",
          "Vorträge, Jahrespartnerschaften mit Marken und Fast Sunday, seine Lifestyle-Marke, getrennt, damit jedes Publikum das Seine findet, jeweils mit durchdachtem Preis.",
          "Conferências, parcerias anuais com marcas e Fast Sunday, a sua marca de estilo de vida, separadas para que cada público encontre o seu e com o seu preço pensado.",
        ),
        resuelve: t(
          "Cada producto se vende con su propio mensaje, sin mezclarse.",
          "Each product sells with its own message, without getting mixed up.",
          "Jedes Produkt verkauft sich mit eigener Botschaft, ohne sich zu vermischen.",
          "Cada produto vende-se com a sua própria mensagem, sem se misturar.",
        ),
        visual: {
          tipo: "cubre",
          src: `${P}/lineas.webp`,
          alt: t(
            "Las líneas de negocio en la web: conferencias, alianzas y Fast Sunday",
            "The business lines on the website: talks, partnerships and Fast Sunday",
            "Die Geschäftsbereiche auf der Website: Vorträge, Partnerschaften und Fast Sunday",
            "As linhas de negócio na web: conferências, parcerias e Fast Sunday",
          ),
        },
      },
      {
        pestana: t("Contacto", "Contact", "Kontakt", "Contacto"),
        clave: t("05 · Contacto directo", "05 · Direct contact", "05 · Direkter Kontakt", "05 · Contacto direto"),
        titulo: t("Todo llega a su WhatsApp.", "Everything reaches his WhatsApp.", "Alles landet in seinem WhatsApp.", "Tudo chega ao WhatsApp dele."),
        texto: t(
          "Conferencias, alianzas, prensa y colaboraciones llegan directo a él, con el mensaje ya escrito según lo que la persona busca.",
          "Talks, partnerships, press and collaborations reach him directly, with the message already written for what the person is looking for.",
          "Vorträge, Partnerschaften, Presse und Kooperationen landen direkt bei ihm, mit der Nachricht schon vorformuliert, je nachdem, was die Person sucht.",
          "Conferências, parcerias, imprensa e colaborações chegam diretamente a ele, com a mensagem já escrita conforme o que a pessoa procura.",
        ),
        resuelve: t(
          "Ninguna oportunidad se pierde en un formulario.",
          "No opportunity gets lost in a form.",
          "Keine Chance geht in einem Formular verloren.",
          "Nenhuma oportunidade se perde num formulário.",
        ),
        visual: {
          tipo: "cel",
          src: `${P}/hablemos-movil.webp`,
          alt: t(
            "El contacto por WhatsApp en la web, en el celular",
            "WhatsApp contact on the website, on a phone",
            "Der WhatsApp-Kontakt auf der Website, auf dem Handy",
            "O contacto por WhatsApp na web, no telemóvel",
          ),
        },
      },
    ],
  },
  tecnologia: {
    titulo: t("Pocas piezas, bien conectadas.", "Few pieces, well connected.", "Wenige Teile, gut verbunden.", "Poucas peças, bem ligadas."),
    lede: t(
      "Una marca personal no necesita más. Aquí la inteligencia artificial está en cómo se construyó la web, no en la operación. Toca cualquiera.",
      "A personal brand does not need more. Here artificial intelligence is in how the website was built, not in the day-to-day. Tap any of them.",
      "Eine persönliche Marke braucht nicht mehr. Hier steckt die künstliche Intelligenz darin, wie die Website gebaut wurde, nicht im Betrieb. Tippe auf eines.",
      "Uma marca pessoal não precisa de mais. Aqui a inteligência artificial está na forma como a web foi construída, não na operação. Toca em qualquer uma.",
    ),
    centro: {
      titulo: t("La marca de Pacho", "Pacho's brand", "Pachos Marke", "A marca do Pacho"),
      sub: t("una web, tres líneas", "one website, three lines", "eine Website, drei Bereiche", "uma web, três linhas"),
    },
    nodos: [
      {
        id: "construida",
        nombre: t("Hecha con IA", "Built with AI", "Mit KI gebaut", "Feita com IA"),
        corto: t("Con IA", "With AI", "Mit KI", "Com IA"),
        tipo: "ia",
        hace: t(
          "La web se diseñó y se construyó con inteligencia artificial y dirección creativa. Por eso cada cambio que él pide se ajusta rápido.",
          "The website was designed and built with artificial intelligence and creative direction. That is why every change he asks for gets done fast.",
          "Die Website wurde mit künstlicher Intelligenz und Creative Direction gestaltet und gebaut. Deshalb wird jede Änderung, die er sich wünscht, schnell umgesetzt.",
          "A web foi desenhada e construída com inteligência artificial e direção criativa. Por isso cada mudança que ele pede se ajusta depressa.",
        ),
        con: ["web"],
      },
      {
        id: "web",
        nombre: t("Web", "Website", "Website", "Web"),
        icono: "vercel",
        tipo: "herramienta",
        hace: t(
          "La historia, la conferencia y las alianzas, cada una con su página, con la portada que se descubre con la mano.",
          "The story, the talk and the partnerships, each with its own page, with the cover you reveal by hand.",
          "Die Geschichte, der Vortrag und die Partnerschaften, jeweils mit eigener Seite, mit dem Titelbild, das man mit der Hand entdeckt.",
          "A história, a conferência e as parcerias, cada uma com a sua página, com a capa que se descobre com a mão.",
        ),
        con: ["whatsapp", "instagram", "correo", "google"],
        img: `${P}/hero-luz.webp`,
      },
      {
        id: "whatsapp",
        nombre: t("WhatsApp", "WhatsApp", "WhatsApp", "WhatsApp"),
        icono: "whatsapp",
        tipo: "herramienta",
        hace: t(
          "Donde llegan las reservas de la conferencia, las alianzas y la prensa, con el mensaje ya escrito.",
          "Where talk bookings, partnerships and press come in, with the message already written.",
          "Hier kommen Buchungen für den Vortrag, Partnerschaften und Presse an, mit der Nachricht schon vorformuliert.",
          "Onde chegam as reservas da conferência, as parcerias e a imprensa, com a mensagem já escrita.",
        ),
        con: [],
      },
      {
        id: "instagram",
        nombre: t("Instagram", "Instagram", "Instagram", "Instagram"),
        icono: "instagram",
        tipo: "herramienta",
        hace: t(
          "Su canal del día a día en la ruta, que lleva gente a la web.",
          "His day-to-day channel on the road, which brings people to the website.",
          "Sein Kanal für den Alltag unterwegs, der Leute auf die Website bringt.",
          "O seu canal do dia a dia na estrada, que leva pessoas à web.",
        ),
        con: [],
      },
      {
        id: "correo",
        nombre: t("Correo", "Email", "E-Mail", "Email"),
        tipo: "herramienta",
        hace: t(
          "Para prensa y colaboraciones que prefieren escribir por correo.",
          "For press and collaborations that prefer to write by email.",
          "Für Presse und Kooperationen, die lieber per E-Mail schreiben.",
          "Para imprensa e colaborações que preferem escrever por email.",
        ),
        con: [],
      },
      {
        id: "google",
        nombre: t("Google y redes", "Google and social", "Google und Social Media", "Google e redes"),
        corto: t("Google", "Google", "Google", "Google"),
        icono: "google",
        tipo: "herramienta",
        hace: t(
          "La web está lista para que la encuentren en Google y se vea bien cuando alguien la comparte.",
          "The website is ready to be found on Google and to look good when someone shares it.",
          "Die Website ist bereit, bei Google gefunden zu werden, und sieht gut aus, wenn jemand sie teilt.",
          "A web está pronta para ser encontrada no Google e para ficar bem quando alguém a partilha.",
        ),
        con: [],
      },
    ],
  },
  galeria: {
    titulo: t(
      "La portada, la historia y la conferencia.",
      "The cover, the story and the talk.",
      "Das Titelbild, die Geschichte und der Vortrag.",
      "A capa, a história e a conferência.",
    ),
    items: [
      {
        src: `${P}/resultados.webp`,
        pie: t("Los resultados del Dakar", "The Dakar results", "Die Ergebnisse der Dakar", "Os resultados do Dakar"),
        alt: t("Los resultados del Dakar en la web", "The Dakar results on the website", "Die Ergebnisse der Dakar auf der Website", "Os resultados do Dakar na web"),
        forma: "ancha",
      },
      {
        src: `${P}/hero-luz-movil.webp`,
        pie: t("En el celular", "On the phone", "Auf dem Handy", "No telemóvel"),
        alt: t(
          "La portada en el celular, con el casco apareciendo",
          "The cover on a phone, with the helmet appearing",
          "Das Titelbild auf dem Handy, mit dem Helm, der erscheint",
          "A capa no telemóvel, com o capacete a aparecer",
        ),
        forma: "alta",
      },
      {
        src: `${P}/conferencia-movil.webp`,
        pie: t("La conferencia", "The talk", "Der Vortrag", "A conferência"),
        alt: t("La conferencia en el celular", "The talk on a phone", "Der Vortrag auf dem Handy", "A conferência no telemóvel"),
        forma: "alta",
      },
      {
        src: `${P}/lineas-movil.webp`,
        pie: t("Las líneas", "The lines", "Die Bereiche", "As linhas"),
        alt: t("Las líneas de negocio en el celular", "The business lines on a phone", "Die Geschäftsbereiche auf dem Handy", "As linhas de negócio no telemóvel"),
        forma: "alta",
      },
      {
        src: `${P}/hablemos-movil.webp`,
        pie: t("El contacto", "The contact", "Der Kontakt", "O contacto"),
        alt: t("El contacto por WhatsApp en el celular", "WhatsApp contact on a phone", "Der WhatsApp-Kontakt auf dem Handy", "O contacto por WhatsApp no telemóvel"),
        forma: "alta",
      },
      {
        src: `${P}/ruta.webp`,
        pie: t("La ruta del Dakar", "The Dakar route", "Die Route der Dakar", "A rota do Dakar"),
        alt: t(
          "La galería de la ruta del Dakar en la web",
          "The Dakar route gallery on the website",
          "Die Galerie der Dakar-Route auf der Website",
          "A galeria da rota do Dakar na web",
        ),
        forma: "ancha",
      },
    ],
  },
  cambio: {
    titulo: t(
      "De una historia en redes a una marca con puertas.",
      "From a story on social media to a brand with doors.",
      "Von einer Geschichte in den sozialen Netzwerken zu einer Marke mit Türen.",
      "De uma história nas redes a uma marca com portas.",
    ),
    items: [
      {
        cifra: "1",
        negrita: t("Web", "Website", "Website", "Web"),
        texto: t(
          "donde vive la historia completa, en su voz.",
          "where the whole story lives, in his voice.",
          "in der die ganze Geschichte lebt, in seiner Stimme.",
          "onde vive a história completa, na sua voz.",
        ),
      },
      {
        cifra: "3",
        negrita: t("Líneas de negocio", "Business lines", "Geschäftsbereiche", "Linhas de negócio"),
        texto: t(
          "con su propia puerta: conferencias, alianzas y Fast Sunday.",
          "each with its own door: talks, partnerships and Fast Sunday.",
          "mit eigener Tür: Vorträge, Partnerschaften und Fast Sunday.",
          "com a sua própria porta: conferências, parcerias e Fast Sunday.",
        ),
      },
      {
        cifra: "0",
        negrita: t("Formularios:", "Forms:", "Formulare:", "Formulários:"),
        texto: t(
          "todo llega directo a su WhatsApp.",
          "everything goes straight to his WhatsApp.",
          "alles landet direkt in seinem WhatsApp.",
          "tudo chega diretamente ao WhatsApp dele.",
        ),
      },
    ],
  },
  cierre: {
    titulo: t("¿Tu historia merece", "Does your story deserve", "Verdient deine Geschichte", "A tua história merece"),
    resaltado: t("una web así?", "a website like this?", "eine Website wie diese?", "uma web assim?"),
    lede: t(
      "Cuéntame qué haces y te digo por dónde empezaría.",
      "Tell me what you do and I will tell you where I would start.",
      "Erzähl mir, was du machst, und ich sage dir, wo ich anfangen würde.",
      "Conta-me o que fazes e eu digo-te por onde começaria.",
    ),
    enlace: { href: "/#que-hacemos", texto: t("Ver lo que hacemos →", "See what we do →", "Was wir machen →", "Ver o que fazemos →") },
  },
  tarjeta: {
    etiqueta: t(
      "Piloto del Dakar · marca personal",
      "Dakar rider · personal brand",
      "Dakar-Fahrer · persönliche Marke",
      "Piloto do Dakar · marca pessoal",
    ),
    imagen: "/v2/portafolio/pacho.jpg",
    imagenCel: "/v2/portafolio/pacho-m.jpg",
  },
};
