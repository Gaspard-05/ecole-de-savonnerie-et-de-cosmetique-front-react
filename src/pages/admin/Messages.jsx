import { Mail, Construction } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import "./static-page.css";

function Messages() {
  return (
    <div>
      <PageHeader title="Messages" subtitle="Messages reçus depuis le formulaire de contact" />
      <div className="admin-static-panel">
        <div className="admin-static-panel__icon">
          <Mail size={26} />
        </div>
        <h3>
          <Construction size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />
          Page en construction
        </h3>
        <p>La messagerie (boîte de réception, réponses) sera disponible prochainement.</p>
      </div>
    </div>
  );
}

export default Messages;
