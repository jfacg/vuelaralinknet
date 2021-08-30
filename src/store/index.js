import Vue from 'vue'
import Vuex from 'vuex'

import auth from './../modules/auth/store'
import users from './../modules/users/store'
import roles from './../modules/roles/store'
import permissions from './../modules/permissions/store'
import projects from './../modules/projects/store'
import boxes from './../modules/boxes/store'
import ports from './../modules/ports/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    users,
    roles,
    permissions,
    projects,
    boxes,
    ports
  }
})
