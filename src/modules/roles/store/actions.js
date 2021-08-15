import axios from 'axios'

import { API_VERSION } from '../../../configs/api'

const actions = {
  async getRoles ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/roles`, params)
      .then(response => {
        const roles = response.data
        commit('SET_ROLES', roles)
      })
  },

  async getRole ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/roles/${params.id}`, params)
      .then(response => {
        return response.data
      })
  },

  async destroyRole ({ commit, dispatch }, params) {
    return await axios.delete(`${API_VERSION}/roles/${params}`)
      .then(response => { })
  },

  async createRole ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post(`${API_VERSION}/roles`, params)
        .then(response => {
          return resolve()
        })
        .catch(error => {
          return reject(error.response)
        })
    })
  },

  async updateRole ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.put(`${API_VERSION}/roles/${params.id}`, params)
        .then(response => {
          return resolve()
        })
        .catch(error => {
          return reject(error.response)
        })
    })
  },

  async permissionAvailable ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/roles/${params.id}/permissions/list`, params)
      .then(response => {
        const permissions = response.data.data
        commit('SET_PERMISSIONSAVAILABLE', permissions)
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

  async attachPermissionsRole ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post(`${API_VERSION}/roles/${params.id}/permissions`, params)
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
