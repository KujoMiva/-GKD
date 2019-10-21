import { getVerifyCode, loginVer, loginPwd, getUserInfoSelf } from '@/api/user'
// eslint-disable-next-line
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'

const state = {
  token: null,
  userInfo: {},
  verifyCode: {
    phone: '',
    time: null
  }
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_VERIFYCODE: (state, verifyCode) => {
    state.verifyCode = verifyCode
  }
}

let timer = null
const actions = {
  async verifyCode({ commit, state }, phone) {
    // 先读取缓存 判断是否新手机号
    const [err_phone, res_phone] = await uni.getStorage({ key: 'verifyCodeInfo' })
    // 如果是新手机号
    if (err_phone !== null || res_phone.data.phone !== phone) {
      // console.log('是新手机号')
      // 先清除旧定时器
      clearInterval(timer)
      // 是新手机号先建立缓存
      await uni.setStorage({ key: 'verifyCodeInfo', data: { phone, time: Date.now() }})
      // 请求发送短信验证码
      const { code = 400, message = '' } = await getVerifyCode({ phone }) || {}
      uni.showToast({ title: message, icon: 'none', position: 'bottom' })
      // 判断验证码是否发送成功
      if (code === 400) {
        uni.showModal({
          title: '彩蛋',
          content: '彩蛋: 乱输手机号,罚站1分钟',
          showCancel: false,
          confirmText: '再不敢了',
          confirmColor: '#eac13a'
        })
      }
      if (code !== 200) {
        return
      }
      await handler(Date.now())
      return
    }
    // console.log('不是新手机号')
    await handler(res_phone.data.time)
    uni.showToast({ title: '发送短信验证码CD中', icon: 'none', position: 'bottom' })
    async function handler(timeBefore) {
      timeBefore = parseInt(timeBefore)
      commit('SET_VERIFYCODE', { phone, time: 59 - parseInt((Date.now() - timeBefore) / 1000) })
      timer = setInterval(_ => {
        const computeTime = parseInt((Date.now() - timeBefore) / 1000)
        if (state.verifyCode.time < 60 && state.verifyCode.time > 0) {
          commit('SET_VERIFYCODE', { phone, time: 60 - computeTime })
        } else {
          store.dispatch('user/removeVerifyCode')
        }
      }, 1000)
    }
    // return console.log('调试结束')
  },
  async removeVerifyCode({ commit }) {
    commit('SET_VERIFYCODE', { phone: '', time: null })
    uni.removeStorage({ key: 'verifyCodeInfo' })
    clearInterval(timer)
  },
  async loginVer({ commit }, accountInfo) {
    const { account, verifyCode } = accountInfo
    const res = await loginVer({ account, verifyCode })
    const { message, data: { token } = {}} = res
    uni.showToast({ title: message, icon: 'none', position: 'bottom' })
    commit('SET_TOKEN', token)
    await store.dispatch('user/getUserInfoSelf')
    await store.dispatch('user/removeVerifyCode')
    return res
  },
  // 密码登录
  async loginPwd({ commit }, accountInfo) {
    const { account, password } = accountInfo
    const res = await loginPwd({ account: account.trim(), password })
    // eslint-disable-next-line
    let { message, data: { token } = {} } = res
    message = message === '参数错误' ? '手机号格式错误' : message
    uni.showToast({ title: message, icon: 'none', position: 'bottom' })
    commit('SET_TOKEN', token)
    await store.dispatch('user/getUserInfoSelf')
    await store.dispatch('user/removeVerifyCode')
    return res
  },
  // 获取用户个人信息
  async getUserInfoSelf({ commit }) {
    // 先从缓存中获取
    const [err_storage, res_storage] = await uni.getStorage({ key: 'user-info' })
    if (!err_storage) {
      commit('SET_USER_INFO', res_storage.data)
    }
    // 再从服务器获取
    const res = await getUserInfoSelf() || {}
    const { data = {}} = res
    commit('SET_USER_INFO', data)
    // 最后更新缓存数据
    uni.setStorage({ key: 'user-info', data })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// 获取缓存中的token
; (async function() {
  const { data } = await getToken()
  state.token = data
}())
