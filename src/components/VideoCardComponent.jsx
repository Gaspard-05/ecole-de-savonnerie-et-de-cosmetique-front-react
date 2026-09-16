import "./VideoCard.css";

function VideoCard({ video }) {
  return (
    <article className="video-card">
      <div className="video-card__media">
        <video controls preload="metadata">
          <source src={video.video_path} type="video/mp4" />
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>
      </div>
      <div className="video-card__body">
        <h3>{video.title}</h3>
        <span className="video-card__formation">{video.formation?.nom}</span>
      </div>
    </article>
  );
}

export default VideoCard;
