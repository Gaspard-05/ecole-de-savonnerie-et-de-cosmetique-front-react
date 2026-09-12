import { Download } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import TelechargementFiliereCard from "../../components/admin/TelechargementFiliereCard";
import { useFetch } from "../../hooks/useFetch";
import "./TelechargementsAdmin.css";

function TelechargementsAdmin() {
  const { data: formationsData } = useFetch("/admin/formations");
  const formations = Array.isArray(formationsData) ? formationsData : formationsData?.data ?? [];

  const { data: catalogueData } = useFetch("/admin/catalogue/downloads-count");
  const catalogueValue = catalogueData?.downloads_count ?? 0;

  const parFiliere = formations
    .map((f) => ({ slug: f.slug, filiere: f.nom, telechargements: f.downloads_count ?? 0 }))
    .sort((a, b) => b.telechargements - a.telechargements);

  return (
    <div className="admin-telechargements">
      <PageHeader title="Téléchargements" subtitle="Suivi des téléchargements du catalogue et des formations" />

      <div className="admin-telechargements__catalogue">
        <div className="admin-telechargements__catalogue-badge">
          <Download size={26} aria-hidden="true" />
        </div>
        <div>
          <p className="admin-telechargements__catalogue-value">{catalogueValue}</p>
          <p className="admin-telechargements__catalogue-label">Téléchargements du catalogue complet</p>
        </div>
      </div>

      <h2 className="admin-telechargements__section-title">Par filière</h2>
      <div className="admin-telechargements__grid">
        {parFiliere.map((item, index) => (
          <TelechargementFiliereCard
            key={item.slug}
            rank={index + 1}
            filiere={item.filiere}
            slug={item.slug}
            telechargements={item.telechargements}
          />
        ))}
      </div>
    </div>
  );
}

export default TelechargementsAdmin;
