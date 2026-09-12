import { useRef, useState } from "react";
import { MailCheck } from "lucide-react";
import Button from "../components/Button";
import "./VerificationOtp.css";
import "../components/Form.css";

const CODE_LENGTH = 6;

function VerificationOtp() {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef([]);

  function handleChange(index, e) {
    const value = e.target.value.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const isComplete = code.every((digit) => digit !== "");

  return (
    <section className="otp">
      <div className="container otp__inner">
        <div className="otp__card">
          <div className="otp__icon">
            <MailCheck size={26} />
          </div>
          <h1>Vérification en deux étapes</h1>
          <p>
            Saisissez le code à {CODE_LENGTH} chiffres envoyé à votre adresse email pour
            confirmer votre connexion.
          </p>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="otp__digits">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="otp__digit"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  aria-label={`Chiffre ${index + 1} du code`}
                />
              ))}
            </div>

            <Button type="submit" variant="primary" size="lg" className="form__submit" disabled={!isComplete}>
              Vérifier
            </Button>
          </form>

          <button type="button" className="otp__resend">
            Vous n'avez rien reçu ? Renvoyer le code
          </button>
        </div>
      </div>
    </section>
  );
}

export default VerificationOtp;
