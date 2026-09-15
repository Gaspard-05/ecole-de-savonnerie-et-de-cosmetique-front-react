import { useState } from "react";
import Swal from "sweetalert2";
import { Star } from "lucide-react";
import Button from "../components/Button";
import { useFetch, postJSON } from "../hooks/useFetch";
import { formations as formationsMock } from "../data/formations";
import "./DeposerTemoignage.css";
import "../components/Form.css";

const initialState = { nom: "", email: "", formationSlug: "", note: 5, texte: "" };

function getFieldErrors(err) {
  const data = err.response?.data;
  const errors = {};
  if (data?.errors) {
    for (const [field, messages] of Object.entries(data.errors)) {
      errors[field] = messages[0];
    }
  }
  return errors;
}

function DeposerTemoignage() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { data } = useFetch("/formations", { fallback: formationsMock });
  const formations = Array.isArray(data) ? data : data?.data ?? [];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    try {
      const response = await postJSON("/reussites", {
        nom: values.nom,
        email: values.email,
        formation: values.formationSlug,
        note: values.note,
        contenu: values.texte,
      });
      await Swal.fire({
        icon: "success",
        title: "Merci !",
        text: response.message,
        confirmButtonColor: "#02462e",
      });
      setValues(initialState);
    } catch (err) {
      if (err.response?.status === 403) {
        setErrors({ global: err.response.data.message });
      } else if (err.response?.data?.errors) {
        setErrors(getFieldErrors(err));
      } else {
        setErrors({ global: "Une erreur est survenue, merci de réessayer." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="deposer-temoignage">
      <div className="container deposer-temoignage__inner">
        <div className="deposer-temoignage__intro">
          <h6>Témoignages</h6>
          <h1>Partagez votre réussite</h1>
          <p>
            Vous avez suivi une formation à l'ESC ? Racontez votre parcours et inspirez les futures
            apprenantes.
          </p>
        </div>

        <div className="deposer-temoignage__card">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className={`form__field ${errors.nom ? "form__field--error" : ""}`}>
              <label htmlFor="nom">Nom complet</label>
              <input id="nom" name="nom" type="text" value={values.nom} onChange={handleChange} />
              {errors.nom && <span className="form__error">{errors.nom}</span>}
            </div>

            <div className={`form__field ${errors.email ? "form__field--error" : ""}`}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={values.email} onChange={handleChange} />
              {errors.email && <span className="form__error">{errors.email}</span>}
            </div>

            <div className={`form__field ${errors.formation ? "form__field--error" : ""}`}>
              <label htmlFor="formationSlug">Formation suivie</label>
              <select
                id="formationSlug"
                name="formationSlug"
                value={values.formationSlug}
                onChange={handleChange}
              >
                <option value="">Sélectionner une formation</option>
                {formations.map((f) => (
                  <option key={f.slug} value={f.slug}>
                    {f.nom}
                  </option>
                ))}
              </select>
              {errors.formation && <span className="form__error">{errors.formation}</span>}
            </div>

            <div className={`form__field ${errors.note ? "form__field--error" : ""}`}>
              <label>Votre note</label>
              <div className="deposer-temoignage__stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`deposer-temoignage__star ${
                      n <= values.note ? "deposer-temoignage__star--active" : ""
                    }`}
                    onClick={() => setValues((v) => ({ ...v, note: n }))}
                    aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                  >
                    <Star size={22} fill={n <= values.note ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              {errors.note && <span className="form__error">{errors.note}</span>}
            </div>

            <div className={`form__field ${errors.contenu ? "form__field--error" : ""}`}>
              <label htmlFor="texte">Votre témoignage</label>
              <textarea id="texte" name="texte" value={values.texte} onChange={handleChange} />
              {errors.contenu && <span className="form__error">{errors.contenu}</span>}
            </div>

            {errors.global && <span className="form__error">{errors.global}</span>}

            <Button type="submit" variant="primary" size="lg" className="form__submit" disabled={submitting}>
              {submitting ? "Envoi en cours..." : "Envoyer mon témoignage"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DeposerTemoignage;
