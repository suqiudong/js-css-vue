import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        tabbarShow: true
    },
    mutations: {
        showTabar(state, num) {
            state.tabbarShow = num;
        },
        hideTabar(state, num) {
            state.tabbarShow = num;
        }
    },
    actions: {
        showTabar(context, data) {
            context.commit("showTabar", data)
        },
        hideTabar(context, data) {
            context.commit("hideTabar", data)
        }
    }
})

export default store