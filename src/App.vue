<template>
  <div class="app">
    <Header />
    <router-view />
    <Footer />
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
