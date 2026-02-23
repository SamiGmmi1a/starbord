<template>
  <header class="site-header">
    <div class="container header-inner">
      <router-link to="/" class="logo">STARBORD</router-link>
      <div class="spacer"></div>

      <template v-if="!isLoggedIn">
        <router-link to="/login" class="login-btn">connexion</router-link>
      </template>
      <template v-else>
        <div class="user-info">
          <!-- Photo de profil supprimée -->
          <span class="user-name">Bonjour : {{ userName }}</span>
          <router-link to="/profil" class="profile-btn">profil</router-link>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Header',
  // plus de prop hideSearch
  data() {
    return {}
  },
  computed: {
    isLoggedIn() {
      const authStore = useAuthStore()
      return authStore.token !== null
    },
    userName() {
      const authStore = useAuthStore()
      // Affiche uniquement le prénom
      return authStore.prenom || ''
    },
    // userPhoto supprimé
  },

  methods: {
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
  background: rgba(15, 17, 22, 0.95);
  border-bottom: 1px solid var(--border);
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  backdrop-filter: blur(10px);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 12px;
  width: 100%;
}


.header-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.logo {
  font-family: var(--font-title);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.6px;
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);
}


.spacer {
  flex: 1;
}

.search {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0 1rem;
}

.search input {
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--border);
  padding: 8px 10px;
  border-radius: 999px;
  background: var(--glass);
  color: var(--text-muted);
  box-sizing: border-box;
  font-size: 0.9rem;
  transition: var(--transition);
}

.search input:focus {
  outline: none;
  color: var(--text-secondary);
  border-color: var(--primary);
  background: rgba(0, 168, 255, 0.08);
}

.search input::placeholder {
  color: var(--text-muted);
}

.login-btn {
  white-space: nowrap;
  padding: 7px 16px;
  margin-left: 10px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid rgba(120, 170, 255, 0.25);
  color: #a9c7ff;
  background: rgba(80, 140, 255, 0.08);
  backdrop-filter: blur(6px);
  transition: var(--transition);
}

.login-btn:hover {
  color: #ffffff;
  background: rgba(80, 140, 255, 0.18);
  border-color: rgba(150, 190, 255, 0.6);
  box-shadow: 0 0 12px rgba(80, 140, 255, 0.35);
}


@media (max-width: 900px) {
  .header-inner {
    gap: 4px;
  }
  .logo {
    font-size: 17px;
  }
  .user-info {
    min-height: 38px;
    padding: 0.3rem 0.5rem;
    gap: 0.7rem;
  }
  .profile-pic {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
  }
  .user-name {
    font-size: 0.97rem;
    min-width: 80px;
    height: 32px;
  }
  .profile-btn, .login-btn {
    font-size: 12px;
    padding: 5px 10px;
  }
}

@media (max-width: 600px) {
  .site-header {
    padding: 0.5rem 0.2rem;
  }
  .container {
    padding: 0 2px;
  }
  .header-inner {
    flex-direction: row;
    align-items: center;
    gap: 2px;
  }
  .logo {
    font-size: 15px;
    text-align: left;
    margin-bottom: 0;
    order: 1;
  }
  .spacer {
    order: 2;
  }
  .user-info, .login-btn {
    order: 3;
    margin-left: auto;
  }
  .search {
    margin: 0.5rem 0 0.5rem 0;
    order: 4;
    width: 100%;
  }
  .user-info {
    flex-direction: row;
    justify-content: flex-end;
    min-height: 32px;
    padding: 0.2rem 0.2rem;
    gap: 0.4rem;
  }
  .profile-pic {
    width: 26px;
    height: 26px;
    min-width: 26px;
    min-height: 26px;
  }
  .user-name {
    font-size: 0.9rem;
    min-width: 60px;
    height: 26px;
  }
  .profile-btn, .login-btn {
    font-size: 11px;
    padding: 4px 7px;
  }
}

  /* Ajout styles pour l'affichage utilisateur */
  .user-info {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    border-radius: 999px;
    padding: 0.5rem 1rem;
    min-height: 48px;
  }
  
  .profile-pic {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--primary);
    box-shadow: 0 0 8px rgba(80,140,255,0.12);
  }
  .user-name {
    font-weight: 600;
    color: var(--primary);
    font-size: 1.05rem;
    margin-left: 4px;
    min-width: 120px;
    text-align: left;
    height: 44px;
    display: flex;
    align-items: center;
  }
  .profile-btn {
    background: rgba(80,140,255,0.08);
    border: 1px solid rgba(120,170,255,0.18);
    color: var(--primary);
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
    border-radius: 999px;
    padding: 7px 16px;
    transition: var(--transition);
    font-weight: 500;
    box-shadow: 0 0 4px rgba(80,140,255,0.08);
    display: flex;
    align-items: center;
  }

  .profile-btn:hover, .profile-btn:focus {
    background: rgba(80,140,255,0.18);
    border-color: rgba(140,180,255,0.4);
    color: #fff;
  }
  

</style>
<style scoped>
@media (max-width: 900px) {
  .header-inner {
    flex-wrap: wrap;
    gap: 4px;
  }
  .logo {
    font-size: 17px;
  }
  .user-info {
    min-height: 38px;
    padding: 0.3rem 0.5rem;
    gap: 0.7rem;
  }
  .profile-pic {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
  }
  .user-name {
    font-size: 0.97rem;
    min-width: 80px;
    height: 32px;
  }
  .profile-btn, .login-btn {
    font-size: 12px;
    padding: 5px 10px;
  }
}
@media (max-width: 600px) {
  .site-header {
    padding: 0.5rem 0.2rem;
  }
  .container {
    padding: 0 2px;
  }
  .header-inner {
    flex-direction: row;
    align-items: center;
    gap: 2px;
  }
  .logo {
    font-size: 15px;
    text-align: left;
    margin-bottom: 0;
    order: 1;
  }
  .spacer {
    order: 2;
  }
  .user-info, .login-btn {
    order: 3;
    margin-left: auto;
  }
  .search {
    margin: 0.5rem 0 0.5rem 0;
    order: 4;
    width: 100%;
  }
  .user-info {
    flex-direction: row;
    justify-content: flex-end;
    min-height: 32px;
    padding: 0.2rem 0.2rem;
    gap: 0.4rem;
  }
  .profile-pic {
    width: 26px;
    height: 26px;
    min-width: 26px;
    min-height: 26px;
  }
  .user-name {
    font-size: 0.9rem;
    min-width: 60px;
    height: 26px;
  }
  .profile-btn, .login-btn {
    font-size: 11px;
    padding: 4px 7px;
  }
}
</style>
