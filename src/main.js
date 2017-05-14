// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import qs from 'qs'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  render: h => h(App)
})

Vue.directive('loader', {
  bind: function (el, binding) {
    binding.args()
  }
})
