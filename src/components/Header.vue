<template>
  <header class="site-header">
    <div class="container header-inner">
      <router-link to="/" class="logo">STARBORD</router-link>
      <div class="spacer"></div>
      
      <div class="search">
        <input 
          v-model="searchQuery" 
          type="search" 
          placeholder="Rechercher un titre, auteur..." 
          aria-label="Recherche"
          @keyup="handleSearch"
        >
      </div>
      
      <router-link 
        v-if="!isLoggedIn" 
        to="/login" 
        class="login-btn"
      >
        Connexion
      </router-link>
      <button v-else @click="logout" class="login-btn">
        Déconnexion
      </button>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Header',
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    isLoggedIn() {
      const authStore = useAuthStore()
      return authStore.token !== null
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery)
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
.site-header {
  background: var(--bg-darker);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.logo {
  font-family: var(--font-title);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  margin-right: 2rem;
  transition: var(--transition);
}

.logo:hover {
  color: var(--primary);
}

.spacer {
  flex: 1;
}

.search {
  margin-right: 2rem;
  flex: 0 1 300px;
}

.search input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: var(--transition);
}

.search input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.1);
}

.search input::placeholder {
  color: var(--text-muted);
}

.login-btn {
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 168, 255, 0.3);
}

@media (max-width: 768px) {
  .search {
    display: none;
  }

  .header-inner {
    gap: 1rem;
  }
}
</style>
