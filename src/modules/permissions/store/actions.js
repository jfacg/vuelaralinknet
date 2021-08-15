import axios from 'axios'

import { API_VERSION } from '../../../configs/api'

const actions = {
  async getPermissions ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/permissions`, params)
      .then(response => {
        const permissions = response.data
        commit('SET_PERMISSIONS', permissions)
      })
  },

  async getPermission ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/permissions/${params.id}`, params)
      .then(response => {
        return response.data
      })
  },

  async destroyPermission ({ commit, dispatch }, params) {
    return await axios.delete(`${API_VERSION}/permissions/${params}`)
      .then(response => { })
  },

  async createPermission ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post(`${API_VERSION}/permissions`, params)
        .then(response => {
          return resolve()
        })
        .catch(error => {
          return reject(error.response)
        })
    })
  },

  async updatePermission ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.put(`${API_VERSION}/permissions/${params.id}`, params)
        .then(response => {
          return resolve()
        })
        .catch(error => {
          return reject(error.response)
        })
    })
  }

}

export default actions
