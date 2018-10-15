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

const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    },
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
      a:moduleA,
    },
    state: {
        count: 0,
        region:null,
        userInfo:null,
        todos: [
          { id: 1, text: '...', done: true },
          { id: 2, text: '...', done: false }
        ]
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
      doneTodos: state => state.todos.filter(todo => todo.done),
      doneTodosCount: function(state, getters) {
        console.log(state, getters.doneTodos);
        return getters.doneTodos.length;
      }
    },
    // todo
    plugins: [vuexLocal.plugin]

});


export default store;
