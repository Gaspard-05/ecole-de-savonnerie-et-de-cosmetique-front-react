import { useState } from "react";
import { Star } from "lucide-react";
import Button from "../components/Button";
import { useFetch } from "../hooks/useFetch";
import { formations as formationsMock } from "../data/formations";
import "./DeposerTemoignage.css";
import "../components/Form.css";

const initialState = { nom: "", formationSlug: "", note: 5, texte: "" };

function DeposerTemoignage() {
  const [values, setValues] = useState(initialState);
  const { data } = useFetch("/formations", { fallback: formationsMock });
  const formations = Array.isArray(data) ? data : data?.data ?? [];

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
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
            <div className="form__field">
              <label htmlFor="nom">Nom complet</label>
              <input id="nom" name="nom" type="text" value={values.nom} onChange={handleChange} />
            </div>

            <div className="form__field">
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
            </div>

            <div className="form__field">
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
            </div>

            <div className="form__field">
              <label htmlFor="texte">Votre témoignage</label>
              <textarea id="texte" name="texte" value={values.texte} onChange={handleChange} />
            </div>

            <Button type="submit" variant="primary" size="lg" className="form__submit">
              Envoyer mon témoignage
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DeposerTemoignage;
