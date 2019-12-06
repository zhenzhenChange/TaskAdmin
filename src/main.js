import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'

import App from './App.vue'
import Card from './components/Card.vue'
import Clerk from './views/Member/Clerk.vue'
import Part from './views/Member/Part.vue'

import './assets/style.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component('my-card', Card)
Vue.component('member-clerk', Clerk)
Vue.component('member-part', Part)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')