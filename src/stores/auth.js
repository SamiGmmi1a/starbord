import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || null,
    email: localStorage.getItem('auth_email') || null,
    prenom: (() => {
      const email = localStorage.getItem('auth_email') || '';
      return email ? localStorage.getItem(`auth_prenom_${email}`) || '' : '';
    })()
  }),
  persist: true,

  actions: {
    refreshUser() {
      this.token = localStorage.getItem('auth_token') || null;
      this.email = localStorage.getItem('auth_email') || null;
      const prenomKey = this.email ? `auth_prenom_${this.email}` : '';
      this.prenom = prenomKey ? localStorage.getItem(prenomKey) || '' : '';
    },
    async login(email, prenom, code) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, prenom, code })
        })
        const data = await response.json()
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Identifiants invalides')
        }
        this.token = 'dummy-token' // à adapter si tu veux un vrai token
        this.email = data.email
        this.prenom = data.prenom
        localStorage.setItem('auth_token', this.token)
        localStorage.setItem('auth_email', data.email)
        localStorage.setItem(`auth_prenom_${data.email}`, data.prenom)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    logout() {
      const prenomKey = `auth_prenom_${this.email}`
      this.token = null
      this.email = null
      this.prenom = ''
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
      localStorage.removeItem(prenomKey)
    },
    isLoggedIn() {
      return this.token !== null
    },
    hasAccessToChapter() {
      return this.isLoggedIn()
    }
  }
})