import TestimonialCard from "../components/TestimonialCardComponent";
import SectionCTA from "../components/SectionCTAComponent";
import Button from "../components/ButtonComponent";
import { useFetch } from "../hooks/useFetch";
import "./Temoignages.css";

function Temoignages() {
  const { data, loading, error } = useFetch("/reussites");
  const temoignages = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <div className="temoignages">
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

          {loading && <p>Chargement des témoignages...</p>}
          {error && <p>Impossible de charger les témoignages pour le moment.</p>}
          {!loading && !error && temoignages.length === 0 && <p>Aucun témoignage publié pour le moment.</p>}

          {!loading && !error && temoignages.length > 0 && (
            <div className="temoignages-list__grid">
              {temoignages.map((temoignage) => (
                <TestimonialCard key={temoignage.id} temoignage={temoignage} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SectionCTA
        title="Vous aussi, écrivez votre réussite"
        description="Rejoignez l'ESC et donnez vie à votre projet entrepreneurial."
        buttonLabel="Rejoindre l'ESC"
        buttonTo="/preinscription"
      />
    </div>
  );
}

export default Temoignages;
