import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "./Button";
import { formations } from "../data/formations";
import { postJSON } from "../hooks/useFetch";
import "./Form.css";

function getInitialState(preselectedSlug) {
  return {
    formationSlug: preselectedSlug || "",
    nomComplet: "",
    telephone: "",
    email: "",
    infosComplementaires: "",
  };
}

function validate(values) {
  const errors = {};
  if (!values.formationSlug) errors.formationSlug = "Merci de choisir une formation.";
  if (!values.nomComplet.trim()) errors.nomComplet = "Merci d'indiquer votre nom et prénom.";
  if (!values.telephone.trim()) errors.telephone = "Merci d'indiquer votre numéro de téléphone.";
  if (!values.email.trim()) {
    errors.email = "Merci d'indiquer votre email.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Format d'email invalide.";
  }
  return errors;
}

function PreinscriptionForm({ preselectedSlug }) {
  const [values, setValues] = useState(() => getInitialState(preselectedSlug));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      await postJSON("/preinscriptions", values);
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
        <h3>Votre pré-inscription est enregistrée !</h3>
        <p>
          Merci {values.nomComplet.split(" ")[0] || ""} ! Notre équipe vous contactera très
          prochainement au {values.telephone} pour finaliser votre inscription.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className={`form__field ${errors.formationSlug ? "form__field--error" : ""}`}>
        <label htmlFor="formationSlug">Formation souhaitée</label>
        <select
          id="formationSlug"
          name="formationSlug"
          value={values.formationSlug}
          onChange={handleChange}
        >
          <option value="">-- Choisissez une formation --</option>
          {formations.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.nom}
            </option>
          ))}
        </select>
        {errors.formationSlug && <span className="form__error">{errors.formationSlug}</span>}
      </div>

      <div className="form__row">
        <div className={`form__field ${errors.nomComplet ? "form__field--error" : ""}`}>
          <label htmlFor="nomComplet">Nom et prénom</label>
          <input
            id="nomComplet"
            name="nomComplet"
            type="text"
            value={values.nomComplet}
            onChange={handleChange}
          />
          {errors.nomComplet && <span className="form__error">{errors.nomComplet}</span>}
        </div>

        <div className={`form__field ${errors.telephone ? "form__field--error" : ""}`}>
          <label htmlFor="telephone">Téléphone</label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            value={values.telephone}
            onChange={handleChange}
          />
          {errors.telephone && <span className="form__error">{errors.telephone}</span>}
        </div>
      </div>

      <div className={`form__field ${errors.email ? "form__field--error" : ""}`}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={values.email} onChange={handleChange} />
        {errors.email && <span className="form__error">{errors.email}</span>}
      </div>

      <div className="form__field">
        <label htmlFor="infosComplementaires">Informations complémentaires (optionnel)</label>
        <textarea
          id="infosComplementaires"
          name="infosComplementaires"
          value={values.infosComplementaires}
          onChange={handleChange}
          placeholder="Questions, disponibilités, motivation..."
        />
      </div>

      {errors.global && <span className="form__error">{errors.global}</span>}

      <Button type="submit" variant="primary" size="lg" className="form__submit" disabled={submitting}>
        {submitting ? "Envoi en cours..." : "Envoyer ma pré-inscription"}
      </Button>
    </form>
  );
}

export default PreinscriptionForm;
