import PageHeader from "../../components/admin/PageHeader";
import { useFetch } from "../../hooks/useFetch";
import "./Messages.css";

const STATUT_LABELS = {
  en_attente: "En attente",
  contacte: "Contacté",
  confirme: "Confirmé",
  annule: "Annulé",
};

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Messages() {
  const { data, loading, error } = useFetch("/admin/contacts");
  const messages = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <div className="admin-messages">
      <PageHeader title="Messages" subtitle="Messages reçus depuis le formulaire de contact" />

      {loading && <p className="admin-messages__status">Chargement...</p>}
      {error && <p className="admin-messages__status">Impossible de charger les messages.</p>}

      {!loading && !error && (
        messages.length > 0 ? (
          <div className="admin-messages__table-wrap">
            <table className="admin-messages__table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Téléphone</th>
                  <th>Email</th>
                  <th>Formation</th>
                  {/* <th>Message</th> — masqué pour le moment */}
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((item) => (
                  <tr key={item.id}>
                    <td>{item.prospect?.nom ?? "—"}</td>
                    <td>{item.prospect?.telephone ?? "—"}</td>
                    <td>{item.prospect?.email ?? "—"}</td>
                    <td>{item.formation?.nom ?? "—"}</td>
                    {/* <td className="admin-messages__message">{item.message || "—"}</td> — masqué pour le moment */}
                    <td>
                      <span className={`admin-messages__statut admin-messages__statut--${item.statut}`}>
                        {STATUT_LABELS[item.statut] ?? item.statut}
                      </span>
                    </td>
                    <td>{formatDate(item.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-messages__status">Aucun message pour le moment.</p>
        )
      )}
    </div>
  );
}

export default Messages;
