<template>

    <div v-if="comic">
      <header :class="['story-info-header', { 'header-scrolled': isScrolled }]">
        <h2 class="chapter-list-title">{{ comic.title }}</h2>
        <button class="close-btn" @click="$router.push('/')" title="Retour à l'accueil">✕</button>
      </header>

    <div class="chapter-layout" v-if="comic">
 
    <aside class="chapter-cover">
        <img :src="comic.cover" :alt="comic.title" class="comic-cover-img" />
      </aside>
      <div class="chapter-content-col">
        <div class="story-info-section">

          <div class="chapter-list-author">Par {{ comic.author }}</div>
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

        <!-- Bouton retour Home -->
      <div class="chapter-back-row">
        <div class="chapter-back-content">
          <div class="chapter-back-text">D'autres histoires incroyables t'attendent !<br> Découvre-les maintenant !</br></div>
          <button class="chapter-back-btn" @click="$router.push('/')">← Retour à l'accueil</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      comic: null,
      error: '',
      isScrolled: false
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
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 10
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
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
}
.chapter-back-btn {
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  font-size: 0.98rem;
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

/* Header sticky et blur identique à Reader.vue */
.story-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 1.2rem 2.5vw 1.2rem 2.5vw;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(15, 17, 22, 0.95);
  transition: background 0.3s, backdrop-filter 0.3s;
  font-family: var(--font-title);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  backdrop-filter: blur(10px);
}
.story-info-header.header-scrolled {
  background: rgba(15, 17, 22, 0.2);
  backdrop-filter: blur(16px);
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
  overflow: visible;
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
  font-size: 1.5rem !important;
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
  font-size: 1.5rem;
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
    .chapter-back-text {
      font-size: 0.93rem !important;
    }
    .chapter-back-btn {
      font-size: 0.93rem !important;
      padding: 0.5rem 1rem !important;
    }
  .chapters-page {
    padding: 0 !important;
    background: #0F1116 !important;
  }
  .chapter-layout {
    flex-direction: column !important;
    gap: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .story-info-header {
    padding: 1rem !important;
    font-size: 1.1rem;
    backdrop-filter: blur(10px);
  }
  .story-info-header.header-scrolled {
    background: rgba(15, 17, 22, 0.2);
    backdrop-filter: blur(16px);
  }


  .chapter-list-title {
    font-size: 1.5rem !important;
    font-weight: 800 !important;
    color: #fff !important;
    margin: 0 !important;
    letter-spacing: 0.01em !important;
    text-align: center !important;
  }
  .close-btn {
    font-size: 2rem !important;
    color: #fff !important;
    background: none !important;
    border: none !important;
    cursor: pointer !important;
    margin-left: 1rem !important;
    text-decoration: none !important;
    transition: color 0.2s !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    line-height: 1 !important;
  }
  .close-btn:hover {
    color: #00bfff !important;
  }
  .chapter-cover {
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    background: #0F1116 !important;
  }
  .comic-cover-img {
    width: 100vw !important;
    max-width: 100vw !important;
    height: auto !important;
    border-radius: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    display: block !important;
  }
  .chapter-content-col {
    width: 100vw !important;
    max-width: 100vw !important;
    padding: 0 !important;
    margin: 0 !important;
    background: #0F1116 !important;
  }
  .story-info-section {
    padding: 1.2rem 1rem 0.5rem 1rem !important;
    background: #0F1116 !important;
    border-bottom: 1px solid #23242a33 !important;
  }
  .chapter-list-author {
    font-size: 1.3rem !important;
    color: #b3b3b3 !important;
  }

  .chapter-list-genre {
    color: #7fd6ff !important;
    font-size: 1rem !important;
    margin-bottom: 0.2rem !important;
  }

  .chapter-list-description {
    color: #e0e0e0 !important;
    font-size: 1.05rem !important;
    margin-top: 0.5rem !important;
    margin-bottom: 0.2rem !important;
  }
  .chapter-list-section {
    background: rgba(20, 22, 30, 0.85) !important;
    border-radius: 12px !important; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
  }
  .chapter-list {
    padding: 0 !important;
    margin: 0 !important;
  }

  .chapter-list-row {
    display: flex !important;
    align-items: center !important;
    border-radius: 10px !important;
    padding: 0.7rem 1rem !important;
  }
  .chapter-thumb {
    margin-right: 0.7rem !important;
  }
  .chapter-thumb-img {
    width: 56px !important;
    height: 56px !important;
    object-fit: cover !important;
    border-radius: 8px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.15) !important;
    margin-bottom: 0 !important;
  }
  .chapter-link {
    color: #fff !important;
    text-decoration: none !important;
    font-size: 1.1rem !important;
    padding: 0rem 0.5rem !important;
    display: block !important;
    transition: color 0.2s !important;
  }
}

@media (max-width: 480px) {
  .chapter-list-section {
    padding: 0.7rem 0.2rem;
  }
  .chapter-list-title {
    font-size: 1.5rem !important;
    text-align: center !important;
  }
  .chapter-back-btn {
    font-size: 0.95rem;
    padding: 0.5rem 0.7rem;
  }
}
</style>