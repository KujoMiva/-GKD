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

export function resetAvatar({ avatar }) {
  return request.put({
    url: '/userAvatar',
    data: {
      avatar
    }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
