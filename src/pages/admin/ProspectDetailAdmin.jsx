import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import api from "../../lib/api";
import "./ProspectDetailAdmin.css";

const STATUT_LABELS = {
  en_attente: "En attente",
  contacte: "Contacté",
  confirme: "Confirmé",
  valide: "Validé",
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

function getApiErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  return data?.message || fallback;
}

function ProspectDetailAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/admin/pre-inscriptions/${id}`);
  const preinscription = data?.data ?? data;
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  async function handleValider() {
    setSubmitting(true);
    setActionError("");
    try {
      const { data: res } = await api.patch(`/admin/pre-inscriptions/${id}/valider`);
      await Swal.fire({
        icon: "success",
        title: "Pré-inscription validée",
        text: res.message,
        confirmButtonColor: "#02462e",
      });
      navigate("/admin/prospects");
    } catch (err) {
      setActionError(getApiErrorMessage(err, "Impossible de valider cette pré-inscription."));
    } finally {
      setSubmitting(false);
    }
  }

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

          {actionError && <p className="admin-prospect-detail__error">{actionError}</p>}

          <div className="admin-prospect-detail__actions">
            <Button
              type="button"
              variant="primary"
              disabled={submitting || ["confirme", "valide"].includes(preinscription.statut)}
              onClick={handleValider}
            >
              Valider
            </Button>
            <Button type="button" variant="outline">
              En attente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProspectDetailAdmin;
