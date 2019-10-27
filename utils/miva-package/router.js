import { getToken } from '@/utils/auth'
import { transfromQuery } from '@/utils'
import libRouter from '@/utils/miva-package/lib_router.json'

exports.install = async(Vue, store) => {
  Vue.prototype.$libRouter = libRouter
  Vue.prototype.$reLaunch = await middleware('reLaunch', handler)
  Vue.prototype.$switchTab = await middleware('switchTab', handler)
  Vue.prototype.$redirectTo = await middleware('redirectTo', handler)
  Vue.prototype.$navigateTo = await middleware('navigateTo', handler)
  Vue.prototype.$navigateBack = await middleware('navigateBack', handler)
  // 参数处理中间件
  async function middleware(type, handler) {
    return (params, query = {}) => {
      const { url, name: pageName, whiteList, blackList } = params.url || {}
      const queryParams = transfromQuery(query)
      params.url = url + queryParams
      handler({ type, pageName, params, whiteList, blackList })
    }
  }
  // 页面跳转处理器
  async function handler({ type, params, whiteList = true, blackList = false, pageName = '' }) {
    console.log(type, params, whiteList, blackList, pageName)
    const { data: isLogin } = await getToken() || {}
    const { networkType } = store.getters
    const toUrl = params.url.split('?')[0]
    // 离线访问处理
    if (networkType === 'none' && (whiteList === false || blackList === true)) {
      uni.showToast({ title: '离线时无法进入', icon: 'none', position: 'bottom' })
      return
    }
    // 用户登录状态下的处理
    if (isLogin) {
      // 用户在登录状态下进入登录页面的处理
      if (pageName === '登录') {
        Vue.prototype.$switchTab({ url: libRouter['个人中心'] })
        return
      }
      // 从服务器请求新的用户信息
      store.dispatch('user/getUserInfoSelf')
      uni[type](params)
      return
    }
    // 未登录时进入白名单页面的处理
    if (whiteList === true) {
      uni[type](params)
      return
    }
    // 最终对未登录状态的页面处理 跳转到登录页面
    Vue.prototype.$navigateTo({ url: libRouter['登录'] }, { redirect_to: toUrl })
  }
}

