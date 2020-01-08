import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => Promise.resolve(require('@/views/login'))
const register = () => Promise.resolve(require('@/views/register'))
const notFound = () => Promise.resolve(require('@/views/404'))

const home = () => Promise.resolve(require('@/views/home'))

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '*',
      name: '404 not found',
      component: notFound
    }
  ]
})
