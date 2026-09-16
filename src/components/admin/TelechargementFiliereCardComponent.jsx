import { Link } from "react-router-dom";
import "./TelechargementFiliereCard.css";

function TelechargementFiliereCard({ rank, filiere, slug, telechargements }) {
  return (
    <Link to={`/admin/formations/${slug}`} className="telechargement-filiere-card">
      <span className="telechargement-filiere-card__rank">{rank}</span>
      <span className="telechargement-filiere-card__nom">{filiere}</span>
      <p className="telechargement-filiere-card__value">{telechargements}</p>
      <span className="telechargement-filiere-card__label">téléchargements</span>
    </Link>
  );
}

export default TelechargementFiliereCard;
