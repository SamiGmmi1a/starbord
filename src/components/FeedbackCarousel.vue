<template>
  <div class="feedback-carousel">
    <button class="carousel-arrow left" @click="prevSlide">&#8592;</button>
    <div class="carousel-track">
      <div
        v-for="(review, idx) in visibleReviews"
        :key="review.id"
        class="feedback-card"
        :class="{ active: idx === 2 }"
      >
        <div class="feedback-card-title">{{ review.name }}</div>
        <div class="feedback-card-comment">{{ review.comment }}</div>
        <div class="feedback-card-stars">
          <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.stars }">★</span>
        </div>
      </div>
    </div>
    <button class="carousel-arrow right" @click="nextSlide">&#8594;</button>
  </div>
</template>

<script>
export default {
  name: 'FeedbackCarousel',
  data() {
    return {
      reviews: [
        { id: 1, name: 'Alice', comment: 'Super expérience, je recommande !', stars: 5 },
        { id: 2, name: 'Benoit', comment: 'Livraison rapide et qualité au top.', stars: 4 },
        { id: 3, name: 'Chloé', comment: 'Des illustrations magnifiques !', stars: 5 },
        { id: 4, name: 'David', comment: 'Service client très réactif.', stars: 4 },
        { id: 5, name: 'Emma', comment: 'Site moderne et facile à utiliser.', stars: 5 },
        { id: 6, name: 'Farid', comment: 'Je suis ravi de mon achat.', stars: 5 }
      ],
      startIdx: 0
    }
  },
  computed: {
    visibleReviews() {
      // Always show 3 cards at a time, loop around
      const arr = [];
      for (let i = 0; i < 3; i++) {
        arr.push(this.reviews[(this.startIdx + i) % this.reviews.length]);
      }
      return arr;
    }
  },
  methods: {
    nextSlide() {
      this.startIdx = (this.startIdx + 1) % this.reviews.length;
    },
    prevSlide() {
      this.startIdx = (this.startIdx - 1 + this.reviews.length) % this.reviews.length;
    }
  }
}
</script>

<style scoped>
.feedback-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5rem 0 3.5rem 0;
}
.carousel-arrow {
  background: rgba(80, 140, 255, 0.08);
  border: 1px solid rgba(120, 170, 255, 0.25);
  border-radius: 50%;
  color: #a9c7ff;
  font-size: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.7rem;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
}
.carousel-arrow:hover {
  color: #fff;
  background: rgba(80, 140, 255, 0.18);
  border-color: rgba(150, 190, 255, 0.6);
}
.carousel-track {
  display: flex;
  gap: 1.2rem;
}
.feedback-card {
  background: rgba(80, 140, 255, 0.08);
  border: 1.5px solid rgba(120, 170, 255, 0.25);
  border-radius: 1.2rem;
  min-width: 220px;
  max-width: 260px;
  padding: 1.2rem 1.1rem 1.1rem 1.1rem;
  color: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.18s, border-color 0.18s, background 0.18s;
}
.feedback-card.active {
  background: rgba(80, 140, 255, 0.18);
  border-color: #a9c7ff;
  box-shadow: 0 4px 24px rgba(80,140,255,0.13);
}
.feedback-card-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #a9c7ff;
}
.feedback-card-comment {
  font-size: 1rem;
  margin-bottom: 0.7rem;
  text-align: center;
}
.feedback-card-stars {
  display: flex;
  gap: 0.1rem;
}
.star {
  font-size: 1.2rem;
  color: #bbb;
  transition: color 0.18s;
}
.star.filled {
  color: #FFD700;
}
@media (max-width: 900px) {
  .carousel-track {
    gap: 0.5rem;
  }
  .feedback-card {
    min-width: 170px;
    max-width: 200px;
    padding: 0.8rem 0.7rem 0.7rem 0.7rem;
  }
}
@media (max-width: 700px) {
  .feedback-carousel {
    flex-direction: column;
    gap: 0.7rem;
  }
  .carousel-track {
    gap: 0.2rem;
  }
}
</style>
