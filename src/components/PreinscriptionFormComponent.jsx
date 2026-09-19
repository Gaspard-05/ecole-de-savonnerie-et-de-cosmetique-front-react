import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ButtonComponent";
import SelectDropdown from "./SelectDropdownComponent";
import { formations as formationsMock, formatNomOption } from "../data/formations";
import { useFetch, postJSON } from "../hooks/useFetch";
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

function getApiErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  return data?.message || fallback;
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
  const navigate = useNavigate();
  const [values, setValues] = useState(() => getInitialState(preselectedSlug));
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
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await postJSON("/contact", {
        type: "pre_inscription",
        nom: values.nomComplet,
        tel: values.telephone,
        email: values.email,
        formation: values.formationSlug,
        message: values.infosComplementaires || undefined,
      });
      // données envoyées en state (pas dans l'URL) pour la page de succès
      const formation = formations.find((f) => f.slug === values.formationSlug);
      navigate("/preinscription/succes", {
        state: {
          formation: formation?.nom ?? values.formationSlug,
          nomComplet: values.nomComplet,
          telephone: values.telephone,
          email: values.email,
          infosComplementaires: values.infosComplementaires,
        },
      });
    } catch (err) {
      setErrors({ global: getApiErrorMessage(err, "Une erreur est survenue, merci de réessayer.") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className={`form__field ${errors.formationSlug ? "form__field--error" : ""}`}>
        <label htmlFor="formationSlug">Formation souhaitée</label>
        <SelectDropdown
          id="formationSlug"
          value={values.formationSlug}
          onChange={(val) => setValues((v) => ({ ...v, formationSlug: val }))}
          placeholder="-- Choisissez une formation --"
          error={!!errors.formationSlug}
          options={formations.map((f) => ({ value: f.slug, label: formatNomOption(f.nom) }))}
        />
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
        {submitting ? "Envoi en cours..." : "Envoyer ma Pré-Inscription"}
      </Button>
    </form>
  );
}

export default PreinscriptionForm;
