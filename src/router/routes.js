
const routes = [
  {
    path: '/',
    name: 'empty-layout',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: ''
        name: 'front',
        component: () => import('pages/Index.vue')
      },
      { path: 'level/:lvl',
        name: 'level',
        component: () => import('pages/Index.vue'),
        props: (route) => {
          console.log('handling props')
          console.log(route)
          return { lvl: parseInt(route.params.lvl) }
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
