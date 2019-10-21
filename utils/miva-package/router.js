import { getToken } from '@/utils/auth'

const whiteList = [
  '/pages/page-group-setting/index',
  '/pages/page-group-setting/systemInfo',
  '/pages/page-group-account/verifyCode',
  '/pages/page-group-account/problem',
  '/pages/page-group-account/resetPassword',
  '/pages/page-group-search/index',
  '/pages/page-group-details/index',
  '/pages/page-tabbar-self/otherInfo'
]

const blackList = [
  '/pages/page-tabbar-self/otherInfo'
]

exports.install = (Vue, store) => {
  async function handler(type, params) {
    const hasToken = await getToken()
    const toUrl = params.url.split('?')[0]
    console.log(toUrl)
    // 如果是登录状态
    if (hasToken.data) {
      console.log('登录状态')
      // 检测是否断网状态
      console.log(store.getters.networkType)
      if (store.getters.networkType === 'none' && (whiteList.indexOf(toUrl) === -1 || blackList.indexOf(toUrl) !== -1)) {
        uni.showToast({
          title: '断网时无法进入',
          icon: 'none',
          position: 'bottom'
        })
        return
      }
      // 再进入登录页面就重定向到个人设置页面
      if (toUrl === '/pages/page-group-account/login') {
        // 就按照原跳转方法跳转去指定页面
        // uni[type]('指定页面')
        uni.switchTab('/pages/page-tabbar-self/index')
      } else {
        // 登录状态下正常操作
        const hasGetUserInfo = store.getters.userInfo // 从vuex中拿取用户信息
        // if (hasGetUserInfo || whiteList.indexOf(toUrl) !== -1) {
        if (hasGetUserInfo || whiteList.indexOf(toUrl) !== -1) {
          // 从服务器请求新的用户信息
          try {
            store.dispatch('user/getUserInfoSelf')
          } catch (error) {
            console.log('这里获取不到用户信息没关系, 因为是未登录状态进入白名单页面', error)
          }
          uni[type](params)
        } else {
          try {
            // 从服务器请求新的用户信息
            const userInfo = await store.dispatch('user/getUserInfoSelf')
            if (userInfo === null) {
              console.log('请重新登录')
              await store.dispatch('user/logout')
              nextLogin()
              return
            }
            // 不能await 不然断网情况下会被卡住
            // store.dispatch('user/getUserInfoSelf')
            uni[type](params)
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken')
            nextLogin()
          }
        }
      }
    } else {
      // 用户未登录
      console.log('未登录状态', whiteList)
      if (store.getters.networkType === 'none' && blackList.indexOf(toUrl) !== -1) {
        uni.showToast({
          title: '断网时无法进入',
          icon: 'none',
          position: 'bottom'
        })
        return
      }
      if (whiteList.indexOf(toUrl) !== -1) {
        // 用户当前在白名单页面中
        uni[type](params)
        console.log('未登录状态下进入白名单页面')
      } else {
        // 用户如果不在白名单页面中则跳转至登录页
        nextLogin(toUrl)
      }
    }
  }

  Vue.prototype.$navigateTo = async params => {
    handler('navigateTo', params)
  }

  Vue.prototype.$redirectTo = async params => {
    handler('redirectTo', params)
  }

  Vue.prototype.$reLaunch = async params => {
    handler('reLaunch', params)
  }

  Vue.prototype.$switchTab = async params => {
    handler('switchTab', params)
  }

  Vue.prototype.$navigateBack = async params => {
    handler('navigateBack', params)
  }
}

function nextLogin(toUrl) {
  uni.navigateTo({
    url: `/pages/page-group-account/login?redirect_to=${toUrl}`,
    animationType: 'slide-in-bottom'
  })
}
