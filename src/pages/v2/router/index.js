import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// eslint-disable-next-line
const NotFoundComponent = resolve => require(['../NotFoundComponent.vue'], resolve)

const index = {
  template: '<div>index</div>'
};

const routes = [
	{
	  path: '/',
	  component: index
	},
	{ path: '*', component: NotFoundComponent }
];


export default new Router({
  // mode: 'history',
  routes
})
