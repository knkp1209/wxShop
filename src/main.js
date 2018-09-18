import Vue from 'vue'
import App from './App'
import http from './utils/http'
import to from './utils/to'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$store=store;
Vue.prototype.$http = http
Vue.prototype.$to = to
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
