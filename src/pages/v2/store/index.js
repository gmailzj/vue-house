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
        count: 0
    },
    mutations: {
        increment(state, num) {
          state.count++
        },
        decrement(state, num) {
          state.count--
        }
    },
    actions:{
      test({
        commit,
        state
      }) {
        commit('increment')
      }
    },
    // todo
    plugins: [vuexLocal.plugin]

});


export default store;
