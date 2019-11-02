<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['setting'])
  },
  onLaunch: function() {
    console.log('App Launch')
    // 读取设置信息
    this.$store.dispatch('app/readSetting')
    // #ifdef APP-PLUS
    plus.screen.lockOrientation('portrait-primary')
    // #endif
    // #ifndef H5
    // 开启屏幕常亮
    uni.setKeepScreenOn({
      keepScreenOn: this.setting.keepScreen || false,
      success: _ => {
        if (!this.setting.keepScreen) return
        uni.showToast({
          title: this.setting.keepScreen && '屏幕常亮开启中',
          icon: 'none',
          position: 'bottom'
        })
      }
    })
    // #endif
    // 获取系统信息
    uni.getSystemInfo({
      success: res => {
        delete res['errMsg']
        this.$store.commit('app/SAVE_SYSTEMINFO', res)
      }
    })
    // 获取网络状态
    uni.getNetworkType({
      success: res => {
        const { networkType } = res
        this.$store.commit('app/SAVE_NETWORKTYPE', networkType)
      }
    })
    // 监听网络变化
    uni.onNetworkStatusChange(res => {
      const { networkType } = res
      this.$store.commit('app/SAVE_NETWORKTYPE', networkType)
    })
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "./static/iconfont/iconfont.css";
body {
  background-color: #fff;
}
.group {
    padding-top: $uni-spacing-col-lg;
    background-color: $uni-bg-color-grey;
  }
</style>
