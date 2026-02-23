<template>
  <div class="home-page">
    <Hero />


    <div class="bd-toolbar">
      <div class="bd-search-bar">
        <input
          v-model="searchQuery"
          type="search"
          class="bd-search-input"
          placeholder="Rechercher une histoire..."
          aria-label="Recherche"
        />
        <span class="bd-search-icon">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7" stroke="#a9c7ff" stroke-width="2"/>
            <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#a9c7ff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </div>
      <div class="bd-filter-bar">
        <span class="bd-filter-label">Trier par genre :</span>
        <a href="#" :class="['bd-filter-link', { active: selectedGenre === '' }]" @click.prevent="selectedGenre = ''">Tous</a>
        <a href="#" :class="['bd-filter-link', { active: selectedGenre === 'Action' }]" @click.prevent="selectedGenre = 'Action'">Action</a>
        <a href="#" :class="['bd-filter-link', { active: selectedGenre === 'Aventure' }]" @click.prevent="selectedGenre = 'Aventure'">Aventure</a>
        <a href="#" :class="['bd-filter-link', { active: selectedGenre === 'Science-fiction' }]" @click.prevent="selectedGenre = 'Science-fiction'">Science-fiction</a>
      </div>
    </div>


    <div class="bd-grid">
      <router-link
        class="bd-card"
        v-for="comic in filteredComics"
        :key="comic.id"
        :to="comic.title === 'Détenu 278' ? '/chapters/detenu278' : (comic.title === 'Figé dans l\'acier' ? '/chapters/fige_dans_lacier' : '/')"
        style="text-decoration: none; color: inherit;"
      >
        <img :src="comic.cover" :alt="comic.title" class="bd-img" />
        <div class="bd-info">
          <h3 class="bd-title">{{ comic.title }}</h3>
          <p class="bd-author">Par {{ comic.author }}</p>
          <p class="bd-chapters">{{ comic.chapters }} chapitre(s)</p>
        </div>
        
         <!-- étoile en dehors du bloc principal -->
  <div class="bd-card-fav-row">
    <button class="fav-btn" :class="{ active: comic.fav }" @click.stop="toggleFav(comic)">
      <span v-if="comic.fav">★</span><span v-else>☆</span>
    </button>
  </div>

      </router-link>
    </div>
    <!-- Section Boutique -->
    <section class="shop-section">
      <h2 class="shop-title">choisissez l'illustration qui vous ressemble</h2>
      <div class="shop-grid">
        <div
          v-for="product in shopProducts"
          :key="product.id"
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
          <a
            class="shop-choose-btn"
            :href="product.link"
            target="_blank"
            rel="noopener noreferrer"
          >je choisis</a>
        </div>
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
      // La liste des BD est désormais gérée par le store comics
      shopProducts: [
        { id: 'prod1', title: 'Atomic Maid', img: '/assets/img/produits/atomic_maid.jpg', link: 'https://starbord.shop/products/tenace?variant=55400992637252' },
        { id: 'prod2', title: 'Détenu 278', img: '/assets/img/produits/detenu_278.jpg', link: 'https://starbord.shop/products/detenu-278?variant=56241279467844' },
        { id: 'prod3', title: 'Pensez Grand', img: '/assets/img/produits/pensez_grand_1.jpg', link: 'https://starbord.shop/products/pensez-grand?variant=56428021645636' },
        { id: 'prod4', title: 'Bloody Maid', img: '/assets/img/produits/bloody_maid.jpg', link: 'https://starbord.shop/products/vaincre?variant=55400980480324' },
        { id: 'prod5', title: 'Fonce et Crois en Toi', img: '/assets/img/produits/fonce_crois_en_toi.jpg', link: '/boutique/detenu_278_int' },
        { id: 'prod6', title: "Sunflower", img: "/assets/img/produits/pensez_grand.jpg", link: 'https://starbord.shop/products/relever-un-defi-chaque-jour?variant=55683308749124' },
        { id: 'prod7', title: "Figé dans l'acier Int", img: "/assets/img/produits/fige_dans_l'acier.jpg", link: 'https://starbord.shop/products/fige-dans-lacier?variant=56241295884612' },
        { id: 'prod8', title: 'Rêve', img: '/assets/img/produits/reve_vise_fonce.jpg', link: 'https://starbord.shop/products/reve-vise-fonce?variant=55451843952964' }
      ],
      searchQuery: '',
      selectedGenre: '',
    }
  },
  methods: {
    toggleFav(comic) {
      comic.fav = !comic.fav;
    },
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
  computed: {
    filteredComics() {
      const comicsStore = useComicsStore()
      const comics = comicsStore.comics
      const normalize = str => str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
      const q = normalize(this.searchQuery)
      return comics.filter(comic => {
        const matchSearch = !q || normalize(comic.title).includes(q) || normalize(comic.author).includes(q)
        const matchGenre = !this.selectedGenre || (comic.genre && comic.genre.toLowerCase() === this.selectedGenre.toLowerCase())
        return matchSearch && matchGenre
      })
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
          .admin-access-btn-row {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 2.5rem 0 1.5rem 0;
          }
          .admin-access-btn {
            background: #2563eb;
            color: #fff;
            border-radius: 999px;
            padding: 0.7rem 2.2rem;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            box-shadow: 0 2px 12px rgba(0,168,255,0.18);
            transition: var(--transition);
            border: none;
            cursor: pointer;
          }
          .admin-access-btn:hover {
            background: #181b22;
            color: #a9c7ff;
          }
        .shop-choose-btn {
          width: 100%;
          display: block;
          background: rgba(80, 140, 255, 0.08);
          color: #a9c7ff;
          border: 1px solid rgba(120, 170, 255, 0.25);
          border-radius: 999px;
          font-size: 1.08rem;
          font-weight: 600;
          padding: 0.7rem 0;
          margin-top: 0.2rem;
          cursor: pointer;
          transition: var(--transition);
          letter-spacing: 0.01em;
          outline: none;
          box-shadow: 0 2px 12px rgba(80,140,255,0.08);
          text-align: center;
          text-decoration: none !important;
        }
        .shop-choose-btn:hover,
        .shop-choose-btn:focus {
          color: #fff;
          background: rgba(80, 140, 255, 0.18);
          border-color: rgba(150, 190, 255, 0.6);
          box-shadow: 0 0 12px rgba(80, 140, 255, 0.35);
          text-decoration: none !important;
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
    text-align: left;
    margin-bottom: 0.7rem;
    margin-left: 0.5rem;
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
      left: 18px;
      bottom: 18px;
      background: none;
      border: none;
      font-size: 1.25rem;
      color: #fff;
      cursor: pointer;
      transition: color 0.2s;
      padding: 0;
      line-height: 1;
      z-index: 2;
      font-weight: 400;
      /* Bord plus fin pour l'étoile non active */
    }
    .fav-btn span {
      font-size: 1.25rem;
      font-weight: 400;
      letter-spacing: 0;
      /* Pour étoile vide, bord plus fin */
      -webkit-text-stroke: 1px #fff;
    }
    .fav-btn.active span {
      -webkit-text-stroke: 0;
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
/* Barre de recherche BD */
.bd-search-bar {
  max-width: 600px;
  position: relative;
  display: flex;
  align-items: center;
}
.bd-search-input {
  width: 100%;
  padding: 0.85rem 2.5rem 0.85rem 1.2rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--text-primary);
  font-size: 1.08rem;
  transition: var(--transition);
  outline: none;
}
.bd-search-input:focus {
  border-color: var(--primary);
  background: rgba(0, 168, 255, 0.08);
  box-shadow: 0 0 12px rgba(0, 168, 255, 0.2);
}
.bd-search-icon {
  position: absolute;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.bd-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 5rem auto 1.5rem auto;
  gap: 2rem;
}
.bd-search-bar {
  flex: 1 1 60%;
  max-width: 600px;
  position: relative;
  display: flex;
  align-items: center;
}
.bd-filter-bar {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.bd-filter-label {
  color: #b3b3b3;
  font-size: 1.05rem;
  margin-right: 0.5rem;
}
.bd-filter-link {
  color: #a9c7ff;
  font-size: 1.08rem;
  text-decoration: none;
  margin: 0 0.3rem;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  transition: background 0.18s, color 0.18s;
  cursor: pointer;
}
.bd-filter-link:hover {
  color: #fff;
}

.bd-card-fav-row {
  width: 100%;
  display: flex;
  margin-top: 0.7rem;
  margin-bottom: 0.2rem;
}

.fav-btn {
  position: static !important;
  font-size: 1.15rem;
  color: #b3b3b3;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  line-height: 1;
  font-weight: 400;
  -webkit-text-stroke: 1px #b3b3b3;
}

.fav-btn.active {
  color: #FFD700;
  -webkit-text-stroke: 0;
}

.fav-btn span {
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: 0;
}

</style>
