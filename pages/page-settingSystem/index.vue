<template>
  <view class="container-page-system-setting">
    <uniList>
      <uniListItem
        title="屏幕常亮"
        :show-arrow="false"
        :show-switch="true"
        :show-extra-icon="true"
        :switch-checked="setting.keepScreen"
        :switch-color="acrColor"
        :disabled="disabledKeepScreen"
        :extra-icon="{
          color: settingData.keepScreen?acrColor:'#7a7e83',
          size: '22',
          type: 'iconfont icon-lamp'
        }"
        @switchChange="keepScreenSwicth"
      />
      <uniListItem
        :show-badge="true"
        :show-arrow="false"
        :show-extra-icon="true"
        :title="`清空缓存`"
        :badge-text="storage.currentSize*1000 | numberFormatter(2)"
        :badge-type="disabledClearStorage?`default`:`warning`"
        :badge-inverted="false"
        :extra-icon="{
          color: !disabledClearStorage?acrColor:'#7a7e83',
          size: '22',
          type: 'iconfont icon-Trash'
        }"
        @click="clearStorage"
      />
      <uniListItem
        :show-badge="true"
        :show-arrow="false"
        :show-extra-icon="true"
        :title="`系统信息`"
        :extra-icon="{
          color: acrColor,
          size: '22',
          type: 'iconfont icon-tab'
        }"
        @click="routerLink('系统信息')"
      />
    </uniList>
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// item
import uniList from '@/components/uni-list/uni-list'
import uniListItem from '@/components/uni-list-item/uni-list-item'
export default {
  components: { uniList, uniListItem },
  data() {
    return {
      // 激活色调设置
      acrColor: '#FFE454',
      storage: {},
      // 设置数据
      settingData: {
        keepScreen: false
      },
      // 一系列禁用设置
      disabledKeepScreen: false,
      disabledClearStorage: false
    }
  },
  computed: {
    // 读取设置信息
    ...mapGetters(['setting', 'systemInfo'])
  },
  watch: {
    // 监听并保存设置信息
    settingData: {
      handler(val, oldVal) {
        this.$store.dispatch('app/saveSetting', val)
      },
      deep: true
    }
  },
  onLoad() {
    // #ifdef H5
    this.disabledKeepScreen = true
    // #endif
    this.settingData = { ...this.settingData, ...this.setting }
    // 读取缓存信息
    this.readStorage()
  },
  methods: {
    routerLink(link) {
      this.$navigateTo({ url: this.$libRouter[link] })
    },
    // 切换屏幕常亮
    keepScreenSwicth({ value }) {
      this.settingData.keepScreen = value
      uni.showToast({
        title: value ? '开启屏幕常亮' : '关闭屏幕常亮',
        icon: 'none',
        position: 'bottom'
      })
    },
    // 读取缓存信息
    readStorage() {
      const miva = this
      uni.getStorageInfo({
        success(res) {
          miva.storage = res
        }
      })
    },
    // 清空缓存
    clearStorage() {
      // 备份设置数据
      const setting = this.setting
      // 备份token
      const token = this.$store.getters.token
      // 备份用户信息
      const userInfo = this.$store.getters.userInfo
      this.disabledClearStorage = true
      uni.clearStorage()
      uni.showToast({
        title: '清空缓存成功',
        icon: 'none',
        position: 'bottom'
      })
      this.$store.dispatch('app/saveSetting', setting)
      if (token.length > 50) {
        this.$store.commit('user/SET_TOKEN', token)
      }
      this.$store.commit('user/SET_USER_INFO', userInfo)
      this.$store.dispatch('user/getUserInfoSelf')
      // 重新读取缓存信息
      this.readStorage()
    }
  }
}
</script>

<style lang="scss">
.container-page-system-setting {
  position: relative;
}
</style>
