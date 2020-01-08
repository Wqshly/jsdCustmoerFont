// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
// import Vuex from 'vuex'
import api from './request/api/index'
import img from './request/img/index'
import md5 from 'js-md5'

// 全局注册
Vue.prototype.$api = api
Vue.prototype.$img = img
Vue.prototype.$md5 = md5
Vue.prototype.$axios = axios
Vue.use(ElementUI)
global.baseUrl = 'http://localhost:8080/jsd_war_exploded/'

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
