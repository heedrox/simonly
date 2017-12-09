import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewView from '../views/NewView.vue';
import ExplainView from '../views/ExplainView.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [{
    path: '*',
    component: HomeView,
  }, {
    path: '/explain',
    component: ExplainView,
  }, {
    path: '/new',
    component: NewView,
  }],
});
