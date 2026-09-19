import { Navigate, useLocation } from "react-router-dom";
import { Check, GraduationCap, Mail, MessageSquareText, Phone, User } from "lucide-react";
import Button from "../components/ButtonComponent";
import "./PreinscriptionSucces.css";

function PreinscriptionSucces() {
  // récap passé par le formulaire via le state du router
  const { state: recap } = useLocation();

  // accès direct à l'URL : pas de données, retour au formulaire
  if (!recap) {
    return <Navigate to="/preinscription" replace />;
  }

  const lignes = [
    { icon: User, label: "Nom et prénom", value: recap.nomComplet },
    { icon: Phone, label: "Téléphone", value: recap.telephone },
    { icon: Mail, label: "Email", value: recap.email },
  ];

  return (
    <section className="preinscription-succes">
      <div className="container preinscription-succes__inner">
        <div className="preinscription-succes__message">
          <div className="preinscription-succes__icon" aria-hidden="true">
            <Check size={44} strokeWidth={3} />
          </div>
          <h6>Pré-Inscription</h6>
          <h1>Pré-Inscription enregistrée</h1>
          <p>
            Votre Pré-Inscription a été enregistrée. L'école vous contactera pour les procédures à
            suivre.
          </p>
        </div>

        <div className="preinscription-succes__card">
          <div className="preinscription-succes__formation">
            <GraduationCap size={22} aria-hidden="true" />
            <div>
              <span>Formation choisie</span>
              <strong>{recap.formation}</strong>
            </div>
          </div>

          <h2>Récapitulatif de votre demande</h2>

          <dl className="preinscription-succes__recap">
            {lignes.map(({ icon: Icon, label, value }) => (
              <div className="preinscription-succes__row" key={label}>
                <Icon size={18} aria-hidden="true" />
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            {recap.infosComplementaires && (
              <div className="preinscription-succes__row preinscription-succes__row--block">
                <MessageSquareText size={18} aria-hidden="true" />
                <dt>Informations complémentaires</dt>
                <dd>{recap.infosComplementaires}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="preinscription-succes__actions">
          <Button to="/" variant="primary" size="lg">
            Retour à l'accueil
          </Button>
          <Button to="/formations" variant="outline" size="lg">
            Voir les formations
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PreinscriptionSucces;
