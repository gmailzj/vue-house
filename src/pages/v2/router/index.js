import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// eslint-disable-next-line
const NotFoundComponent = resolve =>
  require(["../NotFoundComponent.vue"], resolve);

const routes = [
  {
    path: "/",
    component: resolve => require(["../modules/default/index.vue"], resolve)
  },
  { path: "*", component: NotFoundComponent }
];

export default new Router({
  // mode: 'history',
  routes
});
