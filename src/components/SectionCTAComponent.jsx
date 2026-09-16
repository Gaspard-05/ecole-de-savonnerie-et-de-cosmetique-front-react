import Button from "./ButtonComponent";
import "./SectionCTA.css";

/**
 * Bandeau d'appel à l'action, utilisé en fin de page pour ramener vers la pré-inscription
 * ou une autre action commerciale clé.
 */
function SectionCTA({
  title,
  description,
  buttonLabel = "Se pré-inscrire",
  buttonTo = "/preinscription",
  variant = "brand",
}) {
  return (
    <section className={`section-cta section-cta--${variant}`}>
      <div className="container section-cta__inner">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <Button to={buttonTo} variant={variant === "brand" ? "primary" : "outline"} size="lg">
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}

export default SectionCTA;
