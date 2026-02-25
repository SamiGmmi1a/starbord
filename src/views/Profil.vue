<template>
    <div class="profil-card">

    <div class="profil-back-row">
          <button class="profil-back" @click="$router.back()">← retour</button>
    </div>
    <h2>mon profil</h2>
      <form @submit.prevent="saveProfile" class="profil-form">
        <div class="form-group">
          <label>Prénom</label>
          <input v-model="prenom" type="text" placeholder="Votre prénom">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Votre email" disabled>
        </div>
        <button class="profil-submit" type="submit">enregistrer</button>
        <div v-if="message" class="message">{{ message }}</div>
      </form>
    <button class="login-btn" @click="logout">déconnexion</button>
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


.profil-back-row {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.5rem;
}
.profil-back {
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #9bbcff;
  background: rgba(80, 140, 255, 0.08);
  border: 1px solid rgba(120, 170, 255, 0.25);
  border-radius: 999px;
  backdrop-filter: blur(6px);
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.profil-back:hover, .profil-back:focus {
  color: #fff;
  background: rgba(80, 140, 255, 0.18);
  border-color: rgba(140, 180, 255, 0.4);
}



.profil-page {
  margin: auto;
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 2rem;
  max-width: 100vw;
  box-sizing: border-box;
}

.profil-card {
  background: var(--glass);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 2.5rem 2rem;
  margin: 2.5rem auto 1.5rem auto;
  max-width: 520px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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




.profil-card {
  background: var(--glass);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 2.5rem 2rem;
  margin: 2.5rem auto 1.5rem auto;
  max-width: 520px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .profil-card {
    max-width: 95vw;
    padding: 2rem 3vw;
    border-radius: 14px;
    margin: 2rem auto 1rem auto;
  }
}

@media (max-width: 700px) {
  .profil-back-row {
    margin-bottom: 0.2rem;
  }
  .profil-back {
    font-size: 0.95rem;
    padding: 6px 12px;
  }
  .profil-card {
    max-width: 99vw;
    padding: 1.2rem 4vw;
    border-radius: 10px;
    margin: 1.2rem auto 1rem auto;
  }
  .profil-page {
    max-width: 100vw;
    padding: 0.7rem 0.1rem 1.2rem 0.1rem;
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
  .profil-back, .profil-submit, .login-btn {
    font-size: 0.95rem;
    padding: 6px 8px;
  }
  .login-btn {
    text-align: center;
    justify-content: center;
    display: flex;
  }
  h2 {
    font-size: 2.2rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .profil-card {
    max-width: 100vw;
    padding: 0.7rem 2vw;
    border-radius: 8px;
    margin: 0.7rem auto 0.5rem auto;
  }
  .profil-page {
    padding: 0.3rem 0 0.7rem 0;
  }
  h2 {
    font-size: 1.5rem;
  }
}
h2 {
  font-size: 1.5rem;
}
    
</style>
