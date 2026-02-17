<template>
  <div class="legal-page">
    <Header />

    <main class="legal-container">
      <div class="legal-content">
        <h1>Mentions légales</h1>
        <p><strong>Dernière mise à jour :</strong> Février 2026</p>

        <section class="legal-section">
          <h2>1. Éditeur du site</h2>
          <p>
            Le présent site internet, accessible à l'adresse <strong>starbord.io</strong>, est édité par :
          </p>
          <ul>
            <li><strong>Raison sociale / Nom :</strong> À compléter</li>
            <li><strong>Adresse :</strong> 13 bis rue de Fontaine les Dijon, 21000 Dijon, France</li>
            <li><strong>Email :</strong> À compléter</li>
            <li><strong>Responsable de la publication :</strong> À compléter</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>2. Hébergement</h2>
          <ul>
            <li><strong>Hébergeur :</strong> À compléter</li>
            <li><strong>Adresse :</strong> À compléter</li>
            <li><strong>Téléphone :</strong> À compléter</li>
            <li><strong>Site web :</strong> À compléter</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. Activité du site</h2>
          <p>
            starbord.io est une plateforme de lecture digitale de bandes dessinées sous forme de scans.
          </p>
          <p>
            Les œuvres diffusées sur le site sont exploitées dans le respect des droits d'auteur et des législations applicables en matière de propriété intellectuelle.
          </p>
        </section>

        <section class="legal-section">
          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur le site (textes, images, graphismes, logos, interfaces, œuvres numériques, bandes dessinées, etc.) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
          </p>
        </section>

        <section class="legal-section">
          <h2>5. Durée de conservation</h2>
          <p>
            Les adresses email sont conservées uniquement pendant la durée nécessaire à la fourniture du service.
          </p>
        </section>

        <section class="legal-section">
          <h2>6. Partage des données</h2>
          <p>
            Les données ne sont ni vendues, ni louées, ni cédées à des tiers.
          </p>
          <p>
            Elles peuvent être accessibles uniquement aux prestataires techniques nécessaires au fonctionnement du site.
          </p>
        </section>

        <section class="legal-section">
          <h2>7. Sécurité</h2>
          <p>
            Des mesures techniques et organisationnelles sont mises en œuvre pour protéger les données personnelles contre toute destruction, perte, altération, divulgation ou accès non autorisé. Cependant, aucune transmission sur Internet n'est entièrement sécurisée.
          </p>
        </section>

        <section class="legal-section">
          <h2>8. Accès et fonctionnement du site</h2>
          <p>
            starbord.io s'efforce d'assurer le meilleur service possible. Le site est accessible 24h/24, 7j/7, sauf en cas de force majeure, de maintenance ou d'interruption technique requise pour des raisons de sécurité.
          </p>
        </section>

        <section class="legal-section">
          <h2>9. Responsabilité</h2>
          <p>
            L'éditeur du site décline toute responsabilité en cas de dysfonctionnement, d'interruption ou de dommages découlant de l'utilisation du site. Les utilisateurs utilisent le site à leurs propriétés risques.
          </p>
        </section>

        <section class="legal-section">
          <h2>10. Liens externes</h2>
          <p>
            starbord.io peut contenir des liens vers d'autres sites. L'éditeur ne peut pas être tenu responsable du contenu de ces sites externes.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Legal',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.legal-container {
  flex: 1;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
}

.legal-content {
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 8px;
}

.legal-content h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-top: 0;
  margin-bottom: 1rem;
}

.legal-section {
  margin-bottom: 2.5rem;
}

.legal-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #00a8ff;
  margin-bottom: 1rem;
  margin-top: 0;
}

.legal-section p {
  color: #ccc;
  line-height: 1.8;
  margin: 0.5rem 0;
}

.legal-section ul {
  color: #ccc;
  line-height: 1.8;
  padding-left: 2rem;
  margin: 1rem 0;
}

.legal-section li {
  margin: 0.5rem 0;
}

strong {
  color: #fff;
  font-weight: 600;
}

@media (max-width: 768px) {
  .legal-container {
    padding: 1rem;
  }

  .legal-content {
    padding: 1.5rem;
  }

  .legal-content h1 {
    font-size: 1.8rem;
  }

  .legal-section h2 {
    font-size: 1.2rem;
  }
}
</style>
