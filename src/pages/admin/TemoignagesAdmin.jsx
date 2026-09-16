import { Link } from "react-router-dom";
import { Eye, Plus, Star } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import { useFetch } from "../../hooks/useFetch";
import "./TemoignagesAdmin.css";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TemoignagesAdmin() {
  const { data, loading, error } = useFetch("/admin/reussites");
  const temoignages = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <div className="admin-temoignages">
      <PageHeader
        title="Témoignages"
        subtitle="Modération des témoignages d'anciens élèves"
        actionLabel="Ajouter un témoignage"
        actionIcon={Plus}
        to="/admin/temoignages/ajouter"
      />

      {loading && <p className="admin-temoignages__status">Chargement...</p>}
      {error && <p className="admin-temoignages__status">Impossible de charger les témoignages.</p>}

      {!loading && !error && (
        temoignages.length > 0 ? (
          <div className="admin-temoignages__table-wrap">
            <table className="admin-temoignages__table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Formation</th>
                  <th>Note</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {temoignages.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nom ?? item.prospect?.nom ?? "—"}</td>
                    <td>{item.prospect?.email ?? "—"}</td>
                    <td>{item.formation?.nom ?? "—"}</td>
                    <td>
                      <span className="admin-temoignages__note">
                        <Star size={14} fill="currentColor" /> {item.note ?? "—"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`admin-temoignages__statut admin-temoignages__statut--${
                          item.is_published ? "publie" : "non-publie"
                        }`}
                      >
                        {item.is_published ? "Publié" : "Non publié"}
                      </span>
                    </td>
                    <td>{formatDate(item.date)}</td>
                    <td>
                      <Link
                        to={`/admin/temoignages/${item.id}`}
                        className="admin-temoignages__view"
                        aria-label="Voir le témoignage"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-temoignages__status">Aucun témoignage pour le moment.</p>
        )
      )}
    </div>
  );
}

export default TemoignagesAdmin;
