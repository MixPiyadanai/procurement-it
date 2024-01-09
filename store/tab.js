export default {
  namespaced: true,
  state: () => ({
    tab: "index",
  }),
  actions: {
    changeTab({ commit }, newTab) {
      commit("setTab", newTab);
    },
  },
  mutations: {
    setTab(state, newTab) {
      state.tab = newTab;
    },
  },
  getters: {
    tab(state) {
      return state.tab;
    },
  },
};
