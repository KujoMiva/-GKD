<template>
  <view class="container-layer-block">
    <view class="item-title">
      <text>{{ title }}</text>
      <text v-if="note" class="item-note">( {{ note }} )</text>
    </view>
    <slot>插槽内容</slot>
    <view class="item-btn-more">更多{{ moreText }}</view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    moreText: {
      type: String,
      default: '内容'
    },
    note: {
      type: [String, Number, Boolean],
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container-layer-block {
  position: relative;
  .item-title {
    padding: 40rpx 0;
    font-size: 32rpx;
    font-weight: bold;
  }
  .item-note {
    margin-left: 20rpx;
    font-size: 24rpx;
    font-weight: normal;
    color: #666;
  }
  .item-btn-more {
    padding: 40rpx;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    &::after {
      font-family: "iconfont";
      content: "\E699";
    }
  }
}
</style>
