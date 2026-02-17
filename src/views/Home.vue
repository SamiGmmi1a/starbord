<template>
  <div class="home-page">
    <Hero />
    <div class="bd-grid">
      <div class="bd-card" v-for="comic in bdComics" :key="comic.id">
        <img :src="comic.cover" :alt="comic.title" class="bd-img" />
        <div class="bd-info">
          <h3 class="bd-title">{{ comic.title }}</h3>
          <p class="bd-author">Par {{ comic.author }}</p>
          <p class="bd-chapters">{{ comic.chapters }} chapitre(s)</p>
        </div>
        <button class="fav-btn" :class="{ active: comic.fav }" @click="toggleFav(comic)">
          <span v-if="comic.fav">★</span><span v-else>☆</span>
        </button>
      </div>
    </div>
    <!-- Section Boutique -->
    <section class="shop-section">
      <h2 class="shop-title">choisissez l'illustration qui vous ressemble</h2>
      <div class="shop-grid">
        <router-link
          v-for="product in shopProducts"
          :key="product.id"
          :to="product.link"
          class="shop-card shop-link"
        >
          <div class="shop-title-img">{{ product.title }}</div>
          <img
            :src="product.img"
            :alt="product.title"
            class="shop-img"
            width="241"
            height="305"
          />
          <div class="shop-price">25.00€</div>
          <button class="shop-choose-btn">je choisis</button>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { useComicsStore } from '../stores/comics'
import Hero from '../components/Hero.vue'


export default {
  name: 'Home',
  components: {
    Hero
  },



  data() {
    return {
      bdComics: [
        {
          id: 'bd1',
          title: 'Détenu 278',
          author: 'Fénix',
          chapters: 5,
          cover: '/assets/img/cover/detenu278-cover.jpg',
          fav: false
        },
        {
          id: 'bd2',
          title: "Figé dans l'acier",
          author: 'Fénix',
          chapters: 4,
          cover: "/assets/img/cover/fige_dans_lacier-cover.jpg",
          fav: false
        }
      ],
      shopProducts: [
        { id: 'prod1', title: 'Atomic Maid', img: '/assets/img/produits/atomic_maid.jpg', link: '/boutique/atomic_maid' },
        { id: 'prod2', title: 'Atomic Maid Int', img: '/assets/img/produits/detenu_278.jpg', link: '/boutique/atomic_maid_int' },
        { id: 'prod3', title: 'Bloody Maid Int', img: '/assets/img/produits/fige_dans_lacier.jpg', link: '/boutique/bloody_maid_int' },
        { id: 'prod4', title: 'Détenu 278', img: '/assets/img/produits/bloody_maid.jpg', link: '/boutique/detenu_278' },
        { id: 'prod5', title: 'Détenu 278 Int', img: '/assets/img/produits/fonce_crois_en_toi.jpg', link: '/boutique/detenu_278_int' },
        { id: 'prod6', title: "Figé dans l'acier", img: "/assets/img/produits/pensez_grand.jpg", link: '/boutique/fige_dans_l_acier' },
        { id: 'prod7', title: "Figé dans l'acier Int", img: "/assets/img/produits/fige_dans_l'acier_int.jpg", link: '/boutique/fige_dans_l_acier_int' },
        { id: 'prod8', title: 'Fonce crois en toi', img: '/assets/img/produits/fonce_crois_en_toi.jpg', link: '/boutique/fonce_crois_en_toi' }
      ]
    }
  },
  methods: {
    toggleFav(comic) {
      comic.fav = !comic.fav
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
    },

    
    getImagePath(fileName) {
      // Special case for fige_dans_l_acier to use the apostrophe in filename
      if (fileName === 'fige_dans_l_acier') {
        return `/assets/img/produits/fige_dans_l'acier.jpg`
      }
      return `/assets/img/produits/${fileName}.jpg`
    }
  },
  mounted() {
    const comicsStore = useComicsStore()
    if (comicsStore.comics.length === 0) {
      comicsStore.fetchComics()
    }
  }
}
</script>

