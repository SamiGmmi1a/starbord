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
      <div class="bd-filter-label">Trier par genre :</div>
      <div class="bd-filter-links">
      <div>
        <a class="bd-filter-link" href="#">Tous</a>
        <div class="">
        <a class="bd-filter-link" href="#">Action</a>
        </div>
        <div>
         <a class="bd-filter-link" href="#">Fantastique</a>
        </div>
        <div>
        <a class="bd-filter-link" href="#">Aventure</a>
        </div>
        <div>
        <a class="bd-filter-link" href="#">Science-fiction</a>
        </div>
       </div>

      </div>
    </div>
    </div>
           <hr class="separateur">




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

<!-- Présentation STARBORD -->
  <div class="stb-presentation">
    <h2 class="stb-presentation-title">nous somme starbord</h2>
  <!-- étoiles de décoration -->

    <div class="stb-presentation-stars">
      <svg v-for="n in 3" :key="n" width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="margin: 0 0.3em;">
        <path d="M12 2l2.917 6.26L22 9.27l-5 4.87L18.834 22 12 18.27 5.166 22 7 14.14l-5-4.87 7.083-1.01z"/>
      </svg>
    </div>


    <div class="stb-presentation-content">
      <div class="stb-presentation-img">
       <img src="/assets/img/stb-presentation.png" alt="Présentation de Starbord" width="400" height="300">
      </div>
        <div class="stb-presentation-text">
      <h3>des cadres uniques, pour des histoires uniques</h3>
      <p>...</p>
    </div>
  </div>
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

    <!--espace avis clients-->
    <div class="feedback">
      <h2 class="feedback-title">visez toujours plus haut</h2>
      <FeedbackCarousel />
    </div>

  </div>
</template>

<script>
import { useComicsStore } from '../stores/comics'
import Hero from '../components/Hero.vue'
import FeedbackCarousel from '../components/FeedbackCarousel.vue'


export default {
  name: 'Home',
  components: {
    Hero,
    FeedbackCarousel
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
    // Animation parallax sur stb-presentation-img
    const imgWrapper = document.querySelector('.stb-presentation-img');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;
    if (imgWrapper && img) {
      imgWrapper.addEventListener('mousemove', (e) => {
        const rect = imgWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        img.style.transform = `scale(1.04) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      });
      imgWrapper.addEventListener('mouseleave', () => {
        img.style.transform = 'none';
      });
      imgWrapper.addEventListener('mouseenter', () => {
        img.style.transition = 'transform 0.18s cubic-bezier(.25,.8,.25,1)';
      });
    }
  }
}
</script>

<style scopse>
/* --- Boutique --- */
.shop-section {
  margin: 4rem auto 0 auto;
  max-width: 1200px;
  padding: 0 2rem 4rem 2rem;
}
.shop-title {
  color: #fff;
  font-size: 1.5rem !important;
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
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  font-size: 1.12rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  text-align: center;
  width: 100%;
  letter-spacing: 0.01em;
  transition: color 0.18s;
}
.shop-choose-btn {
  width: 100%;
  background: rgba(80, 140, 255, 0.08);
  color: #a9c7ff;
  border: 1px solid rgba(120, 170, 255, 0.25);
  border-radius: 999px;
  font-size: 1.08rem;
  font-weight: 600;
  padding: 0.7rem 0;
  margin-top: 0.2rem;
  transition: var(--transition);
  letter-spacing: 0.01em;
  text-align: center;
  text-decoration: none;
}
.shop-choose-btn:hover,
.shop-choose-btn:focus {
  color: #fff;
  background: rgba(80, 140, 255, 0.18);
  border-color: rgba(150, 190, 255, 0.6);
  text-decoration: none;
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
    .bd-search-bar {
      margin: 0 auto 1rem auto;
      width: 100vw;
      max-width: 95vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .bd-search-input {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      text-align: center;
    }
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

@media (max-width: 700px) {
  .bd-filter-bar {
    flex-direction: column !important;
    align-items: center !important;
    gap: 0.2rem !important;
    width: 100vw;
    justify-content: center !important;
    text-align: center !important;
  }
  .bd-filter-label {
    width: 100%;
    text-align: center !important;
    margin-bottom: 0.2rem;
    font-weight: 700;
  }
  .bd-filter-links {
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    margin: 0 auto;
  }
}

.bd-filter-label {
  color: #b3b3b3;
  font-size: 1rem;
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
  text-decoration: none;
}

.bd-card-fav-row {
  width: 100%;
  display: flex;
  margin-top: 0.7rem;
}


/* Présentation STARBORD */
.stb-presentation {
    background: rgba(8, 9, 12, 0.503);
}

/* Décoration étoiles stb-presentation */
.stb-presentation-stars {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}
@media (max-width: 700px) {
  .stb-presentation-stars {
    margin: 0.3rem 0 0.7rem 0;
  }
}

.stb-presentation-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
  padding: 0 0.7rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  width: 100%;
  box-sizing: border-box;
  gap: 2rem;
}


@media screen and (max-width: 900px) {
  .stb-presentation-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .stb-presentation-content h3 {
    text-align: center;
    font-size: 1rem;
  }

}

.stb-presentation-title {
  font-size: 1.5rem !important;
  font-weight: 700;
  padding: 1.2rem;
  padding-top: 3rem;
  text-align: center !important;
}

.stb-presentation-img {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  box-shadow: 0 2px 16px rgba(0,0,0,0.13);
  overflow: hidden;
}
.stb-presentation-img img {
  width: 100%;
  display: block;
  transition: transform 0.18s cubic-bezier(.25,.8,.25,1);
  will-change: transform;
}

.stb-presentation-content p {
  font-size: 1.15rem;
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .stb-presentation {
    max-width: 98vw;
    padding: 2rem 3vw;
    border-radius: 14px;
    gap: 1.5rem;
  }
}
@media (max-width: 700px) {
  .stb-presentation {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem 4vw;
    border-radius: 10px;
    gap: 0.1rem;
  }

  .stb-presentation-content p {
    font-size: 1rem;
    text-align: center;
  }
  .stb-presentation-img {
    max-width: 90vw;
    margin-bottom: 0.7rem;
  }
}

@media (max-width: 1235px) and (min-width: 480px) {
  .bd-grid, .shop-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }
}

/* Aligne les liens de filtre sur une seule ligne, même entourés de div */
.bd-filter-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}
.bd-filter-links > div {
  display: flex;
}
.bd-filter-link {
  display: inline-block;
  min-width: 80px;
  text-align: center;
}

@media (max-width: 700px) {
  .bd-filter-links {
    flex-wrap: wrap;
    gap: 0.2rem 0.5rem;
    max-width: 98vw;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    overflow-x: auto;
    box-sizing: border-box;
  }
  .bd-filter-link {
    min-width: unset;
    padding: 0.18rem 0.7rem;
    margin: 0.1rem 0.2rem;
    word-break: break-word;
    white-space: normal;
    text-align: center;
  }
}

.separateur {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.13);
  margin: 0 auto;
  width: 50%;
  max-width: 95vw;
}

</style>

