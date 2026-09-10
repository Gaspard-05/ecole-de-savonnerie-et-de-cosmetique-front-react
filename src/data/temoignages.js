// Données mockées des témoignages ESC.
// Structure alignée sur ce que l'API Laravel exposera (GET /api/temoignages).

export const temoignages = [
  {
    id: 1,
    nom: "Ariane K.",
    formationSlug: "savonnerie",
    formationNom: "Savonnerie",
    photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=300&q=80",
    note: 5,
    texte:
      "Grâce à la formation Savonnerie de l'ESC, j'ai lancé ma propre marque en moins de deux mois. L'accompagnement après la formation a fait toute la différence pour trouver mes premiers clients.",
  },
  {
    id: 2,
    nom: "Bénédicte T.",
    formationSlug: "emulsion",
    formationNom: "Émulsion",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80",
    note: 5,
    texte:
      "Une formation 100% pratique comme promis. J'ai appris à formuler mes propres crèmes et je vends aujourd'hui ma gamme complète sur les marchés locaux.",
  },
  {
    id: 3,
    nom: "Carine A.",
    formationSlug: "capillaire",
    formationNom: "Capillaire",
    photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&q=80",
    note: 5,
    texte:
      "Les formatrices sont patientes et disponibles. J'ai pu poser toutes mes questions et repartir avec des recettes que j'utilise encore aujourd'hui dans mon salon.",
  },
  {
    id: 4,
    nom: "Delphine M.",
    formationSlug: "traitement-problemes-corporels",
    formationNom: "Traitement des problèmes corporels",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    note: 5,
    texte:
      "La double certification ESC + CQM m'a permis de gagner en crédibilité auprès de mes premières clientes. Je recommande vivement cette école à toute femme motivée.",
  },
  {
    id: 5,
    nom: "Estelle O.",
    formationSlug: "bougie-decorative",
    formationNom: "Bougie décorative",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
    note: 4,
    texte:
      "Une expérience enrichissante du début à la fin. J'ai découvert une vraie passion et je vends maintenant mes bougies lors des marchés de créateurs.",
  },
  {
    id: 6,
    nom: "Florence D.",
    formationSlug: "solutions",
    formationNom: "Solutions",
    photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&q=80",
    note: 5,
    texte:
      "Le réseau de partenaires proposé par l'ESC m'a permis de trouver rapidement mes fournisseurs de matières premières. Un vrai accompagnement de A à Z.",
  },
];

export function getTemoignageById(id) {
  return temoignages.find((t) => t.id === id);
}

export function getTemoignageByFormationSlug(slug) {
  return temoignages.find((t) => t.formationSlug === slug);
}
