// Données mockées des formations ESC.
// Structure alignée sur ce que l'API Laravel exposera (GET /api/formations, GET /api/formations/:slug)
// afin de pouvoir brancher l'API sans réécrire les composants qui consomment ces données.

export const formations = [
  {
    id: 1,
    slug: "savonnerie",
    nom: "Savonnerie",
    prix: 200000,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=1200&q=80",
    resume: "Apprenez à fabriquer des savons artisanaux (saponification à froid et à chaud) prêts à commercialiser.",
    description:
      "La formation Savonnerie vous plonge dans l'art de la fabrication de savons artisanaux, de la saponification à froid à la saponification à chaud. Vous apprendrez à doser, colorer, parfumer et mouler vos propres créations dans le respect des normes d'hygiène et de sécurité.",
    apprentissages: [
      "Les bases de la saponification à froid et à chaud",
      "Le choix et le dosage des huiles, beurres et actifs",
      "La coloration et le surgraissage naturels",
      "Le moulage, la découpe et la cure des savons",
      "Le conditionnement et l'étiquetage réglementaire",
    ],
    debouches: [
      "Créer et vendre sa propre gamme de savons artisanaux",
      "Proposer des ateliers de fabrication de savons",
      "Fournir des boutiques bio et cosmétiques locales",
    ],
    inclus: [
      "Kit de matières premières pour la pratique",
      "Support de cours illustré",
      "Suivi personnalisé après la formation",
      "Accès au réseau de partenaires fournisseurs",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "3 semaines",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: 1,
  },
  {
    id: 2,
    slug: "emulsion",
    nom: "Émulsion",
    prix: 200000,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
    resume: "Maîtrisez la fabrication de crèmes, laits et lotions cosmétiques stables et sécurisées.",
    description:
      "La formation Émulsion vous enseigne les techniques professionnelles de fabrication de crèmes, laits corporels et lotions. Vous apprendrez à créer des émulsions stables, adaptées à différents types de peau, avec des ingrédients naturels et actifs ciblés.",
    apprentissages: [
      "Les principes physico-chimiques de l'émulsion",
      "Le choix des phases aqueuse, grasse et des émulsifiants",
      "La formulation de crèmes, laits et lotions",
      "La conservation naturelle et la stabilité du produit",
      "Le contrôle qualité et les tests de stabilité",
    ],
    debouches: [
      "Lancer une gamme de soins cosmétiques maison",
      "Vendre en ligne ou sur les marchés locaux",
      "Proposer des soins personnalisés en institut",
    ],
    inclus: [
      "Kit d'ingrédients pour vos premières formulations",
      "Fiches recettes testées et validées",
      "Accompagnement post-formation",
      "Accès au réseau de fournisseurs partenaires",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "3 semaines",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: 2,
  },
  {
    id: 3,
    slug: "solutions",
    nom: "Solutions",
    prix: 170000,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&q=80",
    resume: "Formulez des solutions cosmétiques et d'hygiène liquides : toniques, gels, sprays.",
    description:
      "La formation Solutions vous apprend à formuler des produits liquides limpides ou gélifiés : toniques, gels nettoyants, sprays et eaux florales. Une compétence indispensable pour compléter une gamme cosmétique complète.",
    apprentissages: [
      "Les bases de la formulation en phase aqueuse",
      "La gélification et l'épaississement naturels",
      "Le choix des actifs solubles et des conservateurs",
      "La fabrication de toniques, sprays et gels",
      "L'hygiène et la stabilité microbiologique",
    ],
    debouches: [
      "Compléter une gamme cosmétique avec des solutions",
      "Créer des produits d'hygiène pour la vente directe",
      "Répondre à une demande de produits sur-mesure",
    ],
    inclus: [
      "Kit de matières premières",
      "Support de cours détaillé",
      "Suivi après formation",
      "Accès au réseau de partenaires",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "2 semaines",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: null,
  },
  {
    id: 4,
    slug: "anhydre",
    nom: "Anhydre",
    prix: 150000,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80",
    resume: "Fabriquez baumes, beurres corporels et sticks sans eau, riches en actifs.",
    description:
      "La formation Anhydre vous initie à la fabrication de produits sans eau : baumes, beurres corporels, sticks à lèvres et huiles de soin. Des formulations simples, stables et sans conservateur, idéales pour démarrer une activité rapidement.",
    apprentissages: [
      "Les principes de la formulation anhydre",
      "Le choix des huiles, cires et beurres végétaux",
      "La fabrication de baumes, sticks et beurres corporels",
      "L'enrichissement en actifs et huiles essentielles",
      "Le conditionnement adapté aux produits anhydres",
    ],
    debouches: [
      "Créer une gamme de baumes et beurres corporels",
      "Démarrer une activité avec un investissement limité",
      "Vendre sur les marchés artisanaux et en ligne",
    ],
    inclus: [
      "Kit de matières premières",
      "Fiches recettes",
      "Suivi après formation",
      "Accès au réseau de partenaires fournisseurs",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "2 semaines",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: null,
  },
  {
    id: 5,
    slug: "capillaire",
    nom: "Capillaire",
    prix: 200000,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
    resume: "Créez des soins capillaires naturels : shampoings, masques et huiles fortifiantes.",
    description:
      "La formation Capillaire vous apprend à formuler des soins pour cheveux : shampoings doux, masques nourrissants, huiles fortifiantes et soins ciblés (pousse, anti-chute, hydratation). Un secteur très demandé en Afrique de l'Ouest.",
    apprentissages: [
      "La typologie des cheveux et leurs besoins spécifiques",
      "La formulation de shampoings et après-shampoings",
      "Les masques et soins profonds nourrissants",
      "Les huiles et sérums fortifiants",
      "Les actifs naturels pour la pousse et l'anti-chute",
    ],
    debouches: [
      "Créer une marque de soins capillaires",
      "Fournir des salons de coiffure et instituts",
      "Vendre en ligne et sur les marchés locaux",
    ],
    inclus: [
      "Kit de matières premières",
      "Recettes testées pour différents types de cheveux",
      "Suivi après formation",
      "Accès au réseau de partenaires",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "3 semaines",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: 3,
  },
  {
    id: 6,
    slug: "detergents",
    nom: "Détergents",
    prix: 120000,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1200&q=80",
    resume: "Fabriquez des produits d'entretien efficaces : liquide vaisselle, lessive, nettoyants.",
    description:
      "La formation Détergents vous enseigne la fabrication de produits d'entretien ménager : liquide vaisselle, lessive liquide, nettoyants multi-usages. Un marché à forte demande et à marge intéressante.",
    apprentissages: [
      "Les bases de la chimie des tensioactifs",
      "La fabrication de liquide vaisselle et lessive",
      "Les nettoyants multi-usages et dégraissants",
      "Le dosage et la sécurité de manipulation",
      "Le conditionnement et l'étiquetage",
    ],
    debouches: [
      "Créer une activité de vente de produits d'entretien",
      "Fournir des ménages, hôtels et commerces locaux",
      "Diversifier une activité cosmétique existante",
    ],
    inclus: [
      "Kit de matières premières",
      "Fiches recettes",
      "Suivi après formation",
      "Accès au réseau de fournisseurs",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "1 semaine",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: null,
  },
  {
    id: 7,
    slug: "traitement-problemes-corporels",
    nom: "Traitement des problèmes corporels",
    prix: 300000,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    resume: "Formulez des soins ciblés pour l'acné, les taches, les vergetures et autres problèmes de peau.",
    description:
      "Formation avancée dédiée à la formulation de soins ciblés pour traiter les problèmes de peau courants : acné, hyperpigmentation, vergetures, eczéma léger. Vous apprendrez à sélectionner les actifs adaptés à chaque problématique.",
    apprentissages: [
      "L'analyse des problématiques de peau courantes",
      "Les actifs efficaces pour chaque type de problème",
      "La formulation de soins ciblés et sécurisés",
      "Les précautions d'usage et contre-indications",
      "Le conseil clientèle et le suivi de résultats",
    ],
    debouches: [
      "Proposer des soins ciblés à forte valeur ajoutée",
      "Se spécialiser en dermo-cosmétique naturelle",
      "Développer une clientèle fidèle grâce aux résultats",
    ],
    inclus: [
      "Kit de matières premières spécialisées",
      "Fiches diagnostic et recettes ciblées",
      "Suivi renforcé après formation",
      "Accès au réseau de partenaires",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "4 semaines",
    modalites: "Présentiel, ateliers pratiques en petit groupe (6 personnes max)",
    temoignageId: 4,
  },
  {
    id: 8,
    slug: "bougie-decorative",
    nom: "Bougie décorative",
    prix: 100000,
    image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=1200&q=80",
    resume: "Créez des bougies parfumées et décoratives esthétiques, prêtes pour la vente.",
    description:
      "La formation Bougie décorative vous apprend à créer des bougies parfumées et esthétiques : choix des cires, parfums, colorants, mèches et contenants. Une activité créative et accessible pour démarrer rapidement.",
    apprentissages: [
      "Le choix des cires (soja, paraffine, abeille)",
      "Le dosage des parfums et colorants",
      "Les techniques de coulage et de finition",
      "La décoration et le contenant",
      "Les normes de sécurité liées à la combustion",
    ],
    debouches: [
      "Créer une gamme de bougies pour la vente",
      "Proposer des ateliers créatifs",
      "Vendre lors d'événements et marchés artisanaux",
    ],
    inclus: [
      "Kit de matières premières",
      "Moules et mèches pour la pratique",
      "Suivi après formation",
      "Accès au réseau de partenaires",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "1 semaine",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: null,
  },
  {
    id: 9,
    slug: "objet-decoration-gypsum",
    nom: "Objet de décoration en Gypsum",
    prix: 100000,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200&q=80",
    resume: "Fabriquez des objets décoratifs en plâtre Gypsum : vases, cadres, figurines.",
    description:
      "La formation Objets de décoration en Gypsum vous initie à la fabrication d'objets décoratifs en plâtre : vases, cadres, figurines et diffuseurs de parfum. Une activité créative avec un faible coût de matières premières.",
    apprentissages: [
      "Les bases du travail du plâtre Gypsum",
      "Le moulage et le démoulage",
      "La finition, le ponçage et la peinture",
      "La création de diffuseurs de parfum en plâtre",
      "Le conditionnement pour la vente",
    ],
    debouches: [
      "Créer une gamme d'objets de décoration",
      "Vendre sur les marchés artisanaux et en ligne",
      "Proposer des objets personnalisés (événements, cadeaux)",
    ],
    inclus: [
      "Kit de moules et de plâtre pour la pratique",
      "Support de cours illustré",
      "Suivi après formation",
      "Accès au réseau de partenaires",
    ],
    certification: "Certification ESC + CQM (Certificat de Qualification aux Métiers)",
    duree: "1 semaine",
    modalites: "Présentiel, ateliers pratiques en petit groupe (8 personnes max)",
    temoignageId: null,
  },
];

const FORMATION_IMAGES = {
  savonnerie: "/img_formation/savonnerie_esc.jpg",
  emulsion: "/img_formation/emulsion_esc.jpg",
  solutions: "/img_formation/solutions_esc.jpg",
  anhydre: "/img_formation/anhydre_esc.jpeg",
  capillaire: "/img_formation/capillaire_esc.jpg",
  detergents: "/img_formation/détergents_esc.jpg",
  "traitement-problemes-corporels": "/img_formation/Traitement_des_problèmes_corporel_esc.jpg",
  "bougie-decorative": "/img_formation/bougie_decorative_esc.jpeg",
  "objet-decoration-gypsum": "/img_formation/objet_de_décoration_en_Gypsum_esc.jpg",
};

const DEFAULT_FORMATION_IMAGE = "/img_formation/savonnerie_esc.jpg";

export function getFormationImage(formation) {
  return FORMATION_IMAGES[formation?.slug] ?? DEFAULT_FORMATION_IMAGE;
}

export function getFormationBySlug(slug) {
  return formations.find((f) => f.slug === slug);
}

export function getFormationsSimilaires(slug, count = 3) {
  return formations.filter((f) => f.slug !== slug).slice(0, count);
}

export function formatPrix(prix) {
  return new Intl.NumberFormat("fr-FR").format(prix) + " FCFA";
}

// Tronque un nom de formation trop long pour les <option> des <select> —
// la liste déroulée native peut déborder de l'écran sinon.
export function formatNomOption(nom, max = 28) {
  return nom.length > max ? `${nom.slice(0, max - 1).trimEnd()}…` : nom;
}
