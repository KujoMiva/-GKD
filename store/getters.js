const getters = {
  /** @app */
  setting: state => state.app.setting,
  stsCache: state => state.app.stsCache,
  systemInfo: state => state.app.systemInfo,
  networkType: state => state.app.networkType,
  token: state => state.user.token,
  /** @user */
  userInfo: state => state.user.userInfo,
  verifyCode: state => state.user.verifyCode
}

export default getters
