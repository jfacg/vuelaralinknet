const ProjectIndex = () => import('./../views/ProjectIndex')
const ProjectShow = () => import('./../views/ProjectShow')
const ProjectCreateUpdate = () => import('./../views/ProjectCreateUpdate')
const ProjectBoxes = () => import('./../views/ProjectBoxList')
const ProjectBoxPortList = () => import('./../views/ProjectBoxPortList')

const routes = [
  {
    path: '/projects',
    component: ProjectIndex,
    name: 'projects',
    meta: { auth: true }
  },

  {
    path: '/projects/show/:id',
    component: ProjectShow,
    name: 'projectShow',
    meta: { auth: true }
  },

  {
    path: '/projects/createUpdate/:type/:id',
    component: ProjectCreateUpdate,
    name: 'projectCreateUpdate',
    meta: { auth: true }
  },

  {
    path: '/projects/boxes/:id',
    component: ProjectBoxes,
    name: 'projectBoxes',
    meta: { auth: true }
  },

  {
    path: '/projects/boxes/ports/:id',
    component: ProjectBoxPortList,
    name: 'projectBoxesPorts',
    meta: { auth: true }
  }

]

export default routes
