<template>
  <div class="app">
    <Header v-if="showHeaderFooter" :hideSearch="$route.name === 'Chapters'" />
    <router-view />
    <Footer v-if="showHeaderFooter" />
  </div>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useComicsStore } from './stores/comics'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed: {
    showHeaderFooter() {
      // Utilise le nom de la route (à adapter si besoin)
      const noHeaderFooter = ['Login', 'Legal', 'Reader', 'Chapters']
      return !noHeaderFooter.includes(this.$route.name)
    }
  },
  mounted() {
    // Charger les comics au démarrage
    const comicsStore = useComicsStore()
    if (comicsStore.comics.length === 0) {
      comicsStore.fetchComics()
    }
  }
}
</script>

<style>
/* Styles de la structure principale */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-dark);
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
