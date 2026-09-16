import { Star, Quote } from "lucide-react";
import "./TestimonialCard.css";

function TestimonialCard({ temoignage }) {
  const { nom, formationNom, photo, note = 5, texte } = temoignage;

  return (
    <article className="testimonial-card">
      <Quote className="testimonial-card__quote-icon" size={28} aria-hidden="true" />
      <div className="testimonial-card__stars" aria-label={`Note : ${note} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill={i < note ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="testimonial-card__text">« {texte} »</p>
      <div className="testimonial-card__author">
        {photo && <img src={photo} alt={nom} className="testimonial-card__photo" />}
        <div>
          <p className="testimonial-card__name">{nom}</p>
          {formationNom && <p className="testimonial-card__formation">Formation {formationNom}</p>}
        </div>
      </div>
    </article>
  );
}

export default TestimonialCard;
