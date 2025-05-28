import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/homePage.vue'
import AdminLogin from '../pages/AdminLogin.vue'
import AdminSignUp from '../pages/AdminSignUp.vue'
import ProductPage from '../pages/ProductPage.vue'

const routes = [
  { path: '/', name: 'Login', component: AdminLogin },
  { path: '/homePage', name: 'Home', component: HomePage },
  { path: '/register', name: 'Cadastro', component: AdminSignUp },
  { path: '/product', name: 'produtos', component: ProductPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
