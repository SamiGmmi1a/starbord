<template>
  <div class="admin-codes-page">
    <h2>Gestion des codes d'accès</h2>
    <form @submit.prevent="addCode" class="admin-form">
      <input v-model="newEmail" type="email" placeholder="Adresse e-mail" required />
      <input v-model="newCode" type="text" placeholder="Code d'accès" required />
      <button type="submit">Ajouter</button>
    </form>
    <div class="codes-list">
      <h3>Codes existants</h3>
      <ul>
        <li v-for="(code, email) in codes" :key="email">
          <span>{{ email }} : <b>{{ code }}</b></span>
          <button @click="removeCode(email)">Supprimer</button>
        </li>
      </ul>
    </div>
    <div v-if="message" class="admin-message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'AdminCodes',
  data() {
    return {
      codes: {},
      newEmail: '',
      newCode: '',
      message: ''
    }
  },
  mounted() {
    this.fetchCodes()
  },
  methods: {
    async fetchCodes() {
      try {
        const res = await fetch('/codes.json')
        this.codes = await res.json()
      } catch (e) {
        this.message = 'Erreur lors du chargement des codes.'
      }
    },
    async addCode() {
      try {
        const res = await fetch('/api/codes/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.newEmail, accessCode: this.newCode })
        })
        if (res.ok) {
          this.message = 'Code ajouté avec succès.'
          this.newEmail = ''
          this.newCode = ''
          this.fetchCodes()
        } else {
          this.message = 'Erreur lors de l\'ajout.'
        }
      } catch (e) {
        this.message = 'Erreur lors de l\'ajout.'
      }
    },
    async removeCode(email) {
      try {
        const res = await fetch('/api/codes/remove', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        if (res.ok) {
          this.message = 'Code supprimé.'
          this.fetchCodes()
        } else {
          this.message = 'Erreur lors de la suppression.'
        }
      } catch (e) {
        this.message = 'Erreur lors de la suppression.'
      }
    }
  }
}
</script>

<style scoped>
.admin-codes-page {
  max-width: 600px;
  margin: 3rem auto;
  background: #181b22;
  border-radius: 1.2rem;
  padding: 2rem;
  color: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
}
.admin-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.admin-form input {
  flex: 1;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid #222;
  background: #222;
  color: #fff;
  font-size: 1rem;
}
.admin-form button {
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
.codes-list ul {
  list-style: none;
  padding: 0;
}
.codes-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #222;
  border-radius: 999px;
  padding: 0.7rem 1.2rem;
  margin-bottom: 0.7rem;
}
.codes-list button {
  background: #fff;
  color: #2563eb;
  border: none;
  border-radius: 999px;
  padding: 0.3rem 1rem;
  font-weight: 600;
  cursor: pointer;
}
.admin-message {
  margin-top: 1rem;
  color: #FFD700;
}
</style>
