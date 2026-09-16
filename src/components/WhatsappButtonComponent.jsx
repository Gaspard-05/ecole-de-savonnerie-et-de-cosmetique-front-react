import { FaWhatsapp } from "react-icons/fa";
import "./WhatsappButton.css";

function WhatsappButton() {
  return (
    <a
      href="https://wa.me/22900000000"
      target="_blank"
      rel="noreferrer"
      className="whatsapp-button"
      aria-label="Nous contacter sur WhatsApp"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}

export default WhatsappButton;
