export const AppRoutes =[
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@layout/index.vue'),
    redirect: '/dashboard',
  	children: [{
  		path: '/dashboard',
  		component: () => import('@views/home/index.vue')
  	}]
  }
]
