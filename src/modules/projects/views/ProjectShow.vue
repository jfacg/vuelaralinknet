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
              <h2>Detalhes do Projeto</h2>
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
                  Projeto
                </v-card-title>

                <v-card-subtitle>
                  Nome: {{project.name}} <br />
                  Descrição: {{project.description}}<br />
                  Descrição: {{project.description}}<br />
                  Quantidade de Caixas: {{project.numberBoxes}}<br />
                  Quantidade de Portas por Caixa: {{project.numberBoxPorts}}<br />
                  Nome da OLT: {{project.oltName}}<br />
                  Placa da OLT: {{project.oltSlot}}<br />
                  Porta da OLT: {{project.oltPort}}<br />
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
        text: 'Projetos',
        disabled: false,
        to: '/projects',
        exact: true,
        link: true
      },

      {
        text: 'Projeto',
        disabled: true
      }

    ],
    project: {}

  }),

  mounted () {
    const params = this.$route.params
    this.getProject(params).then((response) => {
      this.project = response.data
    })
  },

  methods: {
    ...mapActions([
      'getProject',
      'destroyProject'
    ]),
    submit () {
      this.destroyProject(this.project.id)
        .then(() => {
          this.$router.push({ name: 'projects' })
          this.$vToastify.success('Projeto excluido!', 'Projetos')
        })
    }
  }
}
</script>
