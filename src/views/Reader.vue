<template>
  <div>
    <header :class="['reader-header', { 'header-scrolled': isScrolled }]">
      <div class="header-left">{{ chapterTitle }}</div>
      <button class="close-btn" @click="goBack" title="Fermer le lecteur">✕</button>
    </header>
    <div class="reader-content">
      <template v-if="pages && pages.length > 0">
        <template v-for="(page, index) in pages">
          <img
            v-if="isLogged || index < freeLimit"
            :key="index"
            :src="page"
            :alt="`Page ${index + 1}`"
            class="scan-img"
          >
          <div v-else-if="!isLogged && index === freeLimit" :key="'premium-cta'" class="premium-cta">
            <div>
              <p>Connectez-vous pour lire la totalité de l'histoire&nbsp;!</p>
              <router-link to="/login" class="premium-btn">Se connecter</router-link>
            </div>
          </div>
        </template>
        <div v-if="!isLogged && pages.length > freeLimit" class="premium-info">
          <p class="premium-note">Vous voyez les 5 premières pages. Connectez-vous pour lire la suite.</p>
        </div>
      </template>
      <div v-else class="loading">Chargement du chapitre...</div>
      <div class="reader-bottom">
        <div class="reader-bottom-col">
          <div class="reader-promo">
            <p>Cette histoire vous a plu ? Découvrez-en de nouvelles toujours plus incroyables sur <strong>starbord.io</strong></p>
          </div>
          <router-link to="/" class="reader-back-btn">← Retour à l'accueil</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { comicsData } from '../api/comicsData'
import { useAuthStore } from '../stores/auth'

export default {
  data() {
    return {
      comicId: this.$route.params.comicId,
      chapitreId: parseInt(this.$route.params.chapitreId),
      currentPage: 1,
      pages: [],
      freeLimit: 5,
      isScrolled: false
    }
  },
  computed: {
    isLogged() {
      const authStore = useAuthStore()
      return authStore.isLoggedIn()
    },
    totalPages() {
      return this.pages.length
    },
    chapterTitle() {
      // Affiche le titre de l'oeuvre (id ou nom) + numéro de chapitre
      return `${this.comicId} - Chapitre ${this.chapitreId}`
    }
  },
  methods: {
    loadChapter() {
      const urlToId = {
        detenu278: 'bd1',
        fige_dans_lacier: 'bd2'
      }
      const dataId = urlToId[this.comicId] || this.comicId
      const comic = comicsData[dataId]
      if (comic && comic.chapters[this.chapitreId]) {
        this.pages = comic.chapters[this.chapitreId].pages || []
        this.currentPage = 1
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 10
    },
    goBack() {
      this.$router.back()
    }
  },
  mounted() {
    this.loadChapter()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch: {
    '$route.params': {
      handler() {
        this.comicId = this.$route.params.comicId
        this.chapitreId = parseInt(this.$route.params.chapitreId)
        this.loadChapter()
      }
    }
  }
}
</script>

<style scoped>
.reader-bottom-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.reader-promo {
  color: #fff;
  text-align: center;
  font-size: 1.08rem;
  margin-bottom: 1.1rem;
}
.reader-bottom {
  display: flex;
  justify-content: center;
  margin: 2.5rem 0 1.5rem 0;
}
.reader-back-btn {
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 1.08rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid rgba(120, 170, 255, 0.25);
  color: #a9c7ff;
  background: rgba(80, 140, 255, 0.08);
  backdrop-filter: blur(6px);
  transition: var(--transition);
}
.reader-back-btn:hover, .reader-back-btn:focus {
  color: #fff;
  background: rgba(80, 140, 255, 0.18);
  border-color: rgba(150, 190, 255, 0.6);
}
.reader-header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5vw 1.2rem 2.5vw;
  background: rgba(15, 17, 22, 0.95);
  transition: background 0.3s, backdrop-filter 0.3s;
  font-family: var(--font-title);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  backdrop-filter: blur(10px);
}
.reader-header.header-scrolled {
  background: rgba(15, 17, 22, 0.2);
  backdrop-filter: blur(16px);
}
.header-left {
  flex: 1;
  text-align: left;
  font-size: 1.1rem;
  color: var(--text-primary);
  font-family: var(--font-title);
}


.close-btn {
  width: 19.61px;
  height: 32px;
  font-size: 2rem;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.close-btn:hover {
  color: #00bfff;
}


.reader-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5vw 0 3vw 0;
}
.scan-img {
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0 auto 2.5rem auto;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.13);
  background: var(--bg-card);
}
.premium-cta {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(0, 168, 255, 0.08), rgba(155, 107, 255, 0.08));
  border-radius: 12px;
  margin: 2rem 0;
}
.premium-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  text-decoration: none;
  border-radius: 999px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: var(--transition);
}
.premium-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(0, 168, 255, 0.3);
}
.loading {
  color: #98a0b3;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 3rem;
}
@media (max-width: 900px) {
  .reader-content {
    max-width: 98vw;
    padding: 2vw 0 3vw 0;
  }
}
</style>
<style scoped>
@media (max-width: 900px) {
  .reader-content {
    max-width: 98vw;
    padding: 2vw 0 3vw 0;
  }
}
@media (max-width: 700px) {
  .reader-header {
    font-size: 1rem;
    padding: 0.7rem 1rem 0.7rem 1rem;
  }
  .reader-content {
    padding: 1vw 0 2vw 0;
  }
  .scan-img {
    border-radius: 6px;
  }
  .premium-cta {
    padding: 1.5rem 0.5rem;
  }
}
@media (max-width: 480px) {
  .reader-header {
    font-size: 0.95rem;
    padding: 0.5rem 0.5vw 0.5rem 0.5vw;
  }
  .reader-promo {
    font-size: 0.97rem;
  }
  .premium-btn {
    font-size: 0.97rem;
    padding: 0.5rem 1.2rem;
  }
}
</style>
