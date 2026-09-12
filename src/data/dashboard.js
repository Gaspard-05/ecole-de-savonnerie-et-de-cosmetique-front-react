// Données mockées du dashboard administrateur ESC (KPI + graphiques).
// La liste des formations reste centralisée dans src/data/formations.js — on ne la duplique pas ici.

import { formations } from "./formations";

export const kpis = [
  { id: "prospects", label: "Prospects inscrits", value: "184" },
  { id: "formations", label: "Formations actives", value: String(formations.length) },
  { id: "revenus", label: "Revenus du mois", value: "3 250 000 FCFA" },
  { id: "reussite", label: "Taux de réussite", value: "92%" },
];

export const inscriptionsParMois = [
  { mois: "Jan", inscriptions: 20 },
  { mois: "Fév", inscriptions: 25 },
  { mois: "Mar", inscriptions: 30 },
  { mois: "Avr", inscriptions: 25 },
  { mois: "Mai", inscriptions: 35 },
  { mois: "Juin", inscriptions: 40 },
  { mois: "Juil", inscriptions: 30 },
  { mois: "Août", inscriptions: 20 },
  { mois: "Sep", inscriptions: 45 },
  { mois: "Oct", inscriptions: 50 },
  { mois: "Nov", inscriptions: 40 },
  { mois: "Déc", inscriptions: 35 },
];

// Palette dérivée de la charte graphique (nuances de #905A01, #D99201, #58761B),
// validée pour la lisibilité (bande de luminosité + chroma) avec le script du skill dataviz.
// Sur 9 parts issues de seulement 3 familles de teintes proches, la séparation CVD stricte
// n'est pas atteignable (limite documentée du skill) : compensée par une légende + des
// étiquettes directes toujours visibles, jamais la couleur seule pour identifier une part.
const REPARTITION_COLORS = [
  "#824f00",
  "#a66601",
  "#4a6416",
  "#905a01",
  "#d99201",
  "#58761b",
  "#b06e02",
  "#e8a422",
  "#6f9328",
];

const ETUDIANTS_PAR_FORMATION = {
  savonnerie: 28,
  emulsion: 24,
  solutions: 16,
  anhydre: 14,
  capillaire: 26,
  detergents: 12,
  "traitement-problemes-corporels": 18,
  "bougie-decorative": 20,
  "objet-decoration-gypsum": 15,
};

export const repartitionParFiliere = formations.map((formation, index) => ({
  name: formation.nom,
  value: ETUDIANTS_PAR_FORMATION[formation.slug] ?? 10,
  color: REPARTITION_COLORS[index % REPARTITION_COLORS.length],
}));
