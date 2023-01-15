import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Easy from '../views/Easy.vue'
import Medium from '../views/Medium.vue'
import Hard from '../views/Hard.vue'
import Hello from '../components/HelloWorld.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },    
    {
      path: '/medium',
      name: 'medium_quiz',
      component: Medium
    },
    {
      path: '/hard',
      name: 'hard_quiz',
      component: Hard
    },    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
