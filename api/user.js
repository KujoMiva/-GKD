import request from '@/utils/request'

// 密码登录
export function loginPwd({ account, password }) {
  return request.post({
    url: '/loginPwd',
    data: {
      account,
      password
    }
  })
}

// 验证码登录
export function loginVer({ account, verifyCode }) {
  return request.post({
    url: '/loginVer',
    data: {
      account,
      verifyCode
    }
  })
}

// 获取短信验证码
export function getVerifyCode({ phone }) {
  return request.post({
    url: '/sendSMS',
    data: {
      phone
    }
  })
}

// 获取用户个人信息
export function getUserInfoSelf() {
  return request.get({
    url: '/userInfoSelf'
  })
}

// 获取其他用户信息
export function getUserInfoOther({ id }) {
  return request.get({
    url: '/userInfoOther',
    data: { id }
  })
}

// 设置密码
export function resetPassword({ phone, password, verifyCode }) {
  return request.put({
    url: '/password',
    data: {
      phone,
      password,
      verifyCode
    }
  })
}

// 设置头像
export function resetAvatar({ avatar }) {
  return request.put({
    url: '/userAvatar',
    data: {
      avatar
    }
  })
}
// 设置用户信息
export function resetUserInfo({ nickname, birthday, sex, qq, description }) {
  const params = { nickname, birthday, sex, qq, description }
  for (const key in params) {
    if (params[key] === undefined) {
      delete params[key]
    }
  }
  return request.put({
    url: '/userInfo',
    data: params
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
