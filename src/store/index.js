import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
  SaveUserID: (state, userID) => {
    state.userID = userID;
    localStorage.setItem("userID", userID);
  },
  SaveUserSonPumpRation: (state, sonPumpRation) => {
    state.sonPumpRation = sonPumpRation;
    localStorage.setItem("sonPumpRation", sonPumpRation);
  }
};

const state = {
  userID: "" || localStorage.getItem("userID"),
  sonPumpRation: "" || localStorage.getItem("sonPumpRation")
};

const getters = {
  userID: state => {
    state.userID;
  },
  sonPumpRation: state => {
    state.sonPumpRation;
  }
};

const store = new Vuex.Store({
  mutations,
  state,
  getters
});

export { store };
