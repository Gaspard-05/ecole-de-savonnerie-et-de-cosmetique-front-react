import FormationCard from "../components/FormationCard";
import SectionCTA from "../components/SectionCTA";
import { useFetch } from "../hooks/useFetch";
import { formations as formationsMock } from "../data/formations";
import "./Formations.css";

function Formations() {
  const { data, loading, error } = useFetch("/formations", { fallback: formationsMock });
  const formations = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h6>Nos formations</h6>
          <h1>{formations.length} spécialités pour bâtir votre activité</h1>
          <p>
            Chaque formation est 100% pratique et débouche sur une double certification ESC + CQM.
            Choisissez la spécialité qui correspond à votre projet et démarrez rapidement.
          </p>
        </div>
      </section>

      <section className="formations-grid">
        <div className="container formations-grid__inner">
          {loading && <p>Chargement des formations...</p>}
          {error && <p>Impossible de charger les formations pour le moment.</p>}
          {!loading &&
            !error &&
            formations.map((formation) => <FormationCard key={formation.id} formation={formation} />)}
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
