import Vue from "vue"
import Vuex from "vuex"
import { table } from "./table"
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    table
  }
})
