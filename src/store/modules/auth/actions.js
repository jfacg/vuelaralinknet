import axios from 'axios'

import { TOKEN_NAME } from '../../../configs/api'

const actions = {
  // async login ({ commit, dispatch }, params) {
  //   return await axios.post('sanctum/token', params)
  //     .then(response => {
  //       const token = response.data.token
  //       localStorage.setItem(TOKEN_NAME, token)
  //       dispatch('me')
  //     })
  //     .catch((error) => {
  //       return error.response.data
  //     })
  // },

  async login ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post('sanctum/token', params)
        .then(response => {
          const token = response.data.token
          localStorage.setItem(TOKEN_NAME, token)
          dispatch('me')
          return resolve(response.data)
        })
        .catch(error => {
          return reject(error.response.data)
        })
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
          commit('SET_ME', response.data)
          return resolve()
        })
        .catch((error) => {
          localStorage.removeItem(TOKEN_NAME)
          return reject(error)
        })
    })
  },

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
