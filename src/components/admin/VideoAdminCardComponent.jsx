import { Pencil, Trash2 } from "lucide-react";
import "./VideoAdminCard.css";

function VideoAdminCard({ video }) {
  return (
    <article className="video-admin-card">
      <div className="video-admin-card__media">
        <video controls preload="metadata">
          <source src={video.video_path} type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      </div>
      <div className="video-admin-card__body">
        <h3>{video.title}</h3>
        <span className="video-admin-card__formation">{video.formation?.nom}</span>
        <div className="video-admin-card__actions">
          <button type="button" className="video-admin-card__action" title="Modifier" aria-label="Modifier">
            <Pencil size={17} />
          </button>
          <button
            type="button"
            className="video-admin-card__action video-admin-card__action--danger"
            title="Supprimer"
            aria-label="Supprimer"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default VideoAdminCard;