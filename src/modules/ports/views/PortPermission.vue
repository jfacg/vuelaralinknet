<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card
          elevation="24"
          loading
          outlined
          shaped
          pa-4
        >
          <v-card-title>
            <div>
              <h2>Lista de Funções</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                @click.prevent="submit"
              >
                Salvar Permissões
                <v-icon right>add</v-icon>
              </v-btn>
            </div>

          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          </v-card-subtitle>
          <v-card-text>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs1
                v-for="permission in permissionsList"
                :key="permission.id"
              >
                <v-checkbox
                  v-model="rolePermissions"
                  :label="permission.name"
                  :value="permission.id"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RolePermission',
  components: {},

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Funções',
        disabled: true
      }
    ],
    rolePermissions: []

  }),

  mounted () {
    const params = this.$route.params
    this.permissionAvailable(params)
    this.getPermissions()
    this.rolePermissionsAttach(params).then(() => {
      this.checked()
    })
  },

  computed: {
    ...mapState({
      permissionsAvailable: state => state.roles.permissionsAvailable,
      permissionsList: state => state.permissions.permissions,
      permissionsAttach: state => state.roles.permissionsAttach
    })

  },

  methods: {
    ...mapActions([
      'permissionAvailable',
      'attachPermissionsRole',
      'getPermissions',
      'rolePermissionsAttach'
    ]),
    async submit () {
      const params = { ...this.$route.params, permissions: this.rolePermissions }
      this.attachPermissionsRole(params)
        .then(response => {
          this.$router.push({ name: 'roles' })
          this.$vToastify.success('Nova permissão autorizada!', 'Funções')
        })
        .catch((errors) => {
          const messages = Object.values(errors.data)
          messages.forEach(error => {
            this.$vToastify.error(error.toString(), 'Falha')
          })
        })
    },

    checked () {
      this.rolePermissions = []
      return this.permissionsAttach.forEach(permission => {
        this.rolePermissions.push(permission.id)
      })
    }

  }
}
</script>
