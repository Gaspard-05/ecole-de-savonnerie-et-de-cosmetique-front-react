import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { isAuthenticated } from "../lib/auth";
import "./AdminLayout.css";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated()) {
    return <Navigate to="/connexion" replace />;
  }

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <button
          type="button"
          className="admin-layout__overlay"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="admin-content">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="admin-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
