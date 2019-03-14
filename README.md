# Quasar App

Playing with how to track state changes to a page when it make sense to support browser back button functionality as well

To get it running:

    cd vue_state_track
    yarn install
    quasar dev

I have a working solution, but I am not sure if there is a better solution nor I am certain I fully understand why it works. I would appreciate some thoughts or comments.

The solution can be found in the feature/router\_solution branch. The only changed files are [routes.js](https://github.com/ericg-vue-questions/vue_state_track/blob/feature/router_solution/src/router/routes.js) and [Index.vue](https://github.com/ericg-vue-questions/vue_state_track/blob/feature/router_solution/src/pages/Index.vue).

I figured out how to use the router to get the job done. I have several questions surrounding my solution which, when answered, will hopefully give me a better understanding of how this all works.

1: The named route 'front' causes this warning to be emitted.

>\[Warning\] \[vue-router\] Named Route 'front' has a default child route. When navigating to this named route (:to="{name: 'front'"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.

if I remove the name: 'front' line so it is just:

    {
        path: '/',
        component: () => import('layouts/MyLayout.vue'),
        children: [
          { path: '',
            component: () => import('pages/Index.vue')
          }
        ]
    }

the warning goes away. Why would the default child route not be rendered? Can anyone explain what is going on here?

2:  I initially thought I could define my 'level' route as:

    {
        path: '/level/:lvl',
        name: 'level',
        component: () => import('layouts/MyLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/Index.vue'),
            props: (route) => {
              console.log('handling props')
              console.log(route)
              return { lvl: parseInt(route.params.lvl) }
            }
          }
        ]
    }

However, which clicking on a button, the Index.vue component does not render. I am not sure why this does not work...?

3: The solution for routes.js that works is:

    {
        path: '/level/',
        component: () => import('layouts/MyLayout.vue'),
        children: [
          {
            path: ':lvl',
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

What I am not sure about is why I needed to name the child route the named route and why I could not do:

    {
        path: '/level/',
        name: 'level',
        component: () => import('layouts/MyLayout.vue'),
        children: [
          {
            path: ':lvl',
            component: () => import('pages/Index.vue'),
            props: (route) => {
              console.log('handling props')
              console.log(route)
              return { lvl: parseInt(route.params.lvl) }
            }
          }
        ]
    }

I did find this blog post [Shared state and routing in Vue.js](https://codeburst.io/shared-state-and-routing-in-vue-js-7bfea06e44ec) which is describing the same situation I have, but argues against using the router to solve it. Their solution involves a custom router to handle internal page state changes and ties it to a Vuex store.