<template>
  <div>
    <v-app-bar
      app
      fixed
    >
      <v-app-bar-nav-icon @click.stop="$emit('hide', !show)"></v-app-bar-nav-icon>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-toolbar-title>Linknet Telecom - Usuário: {{me.name ? me.name : ''}}</v-toolbar-title>
      <!-- <span @click.prevent="logout">sair</span> -->

      <v-btn
        icon
        right
        absolute
        @click.prevent="submit"
      >
        Sair
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Appbarcomponent',
  props: {
    show: Boolean,
    userAuth: Object
  },
  model: {
    prop: 'show',
    event: 'hide'
  },
  computed: {
    ...mapState({
      me: state => state.auth.me,
      rolePermissions: state => state.auth.rolePermissions
    })

  },

  methods: {
    ...mapActions([
      'logout'
    ]),
    submit () {
      this.logout()
        .then(
          this.$router.push({ name: 'login' })
        )
    }

  }

}
</script>
