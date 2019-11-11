<template>
  <view class="container-item-callme">
    <view class="layer-left">
      <mivaAvatar :user-id="34" :size="80" :src="$img_1" :checked-avatar="false" />
    </view>
    <view class="layer-right">
      <view class="group-info">
        <view class="item-nickname">九条米法</view>
        <view class="item-time">2019年11月8日</view>
      </view>
      <view class="item-context">
        @九条米法
      </view>
      <view class="item-context item-link">
        <mivaImage class="item-link-cover" :src="$img_1" />
        <view class="group-link-info">
          <view class="item-link-title">
            <text class="item-link-type">{{ '视频' }}</text>
            {{ '慢生活-初冬是适合思念的日子.' }}
          </view>
          <view class="item-link-by">by {{ '傻傻傻傻傻了' }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.container-item-callme {
  padding-bottom: 100rpx;
  position: relative;
  display: flex;
  justify-content: space-between;
  .layer {
    &-left {
      width: 15%;
      padding-top: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-right {
      width: 85%;
    }
  }
  .group-info {
    padding: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .item-nickname {
    font-size: $uni-font-size-base;
    color: $uni-color-primary;
    &::after {
      content: " 评论:";
      color: $uni-text-color;
    }
  }
  .item-time {
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
  .item-context {
    padding: 10rpx 0;
    font-size: $uni-font-size-base;
    color: $uni-text-color;
  }
  .item-link {
    width: 100%;
    overflow: hidden;
    padding: 10rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: darken($uni-bg-color-grey, 2%);
  }
  .item-link-cover {
    width: 100rpx;
    min-width: 100rpx;
    height: 100rpx;
    min-height: 100rpx;
    margin-right: 10rpx;
    pointer-events: none;
  }
  .group-link-info {
      width: calc(100% - 100rpx);
  }
  .item-link-title {
    width: 100%;
    padding-bottom: 10rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: $uni-font-size-base;
    color: #000;
  }
  .item-link-type {
    display: inline-block;
    padding: 0 10rpx;
    border-radius: 5px;
    border: 1px solid;
    font-size: $uni-font-size-sm;
    transform: scale(0.6);
    color: $miva-color-red;
  }
  .item-link-by {
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
}
</style>
