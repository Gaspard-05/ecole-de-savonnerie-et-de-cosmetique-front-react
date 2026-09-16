import { NavLink } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import "./BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigation principale mobile">
      <ul className="bottom-nav__list">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `bottom-nav__link ${isActive ? "bottom-nav__link--active" : ""}`
              }
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
