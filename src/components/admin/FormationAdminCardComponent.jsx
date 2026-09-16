import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatPrix } from "../../data/formations";
import "./FormationAdminCard.css";

function FormationAdminCard({ formation, onDelete }) {
  return (
    <article className="formation-admin-card">
      <div className="formation-admin-card__body">
        <div className="formation-admin-card__header">
          <h3>{formation.nom}</h3>
          <span className="formation-admin-card__price">{formatPrix(formation.prix)}</span>
        </div>
        <div className="formation-admin-card__meta">
          <span>{formation.duree}</span>
          {formation.certification && (
            <span className="formation-admin-card__certification" title={formation.certification}>
              {formation.certification}
            </span>
          )}
        </div>
        <p>{formation.resume ?? formation.description}</p>

        <div className="formation-admin-card__actions">
          <Link
            to={`/admin/formations/${formation.slug}`}
            className="formation-admin-card__action"
            title="Voir la formation"
            aria-label="Voir la formation"
          >
            <Eye size={17} />
          </Link>
          <Link
            to={`/admin/formations/${formation.slug}/modifier`}
            className="formation-admin-card__action"
            title="Modifier la formation"
            aria-label="Modifier la formation"
          >
            <Pencil size={17} />
          </Link>
          <button
            type="button"
            className="formation-admin-card__action formation-admin-card__action--danger"
            title="Supprimer"
            aria-label="Supprimer la formation"
            onClick={() => onDelete(formation.id)}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default FormationAdminCard;
