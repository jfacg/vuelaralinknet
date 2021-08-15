const RoleIndex = () => import('./../views/RoleIndex')
const RoleShow = () => import('./../views/RoleShow')
const RoleCreateUpdate = () => import('./../views/RoleCreateUpdate')
const RolePermission = () => import('./../views/RolePermission')

const routes = [
  {
    path: '/roles',
    component: RoleIndex,
    name: 'roles',
    meta: { auth: true }
  },

  {
    path: '/roles/show/:id',
    component: RoleShow,
    name: 'roleShow',
    meta: { auth: true }
  },
  {
    path: '/roles/createUpdate/:type/:id',
    component: RoleCreateUpdate,
    name: 'roleCreateUpdate',
    meta: { auth: true }
  },
  {
    path: '/roles/permissions/:id',
    component: RolePermission,
    name: 'rolePermission',
    meta: { auth: true }
  }

]

export default routes
