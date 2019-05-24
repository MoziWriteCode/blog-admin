const getters = {
  userName: state => state.user.user_name,
  userID: state => state.user.user_id,
  token: state => state.user.token,
  tags: state => state.tags.tags,
  currentPath: state => state.nav.current_path
};
export default getters;
