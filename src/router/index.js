import { createRouter, createWebHistory } from 'vue-router'
import NuevaCompra from '../views/NuevaCompra.vue'
import Historial from '../views/Historial.vue'

const routes = [
  {
    path: '/',
    component: NuevaCompra
  },
  {
    path: '/historial',
    component: Historial
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router