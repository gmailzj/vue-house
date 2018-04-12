const index = r =>require.ensure([], ()=>r(require('./index.vue')), 'zhuangxiu');

export default { path:'/zhuangxiu', name: 'zhuangxiu', component: index}