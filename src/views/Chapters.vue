<template>
  <div class="chapters-page">
    <div class="chapter-layout" v-if="comic">
      <aside class="chapter-cover">
        <img :src="comic.cover" :alt="comic.title" class="comic-cover-img" />
      </aside>
      <div class="chapter-content-col">
        <div class="story-info-section">
          <div class="story-info-header">
            <h2 class="chapter-list-title">{{ comic.title }}</h2>
            <button class="close-btn" @click="$router.push('/')" title="Retour à l'accueil">✕</button>
          </div>
          <div class="chapter-list-author">par {{ comic.author }}</div>
          <div class="chapter-list-genre">Genre : {{ comic.genre || 'Action, Science-fiction, Aventure' }}</div>
          <div class="chapter-list-description">{{ comic.description }}</div>
        </div>
        <section class="chapter-list-section">
          <ul class="chapter-list">
            <li v-for="(chapter, num) in comic.chapters" :key="num" class="chapter-list-item">
              <div class="chapter-list-row">
                <span class="chapter-thumb">
                  <img
                    :src="chapter.thumb || comic.cover"
                    :alt="chapter.title"
                    class="chapter-thumb-img" 
                  />
                </span>
                <router-link
                  :to="{ name: 'Reader', params: { comicId: $route.params.id, chapitreId: num } }"
                  class="chapter-link"
                >
                  {{ chapter.linkText || chapter.title }}
                </router-link>
              </div>
            </li>
          </ul>
        </section>
      </div>
      
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
        <!-- Bouton retour Home -->
      <div class="chapter-back-row">
        <div class="chapter-back-content">
          <div class="chapter-back-text">D'autres histoires incroyables t'attendent ! Découvre-les maintenant !</div>
          <button class="chapter-back-btn" @click="$router.push('/')">← Retour à l'accueil</button>
        </div>
      </div>
</template>

<script>
export default {
  data() {
    return {
      comic: null,
      error: ''
    }
  },
  async mounted() {
    // Mapping entre l'URL et l'ID de comicsData.js
    const urlToId = {
      detenu278: 'bd1',
      fige_dans_lacier: 'bd2'
    }
    const comicId = urlToId[this.$route.params.id]
    try {
      const localData = await import('../api/comicsData.js')
      this.comic = localData.getComic(comicId)
    } catch (e) {
      this.comic = null
      this.error = 'Erreur lors du chargement du comic.'
    }
  }
}
</script>

<style scoped>
.chapter-back-row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
}
.chapter-back-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}
.chapter-back-text {
  color: #a9c7ff;
  font-size: 1.18rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
}
.chapter-back-btn {
  padding: 1.1rem 2.8rem;
  border-radius: 999px;
  font-size: 1.13rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid rgba(120, 170, 255, 0.25);
  color: #a9c7ff;
  background: rgba(80, 140, 255, 0.13);
  backdrop-filter: blur(6px);
  transition: var(--transition);
  margin-top: 0.2rem;
}
.chapter-back-btn:hover, .chapter-back-btn:focus {
  color: #fff;
  background: rgba(80, 140, 255, 0.22);
  border-color: rgba(150, 190, 255, 0.6);
}
.comic-cover-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.story-info-section {
  margin-bottom: 2rem;
}
.story-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.chapter-list-description {
  color: #e0e0e0;
  font-size: 1.08rem;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
}
.chapters-page {
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--bg-dark), var(--bg));
  padding: 2.5rem 2rem 2rem 2rem;
  min-height: 100vh;
  box-sizing: border-box;
}

.chapter-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
}

.chapter-content-col {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0;
}

.chapter-list-section {
  flex: 1;
  background: rgba(20, 22, 30, 0.85);
  border-radius: 8px;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: relative;
}
.chapter-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.chapter-list-title {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-bottom: 0;
}
.chapter-list-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.chapter-list-author {
  color: #bbb;
  font-size: 1.1rem;
  margin-bottom: 0.1rem;
}
.chapter-list-genre {
  color: #7fd6ff;
  font-size: 1.05rem;
  margin-bottom: 0.1rem;
}


.close-btn {
  font-size: 2rem !important;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  text-decoration: none;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #00bfff;
}

.chapter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.chapter-list-item {
  margin-bottom: 1rem;
}
.chapter-list-row {
  display: flex;
  align-items: center;
}
.chapter-thumb {
  display: inline-block;
  vertical-align: middle;
  margin-right: 1rem;
}
.chapter-thumb-img {
  width: 64px;
  height: 96px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  margin-bottom: 0;
}

.chapter-thumb {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
}
.chapter-thumb-img {
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  margin-bottom: -8px;
}
.chapter-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
  padding: 0rem 0.5rem;
  display: block;
  transition: color 0.2s;
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
  background: none;
  border: none; 
}
</style>
<style scoped>
@media (max-width: 900px) {
  .chapter-layout {
    flex-direction: column;
    gap: 1.2rem;
  }
  .chapter-list-section {
    padding: 1.2rem 0.5rem;
  }
}
@media (max-width: 700px) {
  .chapters-page {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
  }
  .chapter-list-title {
    font-size: 1.1rem;
  }
  .chapter-back-btn {
    font-size: 1rem;
    padding: 0.7rem 1.2rem;
  }
  .chapter-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
@media (max-width: 480px) {
  .chapter-list-section {
    padding: 0.7rem 0.2rem;
  }
  .chapter-list-title {
    font-size: 0.97rem;
  }
  .chapter-back-btn {
    font-size: 0.95rem;
    padding: 0.5rem 0.7rem;
  }
}
</style>