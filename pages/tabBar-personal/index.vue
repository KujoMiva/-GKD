<template>
  <view class="container-page-personal" :class="show&&'show-on'">
    <view class="item-animation" />
    <view class="group-userinfo">
      <mivaAvatar :user-id="userInfo.user_id" :src="userInfo.avatar||$img_1" :size="120" :checked-avatar="false" />
      <mivaNickname :user-info="verifyLoginUserInfo" />
      <!-- 设置按钮 -->
      <view class="item-btn-setting iconfont icon-settings" @click="routerLink('系统设置')" />
    </view>
    <!-- 宫格 -->
    <view class="group-grid" :class="show&&'group-uniGrid'">
      <uniGrid :column="4" :show-border="false" :highlight="false">
        <uniGridItem v-for="(temp, index) in topItemList" :key="index">
          <view style="text-align:center" @click="routerLink(temp.link, temp.query)">
            <view class="item-icon iconfont" :class="temp.icon" />
            <view style="font-weight: bold;color:#000">{{ temp.title }}</view>
          </view>
        </uniGridItem>
      </uniGrid>
    </view>
    <view class="group-list" :class="show&&'group-unilist'">
      <uniList>
        <uniListItem :show-arrow="false" title="投稿" />
        <uniListItem :show-arrow="false" title="创作中心" />
      </uniList>
      <uniList>
        <uniListItem :show-arrow="false" title="热门活动" />
      </uniList>
    </view>
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
      show: false,
      topItemList: [
        {
          title: '消息',
          icon: 'icon-shoucangtubiao',
          link: '消息页面',
          query: { page: 0 }
        },
        {
          title: '好友',
          icon: 'icon-kafeitubiao',
          link: '我的好友',
          query: { page: 0 }
        },
        {
          title: '粉丝',
          icon: 'icon-liuyantubiao',
          link: '我的好友',
          query: { page: 1 }
        },
        {
          title: '动态',
          icon: 'icon-labtubiao',
          link: '用户信息',
          query: { page: 1 }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'systemInfo']),
    verifyLoginUserInfo() {
      return this.userInfo && this.userInfo.nickname
        ? this.userInfo
        : { nickname: '未登录' }
    }
  },
  created() {
    this.$store.dispatch('user/getUserInfoSelf')
  },
  onNavigationBarButtonTap(evt) {
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
    routerLink(link, query) {
      this.$navigateTo({ url: this.$libRouter[link] }, { ...query })
    }
  }
}
</script>

<style lang="scss">
.container-page-personal {
  position: relative;
  background: #f8f8f8;
  .group-userinfo {
    padding: 50rpx 50rpx 20rpx;
    margin-bottom: 20rpx;
    position: relative;
    background-color: #fff;
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
  .group-userinfo,
  .group-grid {
    position: relative;
    background-color: rgba($color: #fff, $alpha: 1);
    &:after {
      position: absolute;
      z-index: 10;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      content: "";
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: $uni-border-color;
    }

    &:before {
      position: absolute;
      z-index: 10;
      right: 0;
      top: 0;
      left: 0;
      height: 1px;
      content: "";
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: $uni-border-color;
    }
  }
  .uni-list {
    margin-top: 20rpx;
    background-color: rgba($color: #fff, $alpha: 1);
  }
  &.show-on {
    background: none;
    .group-userinfo,
    .group-grid,
    .uni-list {
      background-color: rgba($color: #fff, $alpha: 0);
      &:before,
      &:after {
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
    .item-animation {
      width: 100vw;
      min-height: 225vw;
      // height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      &::before {
        content: "";
        display: block;
        width: 200vw;
        height: 50vw;
        position: absolute;
        top: -5vw;
        right: -5vw;
        z-index: -1;
        transform: rotateZ(30deg);
        transform-origin: 50% 50%;
        border: 50rpx double;
        background-color: #fff;
        color: $miva-color-global;
        border-radius: 0 40px 0 0;
      }
      &::after {
        content: "";
        display: block;
        width: 400vw;
        height: 50vw;
        position: absolute;
        top: 0vw;
        left: -100vw;
        z-index: -2;
        transform: rotateZ(-60deg);
        transform-origin: 50% 50%;
        border: 50rpx double;
        background-color: $miva-color-global;
        color: #fff;
      }
    }
  }
}
</style>
