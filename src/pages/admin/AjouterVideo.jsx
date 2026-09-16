import { ArrowLeft } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import Button from "../../components/ButtonComponent";
import "../../components/Form.css";
import "./AjouterVideo.css";

function AjouterVideo() {
  return (
    <div className="admin-ajouter-video">
      <PageHeader
        title="Ajouter une vidéo"
        subtitle="Préparer un nouveau témoignage vidéo"
        actionLabel="Retour aux vidéos"
        actionIcon={ArrowLeft}
        to="/admin/videos"
      />

      <form className="form admin-ajouter-video__form">
        <div className="form__field">
          <label htmlFor="title">Nom de l'étudiant</label>
          <input id="title" name="title" placeholder="Ex. Ariane K." />
        </div>

        <div className="form__field">
          <label htmlFor="formation">Formation</label>
          <input id="formation" name="formation" placeholder="Ex. Savonnerie" />
        </div>

        <div className="form__field">
          <label htmlFor="video">Vidéo</label>
          <input id="video" name="video" type="file" accept="video/*" />
          <small className="admin-ajouter-video__hint">
            Le chemin de la vidéo sera généré automatiquement lors du branchement du stockage.
          </small>
        </div>

        <div className="admin-ajouter-video__actions">
          <Button type="button" variant="primary">
            Enregistrer la vidéo
          </Button>
          <Button type="button" variant="outline" to="/admin/videos">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AjouterVideo;