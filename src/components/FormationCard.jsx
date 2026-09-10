import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatPrix } from "../data/formations";
import "./FormationCard.css";

function FormationCard({ formation }) {
  return (
    <article className="formation-card">
      <Link to={`/formations/${formation.slug}`} className="formation-card__media">
        <img src={formation.image} alt={formation.nom} loading="lazy" />
        <span className="formation-card__price">{formatPrix(formation.prix)}</span>
      </Link>
      <div className="formation-card__body">
        <h3>{formation.nom}</h3>
        <p>{formation.resume ?? formation.description}</p>
        <Link to={`/formations/${formation.slug}`} className="formation-card__link">
          Découvrir la formation <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default FormationCard;
