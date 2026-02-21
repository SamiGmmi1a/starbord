import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Chapters from '../views/Chapters.vue'
import Reader from '../views/Reader.vue'
import Legal from '../views/Legal.vue'
import Profil from '../views/Profil.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/chapters/:id',
    name: 'Chapters',
    component: Chapters
  },
  {
    path: '/reader/:comicId/:chapitreId',
    name: 'Reader',
    component: Reader
  },
  {
    path: '/legal',
    name: 'Legal',
    component: Legal
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
 

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protection des routes nécessitant une connexion
import { useAuthStore } from '../stores/auth'
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // Seule la page Profil est protégée
  if (to.name === 'Profil' && !authStore.isLoggedIn()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
