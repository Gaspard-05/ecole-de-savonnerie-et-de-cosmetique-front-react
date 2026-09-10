import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { LogIn } from "lucide-react";
import logo from "../assets/logo/esc-logo-png-1536x689.webp";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <Link to="/" className="footer__logo" aria-label="ESC — Accueil">
            <img src={logo} alt="ESC — École de Savonnerie et de Cosmétique" />
          </Link>
          <p className="footer__baseline">
            École de formation pratique aux métiers de la cosmétique et de l'artisanat. Transformez
            votre passion en activité professionnelle.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/22900000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h6>Navigation</h6>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/ecole">L'École</Link></li>
            <li><Link to="/formations">Formations</Link></li>
            <li><Link to="/temoignages">Témoignages</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h6>Contact</h6>
          <ul className="footer__contact">
            <li>
              <FaPhoneAlt /> <a href="tel:+22900000000">+229 00 00 00 00</a>
            </li>
            <li>
              <FaEnvelope /> <a href="mailto:contact@esc-formation.com">contact@esc-formation.com</a>
            </li>
            <li>
              <FaMapMarkerAlt /> <span>Cotonou, Bénin</span>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h6>Pré-inscription</h6>
          <p className="footer__cta-text">Prêt(e) à démarrer ? Réservez votre place dès aujourd'hui.</p>
          <Link to="/preinscription" className="footer__cta-link">
            Se pré-inscrire →
          </Link>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} ESC — Tous droits réservés.</p>
        <div className="footer__bottom-links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/connexion" className="footer__admin-link" aria-label="Connexion administration">
            <LogIn size={14} /> Connexion
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
