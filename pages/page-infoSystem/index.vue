<template>
  <view class="container-page-systeminfo">
    <uniList>
      <uniListItem
        v-for="(temp, index) in systemList"
        :key="index"
        :show-arrow="false"
        :title="temp.key | titleZhCn"
        :note="JSON.stringify(temp.val)"
      />
    </uniList>
    <view class="copy">KujoMiva systemInfo power by uniapp</view>
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// item
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
export default {
  filters: {
    titleZhCn(titleEn) {
      const systemInfo = {
        safeArea: '安全区域',
        wifiEnabled: 'Wi-Fi 的系统开关',
        locationEnabled: '地理位置的系统开关',
        bluetoothEnabled: '蓝牙的系统开关',
        notificationSoundAuthorized: '允许微信通知带有声音的开关',
        notificationBadgeAuthorized: '允许微信通知带有标记的开关',
        notificationAlertAuthorized: '允许微信通知带有提醒的开关',
        notificationAuthorized: '允许微信通知的开关',
        microphoneAuthorized: '允许微信使用麦克风的开关',
        locationAuthorized: '允许微信使用定位的开关',
        cameraAuthorized: '允许微信使用摄像头的开关',
        albumAuthorized: '允许微信使用相册的开关',
        swanNativeVersion: '宿主平台版本号',
        SDKVersion: '客户端基础库版本',
        fontSizeSetting: '用户字体大小设置',
        platform: '客户端平台',
        system: '操作系统版本',
        cacheLocation: '上一次缓存的位置信息',
        app: '当前运行的客户端',
        host: '宿主平台',
        AppPlatform: 'App平台',
        appName: '宿主APP名称',
        currentBattery: '当前电量百分比',
        storage: '设备磁盘容量',
        version: '引擎版本号',
        language: '应用设置的语言',
        titleBarHeight: '标题栏高度',
        navigationBarHeight: '导航栏的高度',
        statusBarHeight: '状态栏的高度',
        windowBottom: '可使用窗口的底部位置',
        windowTop: '可使用窗口的顶部位置',
        windowHeight: '可使用窗口高度',
        windowWidth: '可使用窗口宽度',
        screenHeight: '屏幕高度',
        screenWidth: '屏幕宽度',
        pixelRatio: '设备像素比',
        batteryLevel: '电量',
        model: '手机型号',
        brand: '手机品牌'
      }
      return `${titleEn} (${systemInfo[titleEn]})` || titleEn
    }
  },
  components: { uniList, uniListItem },
  computed: {
    ...mapGetters(['systemInfo']),
    systemList() {
      const arr = []
      const before = ['brand', 'model', 'platform', 'system', 'version']
      for (const key in this.systemInfo) {
        arr.push({ key, val: this.systemInfo[key] })
      }
      arr.sort((a, b) => {
        if (before.indexOf(a.key) !== -1) return -1
        if (before.indexOf(b.key) !== -1) return 1
        const val_a = a.key.toLowerCase()
        const val_b = b.key.toLowerCase()
        return val_a > val_b ? 1 : -1
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.container-page-systeminfo {
  .copy {
    padding: 30rpx 0;
    font-size: 24rpx;
    text-align: center;
    color: #aaa;
  }
}
</style>
