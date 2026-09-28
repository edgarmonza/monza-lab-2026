/* /work/:slug → si el caso ya está en la web v2 (src/data/casos), pinta el caso nuevo; si no, la
 * página de proyecto de antes. La key remonta el caso al pasar de uno a otro (se reinician las
 * piezas, el mapa y la aparición al bajar). */
import { useParams } from "react-router-dom";
import { casoPorSlug } from "@/data/casos";
import Caso from "./Caso";
import ProjectPage from "./ProjectPage";

const CasoRuta = () => {
  const { slug } = useParams();
  const caso = casoPorSlug(slug);
  return caso ? <Caso key={caso.slug} caso={caso} /> : <ProjectPage />;
};

export default CasoRuta;
