import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const mutations = {
    SaveUserID: (state, userID) => {
        state.userID = userID
        localStorage.setItem('userID', userID)
    }
}

const state = {
    userID: "" || localStorage.getItem('userID')
}

const getters = {
    userID: (state) => {
        state.userID
    }
}

const store = new Vuex.Store({
    mutations,
    state,
    getters
})

export {
    store
}