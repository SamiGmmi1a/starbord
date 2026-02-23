<template>
  <footer class="footer-connect">
    <div class="footer-main">
      <div class="footer-title-row">
        <div class="footer-title">PENSEZ GRAND</div>
      </div>
      <div class="footer-logo-row">
        <div class="footer-logo">
          <!-- Remplacez src par votre logo -->
          <img src="/assets/img/LogoStarbord.png" alt="Logo STARBORD" />
        </div>
      </div>
      <div class="footer-subtext">Design by STARBORD</div>
    </div>
    <div class="footer-bottom">
      <div class="footer-left">
        <a href="/legal" class="footer-link">Conditions d'utilisation</a>
      </div>
      <div class="footer-right">
        <a href="https://instagram.com" target="_blank" class="footer-link">Instagram</a>
        <a href="https://tiktok.com" target="_blank" class="footer-link">TikTok</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Composant statique pour le pied de page
</script>

<style scoped>
  .footer-connect {
    background: #0F1116;
    color: #fff;
    border-top: 1px solid #222;
    font-family: 'Inter', Arial, sans-serif;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .footer-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 2.5rem;
    padding-bottom: 1.2rem;
  }
  .footer-title-row {
    margin-bottom: 0.7rem;
  }
  .footer-title {
    font-family: 'Tintin', Arial, sans-serif !important;
    font-size: 2.7rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .footer-logo-row {
    margin-bottom: 1.2rem;
  }
  .footer-logo {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .footer-logo img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
  }
  .footer-subtext {
    font-size: 1.05rem;
    color: #b3b3b3;
    margin-bottom: 0.5rem;
    text-align: center;
    letter-spacing: 0.01em;
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 2.5rem 1.2rem 2.5rem;
    font-size: 1.05rem;
    background: transparent;
  }
  .footer-left {
    flex: 1;
    text-align: left;
  }
  .footer-right {
    flex: 1;
    text-align: right;
  }
  .footer-link {
    color: #fff;
    text-decoration: none;
    margin-left: 1.2rem;
    margin-right: 0.2rem;
    font-weight: 500;
    border-radius: 999px;
    padding: 0.2rem 1rem;
    transition: background 0.18s, color 0.18s;
    border: 1px solid transparent;
  }
  .footer-link:hover {
    color: #a9c7ff;
  }

  .footer-left .footer-link {
    margin-left: 0;
  }

  @media (max-width: 700px) {
  .footer-bottom {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-end !important;
    padding: 0.5rem 0.2rem 0.7rem 0.2rem !important;
    font-size: 0.93rem !important;
    gap: 0.2rem !important;
  }
  .footer-left, .footer-right {
    flex: unset !important;
    text-align: center !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .footer-link {
    font-size: 0.93rem !important;
    margin: 0 0.3rem !important;
    padding: 0.1rem 0.7rem !important;
    display: inline-block !important;
  }
}

</style>




<style scoped>
@media (max-width: 900px) {
  .footer-title {
    font-size: 2rem;
  }
  .footer-logo {
    width: 48px;
    height: 48px;   
  }
  .footer-logo img {
    width: 48px;
    height: 48px;
  }
}
@media (max-width: 700px) {
  .footer-main {
    padding-top: 1.2rem;
    padding-bottom: 0.7rem;
  }
  .footer-title {
    font-size: 1.3rem;
  }
  .footer-subtext {
    font-size: 0.95rem;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.7rem 0.7rem 1rem 0.7rem;
    font-size: 0.97rem;
  }
  .footer-left, .footer-right {
    text-align: center;
  }
}
@media (max-width: 480px) {
  .footer-title {
    font-size: 1.1rem;
  }
  .footer-logo {
    width: 32px;
    height: 32px;
  }
  .footer-logo img {
    width: 32px;
    height: 32px;
  }
  .footer-bottom {
    font-size: 0.93rem;
    padding: 0.5rem 0.2rem 0.7rem 0.2rem;
  }
}
</style>
