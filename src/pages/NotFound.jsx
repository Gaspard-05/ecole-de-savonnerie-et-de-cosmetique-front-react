import Button from "../components/Button";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <h1>404</h1>
        <h2>Page introuvable</h2>
        <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div className="not-found__actions">
          <Button to="/" variant="primary">
            Retour à l'accueil
          </Button>
          <Button to="/formations" variant="outline">
            Voir les formations
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
