import { getTags } from "@/api/tags";

const user = {
  state: {
    tags: [],
    mark: false
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags;
      collection(state, tags);
    }
  },
  actions: {
    getTags({ commit }) {
      return new Promise((resolve, reject) => {
        getTags()
          .then(res => {
            commit("SET_TAGS", res);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

const collection = (state, tags) => {
  let { article_num_list = [], tags_list = [] } = tags;
  tags_list.forEach(item => {
    let temp = article_num_list.find(i => {
      return i._id == item._id;
    });
    item.tags_article_num = temp == null ? 0 : temp.count;
  });
  state.data = tags_list.sort((a, b) => {
    return a.tags_article_num < b.tags_article_num;
  });
  state.tags = tags_list;
  state.mark = true;
};

export default user;
