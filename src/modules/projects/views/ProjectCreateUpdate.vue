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
              <h2>Novo Projeto</h2>
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
                    v-model.trim="$v.project.name.$model"
                    :error-messages="nameErrors"
                    :success="!$v.project.name.$invalid"
                  ></v-text-field>
                  <v-text-field
                    name="shortName"
                    label="Sigla do Projeto"
                    type="text"
                    v-model.trim="$v.project.shortName.$model"
                    :error-messages="shortNameErrors"
                    :success="!$v.project.shortName.$invalid"
                  ></v-text-field>
                  <v-text-field
                    name="description"
                    label="Descrição"
                    type="text"
                    v-model.trim="$v.project.description.$model"
                    :error-messages="descriptionErrors"
                    :success="!$v.project.description.$invalid"
                  ></v-text-field>
                  <v-text-field
                    name="numberBoxes"
                    label="Quantidade de Caixas"
                    type="text"
                    v-model.trim="$v.project.numberBoxes.$model"
                    :error-messages="numberBoxesErrors"
                    :success="!$v.project.numberBoxes.$invalid"
                  ></v-text-field>
                  <v-text-field
                    name="numberBoxPorts"
                    label="Quantidade de Portas por Caixa"
                    type="text"
                    v-model.trim="$v.project.numberBoxPorts.$model"
                    :error-messages="numberBoxPortsErrors"
                    :success="!$v.project.numberBoxPorts.$invalid"
                  ></v-text-field>
                  <v-text-field
                    name="oltName"
                    label="Nome da OLT"
                    type="text"
                    v-model.trim="$v.project.oltName.$model"
                    :error-messages="oltNameErrors"
                    :success="!$v.project.oltName.$invalid"
                  ></v-text-field>
                  <v-text-field
                    name="oltSlot"
                    label="Placa da OLT"
                    type="text"
                    v-model.trim="$v.project.oltSlot.$model"
                    :error-messages="oltSlotErrors"
                    :success="!$v.project.oltSlot.$invalid"
                  ></v-text-field>
                  <v-text-field
                    name="oltPort"
                    label="Porta da OLT"
                    type="text"
                    v-model.trim="$v.project.oltPort.$model"
                    :error-messages="oltPortErrors"
                    :success="!$v.project.oltPort.$invalid"
                  ></v-text-field>

                  <v-btn
                    :disabled="$v.$invalid"
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
import { required, minLength, numeric } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
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
        text: 'Novo Projeto',
        disabled: true
      }

    ],
    project: {
      name: '',
      shortName: '',
      description: '',
      numberBoxes: '',
      numberBoxPorts: '',
      oltName: '',
      oltSlot: '',
      oltPort: ''
    },
    newProject: {},
    box: {
      name: '',
      address: '',
      numberPorts: '',
      project_id: '',
      status: ''

    },
    show1: false,
    type: ''

  }),

  mixins: [validationMixin],

  validations: {
    project: {
      name: {
        required,
        minLength: minLength(3)
      },
      shortName: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      numberBoxes: {
        required,
        numeric
      },
      numberBoxPorts: {
        required,
        numeric
      },
      oltName: {
        required,
        minLength: minLength(3)
      },
      oltSlot: {
        required,
        numeric
      },
      oltPort: {
        required,
        numeric
      }
    }

  },

  mounted () {
    this.type = this.$route.params.type
    const params = this.$route.params
    if (params.type === 'update' && params.id !== 0) {
      this.getProject(params).then((response) => {
        this.project = response.data
      })
    }
  },

  computed: {
    nameErrors () {
      const errors = []
      const name = this.$v.project.name
      if (!name.$dirty) {
        return errors
      }

      !name.required && errors.push('Nome é Obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)

      return errors
    },
    shortNameErrors () {
      const errors = []
      const shortName = this.$v.project.shortName
      if (!shortName.$dirty) {
        return errors
      }

      !shortName.required && errors.push('Nome é Obrigatório!')
      !shortName.minLength && errors.push(`Insira pelo menos ${shortName.$params.minLength.min} caracteres!`)

      return errors
    },
    descriptionErrors () {
      const errors = []
      const description = this.$v.project.description
      if (!description.$dirty) {
        return errors
      }

      !description.required && errors.push('Descrição é Obrigatório!')
      !description.minLength && errors.push(`Insira pelo menos ${description.$params.minLength.min} caracteres!`)

      return errors
    },
    numberBoxesErrors () {
      const errors = []
      const numberBoxes = this.$v.project.numberBoxes
      if (!numberBoxes.$dirty) {
        return errors
      }

      !numberBoxes.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !numberBoxes.numeric && errors.push('Insira somente numeros!')

      return errors
    },
    numberBoxPortsErrors () {
      const errors = []
      const numberBoxPorts = this.$v.project.numberBoxPorts
      if (!numberBoxPorts.$dirty) {
        return errors
      }

      !numberBoxPorts.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !numberBoxPorts.numeric && errors.push('Insira somente numeros!')

      return errors
    },
    oltNameErrors () {
      const errors = []
      const oltName = this.$v.project.oltName
      if (!oltName.$dirty) {
        return errors
      }

      !oltName.required && errors.push('Nome é Obrigatório!')
      !oltName.minLength && errors.push(`Insira pelo menos ${oltName.$params.minLength.min} caracteres!`)

      return errors
    },
    oltSlotErrors () {
      const errors = []
      const oltSlot = this.$v.project.oltSlot
      if (!oltSlot.$dirty) {
        return errors
      }

      !oltSlot.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !oltSlot.numeric && errors.push('Insira somente numeros!')

      return errors
    },
    oltPortErrors () {
      const errors = []
      const oltPort = this.$v.project.oltPort
      if (!oltPort.$dirty) {
        return errors
      }

      !oltPort.required && errors.push('Quantidade de Caixas é Obrigatório!')
      !oltPort.numeric && errors.push('Insira somente numeros!')

      return errors
    }

  },

  methods: {
    ...mapActions([
      'createProject',
      'updateProject',
      'getProject',
      'createBox',
      'createPort'
    ]),
    submit () {
      if (this.type === 'create') {
        this.createProject(this.project)
          .then(response => {
            this.$router.push({ name: 'projects' })
            this.$vToastify.success('Novo projeto criado!', 'Projetos')
          })
          .catch((errors) => {
            const messages = Object.values(errors.data)
            messages.forEach(error => {
              this.$vToastify.error(error.toString(), 'Falha')
            })
          })
      } else {
        this.updateProject(this.project)
          .then(response => {
            this.$router.push({ name: 'projects' })
            this.$vToastify.success('Projeto atualizado!', 'Projetos')
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
