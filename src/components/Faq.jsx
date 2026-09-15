import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Faq.css";

function FaqItem({ question, reponse, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <button type="button" className="faq-item__question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{question}</span>
        <ChevronDown size={20} className="faq-item__chevron" aria-hidden="true" />
      </button>
      <div className="faq-item__answer">
        <p>{reponse}</p>
      </div>
    </div>
  );
}

function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <FaqItem
          key={item.question}
          question={item.question}
          reponse={item.reponse}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}

export default Faq;
