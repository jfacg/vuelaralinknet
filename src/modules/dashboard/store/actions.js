import axios from 'axios'

import { TOKEN_NAME } from '../../../configs/api'

const actions = {
  async login ({ commit, dispatch }, params) {
    return await axios.post('sanctum/token', params)
      .then(response => {
        const token = response.data.token
        localStorage.setItem(TOKEN_NAME, token)
        dispatch('me')
      })
  },

  async me ({ commit }) {
    const token = localStorage.getItem(TOKEN_NAME)
    if (!token) return

    return await axios.get('auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => commit('SET_ME', response.data))
      .catch(() => {
        localStorage.removeItem(TOKEN_NAME)
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
