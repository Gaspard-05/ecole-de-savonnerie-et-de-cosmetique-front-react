import { useRef, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import Button from "../components/Button";
import { verifyOtpCode } from "../lib/auth";
import "./VerificationOtp.css";
import "../components/Form.css";

const CODE_LENGTH = 6;

function getApiErrorMessage(err, fallback) {
  const data = err.response?.data;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(" ");
  }
  return data?.message || fallback;
}

function VerificationOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputsRef = useRef([]);

  if (!email) {
    return <Navigate to="/connexion" replace />;
  }

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

  function handlePaste(index, e) {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH - index).split("");
    if (digits.length === 0) return;
    setCode((prev) => {
      const next = [...prev];
      digits.forEach((digit, i) => {
        next[index + i] = digit;
      });
      return next;
    });
    inputsRef.current[Math.min(index + digits.length, CODE_LENGTH - 1)]?.focus();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await verifyOtpCode(email, code.join(""));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(getApiErrorMessage(err, "Code invalide ou expiré."));
    } finally {
      setSubmitting(false);
    }
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
            Saisissez le code à {CODE_LENGTH} chiffres envoyé par email à <strong>{email}</strong> pour
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
                  onPaste={(e) => handlePaste(index, e)}
                  aria-label={`Chiffre ${index + 1} du code`}
                />
              ))}
            </div>

            {error && <span className="form__error">{error}</span>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="form__submit"
              disabled={!isComplete || submitting}
            >
              {submitting ? "Vérification..." : "Vérifier"}
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
