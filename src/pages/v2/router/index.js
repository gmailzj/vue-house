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
  {
    path: "/vuex",
    component: resolve => require(["../modules/default/vuex.vue"], resolve)
  },
  {
    path: "/compress",
    component: resolve => require(["../modules/default/compress.vue"], resolve)
  },
  {
    path: "/slot",
    component: resolve => require(["../modules/default/slot.vue"], resolve)
  },
  {
    path: "/css",
    component: resolve => require(["../modules/default/css.vue"], resolve)
  },
  { path: "*", component: NotFoundComponent }
];

export default new Router({
  // mode: 'history',
  routes
});
