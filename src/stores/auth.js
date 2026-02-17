import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || null,
    email: localStorage.getItem('auth_email') || null
  }),

  actions: {
    async login(email, accessCode) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, accessCode })
        })

        if (!response.ok) {
          throw new Error('Identifiants invalides')
        }

        const data = await response.json()
        this.token = data.token
        this.email = data.email

        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_email', data.email)

        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    logout() {
      this.token = null
      this.email = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
    },

    isLoggedIn() {
      return this.token !== null
    },

    hasAccessToChapter() {
      return this.isLoggedIn()
    }
  }
})
