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
              <h2>Detalhes do Usuários</h2>
            </div>

          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          </v-card-subtitle>
          <v-card-text>
            <v-col cols="6">
              <v-card
                color="#385F73"
                dark
              >
                <v-card-title class="text-h5">
                  Usuário
                </v-card-title>

                <v-card-subtitle>
                  Nome: {{userShow.name}} <br />
                  Email: {{userShow.email}}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    elevation="10"
                    text
                    color="red"
                    @click.prevent="submit()"
                  >
                    <v-icon>delete</v-icon>
                    Excluir
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

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
        disabled: false,
        to: '/users',
        exact: true,
        link: true
      },

      {
        text: 'Usuário',
        disabled: true
      }

    ],
    userShow: {}

  }),

  mounted () {
    const params = this.$route.params
    this.getUser(params).then((response) => {
      this.userShow = response.data
    })
  },

  methods: {
    ...mapActions([
      'getUser',
      'destroyUser'
    ]),
    submit () {
      this.destroyUser(this.userShow.id)
        .then(() => {
          this.$router.push({ name: 'users' })
          this.$vToastify.success('Usuário excluido!', 'Usuários')
        })
    }
  }
}
</script>
