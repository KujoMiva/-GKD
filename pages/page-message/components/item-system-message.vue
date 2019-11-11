<template>
  <view class="container-item-system-message">
    <view class="layer-left">
      <mivaAvatar :user-id="34" :size="80" :src="$img_1" :checked-avatar="false" />
    </view>
    <view class="layer-right">
      <view class="group-info">
        <view class="item-nickname">月落钰 <text>赞了你的评论:</text></view>
        <view class="item-time">2019年11月8日</view>
      </view>
      <view class="item-context">
        普普通通的日推而已[大哭]
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.container-item-system-message {
  padding: 20rpx 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: space-between;
  .layer {
    &-left {
      width: 15%;
      padding-top: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-right {
      width: 85%;
      padding-bottom: 10rpx;
      border-bottom: 1rpx solid #f8f8f8;
    }
  }
  .group-info {
    padding: 10rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .item-nickname {
    font-size: $uni-font-size-sm;
    color: $uni-color-primary;
    text {
      padding-left: 20rpx;
      color: $uni-text-color;
    }
  }
  .item-time {
    font-size: $uni-font-size-sm / 2;
    color: $uni-text-color-grey;
  }
  .item-context {
    // padding: 10rpx 0;
    font-size: $uni-font-size-sm;
    color: $uni-text-color;
  }
}
</style>
