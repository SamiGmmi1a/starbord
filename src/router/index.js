import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Chapters from '../views/Chapters.vue'
import Reader from '../views/Reader.vue'
import Legal from '../views/Legal.vue'

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
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
