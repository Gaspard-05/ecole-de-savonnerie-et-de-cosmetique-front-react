import FormationCard from "../components/FormationCard";
import SectionCTA from "../components/SectionCTA";
import { formations } from "../data/formations";
import "./Formations.css";

function Formations() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h6>Nos formations</h6>
          <h1>9 spécialités pour bâtir votre activité</h1>
          <p>
            Chaque formation est 100% pratique et débouche sur une double certification ESC + CQM.
            Choisissez la spécialité qui correspond à votre projet et démarrez rapidement.
          </p>
        </div>
      </section>

      <section className="formations-grid">
        <div className="container formations-grid__inner">
          {formations.map((formation) => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>
      </section>

      <SectionCTA
        title="Une question avant de choisir votre formation ?"
        description="Notre équipe vous conseille gratuitement sur la spécialité la plus adaptée à votre projet."
        buttonLabel="Nous contacter"
        buttonTo="/contact"
        variant="light"
      />
    </>
  );
}

export default Formations;
