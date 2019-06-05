import { login } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    user_name: "admin",
    user_id: ""
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_ID(state, user_id) {
      state.user_id = user_id;
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(res => {
            setToken(res.token);
            commit("SET_TOKEN", res.token);
            commit("SET_USER_ID", res.user_id);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_USER_ID", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
