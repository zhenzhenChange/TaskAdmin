import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem("userID")) {
    return next('/')
  }
  next()
})

export default router