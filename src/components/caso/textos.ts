/* Los rótulos fijos del molde de caso, en los cuatro idiomas. Lo propio de cada caso vive en
 * src/data/casos/<slug>.ts. Sin guiones largos en ningún idioma. */
import type { LangText } from "@/i18n/types";

type T = LangText;
const t = (es: string, en: string, de: string, pt: string): T => ({ es, en, de, pt });

export const TX = {
  proyectos: t("Proyectos", "Projects", "Projekte", "Projetos"),
  plataformas: t("Plataformas", "Platforms", "Plattformen", "Plataformas"),
  caso: t("Caso", "Case", "Fall", "Caso"),
  casoConfidencial: t("Caso confidencial", "Confidential case", "Vertraulicher Fall", "Caso confidencial"),
  estasEn: t("Estás en", "You are here", "Du bist hier", "Estás em"),
  loQueConstruimos: t("Lo que construimos", "What we built", "Was wir gebaut haben", "O que construímos"),
  producimos: t("Lo que producimos", "What we produce", "Was wir liefern", "O que produzimos"),
  hace: t("Qué hace Monza aquí", "What Monza does here", "Was Monza hier macht", "O que a Monza faz aqui"),
  partida: t("El punto de partida", "The starting point", "Der Ausgangspunkt", "O ponto de partida"),
  piezas: t("Pieza por pieza", "Piece by piece", "Stück für Stück", "Peça a peça"),
  piezasSistema: t("Piezas del sistema", "Pieces of the system", "Teile des Systems", "Peças do sistema"),
  leyendaPiezas: t("En rosa, la pieza que estás viendo y cómo se conecta.", "In pink, the piece you are looking at and how it connects.", "In Rosa: das Teil, das du gerade ansiehst, und wie es verbunden ist.", "Em rosa, a peça que estás a ver e como se liga."),
  leResuelve: t("Le resuelve", "What it solves", "Was es löst", "O que resolve"),
  anterior: t("← Anterior", "← Previous", "← Zurück", "← Anterior"),
  siguiente: t("Siguiente →", "Next →", "Weiter →", "Seguinte →"),
  otraVez: t("Empezar otra vez ↺", "Start again ↺", "Von vorn ↺", "Começar de novo ↺"),
  tecnologia: t("La tecnología", "The technology", "Die Technologie", "A tecnologia"),
  herramienta: t("Herramienta", "Tool", "Werkzeug", "Ferramenta"),
  ia: t("Inteligencia artificial", "Artificial intelligence", "Künstliche Intelligenz", "Inteligência artificial"),
  seConecta: t("Se conecta con", "Connects with", "Verbunden mit", "Liga-se a"),
  asiSeVe: t("Así se ve", "How it looks", "So sieht es aus", "Assim se vê"),
  desliza: t("Desliza", "Swipe", "Wischen", "Desliza"),
  cambio: t("Lo que cambió", "What changed", "Was sich verändert hat", "O que mudou"),
  otros: t("Otros casos", "Other cases", "Weitere Fälle", "Outros casos"),
  sigueMirando: t("Sigue mirando.", "Keep looking.", "Schau weiter.", "Continua a ver."),
  verCaso: t("Ver el caso →", "See the case →", "Zum Fall →", "Ver o caso →"),
  hablemos: t("Hablemos", "Let's talk", "Lass uns reden", "Falemos"),
  escribir: t("Escribir por WhatsApp", "Message on WhatsApp", "Auf WhatsApp schreiben", "Escrever no WhatsApp"),
  webRecorre: t("La web en escritorio y en el celular, recorriéndose sola", "The website on desktop and mobile, scrolling by itself", "Die Website auf Desktop und Handy, die von selbst scrollt", "O site no computador e no telemóvel, a percorrer-se sozinho"),
  waCaso: t("Hola Edgar, vi el caso de {n} en monzalab.com", "Hi Edgar, I saw the {n} case on monzalab.com", "Hallo Edgar, ich habe den Fall {n} auf monzalab.com gesehen", "Olá Edgar, vi o caso {n} em monzalab.com"),
};
