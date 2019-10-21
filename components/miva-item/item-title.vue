<template>
  <view class="container-components-item-title">
    <view class="item-title-text ">{{ label }}</view>
    <slot />
  </view>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '标题栏组件'
    }
  }
}
</script>

<style lang="scss" scoped>
.container-components-item-title{
  padding-bottom: 60rpx;
  .item-title-text {
    margin: 0 0 20rpx;
    padding-left: 10rpx;
    font-size: 32rpx;
    font-weight: bold;
    border-left: 10rpx solid #EAC13A;
  }
}
</style>
