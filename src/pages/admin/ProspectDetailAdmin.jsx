import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import { useFetch } from "../../hooks/useFetch";
import "./ProspectDetailAdmin.css";

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

function ProspectDetailAdmin() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/admin/pre-inscriptions/${id}`);
  const preinscription = data?.data ?? data;

  return (
    <div className="admin-prospect-detail">
      <PageHeader
        title={preinscription?.prospect?.nom ?? "Prospect"}
        subtitle="Détail de la pré-inscription"
        actionLabel="Retour à la liste"
        actionIcon={ArrowLeft}
        to="/admin/prospects"
      />

      {loading && <p className="admin-prospect-detail__status">Chargement...</p>}
      {error && <p className="admin-prospect-detail__status">Impossible de charger ce prospect.</p>}

      {preinscription && (
        <div className="admin-prospect-detail__card">
          <span
            className={`admin-prospect-detail__statut admin-prospect-detail__statut--${preinscription.statut}`}
          >
            {STATUT_LABELS[preinscription.statut] ?? preinscription.statut}
          </span>

          <dl className="admin-prospect-detail__infos">
            <div>
              <dt>Nom</dt>
              <dd>{preinscription.prospect?.nom ?? "—"}</dd>
            </div>
            <div>
              <dt>Téléphone</dt>
              <dd>{preinscription.prospect?.telephone ?? "—"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{preinscription.prospect?.email ?? "—"}</dd>
            </div>
            <div>
              <dt>Formation</dt>
              <dd>{preinscription.formation?.nom ?? "—"}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{formatDate(preinscription.date)}</dd>
            </div>
          </dl>

          {preinscription.message && (
            <div className="admin-prospect-detail__block">
              <h3>Message</h3>
              <p>{preinscription.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProspectDetailAdmin;
