<template>
  <v-app id="inspire">
    <app-bar-component
      v-model="drawer"
      :userAuth="me"
    />
    <app-menu-component
      v-model="drawer"
      :userAuth="me"
    />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppBarComponent from './components/AppBarComponent.vue'
import AppMenuComponent from './components/AppMenuComponent.vue'

export default {
  name: 'AppLayout',
  data: () => ({
    drawer: false
  }),
  components: {
    AppBarComponent,
    AppMenuComponent
  },

  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      me: state => state.auth.me
    })

  }

}
</script>
