<template>
  <view class="container-page-bind-phone">
    <view class="container-bottom">
      <view class="item-phone">手机号: {{ phone | hidePhone }}</view>
      <button class="item-button" @click="routerLink('设置密码', {phone})">重置密码</button>
      <view class="item-btn-reset">更换绑定</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: 13344445556
    }
  },
  methods: {
    routerLink(url, query = {}) {
      this.$navigateTo({ url: this.$libRouter[url] }, query)
    }
  }
}
</script>

<style lang="scss">
.container-page-bind-phone {
  position: relative;
  text-align: center;
  font-size: $uni-font-size-lg;
  .container-bottom {
    width: 100%;
    position: fixed;
    bottom: 50rpx;
  }
  .item-button {
    margin: 50rpx 40rpx 20rpx;
    background-color: $miva-color-global;
  }
  .item-btn-reset {
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;
    &::after {
      font-family: "iconfont";
      content: "\E699";
    }
  }
}
</style>
