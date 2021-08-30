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
              <h2>Atualizar Caixa</h2>
            </div>

          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs"></v-breadcrumbs>
          </v-card-subtitle>
          <v-card-text>
            <v-layout>
              <v-flex>
                <form>
                  <v-text-field
                    name="name"
                    label="Nome do Projeto"
                    type="text"
                    disabled
                    v-model.trim="box.name"
                  ></v-text-field>
                  <v-text-field
                    name="address"
                    label="Endereço"
                    type="text"
                    v-model.trim="box.address"
                  ></v-text-field>
                  <v-btn
                    color="primary"
                    large
                    @click.prevent="submit"
                  >Salvar</v-btn>
                </form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'RoleCreateUpdate',
  components: {},

  data: () => ({
    itemsBreadcrumbs: [
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
        text: 'Caixa',
        disabled: true
      }

    ],
    box: {
      name: '',
      address: '',
      numberPorts: '',
      status: ''
    },
    show1: false,
    type: ''

  }),

  mounted () {
    this.type = this.$route.params.type
    const params = this.$route.params
    if (params.type === 'update' && params.id !== 0) {
      this.getBox(params).then((response) => {
        this.box = response
      })
    }
  },

  computed: {

  },

  methods: {
    ...mapActions([
      'updateBox',
      'getBox'
    ]),
    submit () {
      if (this.type === 'update') {
        if (this.box.address !== '' && this.box.address !== '.') {
          this.box.status = 'ATIVA'
        } else {
          this.box.status = 'PROJETADA'
        }
        // if (this.box.address === '') {
        //   this.box.address = '.'
        // }
        this.updateBox(this.box)
          .then(response => {
            this.$router.push({ name: 'projectBoxes', params: { id: this.box.project_id } })
            this.$vToastify.success('Caixa atualizada!', 'Projetos')
          })
          .catch((errors) => {
            const messages = Object.values(errors.data)
            messages.forEach(error => {
              this.$vToastify.error(error.toString(), 'Falha')
            })
          })
      }
    }

  }
}
</script>
