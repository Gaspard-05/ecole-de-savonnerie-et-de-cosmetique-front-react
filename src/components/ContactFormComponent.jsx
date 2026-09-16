import { useState } from "react";
import Swal from "sweetalert2";
import Button from "./ButtonComponent";
import SelectDropdown from "./SelectDropdownComponent";
import { formations as formationsMock, formatNomOption } from "../data/formations";
import { useFetch, postJSON } from "../hooks/useFetch";
import "./Form.css";

const initialState = { formationSlug: "", nom: "", tel: "", email: "", message: "" };

function getApiErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  return data?.message || fallback;
}

function validate(values) {
  const errors = {};
  if (!values.nom.trim()) errors.nom = "Merci d'indiquer votre nom.";
  if (!values.tel.trim()) errors.tel = "Merci d'indiquer votre numéro de téléphone.";
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
        type: "contact",
        nom: values.nom,
        tel: values.tel,
        email: values.email,
        formation: values.formationSlug || undefined,
        message: values.message,
      });
      await Swal.fire({
        icon: "success",
        title: "Message envoyé",
        text: "Votre message a été enregistré. L'école vous contactera pour plus d'éclaircissements.",
        confirmButtonColor: "#02462e",
      });
      setValues(initialState);
      setErrors({});
    } catch (err) {
      setErrors({ global: getApiErrorMessage(err, "Une erreur est survenue, merci de réessayer.") });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__field">
        <label htmlFor="formationSlug">Formation concernée (optionnel)</label>
        <SelectDropdown
          id="formationSlug"
          value={values.formationSlug}
          onChange={(val) => setValues((v) => ({ ...v, formationSlug: val }))}
          placeholder="Question générale"
          options={formations.map((f) => ({ value: f.slug, label: formatNomOption(f.nom) }))}
        />
      </div>

      <div className="form__row">
        <div className={`form__field ${errors.nom ? "form__field--error" : ""}`}>
          <label htmlFor="nom">Nom complet</label>
          <input id="nom" name="nom" type="text" value={values.nom} onChange={handleChange} />
          {errors.nom && <span className="form__error">{errors.nom}</span>}
        </div>

        <div className={`form__field ${errors.tel ? "form__field--error" : ""}`}>
          <label htmlFor="tel">Téléphone</label>
          <input id="tel" name="tel" type="tel" value={values.tel} onChange={handleChange} />
          {errors.tel && <span className="form__error">{errors.tel}</span>}
        </div>
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
