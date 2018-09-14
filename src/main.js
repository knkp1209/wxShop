import Vue from 'vue'
import App from './App'
import http from './utils/http'
import to from './utils/to'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$to = to
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
