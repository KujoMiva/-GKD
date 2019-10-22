import Vue from 'vue'
import App from './App'
// 注册vuex
import store from './store/'
Vue.prototype.$store = store
// 注册路由字典
// import libRouter from '@/utils/miva-package/lib_router.json'
// Vue.prototype.$libRouter = libRouter
// 注册路由拦截器
import mivaRouter from '@/utils/miva-package/router'
Vue.use(mivaRouter, store)
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
// 全局昵称组件
import mivaNickname from './components/miva-item/item-nickname'
Vue.component('mivaNickname', mivaNickname)
// 测试图片
import img_1 from './static/default_1.jpg'
import img_2 from './static/default_2.jpg'
import img_3 from './static/default_3.png'
Vue.prototype.$img_1 = img_1
Vue.prototype.$img_2 = img_2
Vue.prototype.$img_3 = img_3

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
