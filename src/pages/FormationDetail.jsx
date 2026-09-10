import { Navigate, useParams } from "react-router-dom";
import { CheckCircle2, Clock, GraduationCap, ListChecks, PackageCheck, TrendingUp } from "lucide-react";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import TestimonialCard from "../components/TestimonialCard";
import FormationCard from "../components/FormationCard";
import { useFetch } from "../hooks/useFetch";
import { formatPrix, getFormationBySlug, getFormationsSimilaires, formations as formationsMock } from "../data/formations";
import { getTemoignageByFormationSlug } from "../data/temoignages";
import "./FormationDetail.css";

const INCLUS = [
  "Kit de matières premières pour la pratique",
  "Support de cours illustré",
  "Suivi personnalisé après la formation",
  "Accès au réseau de partenaires fournisseurs",
];

const MODALITES = "Présentiel, ateliers pratiques en petit groupe";
const CERTIFICATION = "Certification ESC + CQM (Certificat de Qualification aux Métiers)";

function FormationDetail() {
  const { slug } = useParams();

  const { data, loading } = useFetch(`/formations/${slug}`, { fallback: getFormationBySlug(slug) });
  const formation = data?.data ?? data;

  const { data: allData } = useFetch("/formations", { fallback: formationsMock });
  const allFormations = Array.isArray(allData) ? allData : allData?.data ?? [];
  const similaires = allFormations.length > 0
    ? allFormations.filter((f) => f.slug !== slug).slice(0, 3)
    : getFormationsSimilaires(slug);

  if (loading) return null;

  if (!formation) {
    return <Navigate to="/formations" replace />;
  }

  const temoignage = getTemoignageByFormationSlug(slug);

  return (
    <>
      <section className="formation-detail-hero">
        <div className="container formation-detail-hero__inner">
          <div className="formation-detail-hero__media">
            <img src={formation.image} alt={formation.nom} />
          </div>
          <div className="formation-detail-hero__text">
            <h6>Formation</h6>
            <h1>{formation.nom}</h1>
            <p className="formation-detail-hero__price">{formatPrix(formation.prix)}</p>
            <p>{formation.description}</p>
            <Button to={`/preinscription?formation=${formation.slug}`} variant="primary" size="lg">
              Je veux me pré-inscrire
            </Button>
          </div>
        </div>
      </section>

      <section className="formation-detail-body">
        <div className="container formation-detail-body__grid">
          <div className="formation-detail-block">
            <h2>
              <ListChecks size={24} aria-hidden="true" /> Ce que vous allez apprendre
            </h2>
            <ul className="formation-detail-list">
              {(formation.modules ?? formation.apprentissages ?? []).map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="formation-detail-block">
            <h2>
              <TrendingUp size={24} aria-hidden="true" /> Débouchés &amp; possibilités d'activité
            </h2>
            <ul className="formation-detail-list">
              {(formation.debouches ?? []).map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="formation-detail-block">
            <h2>
              <PackageCheck size={24} aria-hidden="true" /> Inclus dans l'accompagnement
            </h2>
            <ul className="formation-detail-list">
              {INCLUS.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="formation-detail-block formation-detail-block--infos">
            <h2>
              <Clock size={24} aria-hidden="true" /> Informations pratiques
            </h2>
            <dl className="formation-detail-infos">
              <div>
                <dt>Durée</dt>
                <dd>{formation.duree}</dd>
              </div>
              <div>
                <dt>Modalités</dt>
                <dd>{MODALITES}</dd>
              </div>
              <div>
                <dt>Certification</dt>
                <dd>
                  <GraduationCap size={16} aria-hidden="true" /> {CERTIFICATION}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {temoignage && (
        <section className="formation-detail-temoignage">
          <div className="container">
            <SectionTitle eyebrow="Témoignage" title={`Elles ont suivi la formation ${formation.nom}`} />
            <div className="formation-detail-temoignage__card">
              <TestimonialCard temoignage={temoignage} />
            </div>
          </div>
        </section>
      )}

      <section className="formation-detail-cta">
        <div className="container formation-detail-cta__inner">
          <div>
            <h2>Prêt(e) à vous lancer dans la formation {formation.nom} ?</h2>
            <p>Places limitées à chaque session — réservez la vôtre dès maintenant.</p>
          </div>
          <Button to={`/preinscription?formation=${formation.slug}`} variant="primary" size="lg">
            Je veux me pré-inscrire
          </Button>
        </div>
      </section>

      <section className="formation-detail-similaires">
        <div className="container">
          <SectionTitle eyebrow="À découvrir aussi" title="Formations similaires" align="left" />
          <div className="formation-detail-similaires__grid">
            {similaires.map((f) => (
              <FormationCard key={f.id} formation={f} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FormationDetail;
