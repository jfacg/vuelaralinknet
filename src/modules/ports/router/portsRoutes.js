const PortIndex = () => import('../views/PortIndex')
const PortShow = () => import('../views/PortShow')
const PortCreateUpdate = () => import('../views/PortCreateUpdate')

const routes = [
  {
    path: '/ports',
    component: PortIndex,
    name: 'ports',
    meta: { auth: true }
  },

  {
    path: '/ports/show/:id',
    component: PortShow,
    name: 'portShow',
    meta: { auth: true }
  },
  {
    path: '/ports/createUpdate/:type/:id',
    component: PortCreateUpdate,
    name: 'portCreateUpdate',
    meta: { auth: true }
  }

]

export default routes
