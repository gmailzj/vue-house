import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    key: "xxx-vuex",
    restoreState: (key, storage) => Cookies.getJSON(key),
    saveState: (key, state, storage) =>
        Cookies.set(key, state, {
            expires: 3
        }),
    reducer: state => ({ token: state.token }),
    filter: mutation =>
        mutation.type === "SET_TOKEN" || mutation.type === "LOGOUT"
});

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0,
        region:null
    },
    mutations: {
        increment(state) {
          state.count++
        },
        decrement(state) {
          state.count--
        },
        setRegion(state, payload) {
          state.region = payload;
        }

    },
    actions:{
      increment (context) {
        context.commit('increment')
      },
      decrement (context) {
        context.commit('decrement')
      },
      incrementAsync ({ commit }) {
        // commit('increment')
        setTimeout(() => {
          commit('increment')
        }, 100)
      },
      /* Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，
          或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。
          实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：
      */
      test({
        commit,
        state
      }) {
        commit('increment')
      },
      getRegion({
        commit,
        state
      }) {
        if (!state.region) {
            commit('SET_REGION', 'cn')
        }
      },
    },
    getters: {
      region(state) {
        return state.region || null
      }
    },
    // todo
    plugins: [vuexLocal.plugin]

});


export default store;
