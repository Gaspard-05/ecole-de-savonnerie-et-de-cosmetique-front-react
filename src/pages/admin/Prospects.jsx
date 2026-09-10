import { Users, Construction } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import "./static-page.css";

function Prospects() {
  return (
    <div>
      <PageHeader title="Prospects" subtitle="Suivi des demandes de pré-inscription" />
      <div className="admin-static-panel">
        <div className="admin-static-panel__icon">
          <Users size={26} />
        </div>
        <h3>
          <Construction size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />
          Page en construction
        </h3>
        <p>La gestion des prospects (liste, statut, suivi des candidatures) sera disponible prochainement.</p>
      </div>
    </div>
  );
}

export default Prospects;
