import { HandHeart, Target, Award, Handshake, LifeBuoy, Hammer } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import SectionCTA from "../components/SectionCTA";
import "./Ecole.css";

const approche = [
  {
    icon: Hammer,
    titre: "100% pratique",
    texte:
      "Dès le premier jour, vous manipulez, dosez et fabriquez. Nos formatrices privilégient l'atelier à la théorie pure.",
  },
  {
    icon: Target,
    titre: "Petits groupes",
    texte: "Des sessions en effectif réduit pour un apprentissage individualisé et un vrai suivi.",
  },
  {
    icon: LifeBuoy,
    titre: "Accompagnement continu",
    texte: "Un référent pédagogique disponible pendant toute la durée de votre formation.",
  },
];

const avantages = [
  "Un programme conçu avec des professionnelles du secteur",
  "Du matériel et des matières premières fournis en atelier",
  "Un suivi individuel pour lever vos blocages techniques",
  "Une préparation concrète au lancement de votre activité",
];

function Ecole() {
  return (
    <div className="ecole">
      <section className="page-hero">
        <div className="container">
          <h6>L'ESC</h6>
          <h1>L'école qui transforme les vocations en métiers</h1>
          <p>
            Nous formons des femmes motivées aux savoir-faire pratiques de la cosmétique et de
            l'artisanat, avec un seul objectif : leur donner les moyens de vivre de leur passion.
          </p>
        </div>
      </section>

      <section className="ecole-mission">
        <div className="container ecole-mission__inner">
          <div className="ecole-mission__media">
            <img
              src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=900&q=80"
              alt="Atelier de formation pratique à l'ESC"
            />
          </div>
          <div>
            <h6>Notre mission</h6>
            <h2>Donner à chaque femme les moyens de créer son activité</h2>
            <p>
              L'ESC est née d'un constat simple : de nombreuses femmes ont l'envie et le potentiel pour
              se lancer dans un métier manuel et rentable, mais manquent d'un cadre structuré pour
              acquérir les bonnes techniques. Notre mission est de combler cet écart grâce à des
              formations courtes, pratiques et immédiatement applicables.
            </p>
            <p>
              Chaque formation est pensée pour vous rendre opérationnelle rapidement : à la sortie, vous
              savez fabriquer, doser et conditionner vos propres produits dans le respect des bonnes
              pratiques du métier.
            </p>
          </div>
        </div>
      </section>

      <section className="ecole-approche">
        <div className="container">
          <SectionTitle
            eyebrow="Notre approche pédagogique"
            title="Apprendre en faisant"
            description="Une pédagogie centrée sur la pratique, pour progresser vite et gagner en confiance."
          />
          <div className="ecole-approche__grid">
            {approche.map((item) => (
              <div className="ecole-approche__card" key={item.titre}>
                <item.icon size={30} className="ecole-approche__icon" aria-hidden="true" />
                <h3>{item.titre}</h3>
                <p>{item.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ecole-avantages">
        <div className="container ecole-avantages__inner">
          <div>
            <h6>Un accompagnement complet</h6>
            <h2>Les avantages de la formation ESC</h2>
            <ul className="ecole-avantages__list">
              {avantages.map((item) => (
                <li key={item}>
                  <HandHeart size={20} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ecole-avantages__media">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
              alt="Crème cosmétique formulée lors d'un atelier ESC"
            />
          </div>
        </div>
      </section>

      <section className="ecole-highlights">
        <div className="container ecole-highlights__grid">
          <div className="ecole-certification">
            <div className="ecole-certification__inner">
              <Award size={40} className="ecole-certification__icon" aria-hidden="true" />
              <div>
                <h2>Une double certification reconnue</h2>
                <p>
                  À l'issue de votre formation, vous obtenez la certification ESC ainsi que le CQM
                  (Certificat de Qualification aux Métiers), un gage de sérieux et de crédibilité auprès
                  de vos futures clientes et partenaires.
                </p>
              </div>
            </div>
          </div>

          <div className="ecole-reseau">
            <div className="ecole-reseau__inner">
              <Handshake size={40} className="ecole-reseau__icon" aria-hidden="true" />
              <div>
                <h2>Un réseau de partenaires pour démarrer sereinement</h2>
                <p>
                  Fournisseurs de matières premières, boutiques partenaires, marchés artisanaux : l'ESC
                  vous connecte à son réseau pour faciliter le lancement et le développement de votre
                  activité, bien après la fin de la formation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionCTA
        title="Envie de rejoindre l'aventure ESC ?"
        description="Explorez nos 9 formations et trouvez celle qui correspond à votre projet."
        buttonLabel="Découvrir nos formations"
        buttonTo="/formations"
      />
    </div>
  );
}

export default Ecole;
