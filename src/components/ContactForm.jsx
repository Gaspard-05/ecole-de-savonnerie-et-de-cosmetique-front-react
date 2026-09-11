import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "./Button";
import { formations as formationsMock } from "../data/formations";
import { useFetch, postJSON } from "../hooks/useFetch";
import "./Form.css";

const initialState = { formationSlug: "", nom: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.nom.trim()) errors.nom = "Merci d'indiquer votre nom.";
  if (!values.email.trim()) {
    errors.email = "Merci d'indiquer votre email.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Format d'email invalide.";
  }
  if (!values.message.trim()) errors.message = "Merci de rédiger un message.";
  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { data } = useFetch("/formations", { fallback: formationsMock });
  const formations = Array.isArray(data) ? data : data?.data ?? [];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await postJSON("/contact", values);
      setSubmitted(true);
    } catch {
      setErrors({ global: "Une erreur est survenue, merci de réessayer." });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form__success">
        <CheckCircle2 size={48} className="form__success-icon" />
        <h3>Message envoyé !</h3>
        <p>Merci de nous avoir contactées, notre équipe vous répond sous 24 à 48h.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__field">
        <label htmlFor="formationSlug">Formation concernée (optionnel)</label>
        <select id="formationSlug" name="formationSlug" value={values.formationSlug} onChange={handleChange}>
          <option value="">Question générale</option>
          {formations.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.nom}
            </option>
          ))}
        </select>
      </div>

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

      <div className={`form__field ${errors.message ? "form__field--error" : ""}`}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={values.message} onChange={handleChange} />
        {errors.message && <span className="form__error">{errors.message}</span>}
      </div>

      {errors.global && <span className="form__error">{errors.global}</span>}

      <Button type="submit" variant="primary" size="lg" className="form__submit" disabled={submitting}>
        {submitting ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
}

export default ContactForm;
