import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK } from "../data/contact";
import "./WhatsappButton.css";

function WhatsappButton() {
  return (
    <a
      href={WHATSAPP_LINK}
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
