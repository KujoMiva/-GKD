<template>
  <view class="container-item-private-letter">
    <view class="layer-left">
      <mivaAvatar :user-id="34" :size="110" :src="$img_1" :checked-avatar="false" />
    </view>
    <view class="layer-right">
      <view class="group-info">
        <view class="item-nickname">九条米法</view>
        <view class="item-time">2019年11月8日</view>
      </view>
      <view class="item-context">
        @九条米法九条米法九条米法九条米法九条米法九条米法九条米法
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.container-item-private-letter {
  padding-bottom: 100rpx;
  position: relative;
  display: flex;
  justify-content: space-between;
  .layer {
    &-left {
      width: 15%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-right {
      width: 85%;
      padding: 0 10rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .group-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .item-nickname {
    font-size: $uni-font-size-base;
    color: $uni-text-color;
  }
  .item-time {
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
  .item-context {
    width: 100%;
    padding: 10rpx 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
}
</style>
