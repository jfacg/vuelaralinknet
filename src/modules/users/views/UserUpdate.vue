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
              <h2>Editar Usuário</h2>
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
                prepend-icon="person"
                name="nick_name"
                label="Apelido"
                type="text"
                v-model="user.nick_name"
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
              <v-select
                :items="roles"
                item-text="name"
                item-value="id"
                v-model="user.roles[0]"
                label="Função"
                prepend-icon="contact_page"
              ></v-select>
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserUpdate',
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
        text: 'Editar Usuário',
        disabled: true
      }

    ],
    user: {
      name: '',
      email: '',
      password: '',
      nick_name: '',
      roles: {}
    },
    show1: false,
    roleSelected: '',
    role: {}

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
        minLength: minLength(8)
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

      if (password === '') {
        return errors
      }

      if (!password.$dirty) {
        return errors
      }

      !password.required && errors.push('Senha é Obrigatório!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)

      return errors
    },
    ...mapState({
      roles: state => state.roles.roles
    })
  },

  mounted () {
    const params = this.$route.params
    this.getUser(params).then((response) => {
      this.user = response.data
    })
    this.getRoles()
  },

  methods: {
    ...mapActions([
      'getUser',
      'updateUser',
      'attachRolesUser',
      'getRoles'
    ]),
    submit () {
      const role = Number.isInteger(this.user.roles[0]) ? this.user.roles[0] : this.user.roles[0].id
      const params = { id: this.$route.params.id, roles: [role] }
      this.updateUser(this.user)
        .then(response => {
          this.attachRolesUser(params)
          this.$router.push({ name: 'users' })
          this.$vToastify.success('Novo usuário atualizado!', 'Usuários')
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
