const mutations = {
  SET_ROLES (state, roles) {
    state.roles = roles
  },

  SET_PERMISSIONS_ATTACH (state, permissionsAttach) {
    state.permissionsAttach = permissionsAttach
  },

  SET_PERMISSIONSAVAILABLE (state, permissionsAvailable) {
    state.permissionsAvailable = permissionsAvailable
  }

}

export default mutations
