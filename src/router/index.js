import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import FoodDetailView from '../views/FoodDetailView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import OrderHistoryView from '../views/OrderHistoryView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/menu', component: MenuView },
  { path: '/food/:id', component: FoodDetailView },
  { path: '/cart', component: CartView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView },
  { path: '/orders', component: OrderHistoryView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
