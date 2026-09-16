import PageHeader from "../../components/admin/PageHeaderComponent";
import { useFetch } from "../../hooks/useFetch";
import "./Prospects.css";

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

function Prospects() {
  const { data, loading, error } = useFetch("/admin/pre-inscriptions");
  const preinscriptions = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <div className="admin-prospects">
      <PageHeader title="Prospects" subtitle="Suivi des demandes de pré-inscription" />

      {loading && <p className="admin-prospects__status">Chargement...</p>}
      {error && <p className="admin-prospects__status">Impossible de charger les pré-inscriptions.</p>}

      {!loading && !error && (
        preinscriptions.length > 0 ? (
          <div className="admin-prospects__table-wrap">
            <table className="admin-prospects__table">
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
                {preinscriptions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.prospect?.nom ?? "—"}</td>
                    <td>{item.prospect?.telephone ?? "—"}</td>
                    <td>{item.prospect?.email ?? "—"}</td>
                    <td>{item.formation?.nom ?? "—"}</td>
                    {/* <td className="admin-prospects__message">{item.message || "—"}</td> — masqué pour le moment */}
                    <td>
                      <span className={`admin-prospects__statut admin-prospects__statut--${item.statut}`}>
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
          <p className="admin-prospects__status">Aucune pré-inscription pour le moment.</p>
        )
      )}
    </div>
  );
}

export default Prospects;
