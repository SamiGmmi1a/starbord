# STARBORD — Application Vue.js

Application SPA (Single Page Application) pour la lecture de bandes dessinées.

## Installation

```bash
npm install
```

## Développement

Pour lancer le serveur de développement :

```bash
npm run dev
```

L'application sera disponible à `http://localhost:5173`

## Build

Pour créer une version de production :

```bash
npm run build
```

## Production

Pour lancer le serveur Node.js en production :

```bash
npm run server
```

Le serveur sera disponible à `http://localhost:3000`

## Structure du projet

```
src/
  components/        # Composants réutilisables
    - Header.vue
    - Footer.vue
    - Carousel.vue
  views/            # Pages Vue.js
    - Home.vue
    - Login.vue
    - Chapters.vue
    - Reader.vue
    - Legal.vue
  stores/           # Pinia stores
    - auth.js       # Gestion authentification
    - comics.js     # Gestion des données
  router/           # Vue Router
    - index.js
  App.vue           # Composant principal
  main.js           # Point d'entrée
```

## Fonctionnalités

- 📖 Lecture de bandes dessinées avec pagination
- 🔐 Système d'authentification (freemium)
- 🎨 Interface responsive et moderne
- 🔍 Recherche de comics
- 🛍️ Section boutique intégrée
- 📱 Compatible mobile et desktop

## API Endpoints

- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/verify` - Vérification token
- `GET /api/comics` - Liste des comics
- `GET /api/comics/:id` - Détails d'un comic

## Technologies

- Vue 3
- Vue Router 4
- Pinia (State Management)
- Vite
- Express.js
- Node.js
