import request from '@/utils/package/request_pocky_v139'
import store from '@/store'

// 设置全局配置, 只能配置静态数据
request.prototype.setConfig({
  // url: 'http://192.168.2.102:7001'
  url: 'http://10.11.16.151:7001'
})

// 全局拦截器
request.prototype.addGlobalInterce({
  // 请求拦截器
  request(config) {
    // 判断网络状态
    if (store.getters.networkType === 'none') {
      uni.showToast({ title: '当前无网络连接', icon: 'none', position: 'bottom' })
      return false
    }
    // 判断登录状态
    if (store.getters.token) {
      config.header['token'] = store.getters.token
    }

    return config
  },

  // 响应拦截器 (例如根据状态码拦截数据或者过滤数据)
  // return false或者不return值 则都不会返回值
  // return Promise.reject('xxxxx')，主动抛出错误
  response(res) {
    const { data } = res
    console.log(data)

    // 停止发送请求 request.stop()
    if (JSON.stringify(res) === '{"errMsg":"request:fail abort"}') {
      // do something
      // return Promise.reject('xxxxxxxxx');
      return false
    }

    // return Promise.reject(res)
    return data
  }
})

/* eslint-disable-next-line */
export default new request()
