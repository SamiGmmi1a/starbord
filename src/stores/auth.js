import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || null,
    email: localStorage.getItem('auth_email') || null,
    nom: localStorage.getItem('auth_nom') || '',
    photo: localStorage.getItem('auth_photo') || ''
  }),
  // Synchronisation du store avec localStorage au démarrage
  persist: true,

  actions: {
        refreshUser() {
          this.token = localStorage.getItem('auth_token') || null;
          this.email = localStorage.getItem('auth_email') || null;
          this.nom = localStorage.getItem('auth_nom') || '';
          this.photo = localStorage.getItem('auth_photo') || '';
        },
    async login(email, accessCode) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: accessCode })
        })

        if (!response.ok) {
          throw new Error('Identifiants invalides')
        }

        const data = await response.json()
        this.token = data.token
        this.email = data.email
        // Restaurer nom et photo depuis localStorage si existants
        this.nom = localStorage.getItem('auth_nom') || this.nom || ''
        this.photo = localStorage.getItem('auth_photo') || this.photo || ''
        // Stocker le token dans localStorage
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_email', data.email)
        // Enregistrer nom et photo dans localStorage si présents
        if (this.nom) localStorage.setItem('auth_nom', this.nom)
        if (this.photo) localStorage.setItem('auth_photo', this.photo)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    logout() {
      this.token = null
      this.email = null
      this.nom = ''
      this.photo = ''
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
      localStorage.removeItem('auth_nom')
      localStorage.removeItem('auth_photo')
    },
    isLoggedIn() {
      return this.token !== null
    },
    hasAccessToChapter() {
      return this.isLoggedIn()
    }
  }
})
