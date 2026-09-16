import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
import SelectDropdown from "../../components/SelectDropdownComponent";
import api from "../../lib/api";
import { useFetch } from "../../hooks/useFetch";
import "../../components/Form.css";
import "./AjouterVideo.css";
import { formatNomOption } from "../../data/formations";
import Swal from "sweetalert2";

const MAX_VIDEO_SIZE = 40 * 1024 * 1024;
const VIDEO_EXTENSIONS = ["mp4", "mov", "avi", "wmv"];

function AjouterVideo() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    formation: "",
  });

  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { data, loading, error: formationsError } = useFetch("/formations");
  const formations = Array.isArray(data) ? data : data?.data ?? [];
  const formationOptions = formations.map((formation) => ({
    value: formation.slug,
    label: formatNomOption(formation.nom),
  }));

  function handleFormationChange(value) {
    setValues((current) => ({ ...current, formation: value }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleVideoChange(event) {
    setVideo(event.target.files?.[0] ?? null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    if (!values.title || !values.formation || !video) {
      setError("Merci de renseigner le nom, la formation et la vidéo.");
      return;
    }

    const extension = video.name.split(".").pop()?.toLowerCase();
    if (!VIDEO_EXTENSIONS.includes(extension)) {
      setError("Le fichier doit être au format MP4, MOV, AVI ou WMV.");
      return;
    }

    if (video.size > MAX_VIDEO_SIZE) {
      setError("La vidéo ne doit pas dépasser 40 Mo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("formation", values.formation);
    formData.append("video", video);

    setSubmitting(true);
    try {
      await api.post("/admin/videos", formData);
      await Swal.fire({
        icon: "success",
        title: "Vidéo  enregistrée",
        text: "La vidéo a bien été enregistrée.",
        confirmButtonColor: "#905a01",
      });
      navigate("/admin/videos");
    } catch (err) {
      const responseErrors = err.response?.data?.errors;
      setError(
        responseErrors
          ? Object.values(responseErrors).flat().join(" ")
          : err.response?.data?.message || "Impossible d'ajouter la vidéo."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-ajouter-video">
      <PageHeader
        title="Ajouter une vidéo"
        subtitle="Préparer un nouveau témoignage vidéo"
        actionLabel="Retour aux vidéos"
        actionIcon={ArrowLeft}
        to="/admin/videos"
      />

      <form className="form admin-ajouter-video__form" onSubmit={handleSubmit} noValidate>
        <div className="form__field">
          <label htmlFor="title">Nom de l'étudiant</label>
          <input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Ex. Ariane K."
          />
        </div>

        <div className="form__field">
          <label htmlFor="formation">Formation</label>
          <SelectDropdown
            id="formation"
            options={formationOptions}
            value={values.formation}
            onChange={handleFormationChange}
            placeholder="Sélectionner une formation"
          />
          {loading && <small className="admin-ajouter-video__hint">Chargement des formations...</small>}
          {formationsError && (
            <small className="form__error">Impossible de charger les formations.</small>
          )}
        </div>

        <div className="form__field">
          <label htmlFor="video">Vidéo</label>
          <input
            id="video"
            name="video"
            type="file"
            accept=".mp4,.mov,.avi,.wmv,video/*"
            onChange={handleVideoChange}
          />
          <small className="admin-ajouter-video__hint">
            Formats acceptés : MP4, MOV, AVI, WMV. Taille maximale : 40 Mo.
          </small>
        </div>

        {error && <span className="form__error">{error}</span>}

        <div className="admin-ajouter-video__actions">
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Téléversement..." : "Enregistrer la vidéo"}
          </Button>
          <Button type="button" variant="outline" to="/admin/videos">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AjouterVideo;