const UserIndex = () => import('./../views/UserIndex')
const UserCreate = () => import('./../views/UserCreate')
const UserShow = () => import('./../views/UserShow')
const UserUpdate = () => import('./../views/UserUpdate')

const routes = [
  {
    path: '/users',
    component: UserIndex,
    name: 'users',
    meta: { auth: true }
  },
  {
    path: '/users/create',
    component: UserCreate,
    name: 'userCreate',
    meta: { auth: true }
  },
  {
    path: '/users/show/:id',
    component: UserShow,
    name: 'userShow',
    meta: { auth: true }
  },
  {
    path: '/users/edit/:id',
    component: UserUpdate,
    name: 'userEdit',
    meta: { auth: true }
  }

]

export default routes
