const BoxIndex = () => import('./../views/BoxIndex')
const BoxShow = () => import('./../views/BoxShow')
const BoxCreateUpdate = () => import('./../views/BoxCreateUpdate')
const BoxPermission = () => import('./../views/BoxPermission')

const routes = [
  {
    path: '/boxes',
    component: BoxIndex,
    name: 'boxes',
    meta: { auth: true }
  },

  {
    path: '/boxes/show/:id',
    component: BoxShow,
    name: 'boxShow',
    meta: { auth: true }
  },
  {
    path: '/boxes/createUpdate/:type/:id',
    component: BoxCreateUpdate,
    name: 'boxCreateUpdate',
    meta: { auth: true }
  },
  {
    path: '/boxes/permissions/:id',
    component: BoxPermission,
    name: 'boxPermission',
    meta: { auth: true }
  }

]

export default routes
