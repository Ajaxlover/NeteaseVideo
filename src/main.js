import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
})

import { Search, Button } from 'vant'

Vue.use(Button)
Vue.use(Search)
app.$mount()
