import Vue from 'vue'
// import App from '@/App.vue'
import App from './modules/Layout/views/BaseLayout'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import vuelidate from '@/plugins/vuelidate'
import toastify from '@/plugins/toastify'
require('./bootstrap')

Vue.config.productionTip = false

/**
 * Global Components
 */
Vue.component('preloader-component', () => import('./components/Preloader'))

new Vue({
  router,
  store,
  vuetify,
  vuelidate,
  toastify,
  render: h => h(App)
}).$mount('#app')

store.dispatch('me')
  .then(() => {
    if (router.history.current.name === undefined) {
      router.push({ name: 'login' })
    }

    if (router.history.current.name === 'login' && store.state.auth.authenticated === true) {
      router.push({ name: 'dashboard' })
    }
  })
