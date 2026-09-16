import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
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

const EMPTY_FORM = {
  nom: "",
  prix: "",
  duree: "",
  description: "",
  modules: "",
  debouches: "",
  isActive: true,
};

function AjouterFormation() {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY_FORM);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
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
    formData.append("nom", values.nom);
    formData.append("prix", values.prix);
    formData.append("duree", values.duree);
    formData.append("description", values.description);
    linesToArray(values.modules).forEach((item) => formData.append("modules[]", item));
    linesToArray(values.debouches).forEach((item) => formData.append("debouches[]", item));
    formData.append("is_active", values.isActive ? "1" : "0");
    if (image) formData.append("image", image);

    try {
      await api.post("/admin/formations", formData);
      await Swal.fire({
        icon: "success",
        title: "Formation enregistrée",
        text: "La formation a bien été ajoutée.",
        confirmButtonColor: "#905a01",
      });
      navigate("/admin/formations");
    } catch (err) {
      setError(getApiErrorMessage(err, "Impossible d'enregistrer la formation."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-ajouter-formation">
      <PageHeader title="Ajouter une formation" subtitle="Créer une nouvelle formation à proposer aux prospects" />

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

        <div className="form__row">
          <div className="form__field">
            <label htmlFor="prix">Prix (FCFA)</label>
            <input
              id="prix"
              name="prix"
              type="number"
              min="0"
              value={values.prix}
              onChange={handleChange}
            />
          </div>
          <div className="form__field">
            <label htmlFor="image">Photo de la formation</label>
            <input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img src={imagePreview} alt="Aperçu" className="admin-ajouter-formation__preview" />
            )}
          </div>
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
            {submitting ? "Enregistrement..." : "Enregistrer la formation"}
          </Button>
          <Button type="button" variant="outline" to="/admin/formations">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AjouterFormation;
