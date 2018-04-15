import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


const index = {
  template: '<div>foo</div>'
};

const routes = [{
  path: '/',
  component: index
}];


export default new Router({
  // mode: 'history',
  routes
})
