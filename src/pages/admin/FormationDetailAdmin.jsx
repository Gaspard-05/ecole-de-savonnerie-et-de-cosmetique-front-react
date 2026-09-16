import { useParams } from "react-router-dom";
import { ArrowLeft, Clock, ListChecks, TrendingUp } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import { formatPrix } from "../../data/formations";
import "./FormationDetailAdmin.css";

function FormationDetailAdmin() {
  const { slug } = useParams();
  const { data, loading, error } = useFetch(`/formations/${slug}`);
  const formation = data?.data;

  return (
    <div className="admin-formation-detail">
      <PageHeader
        title={formation?.nom ?? "Formation"}
        subtitle="Détail de la formation"
        actionLabel="Retour aux formations"
        actionIcon={ArrowLeft}
        to="/admin/formations"
      />

      {loading && <p className="admin-formation-detail__status">Chargement...</p>}
      {error && <p className="admin-formation-detail__status">Impossible de charger cette formation.</p>}

      {formation && (
        <div className="admin-formation-detail__body">
          <div className="admin-formation-detail__header">
            <div className="admin-formation-detail__meta">
              <span className="admin-formation-detail__badge admin-formation-detail__price">
                {formatPrix(formation.prix)}
              </span>
              <span className="admin-formation-detail__badge admin-formation-detail__duree">
                <Clock size={16} aria-hidden="true" /> {formation.duree}
              </span>
            </div>
            <p className="admin-formation-detail__description">{formation.description}</p>
          </div>

          <div className="admin-formation-detail__grid">
            {formation.modules?.length > 0 && (
              <div className="admin-formation-detail__block">
                <h3>
                  <ListChecks size={18} aria-hidden="true" /> Modules
                </h3>
                <ul>
                  {formation.modules.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {formation.debouches?.length > 0 && (
              <div className="admin-formation-detail__block">
                <h3>
                  <TrendingUp size={18} aria-hidden="true" /> Débouchés
                </h3>
                <ul>
                  {formation.debouches.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Button to="/admin/formations" variant="outline">
            Retour à la liste
          </Button>
        </div>
      )}
    </div>
  );
}

export default FormationDetailAdmin;
