import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import sqlite3pkg from 'sqlite3'
const { verbose } = sqlite3pkg;
const sqlite3 = verbose();
const db = new sqlite3.Database('./database.sqlite');

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

// Middleware

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// API d'authentification code/email
app.post('/api/login', (req, res) => {
  const { email, nom, code } = req.body;
  if (!email || !nom || !code) {
    return res.status(400).json({ success: false, message: 'Email, nom et code requis.' });
  }
  // Vérifie le format du code
  if (!/^STB-\\d{4}01$/.test(code)) {
    return res.status(400).json({ success: false, message: 'Format de code invalide.' });
  }
  db.get('SELECT * FROM codes WHERE code = ?', [code], (err, codeRow) => {
    if (err) return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    if (!codeRow) return res.status(404).json({ success: false, message: 'Code inconnu.' });
    if (codeRow.utilise && codeRow.email_associe !== email) {
      return res.status(403).json({ success: false, message: 'Code déjà utilisé.' });
    }
    // Associer le code à l'email et au nom si non utilisé
    if (!codeRow.utilise) {
      db.run('UPDATE codes SET utilise = 1, email_associe = ?, nom_associe = ?, date_utilisation = CURRENT_TIMESTAMP WHERE code = ?', [email, nom, code], (err2) => {
        if (err2) return res.status(500).json({ success: false, message: 'Erreur lors de l’association.' });
        // Créer l'utilisateur
        db.run('INSERT OR IGNORE INTO users (email, nom, code_associe) VALUES (?, ?, ?)', [email, nom, code], (err3) => {
          if (err3) return res.status(500).json({ success: false, message: 'Erreur création utilisateur.' });
          return res.json({ success: true, email, nom });
        });
      });
    } else {
      // Si déjà utilisé, vérifier que l'email et le nom correspondent
      db.get('SELECT * FROM users WHERE email = ? AND code_associe = ?', [email, code], (err4, userRow) => {
        if (err4) return res.status(500).json({ success: false, message: 'Erreur serveur.' });
        if (!userRow) return res.status(403).json({ success: false, message: 'Code déjà utilisé par un autre utilisateur.' });
        return res.json({ success: true, email, nom: userRow.nom });
      });
    }
  });
});

// Connexion ultérieure : vérifie que le mail et le code sont associés
app.post('/api/check-login', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ success: false, message: 'Email et code requis.' });
  }
  db.get('SELECT * FROM users WHERE email = ? AND code_associe = ?', [email, code], (err, userRow) => {
    if (err) return res.status(500).json({ success: false, message: 'Erreur serveur.' });
    if (!userRow) return res.status(403).json({ success: false, message: 'Combinaison email/code incorrecte.' });
    return res.json({ success: true, email: userRow.email, nom: userRow.nom });
  });
})

// API pour les données des comics
app.get('/api/comics', (req, res) => {
  res.json([
    { 
      id: 'bd1', 
      title: "Détenu 278", 
      author: "FÉNIX", 
      chapters: 1, 
      cover: "/assets/img/cover/detenu278-cover.jpg" 
    },
    { 
      id: 'bd2', 
      title: "Figé dans l'acier", 
      author: "FÉNIX", 
      chapters: 1, 
      cover: "/assets/img/cover/fige_dans_lacier-cover.jpg" 
    }
  ])
})

app.get('/api/comics/:id', (req, res) => {
  const comicsData = {
    bd1: {
      id: 'bd1',
      title: "Détenu 278",
      author: "FÉNIX",
      chapters: {
        1: {
          title: "Chapitre 1",
          pages: [
            "/assets/img/pages/detenu278/001.jpg",
            "/assets/img/pages/detenu278/002.jpg"
          ]
        }
      }
    },
    bd2: {
      id: 'bd2',
      title: "Figé dans l'acier",
      author: "FÉNIX",
      chapters: {
        1: {
          title: "Chapitre 1",
          pages: [
            "/assets/img/pages/fige_dans_lacier/001.png",
            "/assets/img/pages/fige_dans_lacier/002.png"
          ]
        }
      }
    }
  }
  
  if (comicsData[req.params.id]) {
    res.json(comicsData[req.params.id])
  } else {
    res.status(404).json({ error: 'Comic not found' })
  }
})

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})