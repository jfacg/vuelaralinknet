const PermissionIndex = () => import('./../views/PermissionIndex')
const PermissionShow = () => import('./../views/PermissionShow')
const PermissionCreateUpdate = () => import('./../views/PermissionCreateUpdate')

const routes = [
  {
    path: '/permissions',
    component: PermissionIndex,
    name: 'permissions',
    meta: { auth: true }
  },

  {
    path: '/permissions/show/:id',
    component: PermissionShow,
    name: 'permissionShow',
    meta: { auth: true }
  },
  {
    path: '/permissions/createUpdate/:type/:id',
    component: PermissionCreateUpdate,
    name: 'permissionCreateUpdate',
    meta: { auth: true }
  }

]

export default routes
