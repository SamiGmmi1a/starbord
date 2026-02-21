import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || null,
    email: localStorage.getItem('auth_email') || null,
    nom: (() => {
      const email = localStorage.getItem('auth_email') || '';
      return email ? localStorage.getItem(`auth_nom_${email}`) || '' : '';
    })()
  }),
  persist: true,

  actions: {
    refreshUser() {
      this.token = localStorage.getItem('auth_token') || null;
      this.email = localStorage.getItem('auth_email') || null;
      const nomKey = this.email ? `auth_nom_${this.email}` : '';
      this.nom = nomKey ? localStorage.getItem(nomKey) || '' : '';
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
        const nomKey = `auth_nom_${this.email}`
        this.nom = localStorage.getItem(nomKey) || ''
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_email', data.email)
        localStorage.setItem(nomKey, this.nom)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    logout() {
      const nomKey = `auth_nom_${this.email}`
      this.token = null
      this.email = null
      this.nom = ''
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
      localStorage.removeItem(nomKey)
    },
    isLoggedIn() {
      return this.token !== null
    },
    hasAccessToChapter() {
      return this.isLoggedIn()
    }
  }
})