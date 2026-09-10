import "./SectionTitle.css";

/**
 * En-tête de section réutilisable : petit label + titre + texte d'intro optionnel.
 */
function SectionTitle({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <h6>{eyebrow}</h6>}
      <h2>{title}</h2>
      {description && <p className="section-title__desc">{description}</p>}
    </div>
  );
}

export default SectionTitle;
