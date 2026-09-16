import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import api from "../../lib/api";
import "../../components/Form.css";
import "./AjouterFormation.css";

function linesToArray(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function getApiErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  return data?.message || fallback;
}

function valuesFromFormation(formation) {
  return {
    nom: formation.nom ?? "",
    prix: formation.prix ?? "",
    duree: formation.duree ?? "",
    description: formation.description ?? "",
    modules: (formation.modules ?? []).join("\n"),
    debouches: (formation.debouches ?? []).join("\n"),
    isActive: formation.is_active ?? true,
  };
}

function ModifierFormationForm({ formation }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(() => valuesFromFormation(formation));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!values.nom || !values.prix || !values.duree) {
      setError("Merci de renseigner au minimum le nom, le prix et la durée.");
      return;
    }
    setError("");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("nom", values.nom);
    formData.append("prix", values.prix);
    formData.append("duree", values.duree);
    formData.append("description", values.description);
    linesToArray(values.modules).forEach((item) => formData.append("modules[]", item));
    linesToArray(values.debouches).forEach((item) => formData.append("debouches[]", item));
    formData.append("is_active", values.isActive ? "1" : "0");

    try {
      await api.post(`/admin/formations/${formation.id}`, formData);
      await Swal.fire({
        icon: "success",
        title: "Formation modifiée",
        text: "Les modifications ont bien été enregistrées.",
        confirmButtonColor: "#905a01",
      });
      navigate("/admin/formations");
    } catch (err) {
      setError(getApiErrorMessage(err, "Impossible d'enregistrer les modifications."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form admin-ajouter-formation__form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <div className="form__field">
          <label htmlFor="nom">Nom de la formation</label>
          <input id="nom" name="nom" value={values.nom} onChange={handleChange} />
        </div>
        <div className="form__field">
          <label htmlFor="duree">Durée</label>
          <input
            id="duree"
            name="duree"
            placeholder="ex. 2 semaines"
            value={values.duree}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="prix">Prix (FCFA)</label>
        <input id="prix" name="prix" type="number" min="0" value={values.prix} onChange={handleChange} />
      </div>

      <div className="form__field">
        <label htmlFor="description">Description courte</label>
        <textarea id="description" name="description" value={values.description} onChange={handleChange} />
      </div>

      <div className="form__field">
        <label htmlFor="modules">Modules (une ligne par point)</label>
        <textarea id="modules" name="modules" value={values.modules} onChange={handleChange} />
      </div>

      <div className="form__field">
        <label htmlFor="debouches">Débouchés (une ligne par point)</label>
        <textarea id="debouches" name="debouches" value={values.debouches} onChange={handleChange} />
      </div>

      <label className="admin-ajouter-formation__checkbox">
        <input type="checkbox" name="isActive" checked={values.isActive} onChange={handleChange} />
        Formation active (visible sur le site public)
      </label>

      {error && <span className="form__error">{error}</span>}

      <div className="admin-ajouter-formation__actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
        <Button type="button" variant="outline" to="/admin/formations">
          Annuler
        </Button>
      </div>
    </form>
  );
}

function ModifierFormation() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(`/formations/${slug}`);
  const formation = data?.data;

  return (
    <div className="admin-ajouter-formation">
      <PageHeader title="Modifier la formation" subtitle={formation?.nom ?? "Chargement..."} />

      {loading && <p>Chargement...</p>}
      {error && <p>Impossible de charger cette formation.</p>}

      {formation && <ModifierFormationForm key={formation.slug} formation={formation} />}
    </div>
  );
}

export default ModifierFormation;
