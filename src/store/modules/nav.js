const user = {
  state: {
    current_path: ""
  },
  mutations: {
    SET_CURRENT_PATH(state, current_path) {
      state.current_path = current_path;
    }
  },
  actions: {
    CurrentPath({ commit }, current_path) {
      commit("SET_CURRENT_PATH", current_path);
    }
  }
};

export default user;
