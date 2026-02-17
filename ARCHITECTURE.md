# Architecture Vue.js SPA - STARBORD

## 📋 Vue d'ensemble

Cette application est une SPA (Single Page Application) moderne basée sur Vue.js 3, conçue pour gérer la lecture de bandes dessinées avec un système freemium.

## 🏗️ Architecture

### Frontend (Vue.js)
- **Framework** : Vue 3 (Composition API compatible)
- **Router** : Vue Router 4 (SPA routing)
- **State Management** : Pinia
- **Build Tool** : Vite
- **Styling** : CSS Scoped dans les composants

### Backend (Node.js)
- **Server** : Express.js
- **Authentification** : Token-based
- **API REST** : Endpoints pour comics et authentification

## 📁 Structure des fichiers

```
starbord/
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── Header.vue       # Navigation principale
│   │   ├── Footer.vue       # Pied de page
│   │   └── Carousel.vue     # Carrousel héros
│   │
│   ├── views/               # Pages/routes de l'app
│   │   ├── Home.vue         # Page d'accueil
│   │   ├── Login.vue        # Page de connexion
│   │   ├── Chapters.vue     # Sélection des chapitres
│   │   ├── Reader.vue       # Lecteur de pages
│   │   └── Legal.vue        # Mentions légales
│   │
│   ├── stores/              # Pinia stores (state management)
│   │   ├── auth.js          # Gestion authentification
│   │   └── comics.js        # Gestion données comics
│   │
│   ├── router/              # Vue Router config
│   │   └── index.js         # Routes et configuration
│   │
│   ├── App.vue              # Composant racine
│   └── main.js              # Point d'entrée Vue
│
├── index.html               # Template HTML (SPA)
├── package.json             # Dépendances npm
├── server.js                # Serveur Express.js
├── vite.config.js           # Config Vite
├── .env.development         # Vars environnement
└── README.md                # Documentation
```

## 🔄 Flux de données

```
User Browser
    ↓
    ├─→ Vue Router (Routes)
    │       ↓
    │   Components/Views
    │       ↓
    │   Pinia Stores (auth.js, comics.js)
    │       ↓
    ├─→ API Calls (fetch)
    │       ↓
Express Server
    ├─→ Endpoints (/api/auth/*, /api/comics/*)
    │       ↓
    └─→ Response JSON
```

## 🔐 Authentification

**Flow:**
1. User entre email + code d'accès
2. Store `auth.js` appelle `POST /api/auth/login`
3. Serveur valide les credentials
4. Token stocké en localStorage
5. User redirigé vers home

**Pages protégées:**
- Reader (chapitre complet seulement si logged in)
- Permet 5 pages gratuites avant demande de connexion

## 📊 Gestion d'état (Stores)

### auth.js
```javascript
- token (string)
- email (string)
- login(email, code) → Promise
- logout()
- isLoggedIn() → boolean
```

### comics.js
```javascript
- comics (array)
- currentComic (object)
- searchResults (array)
- fetchComics() → Promise
- fetchComicById(id) → Promise
- searchComics(query)
```

## 🛣️ Routes

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | Home.vue | Accueil + catalogue |
| `/login` | Login.vue | Connexion |
| `/chapters/:id` | Chapters.vue | Sélection chapitre |
| `/reader/:comicId/:chapitreId` | Reader.vue | Lecteur |
| `/legal` | Legal.vue | Mentions légales |

## 🔗 API Endpoints

```
POST /api/auth/login
  Request: { email, accessCode }
  Response: { success, token, email }

POST /api/auth/verify
  Request: { token }
  Response: { valid }

GET /api/comics
  Response: [{ id, title, author, chapters, cover }]

GET /api/comics/:id
  Response: { id, title, author, chapters: { 1: { title, pages } } }
```

## 🚀 Déploiement

### Dev
```bash
npm run dev       # Vite dev server
```

### Production
```bash
npm run build     # Build statique en /dist
npm run server    # Lance server.js sur :3000
```

## 🎨 Styling

- **Framework CSS** : Vanilla CSS (pas de Tailwind/Bootstrap)
- **Design** : Dark theme (#1a1a1a)
- **Colors** : 
  - Primary: #00a8ff (cyan)
  - Dark: #1a1a1a
  - Text: #fff / #ccc
- **Font** : Orbitron (titres), System (body)

## 🔧 Configuration

Variables dans `.env.development`:
```
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
```

## 📝 Notes

- Chaque composant a ses styles scoped
- Réutilisation des composants (Header, Footer)
- Lazy loading des images
- Gestion d'erreurs réseau
- Persistance token entre sessions

## 🐛 Débogage

- Vue DevTools (extension navigateur)
- Network tab (requêtes API)
- Console browser pour logs
- Pinia DevTools pour state inspection

## 📦 Dépendances principales

```json
{
  "vue": "^3.3.4",
  "vue-router": "^4.2.4",
  "pinia": "^2.1.4",
  "express": "^4.18.2",
  "vite": "^4.4.9"
}
```
