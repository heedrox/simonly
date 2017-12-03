// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import VueFire from 'vuefire';
import store from './store';
import router from './router';
import App from './App.vue';

sync(store, router);

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueFire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
