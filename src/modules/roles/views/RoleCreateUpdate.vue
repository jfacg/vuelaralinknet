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
              <h2>Nova Função</h2>
            </div>

          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs"></v-breadcrumbs>
          </v-card-subtitle>
          <v-card-text>

            <form>
              <v-text-field
                prepend-icon="contact_page"
                name="name"
                label="Função"
                type="text"
                v-model.trim="$v.role.name.$model"
                :error-messages="nameErrors"
                :success="!$v.role.name.$invalid"
              ></v-text-field>
              <v-text-field
                prepend-icon="description"
                name="description"
                label="Descrição"
                type="text"
                v-model.trim="$v.role.description.$model"
                :error-messages="descriptionErrors"
                :success="!$v.role.description.$invalid"
              ></v-text-field>

              <v-btn
                :disabled="$v.$invalid"
                color="primary"
                large
                @click.prevent="submit"
              >Salvar</v-btn>

            </form>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
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
        text: 'Funções',
        disabled: false,
        to: '/roles',
        exact: true,
        link: true

      },
      {
        text: 'Nova Função',
        disabled: true
      }

    ],
    role: {
      name: '',
      description: ''
    },
    show1: false,
    type: ''

  }),

  mixins: [validationMixin],

  validations: {
    role: {
      name: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      }
    }

  },

  mounted () {
    this.type = this.$route.params.type
    const params = this.$route.params
    if (params.type === 'update' && params.id !== 0) {
      this.getRole(params).then((response) => {
        this.role = response.data
      })
    }
  },

  computed: {

    descriptionErrors () {
      const errors = []
      const description = this.$v.role.description
      if (!description.$dirty) {
        return errors
      }

      !description.required && errors.push('Descrição é Obrigatório!')
      !description.minLength && errors.push(`Insira pelo menos ${description.$params.minLength.min} caracteres!`)

      return errors
    },
    nameErrors () {
      const errors = []
      const name = this.$v.role.name
      if (!name.$dirty) {
        return errors
      }

      !name.required && errors.push('Nome é Obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)

      return errors
    }

  },

  methods: {
    ...mapActions([
      'createRole',
      'updateRole',
      'getRole'
    ]),
    submit () {
      if (this.type === 'create') {
        this.createRole(this.role)
          .then(response => {
            this.$router.push({ name: 'roles' })
            this.$vToastify.success('Nova função criada!', 'Funções')
          })
          .catch((errors) => {
            const messages = Object.values(errors.data)
            messages.forEach(error => {
              this.$vToastify.error(error.toString(), 'Falha')
            })
          })
      } else {
        this.updateRole(this.role)
          .then(response => {
            this.$router.push({ name: 'roles' })
            this.$vToastify.success('Função atualizada!', 'Funções')
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
