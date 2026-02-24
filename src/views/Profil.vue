<template>
  <div class="profil-page">
    <button class="profil-back" @click="$router.back()">← Retour</button>
    <h2>Mon Profil</h2>
    <form @submit.prevent="saveProfile" class="profil-form">
      <div class="form-group">
        <label>Prénom</label>
        <input v-model="prenom" type="text" placeholder="Votre prénom">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Votre email" disabled>
      </div>
      <button class="profil-submit" type="submit">Enregistrer</button>
      <div v-if="message" class="message">{{ message }}</div>
    </form>
    <button class="login-btn" @click="logout">Déconnexion</button>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Profil',
  computed: {
    authStore() {
      return useAuthStore();
    },
    prenom: {
      get() {
        return this.authStore.prenom || '';
      },
      set(value) {
        this.authStore.prenom = value;
        localStorage.setItem(`auth_prenom_${this.authStore.email}`, value);
      }
    },
    email() {
      return this.authStore.email;
    }
  },
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    // Synchronise le prénom du store avec le localStorage si besoin
    if (!this.authStore.prenom && this.authStore.email) {
      const prenomKey = `auth_prenom_${this.authStore.email}`;
      const storedPrenom = localStorage.getItem(prenomKey);
      if (storedPrenom) {
        this.authStore.prenom = storedPrenom;
      }
    }
  },
  methods: {
    async saveProfile() {
      this.message = '';
      try {
        const response = await fetch('/api/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, prenom: this.prenom })
        });
        const data = await response.json();
        if (data.success) {
          this.message = 'Profil mis à jour !';
        } else {
          this.message = data.message || 'Erreur lors de la mise à jour.';
        }
      } catch (e) {
        this.message = 'Erreur serveur lors de la mise à jour.';
      }
    },
    
    logout() {
      this.authStore.logout();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
/* Style du bouton déconnexion harmonisé avec le header */
.login-btn {
  width: 100%;
  margin-top: 18px;
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #ffa9a9;
  background: rgba(255, 80, 80, 0.08);
  border: 1px solid rgba(255, 120, 120, 0.25);
  border-radius: 999px;
  backdrop-filter: blur(6px);
  cursor: pointer;
  transition: var(--transition);
}
.login-btn:hover, .login-btn:focus {
  color: #fff;
  background: rgba(255, 80, 80, 0.18);
  border-color: rgba(255, 150, 150, 0.6);
}
.profil-submit {
  width: 100%;
  margin-top: 18px;
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #a9c7ff;
  background: rgba(80, 140, 255, 0.08);
  border: 1px solid rgba(120, 170, 255, 0.25);
  border-radius: 999px;
  backdrop-filter: blur(6px);
  cursor: pointer;
  transition: var(--transition);
}
.profil-submit:hover, .profil-submit:focus {
  color: #fff;
  background: rgba(80, 140, 255, 0.18);
  border-color: rgba(150, 190, 255, 0.6);
}
.profil-back {
  display: inline-block;
  margin-bottom: 20px;
  padding: 6px 12px;
  font-size: 12px;
  text-decoration: none;
  color: #9bbcff;
  background: rgba(80, 140, 255, 0.08);
  border: 1px solid rgba(120, 170, 255, 0.2);
  border-radius: 999px;
  transition: 0.2s ease;
}
.profil-back:hover, .profil-back:focus {
  background: rgba(80, 140, 255, 0.18);
  box-shadow: 0 0 4px rgba(0, 168, 255, 0.08);
  border-color: rgba(140, 180, 255, 0.4);
}
.profil-page {
  max-width: 700px;
  min-width: 420px;
  margin: 3rem auto;
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 3.5rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  font-size: 1.15rem;
}
.profil-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 1.1rem;
}

.form-group input[type="text"],
.form-group input[type="text"],
.form-group input[type="email"] {
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: var(--radius);
  border: 1.5px solid var(--border);
  background: var(--glass);
  font-size: 1.05rem;
  color: var(--text);
}
.profile-pic-preview {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 0.5rem;
  border: 1px solid var(--border);
}
.message {
  color: var(--primary);
  margin-top: 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
}


</style>
<style scoped>
@media (max-width: 700px) {
  .profil-page {
    min-width: unset;
    max-width: 99vw;
    padding: 1.2rem 0.3rem;
    border-radius: 10px;
    font-size: 1rem;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  .profil-form {
    gap: 1.2rem;
  }
  .profile-pic-preview {
    width: 48px;
    height: 48px;
  }
}
@media (max-width: 480px) {
  .profil-page {
    padding: 0.7rem 0.1rem;
    border-radius: 6px;
    font-size: 0.97rem;
  }
  .profil-back, .profil-submit, .login-btn {
    font-size: 0.95rem;
    padding: 6px 8px;
  }
}
</style>
