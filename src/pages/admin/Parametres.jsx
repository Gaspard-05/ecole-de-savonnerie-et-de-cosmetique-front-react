import { Settings, Construction } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import "./static-page.css";

function Parametres() {
  return (
    <div>
      <PageHeader title="Paramètres" subtitle="Réglages du compte et de l'école" />
      <div className="admin-static-panel">
        <div className="admin-static-panel__icon">
          <Settings size={26} />
        </div>
        <h3>
          <Construction size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />
          Page en construction
        </h3>
        <p>Les paramètres du compte administrateur seront disponibles prochainement.</p>
      </div>
    </div>
  );
}

export default Parametres;
