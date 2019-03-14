
const routes = [
  {
    path: '/',
    name: 'front',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/Index.vue'),
        props: (route) => {
          console.log('handling props')
          console.log(route)
          return { lvl: parseInt(route.query.lvl) }
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
