const index = r =>require.ensure([], ()=>r(require('./index.vue')), 'shuifei');

export default { path:'/shuifei', name: 'shuifei', component: index}