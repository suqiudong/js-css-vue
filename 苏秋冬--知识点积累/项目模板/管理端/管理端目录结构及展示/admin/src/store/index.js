import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: "",
    httpError: {
        hasError: false,
        status: '',
        statusText: ''
    }
}

const mutations = {
    setToken(state, data) {
        state.token = data
    },
    ON_HTTP_ERROR(state, payload) {
        console.log(payload)
        state.httpError = payload
    }
}

export default new Vuex.Store({
    state,
    mutations
})