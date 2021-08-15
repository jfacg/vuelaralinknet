import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from './../store'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes
  ]
})

// router.beforeEach((to, from, next) => {
// if (to.name !== 'login' && !store.state.auth.authenticated) {
//   next('login')
// }
// console.log(router)
// if (router.history.current.name === 'login' && store.state.auth.authenticated) {
//   next('dashboard')
// }

// next()
// })

export default router
