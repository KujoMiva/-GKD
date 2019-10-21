import Vue from 'vue'
import App from './App'
// 注册vuex
import store from './store/'
Vue.prototype.$store = store
// 注册路由字典
import libRouter from '@/utils/miva-package/lib_router.json'
Vue.prototype.$libRouter = libRouter
// 注册全局过滤器
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 网络图片加载组件
import mivaImage from './components/miva-item/item-image'
Vue.component('mivaImage', mivaImage)
// 全局头像组件
import mivaAvatar from './components/miva-item/item-avatar'
Vue.component('mivaAvatar', mivaAvatar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
