const index = r =>require.ensure([], ()=>r(require('./index.vue')), 'gjj');

export default { path:'/gjj', name: 'gjj', component: index}