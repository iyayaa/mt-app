const state = () => ({
  menu: [],
  hotPlace: []
})

const actions = {
  // 左侧列表
  setMenu: ({commit}, menu) => {
    commit('setMenu', menu)
  },
  // 景区热门搜索
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