export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', redirect: '/stories/new'},
      { path: 'stories/:tab',
        component: () => import('pages/stories') },
      { path: 'feeds', component: () => import('pages/feeds') },
      { path: 'feeds/add', component: () => import('pages/feedAdd') },
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
