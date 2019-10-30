<template>
  <view class="container-item-top">

    <view v-if="$img_2" class="item-bg">
      <miva-image class="item-bg-img" :src="$img_2" />
    </view>

    <view class="group-userinfo">

      <view>
        <mivaAvatar
          :user-id="34"
          :src="userInfo.avatar||$img_1"
          :size="120"
          :checked-avatar="true"
        />
        <mivaNickname :size="30" :user-info="userInfo" :shadow="$img_2" />
      </view>

      <!-- 编辑按钮 -->
      <view class="item-btn-setting iconfont icon-edit" @click="routerLink('个人信息设置')" />

    </view>

  </view>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    routerLink(url) {
      this.$navigateTo({ url: this.$libRouter[url] })
    }
  }
}
</script>

<style lang="scss">
.container-item-top {
  position: relative;
  height: 100%;
  .group-userinfo {
    width: 100%;
    padding: 0 50rpx 100rpx;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
  }
  .item-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background: #fff;
    &-img {
      // filter: blur(2px);
      opacity: 0.7;
    }
  }
  .item-base-info {
    padding: 10rpx 0;
    font-size: 26rpx;
    color: #666;
  }
  .item-nomore {
    padding: 100rpx;
    text-align: center;
    font-size: 24rpx;
    color: #aaa;
  }
  .item-btn-setting {
    position: absolute;
    top: 0;
    right: 50rpx;
    font-size: 50rpx;
    color: #000;
  }
}
</style>
