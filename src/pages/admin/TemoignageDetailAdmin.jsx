import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import Swal from "sweetalert2";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import api from "../../lib/api";
import "./TemoignageDetailAdmin.css";

function getApiErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  return data?.message || fallback;
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function TemoignageDetailAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/admin/reussites/${id}`);
  const temoignage = data?.data ?? data;
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  async function handlePublier() {
    setSubmitting(true);
    setActionError("");
    try {
      const { data: res } = await api.patch(`/admin/reussites/${id}/publier`);
      await Swal.fire({
        icon: "success",
        title: "Témoignage publié",
        text: res.message,
        confirmButtonColor: "#02462e",
      });
      navigate("/admin/temoignages");
    } catch (err) {
      setActionError(getApiErrorMessage(err, "Impossible de publier ce témoignage."));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDepublier() {
    setSubmitting(true);
    setActionError("");
    try {
      const { data: res } = await api.patch(`/admin/reussites/${id}/depublier`);
      await Swal.fire({
        icon: "success",
        title: "Témoignage dépublié",
        text: res.message,
        confirmButtonColor: "#02462e",
      });
      navigate("/admin/temoignages");
    } catch (err) {
      setActionError(getApiErrorMessage(err, "Impossible de dépublier ce témoignage."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-temoignage-detail">
      <PageHeader
        title={temoignage?.nom ?? temoignage?.prospect?.nom ?? "Témoignage"}
        subtitle="Détail du témoignage"
        actionLabel="Retour à la liste"
        actionIcon={ArrowLeft}
        to="/admin/temoignages"
      />

      {loading && <p className="admin-temoignage-detail__status">Chargement...</p>}
      {error && <p className="admin-temoignage-detail__status">Impossible de charger ce témoignage.</p>}

      {temoignage && (
        <div className="admin-temoignage-detail__card">
          {temoignage.photo && (
            <img
              className="admin-temoignage-detail__photo"
              src={temoignage.photo}
              alt={temoignage.nom ?? temoignage.prospect?.nom}
            />
          )}

          <div className="admin-temoignage-detail__meta">
            <span
              className={`admin-temoignage-detail__statut admin-temoignage-detail__statut--${
                temoignage.is_published ? "publie" : "non-publie"
              }`}
            >
              {temoignage.is_published ? "Publié" : "Non publié"}
            </span>
            <span className="admin-temoignage-detail__note">
              <Star size={16} fill="currentColor" /> {temoignage.note ?? "—"}
            </span>
          </div>

          <dl className="admin-temoignage-detail__infos">
            <div>
              <dt>Nom</dt>
              <dd>{temoignage.nom ?? temoignage.prospect?.nom ?? "—"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{temoignage.prospect?.email ?? "—"}</dd>
            </div>
            <div>
              <dt>Formation</dt>
              <dd>{temoignage.formation?.nom ?? "—"}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{formatDate(temoignage.date)}</dd>
            </div>
          </dl>

          <p className="admin-temoignage-detail__contenu">{temoignage.contenu}</p>

          {actionError && <p className="admin-temoignage-detail__error">{actionError}</p>}

          <div className="admin-temoignage-detail__actions">
            <Button
              type="button"
              variant="primary"
              disabled={submitting || temoignage.is_published}
              onClick={handlePublier}
            >
              Publier
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={submitting || !temoignage.is_published}
              onClick={handleDepublier}
            >
              Dépublier
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemoignageDetailAdmin;
