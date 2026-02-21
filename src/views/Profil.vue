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
      <div class="form-group">
        <label>Photo de profil</label>
        <input type="file" @change="onFileChange">
        <img v-if="photoPreview" :src="photoPreview" class="profile-pic-preview" alt="Aperçu photo" />
      </div>
      <button class="profil-submit" type="submit">Enregistrer</button>
      <div v-if="message" class="message">{{ message }}</div>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Profil',
  data() {
    const authStore = useAuthStore()
    return {
      nom: authStore.nom,
      email: authStore.email,
      photo: authStore.photo,
      photoPreview: authStore.photo,
      message: ''
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = e2 => {
          this.photoPreview = e2.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async saveProfile() {
      // Ici, on simule la sauvegarde côté client
      const authStore = useAuthStore()
      authStore.nom = this.nom
      authStore.photo = this.photoPreview
      localStorage.setItem('auth_nom', this.nom)
      localStorage.setItem('auth_photo', this.photoPreview)
      this.message = 'Profil mis à jour !'
    }
  }
}
</script>

<style scoped>
/* Bouton Enregistrer moderne */
/* Bouton Enregistrer harmonisé avec le header */
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
  max-width: 400px;
  margin: 2rem auto;
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}
.profil-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 0.3rem;
  display: block;
}
.form-group input[type="text"],
.form-group input[type="email"] {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--glass);
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
  margin-top: 1rem;
}
</style>
