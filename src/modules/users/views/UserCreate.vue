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
              <h2>Novo Usuário</h2>
            </div>

          </v-card-title>
          <v-card-subtitle>
            <v-breadcrumbs :items="itemsBreadcrumbs"></v-breadcrumbs>
          </v-card-subtitle>
          <v-card-text>

            <form>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Nome"
                type="text"
                v-model.trim="$v.user.name.$model"
                :error-messages="emailErrors"
                :success="!$v.user.name.$invalid"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                name="email"
                label="Email"
                type="email"
                v-model.trim="$v.user.email.$model"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                :type="show1 ? 'text' : 'password'"
                v-model="user.password"
                :error-messages="passwordErrors"
                label="Senha"
                required
                @click:append="show1 = !show1"
                hint="Minimo 8 caracteres"
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
import { required, email, minLength } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { mapActions } from 'vuex'

export default {
  name: 'VueLaralinknetUsers',
  components: {},

  data: () => ({
    itemsBreadcrumbs: [
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
        text: 'Novo Usuário',
        disabled: true
      }

    ],
    user: {
      name: '',
      email: '',
      password: ''
    },
    show1: false

  }),

  mixins: [validationMixin],

  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      },
      name: {
        required,
        minLength: minLength(3)
      }
    }

  },

  computed: {

    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) {
        return errors
      }

      !email.required && errors.push('Email é Obrigatório!')
      !email.email && errors.push('Insira um email válido!')

      return errors
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) {
        return errors
      }

      !name.required && errors.push('Nome é Obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)

      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) {
        return errors
      }

      !password.required && errors.push('Senha é Obrigatório!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)

      return errors
    }
  },

  methods: {
    ...mapActions([
      'createUser'
    ]),
    submit () {
      this.createUser(this.user)
        .then(response => {
          this.$router.push({ name: 'users' })
          this.$vToastify.success('Novo usuário criado', 'Usuários')
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
</script>
