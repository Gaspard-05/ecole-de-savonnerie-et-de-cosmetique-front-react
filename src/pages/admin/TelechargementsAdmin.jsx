import { Download } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import TelechargementFiliereCard from "../../components/admin/TelechargementFiliereCard";
import { useFetch } from "../../hooks/useFetch";
import { telechargementCatalogue, telechargementsParFiliere } from "../../data/dashboard";
import "./TelechargementsAdmin.css";

function TelechargementsAdmin() {
  // GET /api/admin/stats/telechargements — mock tant que le backend ne l'expose pas
  // (voir documentation/Logique_Api.md).
  const { data } = useFetch("/admin/stats/telechargements", {
    fallback: { catalogue: telechargementCatalogue, par_filiere: telechargementsParFiliere },
  });

  const catalogueValue = data?.catalogue ?? 0;
  const parFiliere = [...(data?.par_filiere ?? [])].sort(
    (a, b) => b.telechargements - a.telechargements
  );

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
