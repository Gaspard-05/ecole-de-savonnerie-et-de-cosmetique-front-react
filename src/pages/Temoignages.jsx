import TestimonialCard from "../components/TestimonialCard";
import SectionCTA from "../components/SectionCTA";
import Button from "../components/Button";
import { temoignages } from "../data/temoignages";
import "./Temoignages.css";

function Temoignages() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h6>Témoignages</h6>
          <h1>La réussite de nos diplômées</h1>
          <p>
            Elles ont suivi une formation ESC et ont transformé leur passion en activité rentable.
            Découvrez leurs parcours.
          </p>
        </div>
      </section>

      <section className="temoignages-list">
        <div className="container">
          <div className="temoignages-list__header">
            <h2>Les témoignages</h2>
            <Button to="/temoignages/deposer" variant="primary">
              Faire un témoignage
            </Button>
          </div>

          <div className="temoignages-list__grid">
            {temoignages.map((temoignage) => (
              <TestimonialCard key={temoignage.id} temoignage={temoignage} />
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        title="Vous aussi, écrivez votre réussite"
        description="Rejoignez l'ESC et donnez vie à votre projet entrepreneurial."
        buttonLabel="Rejoindre l'ESC"
        buttonTo="/preinscription"
      />
    </>
  );
}

export default Temoignages;
