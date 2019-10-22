<template>
  <view class="container-page-personal">
    <view class="container-layer">
      <view class="group-userinfo">
        <mivaAvatar :user-id="34" :src="$img_1" :size="120" :checked-avatar="false" />
        <mivaNickname />
        <!-- 设置按钮 -->
        <view class="item-btn-setting iconfont icon-settings" @click="routerLink('系统设置')" />
      </view>
      <!-- 宫格 -->
      <view :class="show&&'group-uniGrid'">
        <uniGrid :column="4" :show-border="false" :highlight="false">
          <uniGridItem v-for="(temp, index) in topItemList" :key="index">
            <view style="text-align:center" @click="routerLink(temp.link)">
              <view class="item-icon iconfont" :class="temp.icon" />
              <view style=" font-weight: bold;color:#000">{{ temp.title }}</view>
            </view>
          </uniGridItem>
        </uniGrid>
      </view>
      <view :class="show&&'group-unilist'">
        <uniList>
          <uniListItem :show-arrow="false" title="历史记录" />
          <uniListItem :show-arrow="false" title="下载管理" />
          <uniListItem :show-arrow="false" title="我的收藏" />
          <uniListItem :show-arrow="false" title="投稿" />
          <uniListItem :show-arrow="false" title="创作中心" />
          <uniListItem :show-arrow="false" title="热门活动" />
        </uniList>
      </view>
    </view>
    <view class="item-animation" />
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// items
import uniGrid from '@/components/uni-grid/uni-grid.vue'
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
import uniList from '@/components/uni-list/uni-list'
import uniListItem from '@/components/uni-list-item/uni-list-item'
export default {
  components: { uniGrid, uniGridItem, uniList, uniListItem },
  data() {
    return {
      show: true,
      topItemList: [
        { title: '消息', icon: 'icon-shoucangtubiao', link: '登录' },
        { title: '好友', icon: 'icon-kafeitubiao', link: '系统设置' },
        { title: '粉丝', icon: 'icon-liuyantubiao', link: '系统设置' },
        { title: '动态', icon: 'icon-labtubiao', link: '系统设置' }
      ]
    }
  },
  computed: {
    ...mapGetters(['systemInfo'])
  },
  onNavigationBarButtonTap(evt) {
    console.log(evt)
    this.show = !this.show
    // #ifdef APP-PLUS
    var webView = this.$mp.page.$getAppWebview()
    webView.setTitleNViewButtonBadge({
      index: 0,
      text: this.show ? 'on' : 'off'
    })
    // #endif
  },
  methods: {
    routerLink(link) {
      this.$navigateTo({ url: this.$libRouter[link] }, { comefrom: 'open' })
    }
  }
}
</script>

<style lang="scss">
.container-page-personal {
  position: relative;
  .container-layer {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    &::before {
      content: "";
      display: block;
      width: 200vw;
      height: 50vw;
      position: absolute;
      top: -15vw;
      right: -5vw;
      z-index: -1;
      transform: rotateZ(30deg);
      transform-origin: 50% 50%;
      border: 50rpx double;
      background-color: #fff;
      color: $miva-color-global;
      border-radius: 0 40px 0 0;
      // animation: rotate-desc 30s infinite linear;
    }
    &::after {
      content: "";
      display: block;
      width: 400vw;
      height: 50vw;
      position: absolute;
      top: 0vw;
      left: -105vw;
      z-index: -2;
      transform: rotateZ(-60deg);
      transform-origin: 50% 50%;
      border: 50rpx double;
      background-color: $miva-color-global;
      color: #fff;
      // animation: rotate-asc 60s infinite linear;
    }
  }
  .group-userinfo {
    padding: 50rpx 50rpx 0;
    position: relative;
  }
  .item-btn-setting {
    position: absolute;
    top: 50rpx;
    right: 50rpx;
    font-size: 50rpx;
    color: #000;
  }
  .item-icon {
    font-size: 60rpx;
    font-weight: bold;
    color: #000;
  }
  .uni-list {
    background: none !important;
    &::before,
    &::after{
      display: none;
    }
  }
  .group-unilist {
    width: 50vw;
    overflow-x: hidden;
    position: relative;
    left: 20vw;
    top: 30vw;
    transform: rotate(30deg);
  }
  .group-uniGrid {
    transform: rotate(30deg);
    position: relative;
    top: 13vw;
    left: -11vw;
  }
}

@keyframes rotate-asc {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@keyframes rotate-desc {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}
</style>
