import Vue from 'vue';
import Config from '../lib/config';

export default ({ app, router, store, Vue }) => {
  var config = new Config().config;
  Vue.prototype.$fx_config=config;
  router.$fx_config=config;


  router.beforeEach((to,from,next) => {
    if (to.query.token) {
      console.log("session setup")
      store.commit('session/login',to.query.token);
      delete(to.query.token)

      let next_params={
        path: to.path,
        query: to.query,
        params: to.params,
        hash: ''   // no hash!
      }
      console.log("next to:", next_params)
      next(next_params)
    } else {
      next()
    }
  })

  router.beforeEach((to,from,next) => {
    console.log("public route: ", to.meta.public);
    var session = store.state.session.session;

    if (session.isExpired() && !to.meta.public) {
      var nextUrl=router.$fx_config.AUTH_UI_URL+
          'login?next='+
          config.RSS_FEEDER_UI_URL+
          to.path.slice(1,to.path.length);
      console.log("redirecting:",
                  config.AUTH_UI_URL,
                  nextUrl
                 );
      window.location.href=nextUrl;
      // we're out!
    } else {
      console.log("logged in or public");
      next();
    }
  })

}