<style scoped>
        .shop-choose-btn {
          width: 100%;
          background: #fff;
          color: #0F1116;
          border: none;
          border-radius: 0.7rem 0.7rem 0.7rem 0.7rem;
          font-size: 1.08rem;
          font-weight: 600;
          padding: 0.7rem 0;
          margin-top: 0.2rem;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          letter-spacing: 0.01em;
          outline: none;
          box-shadow: none;
          display: block;
        }
        .shop-choose-btn:hover,
        .shop-choose-btn:focus {
          background: #2563eb;
          color: #fff;
        }
    .shop-section {
      margin: 4rem auto 0 auto;
      max-width: 1200px;
      padding: 0 2rem 4rem 2rem;
    }
    .shop-title {
      color: #fff;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2.5rem;
      text-align: center;
      letter-spacing: 0.01em;
    }
    .shop-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2.2rem 1.5rem;
      justify-items: center;
    }
    .shop-card {
      background: none;
      box-shadow: none;
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.18s, box-shadow 0.18s;
      position: relative;
      padding: 0;
      text-decoration: none;
      width: 241px;
      cursor: pointer;
    }
    .shop-card:hover,
    .shop-card:focus {
      transform: scale(1.04);
    }
    .shop-title-img {
      color: #fff;
      font-size: 1.13rem;
      font-weight: 600;
      margin-bottom: 0.7rem;
      text-align: center;
      width: 100%;
      transition: color 0.18s;
    }
    .shop-img {
      width: 241px;
      height: 305px;
      object-fit: cover;
      border-radius: 0.7rem;
      margin-bottom: 0.7rem;
    }
    .shop-price {
      color: #fff;
      font-size: 1.12rem;
      font-weight: 600;
      margin-bottom: 0.2rem;
      text-align: center;
      width: 100%;
      letter-spacing: 0.01em;
      transition: color 0.18s;
    }
 
    @media (max-width: 1100px) {
      .shop-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 700px) {
      .shop-grid {
        grid-template-columns: 1fr;
        gap: 1.2rem;
      }
      .shop-link {
        width: 100%;
      }
      .shop-img {
        width: 100%;
        height: auto;
      }
    }
  .home-page {
    min-height: 100vh;
    background: #0F1116;
  }

  .bd-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin: 3rem auto;
    max-width: 1200px;
    padding: 0 2rem;
  }

  .bd-card {
    background: #0F1116;
    border-radius: 18px;
    border: 2px solid rgba(255,255,255,0.13);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem 1rem 1rem;
    position: relative;
    transition: transform 0.18s, border-color 0.18s;
  }

  .bd-card:hover,
  .bd-card:focus {
    transform: scale(1.04);
    border-color:rgba(255, 255, 255, 0.237);
    z-index: 2;
  }

  .bd-img {
    width: 255px;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1.2rem;
    background: #181b22;
    display: block;
  }

  .bd-info {
    text-align: center;
    margin-bottom: 0.7rem;
  }

  .bd-title {
    font-size: 1.15rem;
    color: #fff;
    font-weight: 700;
    margin: 0 0 0.3rem 0;
  }

  .bd-author {
    font-size: 0.95rem;
    color: #b3b3b3;
    margin: 0 0 0.2rem 0;
  }

  .bd-chapters {
    font-size: 0.9rem;
    color: #b3b3b3;
    margin: 0;
  }

  .fav-btn {
    position: absolute;
    top: 14px;
    right: 18px;
    background: none;
    border: none;
    font-size: 1.7rem;
    color: #fff;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0;
    line-height: 1;
  }
  .fav-btn.active,
  .fav-btn:hover {
    color: #FFD700;
  }

  @media (max-width: 1100px) {
    .bd-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 700px) {
    .bd-grid {
      grid-template-columns: 1fr;
      gap: 1.2rem;
    }
  }
</style>
