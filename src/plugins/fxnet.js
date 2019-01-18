import Vue from 'vue';
import Config from '../lib/config';

export default ({ app, router, store, Vue }) => {
  var config = new Config().config;
  Vue.prototype.$fx_config=config;
  router.$fx_config=config;
}
