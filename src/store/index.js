import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);
// historyStates bug with reloading if new value of state will by added
// manual in store
// eslint-disable-next-line no-unused-vars
const historyStates = store => {
  let lastMutation;
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state));
  // }
  store.subscribe((mutation, state) => {
    if (
      mutation.type === "EMMIT_HISTORY" &&
      lastMutation !== "UNDO_TODO_ELEM_VIEW" &&
      lastMutation !== "REDO_TODO_ELEM_VIEW" &&
      lastMutation !== "SET_HISTORY"
      // lastMutation !== "SET_AI_MSG"
    ) {
      // console.log(lastMutation);
      store.commit("SET_HISTORY", mutation.payload);
    }
    //  else if (lastMutation == "SET_AI_MSG") {
    //   console.log("lol");
    // }
    else {
      if (mutation.type !== "SET_AI_MSG") {
        //   console.log("lol");
        lastMutation = mutation.type;
      }
    }
    localStorage.state = JSON.stringify(state);
  });
};

export default new Vuex.Store({
  strict: true,
  state: {
    toDoList: [],
    toDoElemView: { title: "", list: [] },
    changesHistory: [],
    changeCounter: -1,
    promisCalback: null,
    dialog: {
      active: false,
      callback: null,
      msg: "",
      answer: false
    },
    ai: {
      msg: "",
      active: false
    }
  },
  plugins: [historyStates],
  mutations: {
    SET_AI_MSG(state, payload) {
      if (payload.msg) Vue.set(state, "ai", payload);
      else state.ai.active = false;
    },
    ADD_TODO_ELEMENT(state, toDoName) {
      state.toDoList.unshift({ title: toDoName, list: [] });
    },
    DELETE_TODO_ELEMENT(state, toDoIndex) {
      state.toDoList.splice(toDoIndex, 1);
    },
    //Todo Elem
    SET_TODO_ELEM_VIEW(state) {
      if (router.currentRoute.params.id) {
        let viewElem = JSON.parse(
          JSON.stringify(
            state.toDoList.find(
              element => element.title === router.currentRoute.params.id
            )
          )
        );
        Vue.set(state, "toDoElemView", viewElem);
      }
    },
    CLEAR_TODO_ELEM_VIEW(state) {
      Vue.set(state, "toDoElemView", { title: "", list: [] });
    },
    CLEAR_HISTORY(state) {
      Vue.set(state, "changesHistory", []);
      Vue.set(state, "changeCounter", -1);
    },
    CHANE_NAME(state, newName) {
      Vue.set(state.toDoElemView, "title", newName);
    },
    ADD_TASK_ELEMENT(state, text) {
      state.toDoElemView.list.unshift({
        text,
        complite: false
      });
    },
    CHANGE_COMPLITE(state, payload) {
      Vue.set(
        state.toDoElemView.list[payload.index],
        "complite",
        payload.value
      );
    },
    MODIFY_TEXT(state, payload) {
      Vue.set(state.toDoElemView.list[payload.index], "text", payload.value);
    },
    DELETE_TODO_TASK_ELEMENT(state, index) {
      state.toDoElemView.list.splice(index, 1);
    },
    SAVE_TODO_ELEMENT(state) {
      let index = state.toDoList.findIndex(
        element => element.title === router.currentRoute.params.id
      );
      let copiedObject = JSON.parse(JSON.stringify(state.toDoElemView));
      Vue.set(state.toDoList, index, copiedObject);
    },
    SET_HISTORY(state, val) {
      let data = JSON.parse(JSON.stringify(val));
      state.changeCounter++;
      if (state.changeCounter == state.changesHistory.length)
        state.changesHistory.push(data);
      else
        state.changesHistory.splice(
          state.changeCounter,
          state.changesHistory.length,
          data
        );
    },
    // eslint-disable-next-line no-unused-vars
    EMMIT_HISTORY(state, val) {},
    UNDO_TODO_ELEM_VIEW(state) {
      state.changeCounter--;
      Vue.set(
        state,
        "toDoElemView",
        JSON.parse(JSON.stringify(state.changesHistory[state.changeCounter]))
      );
    },
    REDO_TODO_ELEM_VIEW(state) {
      state.changeCounter++;
      Vue.set(
        state,
        "toDoElemView",
        JSON.parse(JSON.stringify(state.changesHistory[state.changeCounter]))
      );
    },
    DIALOG_ACTIVATE(state, { msg, callback }) {
      state.dialog.callback = callback;
      state.dialog.msg = msg;
      state.dialog.active = true;
    },
    DIALOG_ANSWER(state, answer) {
      if (state.dialog.callback) {
        state.dialog.callback(answer);
      }
      state.dialog = {
        active: false,
        callback: null,
        msg: "",
        answer: false
      };
    }
  },
  actions: {
    del({ state, commit }) {
      let index = state.toDoList.findIndex(
        element => element.title === router.currentRoute.params.id
      );
      commit("DELETE_TODO_ELEMENT", index);
      router.go(-1);
    },
    dialog({ commit }, msg) {
      return new Promise(resolve => {
        commit("DIALOG_ACTIVATE", { msg, callback: resolve });
      });
    }
  },
  modules: {},
  getters: {
    uniqueTitle: state => title => {
      if (state.toDoList.find(elem => elem.title === title)) return false;
      else return true;
    }
  }
});
