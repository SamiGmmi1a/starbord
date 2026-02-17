<template>
  <div class="reader-page">
    <header class="site-header">
      <div class="header-inner">
        <h2 id="chapterTitle" class="chapter-title">{{ chapterTitle }}</h2>
        <button class="reader-close" @click="goBack" title="Fermer le lecteur">✕</button>
      </div>
    </header>

    <main class="reader-container">
      <div class="reader-toolbar">
        <div class="toolbar-content">
          <span class="page-counter">Page {{ currentPage }} / {{ totalPages }}</span>
          <div class="toolbar-actions">
            <button 
              @click="previousPage" 
              :disabled="currentPage === 1"
              class="nav-btn"
            >
              ← Précédent
            </button>
            <button 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
              class="nav-btn"
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>

      <div class="reader-inner" id="pagesContainer">
        <div v-if="visiblePages.length > 0" class="pages-wrapper">
          <img 
            v-for="(page, index) in visiblePages"
            :key="index"
            :src="page"
            :alt="`Page ${currentPage + index}`"
            class="page-img"
          >
        </div>

        <div v-else-if="!isLogged && currentPage > freeLimit" class="premium-cta">
          <div class="premium-content">
            <h3>Contenu réservé aux abonnés</h3>
            <p>Connectez vous pour lire la suite</p>
            <router-link to="/login" class="premium-btn">
              Se connecter
            </router-link>
          </div>
        </div>

        <div v-else class="loading">
          <p>Chargement du chapitre...</p>
        </div>
      </div>
    </main>

    <!-- Bandeau chapitre suivant -->
    <div v-if="currentPage === totalPages && nextChapterLink" class="next-chapter-banner">
      <router-link :to="nextChapterLink" class="next-chapter-btn">
        Chapitre suivant →
      </router-link>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { useComicsStore } from '../stores/comics'

export default {
  name: 'Reader',
  data() {
    return {
      comicId: this.$route.params.comicId,
      chapitreId: parseInt(this.$route.params.chapitreId),
      currentPage: 1,
      pages: [],
      freeLimit: 5
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
    visiblePages() {
      if (this.currentPage <= this.freeLimit || this.isLogged) {
        return [this.pages[this.currentPage - 1]].filter(Boolean)
      }
      return []
    },
    chapterTitle() {
      return `${this.comicId} - Chapitre ${this.chapitreId}`
    },
    nextChapterLink() {
      return `/reader/${this.comicId}/${this.chapitreId + 1}`
    }
  },
  methods: {
    async loadChapter() {
      const comicsStore = useComicsStore()
      const comic = await comicsStore.fetchComicById(this.comicId)
      
      if (comic && comic.chapters[this.chapitreId]) {
        this.pages = comic.chapters[this.chapitreId].pages || []
        this.currentPage = 1
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.scrollToTop()
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.scrollToTop()
      }
    },
    goBack() {
      this.$router.back()
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    this.loadChapter()
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
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
.reader-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
}

.site-header {
  background: #0a0a0a;
  border-bottom: 1px solid #333;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.reader-close {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease;
}

.reader-close:hover {
  color: #00a8ff;
}

.reader-container {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
}

.reader-toolbar {
  background: #2a2a2a;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.toolbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-counter {
  color: #aaa;
  font-weight: 600;
}

.toolbar-actions {
  display: flex;
  gap: 0.5rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #00a8ff;
  border-color: #00a8ff;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reader-inner {
  background: #2a2a2a;
  border-radius: 4px;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pages-wrapper {
  width: 100%;
}

.page-img {
  width: 100%;
  height: auto;
  display: block;
}

.premium-cta {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(0, 168, 255, 0.1), rgba(0, 133, 204, 0.1));
}

.premium-content h3 {
  color: white;
  font-size: 1.5rem;
  margin: 0 0 1rem;
}

.premium-content p {
  color: #aaa;
  font-size: 1.1rem;
  margin: 0 0 1.5rem;
}

.premium-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #00a8ff, #0085cc);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.premium-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 168, 255, 0.3);
}

.loading {
  color: #aaa;
  font-size: 1.1rem;
}

.next-chapter-banner {
  background: linear-gradient(135deg, #00a8ff, #0085cc);
  text-align: center;
  padding: 2rem;
  margin: 2rem 0 0;
}

.next-chapter-btn {
  display: inline-block;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border: 2px solid white;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.next-chapter-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .reader-container {
    padding: 1rem;
  }

  .toolbar-content {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-actions {
    justify-content: center;
  }

  .nav-btn {
    flex: 1;
  }
}
</style>
