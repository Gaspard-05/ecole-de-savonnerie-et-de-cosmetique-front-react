import { Link } from "react-router-dom";
import { Sparkles, GraduationCap, Users, Award } from "lucide-react";
import Button from "../components/ButtonComponent";
import SectionTitle from "../components/SectionTitleComponent";
import SectionCTA from "../components/SectionCTAComponent";
import FormationCard from "../components/FormationCardComponent";
import TestimonialCard from "../components/TestimonialCardComponent";
import StatBlock from "../components/StatBlockComponent";
import Faq from "../components/FaqComponent";
import { useFetch } from "../hooks/useFetch";
import { formations as formationsMock } from "../data/formations";
import { temoignages } from "../data/temoignages";
import "./Accueil.css";

const faqItems = [
  {
    question: "Faut-il une expérience préalable pour s'inscrire ?",
    reponse:
      "Non, nos formations sont conçues pour accueillir des débutantes. Aucune expérience préalable en savonnerie ou en cosmétique n'est requise.",
  },
  {
    question: "Quelle est la durée moyenne d'une formation ?",
    reponse:
      "La durée varie selon la spécialité choisie, de quelques jours à plusieurs semaines. Le détail est indiqué sur la fiche de chaque formation.",
  },
  {
    question: "Les formations sont-elles certifiantes ?",
    reponse:
      "Oui, chaque formation débouche sur une double certification : le certificat ESC et le CQM (Certificat de Qualification aux Métiers).",
  },
  {
    question: "Comment se déroule la pré-inscription ?",
    reponse:
      "Il suffit de remplir le formulaire de pré-inscription en ligne. Notre équipe vous recontacte ensuite pour finaliser votre inscription.",
  },
  {
    question: "Un accompagnement est-il proposé après la formation ?",
    reponse:
      "Oui, nos diplômées bénéficient d'un suivi individuel et d'un accès à notre réseau de partenaires pour faciliter le lancement de leur activité.",
  },
  {
    question: "Quels moyens de paiement sont acceptés ?",
    reponse: "Plusieurs modalités de paiement sont proposées ; notre équipe vous en précise les détails lors de votre prise de contact.",
  },
];

const atouts = [
  {
    icon: Sparkles,
    titre: "100% pratique",
    texte: "Des ateliers en petits groupes, orientés fabrication réelle dès le premier jour.",
  },
  {
    icon: Users,
    titre: "Accompagnement personnalisé",
    texte: "Un suivi individuel pendant et après la formation pour lancer votre activité.",
  },
  {
    icon: Award,
    titre: "Double certification",
    texte: "Certification ESC et CQM reconnues, gage de crédibilité auprès de vos clients.",
  },
  {
    icon: GraduationCap,
    titre: "Réseau de partenaires",
    texte: "Accès à des fournisseurs et partenaires pour démarrer votre activité sereinement.",
  },
];

function Accueil() {
  const { data, loading } = useFetch("/formations", { fallback: formationsMock });
  const formations = Array.isArray(data) ? data : data?.data ?? [];
  const formationsAffichees = formations.slice(0, 3);
  const nombreFormations = loading ? "Nos" : formations.length;
  const temoignagesAffiches = temoignages.slice(0, 3);

  return (
    <div className="accueil">
      <section className="hero">
        <div className="container">
          <div className="hero__card">
            <img
              className="hero__image"
              src="https://images.unsplash.com/photo-1556760544-74068565f05c?w=1600&q=80"
              alt="Apprentie en pleine fabrication artisanale lors d'un atelier ESC"
            />
            <div className="hero__overlay" />
            <div className="hero__text">
              <h6>École de Savonnerie et de Cosmétique</h6>
              <h1>Transformez votre passion en activité professionnelle</h1>
              <p>
                Formations pratiques en savonnerie, cosmétique, capillaire et artisanat : apprenez un
                savoir-faire recherché et lancez votre propre activité en quelques semaines.
              </p>
              <div className="hero__actions">
                <Button to="/preinscription" variant="primary" size="lg">
                  Se pré-inscrire
                </Button>
                <Button to="/formations" variant="outline" size="lg">
                  Voir les formations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="presentation">
        <div className="container presentation__inner">
          <div className="presentation__media">
            <img
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
              alt="Formatrice ESC accompagnant une apprenante"
            />
          </div>
          <div className="presentation__text">
            <h6>Qui sommes-nous ?</h6>
            <h2>L'ESC, l'école qui forme les entrepreneures de demain</h2>
            <p>
              Depuis sa création, l'ESC forme des femmes aux métiers pratiques de la cosmétique et de
              l'artisanat. Notre pédagogie 100% pratique et notre accompagnement post-formation ont déjà
              permis à des centaines de diplômées de lancer leur propre activité.
            </p>
            <Button to="/ecole" variant="secondary">
              Découvrir l'École
            </Button>
          </div>
        </div>
      </section>

      <section className="atouts">
        <div className="container">
          <SectionTitle
            eyebrow="Pourquoi choisir l'ESC ?"
            title="Une formation pensée pour votre réussite"
            description="Un cadre d'apprentissage exigeant et bienveillant pour vous donner toutes les clés d'une activité rentable."
          />
          <div className="atouts__grid">
            {atouts.map((atout) => (
              <div className="atout-card" key={atout.titre}>
                <atout.icon className="atout-card__icon" size={30} aria-hidden="true" />
                <h3>{atout.titre}</h3>
                <p>{atout.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="formations-preview">
        <div className="container">
          <SectionTitle
            eyebrow="Nos formations"
            title={`${nombreFormations} spécialités pour se former à un métier concret`}
            description="De la savonnerie à la décoration en Gypsum, choisissez la formation qui correspond à votre projet."
          />
          <div className="formations-preview__grid">
            {formationsAffichees.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
          <div className="formations-preview__more">
            <Button to="/formations" variant="outline" size="lg">
              Voir toutes les formations
            </Button>
          </div>
        </div>
      </section>

      <section className="chiffres">
        <div className="container chiffres__grid">
          <StatBlock value={`${nombreFormations}`} label="spécialités de formation" />
          <StatBlock value="100%" label="pratique dès le premier jour" />
          <StatBlock value="99%" label="lancent leur activité en 3 mois" />
        </div>
      </section>

      <section className="temoignages-preview">
        <div className="container">
          <SectionTitle
            eyebrow="Elles témoignent"
            title="La réussite de nos diplômées"
            description="Des parcours inspirants, portés par un accompagnement de proximité."
          />
          <div className="temoignages-preview__grid">
            {temoignagesAffiches.map((temoignage) => (
              <TestimonialCard key={temoignage.id} temoignage={temoignage} />
            ))}
          </div>
          <div className="formations-preview__more">
            <Link to="/temoignages" className="btn btn--outline btn--lg">
              Voir tous les témoignages →
            </Link>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <SectionTitle
            eyebrow="Questions fréquentes"
            title="Tout ce qu'il faut savoir avant de vous lancer"
            description="Vous avez d'autres questions ? Contactez-nous, notre équipe vous répond avec plaisir."
          />
          <Faq items={faqItems} />
        </div>
      </section>

      <SectionCTA
        title="Prêt(e) à transformer votre passion en activité ?"
        description="Réservez votre place dès aujourd'hui : notre équipe vous accompagne à chaque étape."
        buttonLabel="Se pré-inscrire"
        buttonTo="/preinscription"
      />
    </div>
  );
}

export default Accueil;
