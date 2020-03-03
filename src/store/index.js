import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const mutations = {
  SaveUserID: (state, userID) => {
    state.userID = userID;
    sessionStorage.setItem("userID", userID);
  },
  SaveUserSonPumpRation: (state, sonPumpRation) => {
    state.sonPumpRation = sonPumpRation;
    localStorage.setItem("sonPumpRation", sonPumpRation);
  },
  SaveUserMyReturnRation: (state, myReturnRation) => {
    state.myReturnRation = myReturnRation;
    localStorage.setItem("myReturnRation", myReturnRation);
  },
  SaveKey: (state, key) => {
    state.key = key;
    localStorage.setItem("key", key);
  },
};

const state = {
  userID: "" || sessionStorage.getItem("userID"),
  sonPumpRation: "" || localStorage.getItem("sonPumpRation"),
  myReturnRation: "" || localStorage.getItem("myReturnRation"),
  key: "" || localStorage.getItem("key"),
};

const getters = {
  userID: state => state.userID,
  sonPumpRation: state => state.sonPumpRation,
  myReturnRation: state => state.myReturnRation,
  key: state => state.key,
};

const store = new Vuex.Store({ mutations, state, getters });

export { store };
