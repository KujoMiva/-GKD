<template>
  <view class="container-item-comment">
    <view class="layer-left">
      <mivaAvatar :user-id="34" :size="80" :src="$img_1" :checked-avatar="false" />
    </view>
    <view class="layer-right">

      <view class="group-info">
        <mivaNickname />
        <view class="item-time">2019年11月8日</view>
      </view>

      <view class="item-context">
        回复我: {{ '一个是阳光下的页,一个是地表底的根' }}
      </view>

      <view class="item-context item-comment-my">
        我的评论: {{ '团藏和三代就是两个极端的表现' }}
      </view>

    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.container-item-comment {
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
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
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
  .item-comment-my {
    padding: 20rpx;
    font-size: $uni-font-size-sm;
    background-color: darken($uni-bg-color-grey, 2%);
  }
}
</style>
