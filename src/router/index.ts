import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Easy from '../views/Easy.vue'
import Medium from '../views/Medium.vue'
import Hard from '../views/Hard.vue'
import Hello from '../views/Home.vue'
import {  useQuizStore } from '../stores'

  

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
      path: '/easy',
      name: 'easy_quiz',
      component: Easy
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
    
  ]
})
var quizStore
router.beforeEach((to, from, next) => {   
  if (to.name !== 'login' && !useQuizStore().token) next('/login')
  else next()
})

export default router
