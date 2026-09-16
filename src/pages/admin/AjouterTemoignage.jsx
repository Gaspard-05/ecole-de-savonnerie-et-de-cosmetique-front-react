import { useState } from "react";
import { Star } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import "../../components/Form.css";
import "./AjouterTemoignage.css";

const EMPTY_FORM = { nom: "", formationSlug: "", note: 5, texte: "" };

function AjouterTemoignage() {
  const [values, setValues] = useState(EMPTY_FORM);
  const { data } = useFetch("/formations");
  const formations = Array.isArray(data) ? data : data?.data ?? [];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="admin-ajouter-temoignage">
      <PageHeader title="Ajouter un témoignage" subtitle="Publier le témoignage d'une ancienne élève" />

      <form className="form admin-ajouter-temoignage__form" onSubmit={handleSubmit} noValidate>
        <div className="form__row">
          <div className="form__field">
            <label htmlFor="nom">Nom complet</label>
            <input id="nom" name="nom" value={values.nom} onChange={handleChange} />
          </div>
          <div className="form__field">
            <label htmlFor="formationSlug">Formation suivie</label>
            <select id="formationSlug" name="formationSlug" value={values.formationSlug} onChange={handleChange}>
              <option value="">Sélectionner une formation</option>
              {formations.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form__field">
          <label>Note</label>
          <div className="admin-ajouter-temoignage__stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`admin-ajouter-temoignage__star ${
                  n <= values.note ? "admin-ajouter-temoignage__star--active" : ""
                }`}
                onClick={() => setValues((v) => ({ ...v, note: n }))}
                aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
              >
                <Star size={20} fill={n <= values.note ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>

        <div className="form__field">
          <label htmlFor="texte">Témoignage</label>
          <textarea id="texte" name="texte" value={values.texte} onChange={handleChange} />
        </div>

        <div className="admin-ajouter-temoignage__actions">
          <Button type="submit" variant="primary">
            Enregistrer le témoignage
          </Button>
          <Button type="button" variant="outline" to="/admin/temoignages">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AjouterTemoignage;
