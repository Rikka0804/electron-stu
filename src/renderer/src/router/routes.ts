export const AppRoutes =[
  {
    path: '/',
    name: 'Home',
    component: () => import('@views/login/index.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@renderer/components/list.vue')
  }
]
