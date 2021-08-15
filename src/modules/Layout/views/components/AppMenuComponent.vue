<template>

  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    app
    :mini-variant="mini"
    absolute
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img
          src="https://randomuser.me/api/portraits/men/85.jpg"
          @click.stop="mini = !mini"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{userAuth.nick_name ? userAuth.nick_name : ''}}</v-list-item-title>
      <!-- <v-list-item-title>Linknet </v-list-item-title> -->

      <v-btn
        icon
        @click.stop="mini = !mini"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.url"
        :exact="item.exact"
        @click.stop="$emit('input', false)"
        link
        v-show="verifyPermissions(item.permission)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AppMenu',
  props: {
    value: Boolean,
    userAuth: Object
  },
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'dashboard', url: '/dashboard', exact: true, permission: '' },
      { title: 'Usuários', icon: 'how_to_reg', url: '/users', exact: true, permission: 'admin' },
      { title: 'Função', icon: 'contact_page', url: '/roles', exact: true, permission: 'admin' },
      { title: 'Permissões', icon: 'lock', url: '/permissions', exact: true, permission: 'admin' }
    ],
    mini: false

  }),

  computed: {
    ...mapState({
      me: state => state.auth.me,
      rolePermissions: state => state.auth.rolePermissions
    })

  },
  methods: {
    ...mapActions([
      'rolePermissionsAttach'
    ]),

    verifyPermissions (item) {
      let result = true
      this.rolePermissions.forEach(permission => {
        permission.name === item || item === '' ? result = true : result = false
      })
      return result
    }

  }

}
</script>
