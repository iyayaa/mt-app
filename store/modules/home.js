const state = () => ({
  menu: [],
  hotPlace: []
})

const actions = {
  setMenu: ({commit}, menu) => {
    commit('setMenu', menu)
  },
  setHotPlace: ({commit}, hotPlace) => {
    commit('setHotPlace', hotPlace)
  }
}

const mutations = {
  setMenu(state, val) {
    state.menu = val
  },
  setHotPlace(state, val) {
    state.hotPlace = val
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}