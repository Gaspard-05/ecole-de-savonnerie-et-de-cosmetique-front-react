import { Star, Construction, Plus } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import "./static-page.css";

function TemoignagesAdmin() {
  return (
    <div>
      <PageHeader
        title="Témoignages"
        subtitle="Modération des témoignages d'anciens élèves"
        actionLabel="Ajouter un témoignage"
        actionIcon={Plus}
        to="/admin/temoignages/ajouter"
      />
      <div className="admin-static-panel">
        <div className="admin-static-panel__icon">
          <Star size={26} />
        </div>
        <h3>
          <Construction size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />
          Page en construction
        </h3>
        <p>La gestion des témoignages (validation, publication) sera disponible prochainement.</p>
      </div>
    </div>
  );
}

export default TemoignagesAdmin;
