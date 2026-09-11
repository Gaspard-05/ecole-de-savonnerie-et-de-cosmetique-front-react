import { useState } from "react";
import { Download } from "lucide-react";
import Swal from "sweetalert2";
import Button from "../components/Button";
import FormationCard from "../components/FormationCard";
import SectionCTA from "../components/SectionCTA";
import { useFetch } from "../hooks/useFetch";
import api from "../lib/api";
import { formations as formationsMock } from "../data/formations";
import "./Formations.css";

function Formations() {
  const { data, loading, error } = useFetch("/formations", { fallback: formationsMock });
  const formations = Array.isArray(data) ? data : data?.data ?? [];
  const [downloadingCatalogue, setDownloadingCatalogue] = useState(false);

  async function handleDownloadCatalogue() {
    setDownloadingCatalogue(true);
    try {
      const res = await api.get("/formations/pdf", { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "catalogue-formations-esc.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Téléchargement impossible",
        text: "Le catalogue n'a pas pu être généré, merci de réessayer.",
        confirmButtonColor: "#905a01",
      });
    } finally {
      setDownloadingCatalogue(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h6>Nos formations</h6>
          <h1>{loading ? "Nos" : formations.length} spécialités pour bâtir votre activité</h1>
          <p>
            Chaque formation est 100% pratique et débouche sur une double certification ESC + CQM.
            Choisissez la spécialité qui correspond à votre projet et démarrez rapidement.
          </p>
        </div>
      </section>

      <section className="formations-grid">
        <div className="container">
          <div className="formations-grid__toolbar">
            <Button
              type="button"
              variant="outline"
              onClick={handleDownloadCatalogue}
              disabled={downloadingCatalogue}
            >
              <Download size={18} />
              {downloadingCatalogue ? "Génération..." : "Télécharger le catalogue"}
            </Button>
          </div>
        </div>
        <div className="container formations-grid__inner">
          {loading && <p>Chargement des formations...</p>}
          {error && <p>Impossible de charger les formations pour le moment.</p>}
          {!loading &&
            !error &&
            formations.map((formation) => <FormationCard key={formation.id} formation={formation} />)}
        </div>
      </section>

      <SectionCTA
        title="Une question avant de choisir votre formation ?"
        description="Notre équipe vous conseille gratuitement sur la spécialité la plus adaptée à votre projet."
        buttonLabel="Nous contacter"
        buttonTo="/contact"
        variant="light"
      />
    </>
  );
}

export default Formations;
