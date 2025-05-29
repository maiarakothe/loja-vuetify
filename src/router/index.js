import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminLogin from '../pages/AdminLogin.vue'
import AdminSignUp from '../pages/AdminSignUp.vue'
import ProductPage from '../pages/ProductPage.vue'
import Profile from '@/pages/Profile.vue'

const routes = [
  { path: '/', name: 'Login', component: AdminLogin },
  { path: '/homePage', name: 'Home', component: HomePage },
  { path: '/register', name: 'Cadastro', component: AdminSignUp },
  { path: '/product', name: 'Produtos', component: ProductPage },
  { path: '/profile', name: 'Perfil', component: Profile },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
