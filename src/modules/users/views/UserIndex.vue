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
              <h2>Lista de Usuários</h2>
              <v-btn
                color="primary"
                elevation="10"
                class="mt-2"
                to="/users/create"
                exact
                @click.stop="$emit('input', false)"
                link
              >
                Novo Usuário
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
                      Email
                    </th>
                    <th class="text-left">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="user in userslist"
                    :key="user.id"
                  >
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <v-btn
                        color="orange"
                        elevation="10"
                        icon
                        x-small
                        link
                        exact
                        :to="{name: 'userShow', params: {id: user.id}}"
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
                        :to="{name: 'userEdit', params: {id: user.id}}"
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
  name: 'VueLaralinknetUsers',
  components: {},

  data: () => ({
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        to: '/dashboard'
      },
      {
        text: 'Usuários',
        disabled: true
      }

    ]

  }),

  mounted () {
    this.getUsers()
  },

  computed: {
    ...mapState({
      userslist: state => state.users.users
    })
  },

  methods: {
    ...mapActions([
      'getUsers'
    ])
  }
}
</script>
