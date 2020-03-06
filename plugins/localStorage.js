import createPersistedState from "vuex-persistedstate";

//when we refresh the page, the number of products in carts don't disappear
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({})(store);
  });
};
