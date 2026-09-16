import { Menu, UserRound } from "lucide-react";
import { getUser } from "../../lib/auth";
import "./Topbar.css";

function Topbar({ onOpenSidebar }) {
  const user = getUser();

  return (
    <div className="admin-topbar">
      <button
        type="button"
        className="admin-topbar__burger"
        onClick={onOpenSidebar}
        aria-label="Ouvrir le menu"
      >
        <Menu size={22} />
      </button>

      <div className="admin-topbar__spacer" />

      <div className="admin-topbar__user">
        <div className="admin-topbar__avatar">
          <UserRound size={18} />
        </div>
        <div className="admin-topbar__identity">
          <span className="admin-topbar__name">{user?.name ?? "Administrateur"}</span>
          {user?.email && <span className="admin-topbar__email">{user.email}</span>}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
