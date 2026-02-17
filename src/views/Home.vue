<template>
  <div class="home-page">
    <Carousel />

    <main class="container">
      <!-- Section Catalogue -->
      <section class="catalog-section">
        <div class="section-header">
          <h2>Nos nouveautés</h2>
          <p>Des histoires pour inspirer à rêver grand</p>
        </div>

        <div class="grid grid-auto">
          <router-link
            v-for="comic in displayedComics"
            :key="comic.id"
            :to="`/chapters/${comic.id}`"
            class="card card-comic"
          >
            <img :src="comic.cover" :alt="comic.title" class="img-cover">
            <div class="card-content">
              <h3 class="card-title">{{ comic.title }}</h3>
              <p class="card-subtitle">Par {{ comic.author }}</p>
              <p class="text-muted text-sm">{{ comic.chapters }} chapitre(s)</p>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Section Shop -->
      <section class="shop-section" id="shop">
        <div class="section-header">
          <h2>Nos illustrations</h2>
          <p>Derrière chaque illustration, une histoire à raconter</p>
        </div>

        <div class="grid grid-products">
          <!-- Détenu 278 et Figé dans l'acier renvoient vers leurs pages chapters -->
          <router-link 
            v-if="hasComic('bd1')"
            to="/chapters/bd1"
            class="card card-product"
          >
            <img src="/assets/img/produits/detenu_278.jpg" alt="Détenu 278" class="img-product">
            <div class="card-content">
              <h3 class="card-title">Détenu 278</h3>
              <p class="card-subtitle mt-2">Lire l'histoire</p>
            </div>
          </router-link>

          <router-link 
            v-if="hasComic('bd2')"
            to="/chapters/bd2"
            class="card card-product"
          >
            <img src="/assets/img/produits/fige_dans_lacier.jpg" alt="Figé dans l'acier" class="img-product">
            <div class="card-content">
              <h3 class="card-title">Figé dans l'acier</h3>
              <p class="card-subtitle mt-2">Lire l'histoire</p>
            </div>
          </router-link>

          <!-- Les autres produits renvoient vers le shop -->
          <a 
            v-for="product in otherProducts" 
            :key="product.id"
            :href="product.shopUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="card card-product"
          >
            <img :src="product.image" :alt="product.title" class="img-product">
            <div class="card-content">
              <h3 class="card-title">{{ product.title }}</h3>
              <p class="card-subtitle mt-2">{{ product.price }}</p>
            </div>
            <div class="card-footer">
              <span class="btn btn-primary">
                Découvrir
              </span>
            </div>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { useComicsStore } from '../stores/comics'
import Carousel from '../components/Carousel.vue'

export default {
  name: 'Home',
  components: {
    Carousel
  },
  data() {
    return {
      allProducts: [
        {
          id: 'atomic_maid',
          title: 'Atomic Maid',
          image: '/assets/img/produits/atomic_maid.jpg',
          price: '20,00 €',
          shopUrl: 'https://starbord.shop/products/tenace?variant=55400992637252'
        },
        {
          id: 'bloody_maid',
          title: 'Bloody Maid',
          image: '/assets/img/produits/bloody_maid.jpg',
          price: '20,00 €',
          shopUrl: 'https://starbord.shop/products/vaincre?variant=55400980480324'
        },
        {
          id: 'pensez_grand',
          title: 'Pensez Grand',
          image: '/assets/img/produits/pensez_grand.jpg',
          price: '20,00 €',
          shopUrl: 'https://starbord.shop/products/relever-un-defi-chaque-jour?variant=55683308749124'
        },
        {
          id: 'fonce',
          title: 'Fonce !',
          image: '/assets/img/produits/fonce.jpg',
          price: '20,00 €',
          shopUrl: 'https://starbord.shop/products/fonce-et-crois-en-toi-2?variant=55400979202372'
        },
        {
          id: 'reve_vise_fonce',
          title: 'Rêve, Vise, Fonce !',
          image: '/assets/img/produits/reve_vise_fonce.jpg',
          price: '20,00 €',
          shopUrl: 'https://starbord.shop/products/reve-vise-fonce?variant=55451843952964'
        },
        {
          id: 'fonce_crois_en_toi',
          title: 'Fonce ! Et crois en toi',
          image: '/assets/img/produits/fonce_crois_en_toi.jpg',
          price: '20,00 €',
          shopUrl: 'https://starbord.shop/products/fonce-et-crois-en-toi-1?variant=55400941846852'
        }
      ]
    }
  },
  computed: {
    displayedComics() {
      const comicsStore = useComicsStore()
      return comicsStore.comics
    },
    otherProducts() {
      return this.allProducts
    }
  },
  methods: {
    hasComic(id) {
      const comicsStore = useComicsStore()
      return comicsStore.comics.some(comic => comic.id === id)
    }
  },
  async mounted() {
    const comicsStore = useComicsStore()
    if (comicsStore.comics.length === 0) {
      await comicsStore.fetchComics()
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-dark);
}

section {
  padding: 5rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.8rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.section-header p {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin: 0;
}

.catalog-section {
  border-bottom: 1px solid var(--border);
}

.shop-section {
  background: linear-gradient(135deg, rgba(0, 168, 255, 0.08), rgba(0, 133, 204, 0.08));
  padding: 5rem 2rem;
  margin: 0 -2rem;
}

/* Cards styling */
.card-comic {
  border: 1px solid var(--border);
  cursor: pointer;
}

.card-comic:hover {
  border-color: var(--primary);
}

.card-product {
  border: none;
  background: rgba(255, 255, 255, 0.02);
}

.card-product:hover {
  background: rgba(0, 168, 255, 0.05);
}

.text-sm {
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  section {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .shop-section {
    padding: 3rem 1rem;
    margin: 0 -1rem;
  }

  .grid-auto {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .grid-products {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.5rem;
  }

  .grid-auto,
  .grid-products {
    grid-template-columns: 1fr;
  }
}
</style>
