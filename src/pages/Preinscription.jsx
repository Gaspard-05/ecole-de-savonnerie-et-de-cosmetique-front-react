import { useSearchParams } from "react-router-dom";
import PreinscriptionForm from "../components/PreinscriptionFormComponent";
import { getFormationBySlug } from "../data/formations";
import "./Preinscription.css";

function Preinscription() {
  const [searchParams] = useSearchParams();
  const slugParam = searchParams.get("formation");
  const formationPreselectionnee = slugParam ? getFormationBySlug(slugParam) : null;

  return (
    <section className="preinscription">
      <div className="container preinscription__inner">
        <div className="preinscription__intro">
          <h6>Pré-inscription</h6>
          <h1>Réservez votre place en quelques minutes</h1>
          <p>
            Remplissez le formulaire ci-dessous, notre équipe vous recontactera rapidement pour
            finaliser votre inscription et répondre à toutes vos questions.
            {formationPreselectionnee && (
              <>
                {" "}
                Vous êtes intéressé(e) par la formation{" "}
                <strong>{formationPreselectionnee.nom}</strong>.
              </>
            )}
          </p>
        </div>

        <div className="preinscription__card">
          <PreinscriptionForm preselectedSlug={formationPreselectionnee?.slug} />
        </div>
      </div>
    </section>
  );
}

export default Preinscription;
