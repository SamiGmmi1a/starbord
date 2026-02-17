<template>
  <section class="hero">
    <div class="carousel-container">
      <div 
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-slide"
        :class="{ 
          'active': index === currentSlide,
          'prev': index === previousSlide && index !== currentSlide
        }"
      >
        <picture class="hero-picture">
          <source 
            media="(max-width: 768px)" 
            :srcset="slide.srcMobile"
          >
          <img 
            :src="slide.src" 
            :alt="slide.alt" 
            class="hero-img"
          >
        </picture>
      </div>
    </div>

    <div class="hero-gradient"></div>

    <div class="carousel-text">
      <div 
        v-for="(slide, index) in slides"
        :key="'text-' + index"
        class="text-content"
        :class="{ 'active': index === currentSlide }"
      >
        <div class="text-title">{{ slide.title }}</div>
        <div class="text-subtitle">{{ slide.subtitle }}</div>
      </div>
    </div>

    <button 
      class="scroll-to-shop" 
      aria-label="Descendre vers la boutique" 
      title="Descendre vers la boutique"
      @click="scrollToShop"
    >
      DÉCOUVRIR
    </button>

    <div class="hero-content">
      <div class="hero-text">
        <h1>STARBORD</h1>
        <p>Des bandes dessinées conçues pour inspirer à rêver grand.</p>
        <a href="#shop" class="hero-btn">Découvrir</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const previousSlide = ref(null)
let autoplayInterval = null

const slides = [
  {
    src: '/assets/img/Hero-STB-PC.png',
    srcMobile: '/assets/img/Hero-STB-mobile.png',
    alt: 'Hero STARBORD',
    title: 'STARBORD',
    subtitle: 'inspirer à rêver grand à travers des illustrations incroyables'
  },
  {
    src: '/assets/img/cover/fige_dans_lacier-cover.jpg',
    srcMobile: '/assets/img/cover/fige_dans_lacier-cover.jpg',
    alt: 'Figé dans l\'acier',
    title: 'Figé dans l\'acier',
    subtitle: 'Une aventure épique à découvrir'
  },
  {
    src: '/assets/img/cover/detenu278-cover.jpg',
    srcMobile: '/assets/img/cover/detenu278-cover.jpg',
    alt: 'Détenu 278',
    title: 'Détenu 278',
    subtitle: 'Une histoire de suspense et rédemption'
  }
]

const nextSlide = () => {
  previousSlide.value = currentSlide.value
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const scrollToShop = () => {
  const shopSection = document.querySelector('#shop')
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Auto-play: change de slide toutes les 5 secondes
  autoplayInterval = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
})
</script>

<style scoped>
/* Le style est dans assets/style/style.css */
</style>
