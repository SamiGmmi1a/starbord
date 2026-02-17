<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="logo small">STARBORD</div>
      <div class="legal">
        © 2026 STARBORD — 
        <router-link to="/legal">Mentions légales</router-link> • 
      </div>
    </div>
  </footer>
</template>

<script setup>
// Composant statique pour le pied de page
</script>

<style scoped>
.site-footer {
  background: rgba(15, 17, 22, 0.95);
  border-top: 1px solid var(--border);
  padding: 2rem 0 1.2rem;
  margin-top: 4rem;
  color: var(--text-muted);
  font-size: 1rem;
  text-align: center;
  width: 100%;
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.logo.small {
  font-family: var(--font-title);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.2rem;
}
.legal {
  color: var(--text-muted);
  font-size: 0.95rem;
}
.legal a, .legal .router-link {
  color: var(--primary);
  text-decoration: underline;
  margin-left: 0.2rem;
}
</style>
