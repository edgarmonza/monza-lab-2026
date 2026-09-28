/* /work/:slug → si el caso ya está en la web v2 (src/data/casos), pinta el caso nuevo; si no, la
^ * página «no encontrada». La key remonta el caso al pasar de uno a otro (se reinician las
 * piezas, el mapa y la aparición al bajar). */
import { useParams } from "react-router-dom";
import { casoPorSlug } from "@/data/casos";
import Caso from "./Caso";
import NotFound from "./NotFound";

const CasoRuta = () => {
  const { slug } = useParams();
  const caso = casoPorSlug(slug);
  return caso ? <Caso key={caso.slug} caso={caso} /> : <NotFound />;
};

export default CasoRuta;
