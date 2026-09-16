import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "./ButtonComponent";
import logo from "../assets/logo/esc-logo-png-1536x689.webp";
import "./Navbar.css";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/ecole", label: "À propos" },
  { to: "/formations", label: "Formations" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [lastPathname, setLastPathname] = useState(location.pathname);

  // Ferme le menu mobile lors d'un changement de route (pattern "adjust state while rendering").
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo" aria-label="ESC — Accueil">
          <img src={logo} alt="ESC — École de Savonnerie et de Cosmétique" />
        </NavLink>

        <nav
          className={`navbar__nav ${open ? "navbar__nav--open" : ""}`}
          aria-label="Navigation principale"
        >
          <ul className="navbar__links">
            {links.map((link) => (
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

          <div className="navbar__actions">
            <Button to="/preinscription" variant="primary" size="sm">
              Se pré-inscrire
            </Button>
          </div>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
