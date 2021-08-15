<template>
  <v-container fill-height>
    <v-layout
      justify-center
      align-center
    >

      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card class="elevation-12">
          <v-app-bar
            color="primary"
            dark
          >
            <v-app-bar-title>Login .</v-app-bar-title>
          </v-app-bar>

          <v-card-text>
            <v-form>
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
                name="password"
                label="Senha"
                type="password"
                v-model.trim="$v.user.password.$model"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              large
              @click.stop="submit"
            >Logar</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'VueLaralinknetLogin',
  components: {},

  directives: {},

  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },

  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },

  mounted () {

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
      'login'
    ]),
    submit () {
      this.login(this.user)
        .then(response => {
          this.$vToastify.success('Usuário Logado', 'Sucesso')
          // this.$router.go('dashboard')
          this.$router.push({ name: 'dashboard', exact: true }, () => { })
          // location.reload({ forcereload: true })
        })
        .catch(errors => {
          this.$vToastify.error('Usuário Não Autenticado', 'Error')
        })
    }

  }
}
</script>
