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
              <h2>Lista de Permissões</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                :to="{name: 'permissionCreateUpdate', params: {type: 'create', id:'0'}}"
                exact
                @click.stop="$emit('input', false)"
                link
              >
                Nova Permissão
                <v-icon right>add</v-icon>
              </v-btn>
            </div>

          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Descrição
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="permission in permissions"
                    :key="permission.id"
                  >
                    <td>{{ permission.name }}</td>
                    <td>{{ permission.description }}</td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'permissionShow', params: {id: permission.id}}"
                        @click.stop="$emit('input', false)"
                      >
                        <v-icon>visibility</v-icon>
                      </v-btn>
                      <v-btn
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'permissionCreateUpdate', params: {type: 'update', id:permission.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <!-- <v-btn
                        color="red"
                        elevation="10"
                        icon
                        x-small
                      >
                        <v-icon>delete</v-icon>
                      </v-btn> -->
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PermissionIndex',
  components: {},

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Permissões',
        disabled: true
      }

    ]

  }),

  mounted () {
    this.getPermissions()
  },

  computed: {
    ...mapState({
      permissions: state => state.permissions.permissions
    })
  },

  methods: {
    ...mapActions([
      'getPermissions'
    ])
  }
}
</script>
