import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import Button from "../components/ButtonComponent";
import { login } from "../lib/auth";
import "./Connexion.css";
import "../components/Form.css";

function getApiErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  return data?.message || fallback;
}

function Connexion() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", motDePasse: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.motDePasse) {
      setError("Merci de renseigner votre email et votre mot de passe.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await login(values.email, values.motDePasse);
      navigate("/admin/dashboard");
      // 2FA désactivé temporairement (à réactiver plus tard) :
      // const data = await login(values.email, values.motDePasse);
      // navigate("/verification-otp", { state: { email: data.email } });
    } catch (err) {
      setError(getApiErrorMessage(err, "Email ou mot de passe incorrect."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="connexion">
      <div className="container connexion__inner">
        <div className="connexion__card">
          <div className="connexion__icon">
            <Lock size={26} />
          </div>
          <h1>Connexion administration</h1>
          <p>Espace réservé à l'équipe pédagogique et administrative de l'ESC.</p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="form__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={values.email} onChange={handleChange} />
            </div>

            <div className="form__field">
              <label htmlFor="motDePasse">Mot de passe</label>
              <input
                id="motDePasse"
                name="motDePasse"
                type="password"
                value={values.motDePasse}
                onChange={handleChange}
              />
            </div>

            {error && <span className="form__error">{error}</span>}

            <Button type="submit" variant="primary" size="lg" className="form__submit" disabled={submitting}>
              {submitting ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <a href="mailto:contact@esc-formation.com?subject=Mot%20de%20passe%20oubli%C3%A9" className="connexion__forgot">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </section>
  );
}

export default Connexion;
