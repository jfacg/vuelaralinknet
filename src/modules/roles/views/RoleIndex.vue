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
                :to="{name: 'roleCreateUpdate', params: {type: 'create', id:'0'}}"
                exact
                @click.stop="$emit('input', false)"
                link
              >
                Nova Função
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
                      Permissões
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="role in roleslist"
                    :key="role.id"
                  >
                    <td>{{ role.name }}</td>
                    <td>{{ role.description }}</td>
                    <td>
                      <div
                        v-for="permission in role.permissions"
                        :key="permission.id"
                      >
                        {{permission.name}}
                      </div>
                    </td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'roleShow', params: {id: role.id}}"
                        @click.stop="$emit('input', false)"
                      >
                        <v-icon>visibility</v-icon>
                      </v-btn>
                      <v-btn
                        class="ml-2 mr-2"
                        color="primary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'roleCreateUpdate', params: {type: 'update', id:role.id}}"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        color="segunary"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'rolePermission', params: {id:role.id}}"
                      >
                        <v-icon>lock</v-icon>
                      </v-btn>

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
  name: 'RoleIndex',
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

    ]

  }),

  mounted () {
    this.getRoles()
  },

  computed: {
    ...mapState({
      roleslist: state => state.roles.roles
    })
  },

  methods: {
    ...mapActions([
      'getRoles'
    ])
  }
}
</script>
