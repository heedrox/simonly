import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewView from '../views/NewView.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/new',
    component: NewView,
  }, {
    path: '*',
    component: HomeView,
  }],
});
