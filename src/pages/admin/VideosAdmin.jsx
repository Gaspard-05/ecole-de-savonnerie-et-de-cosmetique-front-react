import { Plus } from "lucide-react";
import PageHeader from "../../components/admin/PageHeaderComponent";
import VideoAdminCard from "../../components/admin/VideoAdminCardComponent";
import { useFetch } from "../../hooks/useFetch";
import "./VideosAdmin.css";

function VideosAdmin() {
  const { data, loading, error } = useFetch("/admin/videos");
  const videos = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <div className="admin-videos">
      <PageHeader
        title="Gestion des vidéos"
        subtitle="Liste des témoignages vidéo des apprenantes"
        actionLabel="Ajouter une vidéo"
        actionIcon={Plus}
        to="/admin/videos/ajouter"
      />

      {loading && <p className="admin-videos__status">Chargement...</p>}
      {error && <p className="admin-videos__status">Impossible de charger les vidéos.</p>}

      {!loading && !error && (
        videos.length > 0 ? (
          <div className="admin-videos__grid">
            {videos.map((video) => (
              <VideoAdminCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <p className="admin-videos__status">Aucune vidéo pour le moment.</p>
        )
      )}
    </div>
  );
}

export default VideosAdmin;
