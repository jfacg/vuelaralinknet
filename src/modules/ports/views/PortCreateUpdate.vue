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
              <h2>Atualizar Porta: {{ port.name }}</h2>
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
                    v-model.trim="port.name"
                  ></v-text-field>
                  <v-text-field
                    name="cableCode"
                    label="Código do Cabo"
                    type="number"
                    v-model.trim="port.cableCode"
                  ></v-text-field>
                  <v-text-field
                    name="clientIxc_id"
                    label="Código do Cliente no IXC"
                    type="number"
                    v-model.trim="port.clientIxc_id"
                  ></v-text-field>
                  <v-text-field
                    name="name"
                    label="Nome do Projeto"
                    type="text"
                    disabled
                    v-model.trim="port.name"
                  ></v-text-field>
                  <v-text-field
                    name="partner"
                    label="Login do Cliente do Parceiro"
                    type="text"
                    v-model.trim="port.partner"
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
  name: 'PortCreateUpdate',
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
    port: {
      name: '',
      cableCode: '',
      clientIxc_id: '',
      partner: '',
      status: '',
      box_id: ''
    },
    show1: false,
    type: ''

  }),

  mounted () {
    this.type = this.$route.params.type
    const params = this.$route.params
    if (params.type === 'update' && params.id !== 0) {
      this.getPort(params).then((response) => {
        this.port = response
      })
    }
  },

  computed: {

  },

  methods: {
    ...mapActions([
      'updatePort',
      'getPort'
    ]),
    submit () {
      if (this.type === 'update') {
        if (this.port.cableCode !== '') {
          this.port.status = 'ATIVA'
        } else {
          this.port.status = 'VAGA'
        }
        this.updatePort(this.port)
          .then(response => {
            this.$router.push({ name: 'projectBoxesPorts', params: { id: this.port.box_id } })
            this.$vToastify.success('Porta atualizada!', 'Projetos')
          })
          .catch((errors) => {
            this.$vToastify.error(errors.data.message, 'Falha')
            const buzy = errors.data.data[0]
            if (buzy) {
              this.$vToastify.error(`Caixa: ${buzy.name}`, 'Falha')
            }
          })
      }
    }

  }
}
</script>
