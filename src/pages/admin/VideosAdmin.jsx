import { Plus } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import VideoAdminCard from "../../components/admin/VideoAdminCardComponent";
import { videos } from "../../data/videos";
import "./VideosAdmin.css";

function VideosAdmin() {
  return (
    <div className="admin-videos">
      <PageHeader
        title="Gestion des vidéos"
        subtitle="Liste des témoignages vidéo des apprenantes"
        actionLabel="Ajouter une vidéo"
        actionIcon={Plus}
        to="/admin/videos/ajouter"
      />

      <div className="admin-videos__grid">
        {videos.map((video) => (
          <VideoAdminCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default VideosAdmin;