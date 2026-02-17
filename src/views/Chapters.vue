<template>
  <div class="chapters-page">
    <header class="site-header">
      <div class="header-inner">
        <router-link to="/" class="close-btn">✕</router-link>
        <router-link to="/" class="logo">STARBORD</router-link>
        <div class="spacer"></div>
      </div>
    </header>

    <div class="chapter-layout" v-if="comic">
      <!-- Colonne gauche : image fixe -->
      <aside class="chapter-cover">
        <img :src="comic.cover" :alt="comic.title" class="comic-cover-img">
      </aside>

      <!-- Colonne droite : chapitres -->
      <section class="chapter-panel">
        <div class="comic-header">
          <h2 class="comic-title-name">{{ comic.title }}</h2>
          <p class="comic-title-author">par {{ comic.author }}</p>
        </div>

        <div class="comic-info">
          <p><strong>Auteur :</strong> {{ comic.author }}</p>
          <p><strong>Chapitres :</strong> {{ comic.chapters }}</p>
        </div>

        <ul class="chapter-list">
          <li 
            v-for="chapter in Object.keys(comic.chapters)" 
            :key="chapter"
            class="chapter-item"
          >
            <router-link 
              :to="`/reader/${comicId}/${chapter}`"
              class="chapter-link"
            >
              Chapitre {{ chapter }}
            </router-link>
          </li>
        </ul>
      </section>
    </div>

    <div class="loading" v-else>
      <p>Chargement...</p>
    </div>

    <Footer />
  </div>
</template>

<script>
import { useComicsStore } from '../stores/comics'
import Footer from '../components/Footer.vue'

export default {
  name: 'Chapters',
  components: {
    Footer
  },
  data() {
    return {
      comicId: this.$route.params.id,
      comic: null
    }
  },
  async mounted() {
    const comicsStore = useComicsStore()
    this.comic = await comicsStore.fetchComicById(this.comicId)
  }
}
</script>

<style scoped>
.chapters-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  background: #1a1a1a;
  border-bottom: 1px solid #333;
  padding: 1rem 0;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
}

.close-btn {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #00a8ff;
}

.logo {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

.spacer {
  flex: 1;
}

.chapter-layout {
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
  padding: 2rem 1rem;
}

.chapter-cover {
  flex: 0 0 300px;
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.comic-cover-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.chapter-panel {
  flex: 1;
  min-width: 0;
}

.comic-header {
  margin-bottom: 2rem;
}

.comic-title-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem;
}

.comic-title-author {
  color: #00a8ff;
  font-size: 1.1rem;
  margin: 0;
}

.comic-info {
  background: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.comic-info p {
  color: #aaa;
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.chapter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chapter-item {
  margin-bottom: 1rem;
}

.chapter-link {
  display: block;
  padding: 1rem;
  background: #2a2a2a;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  border-left: 4px solid #00a8ff;
  transition: all 0.3s ease;
  font-weight: 600;
}

.chapter-link:hover {
  background: #333;
  padding-left: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 168, 255, 0.2);
}

.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 1.1rem;
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
    max-width: 250px;
  }

  .comic-title-name {
    font-size: 1.5rem;
  }
}
</style>
