import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// API pour authentification
app.post('/api/auth/login', (req, res) => {
  const { email, accessCode } = req.body
  
  // Validation simple - à remplacer par une vraie logique
  const validCodes = {
    'user@example.com': 'STB-XXXX01',
    'test@starbord.io': 'STB-TEST01'
  }
  
  if (validCodes[email] === accessCode) {
    res.json({ 
      success: true, 
      token: `token_${email}_${Date.now()}`,
      email: email 
    })
  } else {
    res.status(401).json({ success: false, message: 'Identifiants invalides' })
  }
})

app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body
  if (token) {
    res.json({ valid: true })
  } else {
    res.status(401).json({ valid: false })
  }
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
