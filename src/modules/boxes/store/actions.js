import axios from 'axios'

import { API_VERSION } from '../../../configs/api'
const URN = `${API_VERSION}/boxes`

const actions = {
  async getBoxes ({ commit, dispatch }, params) {
    return await axios.get(`${URN}`, params)
      .then(response => {
        const boxes = response.data.data
        commit('SET_BOXES', boxes)
      })
  },

  async getBox ({ commit, dispatch }, params) {
    return await axios.get(`${URN}/${params.id}`, params)
      .then(response => {
        const box = response.data.data
        commit('SET_BOX', box)
        return response.data.data
      })
  },

  async destroyBox ({ commit, dispatch }, params) {
    return await axios.delete(`${URN}/${params}`)
      .then(response => { })
  },

  async createBox ({ commit, dispatch }, params) {
    return await new Promise((resolve, reject) => {
      axios.post(`${URN}`, params)
        .then(response => {
          return resolve(response.data.data)
        })
        .catch(error => {
          return reject(error.response)
        })
    })
  },

  async updateBox ({ commit, dispatch }, params) {
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
