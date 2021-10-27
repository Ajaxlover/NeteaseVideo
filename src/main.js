import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
})

import { Search, Button, List } from 'vant'

Vue.use(List)
Vue.use(Button)
Vue.use(Search)
app.$mount()
