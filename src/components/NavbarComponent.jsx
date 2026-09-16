import { NavLink } from "react-router-dom";
import Button from "./ButtonComponent";
import logo from "../assets/logo/esc-logo-png-1536x689.webp";
import { navLinks } from "../data/navLinks";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo" aria-label="ESC — Accueil">
          <img src={logo} alt="ESC — École de Savonnerie et de Cosmétique" />
        </NavLink>

        <div className="navbar__right">
          <nav className="navbar__nav" aria-label="Navigation principale">
            <ul className="navbar__links">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? "navbar__link--active" : ""}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <Button to="/preinscription" variant="primary" size="sm">
              Se pré-inscrire
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
