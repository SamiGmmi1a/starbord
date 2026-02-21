<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="login-card">
         <button class="login-back" @click="$router.back()">← Retour</button>
         
        <div class="login-header">
          <h2>STARBORD</h2>
          <p>Connectez vous pour avoir accès aux chapitres complets</p>
        </div>

        <div class="login-form">
          <input v-model="email" type="email" placeholder="Votre email" required>
          <input v-model="code" type="text" placeholder="Code d’identification" required>
          <button @click.prevent="login">Se connecter</button>
          <div v-if="error" class="error">{{ error }}</div>
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
      code: '',
      error: ''
    }
  },
  methods: {
    async login() {
      this.error = '';
      const authStore = useAuthStore()
      try {
        // Appel du store pour login
        const success = await authStore.login(this.email, this.code)
        if (success) {
          this.$router.push({ name: 'Home' })
        } else {
          this.error = 'Identifiants invalides ou code incorrect.'
        }
      } catch (e) {
        this.error = 'Erreur serveur';
      }
    }
  }
}
</script>

<style scoped>
/* Bouton retour login-back amélioré */
.login-back {
     display: inline-block;
    margin-bottom: 20px;
    padding: 6px 12px;
    font-size: 12px;
    text-decoration: none;
    color: #9bbcff;
    background: rgba(80, 140, 255, 0.08);
    border: 1px solid rgba(120, 170, 255, 0.2);
    border-radius: 999px;
    transition: 0.2s 
ease;
}
.login-back:hover, .login-back:focus {
  background: rgba (80, 140, 255, 0.18);
  box-shadow: rgba(0, 168, 255, 0.08);
  border-color: rgba (140, 180, 255, 0.4);
}
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, var(--bg-dark), var(--bg));
  padding: 1rem;
}

.login-wrapper {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.login-header-back {
  margin-bottom: 1rem;
}

.login-back {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.login-back:hover {
  color: var(--primary-dark);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.login-header p {
  color: var(--text-muted);
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
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--glass);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition);
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(0, 168, 255, 0.08);
  box-shadow: 0 0 12px rgba(0, 168, 255, 0.2);
}

.input-group input::placeholder {
  color: var(--text-muted);
}

.login-main-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 0.5rem;
}

.login-main-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(0, 168, 255, 0.3);
}

.login-main-btn:active {
  transform: translateY(0);
}

.login-message {
  text-align: center;
  margin: 0;
  font-size: 0.95rem;
  min-height: 1.5rem;
  color: var(--text-muted);
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
