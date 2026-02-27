<template>
  <div class="feedback-carousel">
    <div class="carousel-track" :style="trackStyle" ref="track" @transitionend="onTransitionEnd">
      <div
        v-for="(review, idx) in duplicatedReviews"
        :key="'review-' + idx"
        class="feedback-card"
      >
        <div class="feedback-card-title">{{ review.name }}</div>
        <div class="feedback-card-comment">{{ review.comment }}</div>
        <div class="feedback-card-stars">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.stars }">★</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedbackCarousel',
  data() {
    return {
      reviews: [
        { id: 1, name: 'Leanne D', comment: 'Quelle magnifique illustration !! Je vais l’accrochée et l’admirer chaque jour ! Merci pour le petit porte clé qui vas beaucoup me servir. Je suis dingue de cette illustration que j’ai montré à tout mes copains et ils en sont tous trop jaloux !!! 😍😍', stars: 5 },
        { id: 2, name: 'Romain C', comment: 'L’affiche a beaucoup plu ! On a envie de voir la suite, et j’espère que ce sera bien ! ', stars: 4 },
        { id: 3, name: 'Christophe M', comment: 'Beau projet les gars ! Ne lachez rien ! On a hate de voir la suite... 😉', stars: 5 },
        { id: 4, name: 'David', comment: 'Service client très réactif.', stars: 4 },
        { id: 5, name: 'Emma', comment: 'Site moderne et facile à utiliser.', stars: 5 },
        { id: 6, name: 'Farid', comment: 'Je suis ravi de mon achat.', stars: 5 }
      ],
      cardsToShow: 4,
      translateX: 0,
      animationFrame: null,
      cardWidth: 260, // px, doit correspondre au CSS max-width
      gap: 20, // px, doit correspondre au CSS gap
      isTransitioning: true
    }
  },
  computed: {
      duplicatedReviews() {
        // Duplique les reviews pour permettre un scroll infini (8x pour éviter toute coupure)
        return [...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews, ...this.reviews];
      },
    trackStyle() {
      return {
        transform: `translateX(-${this.translateX}px)`, 
        transition: this.isTransitioning ? 'transform 0.1s linear' : 'none',
      };
    }
  },
  methods: {
    setCardsToShow() {
      if (window.innerWidth <= 700) {
        this.cardsToShow = 2;
        this.gap = 6;
        this.cardWidth = 200;
      } else if (window.innerWidth <= 900) {
        this.cardsToShow = 3;
        this.gap = 10;
        this.cardWidth = 200;
      } else {
        this.cardsToShow = 4;
        this.gap = 20;
        this.cardWidth = 260;
      }
    },
    animate() {
      const step = 0.7; // px par frame
      this.translateX += step;
      const totalCards = this.reviews.length;
      const totalWidth = totalCards * (this.cardWidth + this.gap);
      // On scroll sur 2 séries pour éviter la coupure
      if (this.translateX >= totalWidth * 2) {
        this.isTransitioning = false;
        this.translateX = 0;
        // Force le repaint pour appliquer le style sans transition
        this.$nextTick(() => {
          this.isTransitioning = true;
        });
      }
      this.animationFrame = requestAnimationFrame(this.animate);
    },
    onTransitionEnd() {
      // Rien à faire ici, la logique est gérée dans animate
    }
  },
  mounted() {
    this.setCardsToShow();
    window.addEventListener('resize', this.setCardsToShow);
    this.animationFrame = requestAnimationFrame(this.animate);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setCardsToShow);
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }
}
</script>

<style scoped>
.feedback-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem 0 3.5rem 0;
  overflow: hidden;
  padding: 2rem 0;
}
.carousel-track {
  display: flex;
  gap: 30px;
  will-change: transform;
}
.feedback-card {
  background: rgba(80, 140, 255, 0.08);
  border: 1.5px solid rgba(120, 170, 255, 0.25);
  border-radius: 1.2rem;
  min-width: 220px;
  max-width: 260px;
  width: 260px;
  padding: 2rem 1.1rem 5rem 1.1rem;
  color: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.18s, border-color 0.18s, background 0.18s;
}
.feedback-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #a9c7ff;
  text-align: left;
}
.feedback-card-comment {
  font-size: 1rem;
  margin-bottom: 0.7rem;
  text-align: left;
}
.feedback-card-stars {
  display: flex;
  gap: 0.1rem;
  justify-content: flex-start;
}
.star {
  font-size: 1.2rem;
  color: #bbb;
  transition: color 0.18s;
}
.star.filled {
  color: #FFD700;
}
.feedback-card:hover {
  background: rgba(80, 140, 255, 0.18);
  border-color: #a9c7ff;
  box-shadow: 0 6px 24px rgba(80,140,255,0.18);
  transform: translateY(-4px) scale(1.03);
  transition: background 0.18s, border-color 0.18s, box-shadow 0.18s, transform 0.18s;
}
@media (max-width: 900px) {
  .carousel-track {
    gap: 20px;
  }
  .feedback-card {
    min-width: 170px;
    max-width: 200px;
    width: 200px;
    padding: 2rem 1rem 4rem 1rem;
  }
}
@media (max-width: 700px) {
  .feedback-carousel {
    flex-direction: column;
    gap: 0.7rem;
  }
  .carousel-track {
    gap: 6px;
  }
}
</style>
