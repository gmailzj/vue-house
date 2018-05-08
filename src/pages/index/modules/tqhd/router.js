const index = r => require.ensure([], () => r(require("./index.vue")), "tqhd");

export default { path: "/tqhd", name: "tqhd", component: index };
