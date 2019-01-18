import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

//import { LocalStorage } from 'quasar'
Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

import store from '../store'

Router.beforeEach((to,from,next) => {
//   //console.log(from,to)
   var session = store.state.session.session;

   console.log("public route",to.meta.public)

  if (session.isExpired() && !to.meta.public) {
    console.log("config:",Router.$fx_config.AUTH_UI_URL);

    //Router.push(Router.$fx_config.AUTH_UI_URL);
    window.location.href=Router.$fx_config.AUTH_UI_URL;

    console.log("should login");
    next();
  } else {
    console.log("logged in or public");
    next();
  }
})
export default Router
