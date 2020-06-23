import Vue from 'vue'
import Vuex from 'vuex'
//import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    ops: [],
    role: '',
    canOrder: false,
    canEdit: false,
    id: '',
    orderId: ''
  },
  mutations: {
    addItems (state, items) {
      state.items = items
    },
    handleRole (state, role) {
      state.role = role
      if(role == "ROLE_USER"){
        state.canOrder = true;
        state.canEdit = false;
      }
      if(role == "ROLE_ADMIN"){
        state.canOrder = true;
        state.canEdit = true;
      }
      if(role == "anon"){
        state.canOrder = false;
        state.canEdit = false;
      }
    },
    addOptions (state, options) {
      state.ops = options
    },
    handleId (state, id) {
      state.id = id
    },
    handleOrderId (state, orderId) {
      state.orderId = orderId
    }
    
  },
  actions: {
  },
  modules: {
  }
})
