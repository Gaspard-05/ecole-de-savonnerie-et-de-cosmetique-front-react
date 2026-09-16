import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import FormationAdminCard from "../../components/admin/FormationAdminCardComponent";
import { useFetch } from "../../hooks/useFetch";
import "./FormationsAdmin.css";

function FormationsAdmin() {
  const { data, loading, error } = useFetch("/formations");
  const [deletedIds, setDeletedIds] = useState([]);
  const formations = (data?.data ?? []).filter((formation) => !deletedIds.includes(formation.id));

  function handleDelete(id) {
    setDeletedIds((current) => [...current, id]);
  }

  return (
    <div className="admin-formations">
      <PageHeader
        title="Formations"
        subtitle="Liste des formations proposées par l'école"
        actionLabel="Ajouter une formation"
        actionIcon={Plus}
        to="/admin/formations/ajouter"
      />

      {loading && <p className="admin-formations__empty">Chargement des formations...</p>}

      {error && <p className="admin-formations__empty">Impossible de charger les formations.</p>}

      {!loading && !error && (
        formations.length > 0 ? (
          <div className="admin-formations__grid">
            {formations.map((formation) => (
              <FormationAdminCard key={formation.id} formation={formation} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p className="admin-formations__empty">Aucune formation pour le moment.</p>
        )
      )}
    </div>
  );
}

export default FormationsAdmin;
