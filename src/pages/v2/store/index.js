import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
import VuexPersistence from "vuex-persist";
import model from "@/model/admin";

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
        region:null,
        userInfo:null
    },
    mutations: {
        increment(state) {
          state.count++
        },
        decrement(state) {
          state.count--
        },
        SET_USER_INFO(state, payload) {
          state.userInfo = payload
        },
        SET_REGION(state, payload) {
          state.region = payload
        },
        SET_TOKEN(state, payload) {
          state.token = payload
        },

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
      getUserInfo({
        commit,
        state
      }) {
          return model.getUserinfo(null).then((ret) => {
            console.log("getUserInfo actions")
            console.log(ret.data);
            commit('SET_USER_INFO', ret.data.data)
          })
      }
    },
    getters: {
      region(state) {
        return state.region || null
      },
      userInfo(state) {
        return state.userInfo || {}
      },
    },
    // todo
    plugins: [vuexLocal.plugin]

});


export default store;
