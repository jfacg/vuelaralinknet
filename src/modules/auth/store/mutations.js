const mutations = {
  SET_ME (state, me) {
    state.me = me
    state.authenticated = true
  },

  SET_ROLE_PERMISSIONS (state, permissions) {
    state.rolePermissions = permissions
  },

  SET_AUTHENTICATED (state, status) {
    state.authenticated = status
  },

  LOGOUT (state) {
    state.me = {
      name: '',
      email: ''
    }
    state.authenticated = false
  }

}

export default mutations
