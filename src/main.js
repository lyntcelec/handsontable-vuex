import Vue from "vue"
import App from "./App.vue"
import Vuex from "vuex"
import { store } from "./store"
import "handsontable/dist/handsontable.full.css"

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount("#app")
