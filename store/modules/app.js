import { getSTS } from '@/api/utils.js'

const state = {
  setting: {},
  stsCache: null,
  systemInfo: null,
  networkType: null
}

const mutations = {
  SAVE_SETTING: (state, data) => {
    state.setting = data
  },
  SAVE_STS: (state, data) => {
    state.stsCache = data
  },
  SAVE_SYSTEMINFO: (state, data) => {
    state.systemInfo = data
  },
  SAVE_NETWORKTYPE: (state, data) => {
    state.networkType = data
  }
}

const actions = {
  readSetting({ commit }) {
    uni.getStorage({
      key: 'app-setting',
      success(res) {
        const { data = {}} = res
        commit('SAVE_SETTING', data)
      },
      fail(err) {
        console.log('没有设置信息', err)
      }
    })
  },
  saveSetting({ commit }, data) {
    // 保存设置
    uni.setStorage({
      key: 'app-setting',
      data,
      success() {
        console.log('设置储存成功')
        commit('SAVE_SETTING', data)
      },
      fail() {
        uni.showToast({ title: '设置储存失败', icon: 'none', position: 'bottom' })
      }
    })
  },
  getSTS({ state, commit }) {
    const { stsCache } = state
    return new Promise((resolve, reject) => {
      if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
        const msg = 'sts密钥正常'
        console.log(msg)
        return resolve(msg)
      }
      getSTS().then(res => {
        const { data = {}} = res
        const msg = `临时密钥保存成功有效期至:${new Date(data.expiration).toLocaleString()}`
        commit('SAVE_STS', data)
        console.log(msg, state.sts)
        resolve(msg, state.sts)
      }).catch(err => {
        console.log('sts密钥获取失败', err)
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
