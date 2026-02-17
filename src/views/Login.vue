<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="login-card">
        <div class="login-header-back">
          <router-link to="/" class="login-back">← Retour</router-link>
        </div>

        <div class="login-header">
          <h2>STARBORD</h2>
          <p>Connectez vous pour avoir accès aux chapitres complets</p>
        </div>

        <div class="login-form">
          <div class="input-group">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Adresse email"
              @keyup.enter="login"
            >
          </div>

          <div class="input-group">
            <input 
              v-model="accessCode" 
              type="text" 
              placeholder="Code d'accès (STB-XXXX01)"
              @keyup.enter="login"
            >
          </div>

          <button class="login-main-btn" @click="login">Se connecter</button>
          <p class="login-message" :class="messageClass">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      accessCode: '',
      message: '',
      messageClass: ''
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.accessCode) {
        this.message = 'Remplis tous les champs'
        this.messageClass = 'error'
        return
      }

      const authStore = useAuthStore()
      const success = await authStore.login(this.email, this.accessCode)

      if (success) {
        this.message = 'Accès autorisé ✔'
        this.messageClass = 'success'
        setTimeout(() => {
          this.$router.push('/')
        }, 800)
      } else {
        this.message = 'Email ou code d\'accès invalide'
        this.messageClass = 'error'
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  padding: 1rem;
}

.login-wrapper {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.login-header-back {
  margin-bottom: 1rem;
}

.login-back {
  color: #00a8ff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-back:hover {
  color: #0085cc;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem;
}

.login-header p {
  color: #aaa;
  font-size: 0.95rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group input {
  padding: 0.75rem 1rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #1a1a1a;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #00a8ff;
  box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.1);
}

.input-group input::placeholder {
  color: #666;
}

.login-main-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00a8ff, #0085cc);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.login-main-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 168, 255, 0.3);
}

.login-main-btn:active {
  transform: translateY(0);
}

.login-message {
  text-align: center;
  margin: 0;
  font-size: 0.95rem;
  min-height: 1.5rem;
  color: #aaa;
}

.login-message.success {
  color: #4ade80;
}

.login-message.error {
  color: #f87171;
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
  }

  .login-header h2 {
    font-size: 1.5rem;
  }
}
</style>
