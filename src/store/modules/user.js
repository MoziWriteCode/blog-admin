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
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(res => {
            setToken(res.token);
            commit("SET_TOKEN", res.token);
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
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
