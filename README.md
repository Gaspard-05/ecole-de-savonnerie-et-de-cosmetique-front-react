# ESC — École de Savonnerie et de Cosmétique

Site public et tableau de bord administrateur de l'ESC, développés en React et connectés à une API Laravel.

## Aperçu

- **Site public** : présentation de l'école, catalogue de formations, témoignages, formulaire de contact et de pré-inscription.
- **Espace admin** (`/admin`) : tableau de bord, gestion des formations (CRUD), suivi des pré-inscriptions et des messages de contact, statistiques de téléchargement des PDF, authentification par token Bearer.

## Stack technique

- [React 19](https://react.dev) + [React Router 7](https://reactrouter.com)
- [Vite 8](https://vitejs.dev) (avec React Compiler)
- [axios](https://axios-http.com) pour les appels à l'API Laravel
- [Recharts](https://recharts.org) pour les graphiques du dashboard
- [SweetAlert2](https://sweetalert2.github.io) pour les notifications
- [lucide-react](https://lucide.dev) pour les icônes

## Prérequis

- Node.js 18+
- Un backend Laravel démarré et accessible (l'API n'est pas incluse dans ce dépôt)

## Installation

```bash
npm install
```

Créer un fichier `.env` à la racine avec l'URL de l'API Laravel :

```
VITE_API_BASE_URL=http://localhost:8000/api
```

Sans cette variable, les pages publiques restent fonctionnelles en mode démo (données mockées dans `src/data/`), mais l'espace admin nécessite une API réelle.

## Scripts disponibles

```bash
npm run dev       # serveur de développement
npm run build     # build de production
npm run lint      # vérifie le code avec ESLint
npm run preview   # prévisualise le build de production
```

## Structure du projet

```
src/
  components/       # composants réutilisables (public + admin/)
  pages/            # pages publiques + pages/admin/
  layouts/          # PublicLayout, AdminLayout
  router/           # configuration des routes (AppRouter.jsx)
  hooks/            # useFetch (lecture API + cache), postJSON
  lib/              # api.js (instance axios + intercepteurs), auth.js (token, login/logout)
  data/             # données mockées (fallback en l'absence d'API)
```

## Authentification admin

L'accès à `/admin/*` nécessite une connexion (`/connexion`). Le token reçu de l'API est stocké en `localStorage` et ajouté automatiquement à chaque requête admin ; une réponse `401` déconnecte l'utilisateur et le redirige vers la page de connexion.
