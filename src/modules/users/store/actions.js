import axios from 'axios'

import { API_VERSION } from '../../../configs/api'

const actions = {
  async getUsers ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/users`, params)
      .then(response => {
        const users = response.data
        commit('SET_USERS', users)
      })
  },

  async getUser ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/users/${params.id}`, params)
      .then(response => {
        return response.data
      })
  },

  async destroyUser ({ commit, dispatch }, params) {
    return await axios.delete(`${API_VERSION}/users/${params}`)
      .then(response => { })
  },

  async createUser ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post(`${API_VERSION}/users`, params)
        .then(response => {
          return resolve()
        })
        .catch(error => {
          return reject(error.response)
        })
    })
  },

  async updateUser ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.put(`${API_VERSION}/users/${params.id}`, params)
        .then(response => {
          return resolve()
        })
        .catch(error => {
          return reject(error.response)
        })
    })
  },

  async rolesAvailable ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.get(`${API_VERSION}/users/${params.id}/roles/list`, params)
        .then(response => {
          const roles = response.data.data
          commit('SET_ROLES', roles)
          return resolve(roles)
        })
    })
  },

  async attachRolesUser ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post(`${API_VERSION}/users/${params.id}/roles`, params)
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
