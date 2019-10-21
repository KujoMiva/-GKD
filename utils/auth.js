const TokenKey = 'login-token'

export async function getToken() {
  const [err, res] = await uni.getStorage({ key: TokenKey })
  return err || res
}

export async function setToken(token) {
  const [err, res] = await uni.setStorage({ key: TokenKey, data: token })
  return err || res
}

export async function removeToken() {
  const [err, res] = await uni.removeStorage({ key: TokenKey })
  return err || res
}
