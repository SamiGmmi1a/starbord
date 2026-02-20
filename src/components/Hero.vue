<template>
  <section class="hero">
    <div class="carousel-container">
      <div 
        v-for="(slide, i) in slides" 
        :key="i" 
        class="carousel-slide" 
        :class="{ active: i === currentSlide }"
      >
        <picture class="hero-picture">
          <source 
            media="(max-width: 768px)" 
            :srcset="slide.srcMobile"
          >
          <img :src="slide.src" :alt="slide.alt" class="hero-img">
        </picture>
      </div>
    </div>



    <div class="hero-content">
      <div class="hero-text-bg">
        <div class="hero-text-fade"></div>
        <h1 class="hero-title">STARBORD</h1>
        <p class="hero-subtitle">inspirer à rêver grand à travers des illustrations incroyables</p>
      </div>
      <button class="hero-btn hero-btn-absolute" @click="scrollToShop">DÉCOUVRIR</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          src: '/assets/img/Hero-STB-PC.png',
          srcMobile: '/assets/img/Hero-STB-mobile.png',
          alt: 'Hero STARBORD'
        },
        {
          src: '/assets/img/cover/fige_dans_lacier-cover.jpg',
          srcMobile: '/assets/img/cover/fige_dans_lacier-cover.jpg',
          alt: "Figé dans l'acier"
        },
        {
          src: '/assets/img/cover/detenu278-cover.jpg',
          srcMobile: '/assets/img/cover/detenu278-cover.jpg',
          alt: 'Détenu 278'
        }
      ],
      intervalId: null
    }
  },
  mounted() {
    this.startCarousel()
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
  },
  methods: {
    startCarousel() {
      this.intervalId = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length
      }, 5000)
    },
    scrollToShop() {
      // Scroll to the first .shop-grid section
      const shopSection = document.querySelector('.shop-grid');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 420px;
  background: linear-gradient(135deg, var(--bg-dark), var(--bg));
  overflow: hidden;
  padding-bottom: 2rem;
.hero {
  position: relative;
  width: 100%;
  min-height: 420px;
  background: linear-gradient(135deg, var(--bg-dark), var(--bg));
  overflow: hidden;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 420px;
  z-index: 1;
  overflow: hidden;
}
.hero-img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}
  z-index: 2;
}

.hero-picture {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}

.carousel-text {
  position: absolute;
  left: 0; right: 0; top: 2.5rem;
  z-index: 4;
  text-align: center;
}
.text-title {
  font-family: var(--font-title);
  font-size: 2.2rem;
  color: var(--primary);
  font-weight: 800;
  letter-spacing: 1px;
}
.text-subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.scroll-to-shop {
  position: absolute;
  left: 50%;
  bottom: 2.5rem;
  transform: translateX(-50%);
  z-index: 5;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0,168,255,0.18);
  transition: var(--transition);
}
.scroll-to-shop:hover {
  background: var(--primary-dark);
}

.hero-content {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  right: 0;
  z-index: 6;
  display: flex;
  align-items: stretch;
  height: 100%;
  pointer-events: none;
}

.hero-title {
  font-family: var(--font-title);
  font-size: 3.2rem;
  color: #fff;
  font-weight: 800;
  margin: 0 0 1.2rem 0;
  letter-spacing: 1px;
}
.hero-subtitle {
  color: #fff;
  font-size: 1.35rem;
  margin: 0 0 2.2rem 0;
  font-weight: 400;
}
.hero-text-bg {
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.85) 40%,
      rgba(0, 0, 0, 0.4) 75%,
      rgba(0, 0, 0, 0) 100%
  );
  padding: 3.5rem 25rem 2rem 3.5rem;
  max-width: 750px;
  margin-bottom: 0;
  margin-left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
}

.hero-title, .hero-subtitle, .hero-btn {
  position: relative;
  z-index: 2;
}
.hero-content {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  right: 0;
  z-index: 6;
  display: flex;
  align-items: stretch;
  height: 100%;
  pointer-events: none;
  flex-direction: column;
  justify-content: flex-end;
}
.hero-btn {
  display: inline-block;
  background: #fff;
  color: #0F1116;
  border-radius: 250px;
  padding: 1rem 3rem;
  font-size: 1.08rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(0,168,255,0.18);
  transition: var(--transition);
  margin-top: 0.5rem;
  pointer-events: auto;
  border: none;
  cursor: pointer;
}
.hero-btn-absolute {
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  z-index: 20;
  pointer-events: auto;
}
.hero-btn:hover {
  background: #0c0f1479;
  color: #fff;
  border: 1px solid #46546F;
}

@media (max-width: 768px) {
  .carousel-container, .hero-img {
    height: 200px;
  }
  .hero-content {
    padding-bottom: 0.5rem;
  }
  .text-title {
    font-size: 1.3rem;
  }
}
</style>
