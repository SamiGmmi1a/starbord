<template>
  <div class="chapters-page">

    <div class="chapter-layout" v-if="comic">
      <!-- Colonne gauche : image fixe -->
      <aside class="chapter-cover">
        <img :src="comic.cover" :alt="comic.title" class="comic-cover-img">
      </aside>

    <div class="chapter-layout" v-if="comic">
      <aside class="chapter-cover">
        <img :src="comic.cover" :alt="comic.title" class="comic-cover-img" />
      </aside>
    </div>
    <div v-else>
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
        <router-link to="/" class="back-home">Retour à l'accueil</router-link>
      </div>
      <div v-else class="loading">
        <p>Chargement...</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { useComicsStore } from '../stores/comics'

export default {

  data() {
    return {
      comicId: this.$route.params.id,
      comic: null,
      error: null
    }
  },
  async mounted() {
    const comicsStore = useComicsStore()
    let result = null
    // 1. Try API
    try {
      result = await comicsStore.fetchComicById(this.comicId)
    } catch (e) {
      result = null
    }
    // 2. Always fallback to local static data if API fails or returns nothing
    if (!result) {
      try {
        const localData = await import('../api/comicsData.js')
        result = localData.getComic(this.comicId)
      } catch (e) {
        result = null
      }
    }
    if (!result) {
      this.error = "BD introuvable. Vérifiez l'URL ou choisissez une autre histoire.";
    } else {
      this.comic = result
      this.error = null
    }
  }
}
</script>

<style scoped>
.chapters-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--bg-dark), var(--bg));
}

.site-header {
  background: rgba(15, 17, 22, 0.95);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}

.close-btn {
  font-size: 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  margin-right: 1rem;
  cursor: pointer;
  transition: var(--transition);
}

.close-btn:hover {
  color: var(--primary);
}

.logo {
  color: var(--text-primary);
  text-decoration: none;
}

.spacer {
  flex: 1;
}

.chapter-layout {
  flex: 1;
  display: flex;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
  padding: 2rem 1rem;
}

.chapter-cover {
  flex: 0 0 250px;
  position: sticky;
  top: 6rem;
  height: fit-content;
}

.comic-cover-img {
  width: 100%;
  height: auto;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  aspect-ratio: 2 / 3;
  object-fit: cover;
}

.chapter-panel {
  flex: 1;
  min-width: 0;
}

.comic-header {
  margin-bottom: 2rem;
}

.comic-title-name {
  font-family: var(--font-title);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.comic-title-author {
  color: var(--primary);
  font-size: 1.1rem;
  margin: 0;
}

.comic-info {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1.5rem;
  border-radius: var(--radius);
  margin-bottom: 2rem;
}

.comic-info p {
  color: var(--text-muted);
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.chapter-list {
  list-style: none;
  padding: 0;
  margin: 0;

}
.chapter-item {
  margin-bottom: 1.2rem;
}
.chapter-item-flex {
  display: flex;
  align-items: center;
}
.chapter-link {
  display: flex;
  align-items: center;
  padding: 0.7rem 1.2rem;
  background: var(--bg-card);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  border-left: 4px solid var(--primary);
  transition: var(--transition);
  font-weight: 600;
  min-height: 90px;
  gap: 1.2rem;
}
.chapter-link:hover {
  background: rgba(0, 168, 255, 0.08);
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 168, 255, 0.2);
}
.chapter-link-flex {
  display: flex;
  align-items: center;
}
.chapter-thumb {
  width: 70px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1.2rem;
  background: #181b22;
  border: 1px solid var(--border);
}
.chapter-link-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chapter-link-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);

}
.comic-story-block {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.2rem 1.5rem 1.2rem 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
}
.comic-story-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}
.comic-story-text {
  color: var(--text-primary);
  font-size: 1.08rem;
  line-height: 1.6;
}

.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 1.1rem;
}
.error-message {
  color: #ff4d4f;
  background: #fff0f0;
  border: 1px solid #ff4d4f;
  padding: 2rem;
  border-radius: var(--radius);
  text-align: center;
  margin: 2rem auto;
  max-width: 400px;
}
.back-home {
  display: inline-block;
  margin-top: 1rem;
  color: var(--primary);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .chapter-layout {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .chapter-cover {
    position: static;
    flex: none;
    max-width: 200px;
  }

  .comic-title-name {
    font-size: 1.5rem;
  }
  
  .chapter-layout {
    max-width: 100%;
  }
}
</style>
