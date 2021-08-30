import usersRoutes from './../modules/users/router/usersRoutes'
import roleRoutes from './../modules/roles/router/rolesRoutes'
import permissionRoutes from './../modules/permissions/router/permissionsRoutes'
import projectRoutes from './../modules/projects/router/projectsRoutes'
import boxRoutes from './../modules/boxes/router/boxesRoutes'
import portRoutes from './../modules/ports/router/portsRoutes'

const Auth = () => import('./../modules/Layout/views/AuthLayout')
const App = () => import('./../modules/Layout/views/AppLayout')
const Dashboard = () => import('./../modules/dashboard/views/dashboard')
const Login = () => import('./../modules/auth/views/Login')

export default [

  {
    path: '/',
    component: Auth,
    children: [
      {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
          title: 'Login - Linknet'
        }
      }
    ]
  },

  {
    path: '/',
    component: App,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard',
        meta: { auth: true }
      },
      ...usersRoutes,
      ...roleRoutes,
      ...permissionRoutes,
      ...projectRoutes,
      ...boxRoutes,
      ...portRoutes

    ]
  }
]
