import { ArrowUp } from "lucide-react";
import "./BackToTopButton.css";

function BackToTopButton() {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      className="back-to-top"
      onClick={handleClick}
      aria-label="Remonter en haut de la page"
    >
      <ArrowUp size={22} />
    </button>
  );
}

export default BackToTopButton;
