import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users, Star, Mail, Settings, LogOut, X } from "lucide-react";
import { logout } from "../../lib/auth";
import "./Sidebar.css";

const LINKS = [
  { to: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/admin/formations", label: "Formations", icon: BookOpen },
  { to: "/admin/prospects", label: "Prospects", icon: Users },
  { to: "/admin/temoignages", label: "Témoignages", icon: Star },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/parametres", label: "Paramètres", icon: Settings },
];

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/connexion");
  }

  return (
    <aside className={`admin-sidebar ${isOpen ? "admin-sidebar--open" : ""}`}>
      <div className="admin-sidebar__top">
        <span className="admin-sidebar__logo">ESC</span>
        <button
          type="button"
          className="admin-sidebar__close"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="admin-sidebar__nav">
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`
            }
            onClick={onClose}
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
        <LogOut size={19} />
        <span>Déconnexion</span>
      </button>
    </aside>
  );
}

export default Sidebar;
