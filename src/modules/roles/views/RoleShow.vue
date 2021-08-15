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
              <h2>Detalhes da Função</h2>
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
                  Função
                </v-card-title>

                <v-card-subtitle>
                  Nome: {{role.name}} <br />
                  Descrição: {{role.description}}
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
  name: 'VueLaralinknetRoles',
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
        disabled: false,
        to: '/roles',
        exact: true,
        link: true
      },

      {
        text: 'Função',
        disabled: true
      }

    ],
    role: {}

  }),

  mounted () {
    const params = this.$route.params
    this.getRole(params).then((response) => {
      this.role = response.data
    })
  },

  methods: {
    ...mapActions([
      'getRole',
      'destroyRole'
    ]),
    submit () {
      this.destroyRole(this.role.id)
        .then(() => {
          this.$router.push({ name: 'roles' })
          this.$vToastify.success('Função excluida!', 'Funções')
        })
    }
  }
}
</script>
