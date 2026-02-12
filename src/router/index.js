import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/token'
  },
  {
    path: '/token',
    name: 'token',
    component: () => import(/* webpackChunkName: "token" */ '../views/TokenView.vue')
  },
  {
    path: '/vehiculo',
    name: 'vehiculo',
    component: () => import(/* webpackChunkName: "vehiculo" */ '../views/VehiculoView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
