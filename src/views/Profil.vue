<template>
  <div class="profil-page">
    <button class="profil-back" @click="$router.back()">← Retour</button>
    <h2>Mon Profil</h2>
    <form @submit.prevent="saveProfile" class="profil-form">
      <div class="form-group">
        <label>Nom</label>
        <input v-model="nom" type="text" placeholder="Votre nom">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Votre email" disabled>
      </div>
      <!-- Champ photo de profil supprimé -->
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
  data() {
    const authStore = useAuthStore()
    const email = authStore.email
    const nomKey = `auth_nom_${email}`
    const nom = localStorage.getItem(nomKey) || authStore.nom
    return {
      nom,
      email,
      message: ''
    }
  },
  methods: {
    // Méthode onFileChange supprimée
    async saveProfile() {
      // Ici, on simule la sauvegarde côté client
      const authStore = useAuthStore()
      const nomKey = `auth_nom_${authStore.email}`
      const photoKey = `auth_photo_${authStore.email}`
      localStorage.setItem(nomKey, this.nom)
      localStorage.setItem(photoKey, this.photoPreview)
      // Met à jour le store Pinia pour affichage immédiat
      authStore.nom = this.nom
      authStore.photo = this.photoPreview
      this.message = 'Profil mis à jour !'
    },
    logout() {
      const authStore = useAuthStore()
      authStore.logout()
      this.$router.push('/')
    }
  }
}
</script>




<style scoped>
/* Style du bouton déconnexion harmonisé avec le header */
.login-btn {
  display: block;
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
  box-shadow: 0 2px 12px rgba(255, 80, 80, 0.08);
}
.login-btn:hover, .login-btn:focus {
  color: #fff;
  background: rgba(255, 80, 80, 0.18);
  border-color: rgba(255, 150, 150, 0.6);
  box-shadow: 0 0 12px rgba(255, 80, 80, 0.35);
}
.profil-submit {
  display: block;
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
  box-shadow: 0 2px 12px rgba(80,140,255,0.08);
}
.profil-submit:hover, .profil-submit:focus {
  color: #fff;
  background: rgba(80, 140, 255, 0.18);
  border-color: rgba(150, 190, 255, 0.6);
  box-shadow: 0 0 12px rgba(80, 140, 255, 0.35);
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
  max-width: 600px;
  min-width: 320px;
  margin: 3rem auto;
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 3rem 2rem;
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
