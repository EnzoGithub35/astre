import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/astres',
    name: 'AstresView',
    component: () => import('../views/AstresView.vue')
  },
  {
    path: '/ImageOfTheDay',
    name: 'imageOfTheDay',
    component: () => import('../views/ImageOfTheDayView.vue')
  },
  {
    path: '/astre/:id',
    name: 'astre-details',
    component: () => import('../views/AstreDetailsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router