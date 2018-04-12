const index = r =>require.ensure([], ()=>r(require('./index.vue')), 'gfnl');

export default { path:'/gfnl', name: 'gfnl', component: index}