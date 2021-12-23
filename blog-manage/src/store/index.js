import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    token: ''
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization)
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem("token", token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  actions: {
  },
  modules: {
  }
})
