import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'

import App from './App.vue'
import Card from './components/Card.vue'

import './assets/style.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component('my-card', Card)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')