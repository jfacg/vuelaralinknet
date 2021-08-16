import axios from 'axios'

import { TOKEN_NAME, API_VERSION } from '../../../configs/api'

const actions = {
  async login ({ commit, dispatch }, params) {
    return await axios.post('sanctum/token', params)
      .then(response => {
        const token = response.data.token
        localStorage.setItem(TOKEN_NAME, token)
        dispatch('me')
      })
      .catch((error) => {
        return error.response.data
      })
  },

  async me ({ commit }) {
    return await new Promise((resolve, reject) => {
      const token = localStorage.getItem(TOKEN_NAME)
      // eslint-disable-next-line prefer-promise-reject-errors
      if (!token) return reject()

      axios.get('auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          const me = response.data
          const role = me.roles[0]
          commit('SET_ME', me)

          axios.get(`${API_VERSION}/roles/${role.id}/permissions`)
            .then(response => {
              const permissions = response.data.data
              commit('SET_ROLE_PERMISSIONS', permissions)
            })

          return resolve()
        })
        .catch((error) => {
          localStorage.removeItem(TOKEN_NAME)
          return reject(error)
        })
    })
  },

  async rolePermissionsAttach ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.get(`${API_VERSION}/roles/${params.id}/permissions`, params)
        .then(response => {
          const permissions = response.data.data
          commit('SET_PERMISSIONS_ATTACH', permissions)
          return resolve(permissions)
        })
    })
  },

  // me ({ commit }) {
  //   const token = localStorage.getItem(TOKEN_NAME)
  //   if (!token) return

  //   return axios.get('auth/me', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       commit('SET_ME', response.data)
  //     })
  //     .catch(() => {
  //       localStorage.removeItem(TOKEN_NAME)
  //     })
  // },

  logout ({ commit }) {
    const token = localStorage.getItem(TOKEN_NAME)
    if (!token) return

    return axios.post('auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        commit('LOGOUT')

        localStorage.removeItem(TOKEN_NAME)
      })
  }

}

export default actions
