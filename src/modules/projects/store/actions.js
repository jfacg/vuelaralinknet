import axios from 'axios'

import { API_VERSION } from '../../../configs/api'
const URN = `${API_VERSION}/projects`

const actions = {
  async getProjects ({ commit, dispatch }, params) {
    return await axios.get(`${URN}`, params)
      .then(response => {
        const projects = response.data.data
        commit('SET_PROJECTS', projects)
      })
  },

  async getProject ({ commit, dispatch }, params) {
    return await axios.get(`${URN}/${params.id}`, params)
      .then(response => {
        const project = response.data.data
        commit('SET_PROJECT', project)
        return response.data
      })
  },

  async getClientIXC ({ commit, dispatch }, params) {
    return await axios.get(`${API_VERSION}/clientIxc/${params.id}`, params)
      .then(response => {
        const clientIxc = response.data
        commit('SET_CLIENTIXC', clientIxc)
        return response.data
      })
  },

  async destroyProject ({ commit, dispatch }, params) {
    return await axios.delete(`${URN}/${params}`)
      .then(response => { })
  },

  async createProject ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post(`${URN}`, params)
        .then(response => {
          return resolve(response.data.data)
        })
        .catch(error => {
          console.log(error)
          return reject(error.response)
        })
    })
  },

  async updateProject ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.put(`${URN}/${params.id}`, params)
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
