import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import ContactForm from "../components/ContactFormComponent";
import SectionCTA from "../components/SectionCTAComponent";
import { TELEPHONE_DISPLAY, TELEPHONE_LINK, WHATSAPP_DISPLAY, WHATSAPP_LINK } from "../data/contact";
import "./Contact.css";

const coordonnees = [
  { icon: FaPhoneAlt, label: "Téléphone", value: TELEPHONE_DISPLAY, href: TELEPHONE_LINK },
  { icon: FaWhatsapp, label: "WhatsApp", value: WHATSAPP_DISPLAY, href: WHATSAPP_LINK },
  { icon: FaEnvelope, label: "Email", value: "contact@esc-formation.com", href: "mailto:contact@esc-formation.com" },
  { icon: FaMapMarkerAlt, label: "Adresse", value: "Cotonou, Bénin", href: null },
  { icon: FaClock, label: "Horaires", value: "Lun - Sam : 8h - 18h", href: null },
];

function Contact() {
  return (
    <div className="contact">
      <section className="page-hero">
        <div className="container">
          <h6>Contact</h6>
          <h1>Une question ? Parlons de votre projet</h1>
          <p>
            Notre équipe est disponible pour vous conseiller sur la formation la plus adaptée à votre
            projet entrepreneurial.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container contact-content__grid">
          <div className="contact-infos">
            <h2>Nos coordonnées</h2>
            <ul className="contact-infos__list">
              {coordonnees.map((item) => (
                <li key={item.label}>
                  <span className="contact-infos__icon">
                    <item.icon />
                  </span>
                  <div>
                    <p className="contact-infos__label">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <p className="contact-infos__value">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-map">
              <iframe
                title="Localisation ESC"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.35%2C6.33%2C2.48%2C6.40&layer=mapnik"
                loading="lazy"
              />
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Envoyez-nous un message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <SectionCTA
        title="Vous savez déjà quelle formation vous intéresse ?"
        description="Passez directement à l'étape suivante et réservez votre place."
        buttonLabel="Se pré-inscrire"
        buttonTo="/preinscription"
      />
    </div>
  );
}

export default Contact;
