const index = r =>require.ensure([], ()=>r(require('./index.vue')), 'fangdai');

export default { path:'/fangdai', name: 'fangdai', component: index, alias:'/'}