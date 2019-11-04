<template>
  <view class="container-item-comment">
    <view class="layer-left">
      <mivaAvatar :user-id="1" :size="80" :checked-avatar="false" />
      <view class="item-floor"># {{ 233 }}</view>
    </view>
    <view class="layer-right">
      <view class="group-info">
        <mivaNickname :user-info="userInfo" />
        <view class="item-time">{{ 760896000000 | formatTime }}</view>
      </view>
      <!-- 内容 -->
      <view class="group-body">{{ '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？' }}</view>
      <!-- 附加项 -->
      <view class="group-bottom">
        <view class="group-other">
          <view class="iconfont icon-zan">{{ 22 }}</view>
          <view class="iconfont icon-zan unstar">{{ 33 }}</view>
        </view>
        <view class="item-btn-event iconfont icon-more1" @click="moreActionHandler" />
      </view>
      <!-- 回复 -->
      <view class="group-comment">
        <view class="item-box">
          <view class="item-group">
            <text class="item-nickname">九条米法</text>
            <text class="item-body">但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？</text>
          </view>
        </view>
        <view class="item-total">共999条回复 <text class="iconfont icon-right" /></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
          avatar: '/static/default_1.jpg',
          nickname: '九条米法'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.container-item-comment {
  position: relative;
  display: flex;
  padding: 30rpx 0;
  .layer {
    &-left {
      //   width: calc(100% / 6);
      width: 15%;
      padding-top: 20rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-right {
      width: calc(100% - (100% / 6));
      > view {
        // padding-bottom: 15rpx;
        box-sizing: border-box;
      }
    }
  }
  .item-floor {
    padding-top: 20rpx;
    white-space: nowrap;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
  .item-nickname {
    font-size: 30rpx;
  }
  .group-time {
    font-size: 24rpx;
    color: #aaa;
  }
  .group-body {
    padding-bottom: 30rpx;
    font-size: 28rpx;
    color: #666;
  }

  .group-comment {
    padding: 20rpx !important;
    box-sizing: border-box;
    border-radius: 0 20rpx 20rpx 20rpx;
    font-size: 24rpx;
    background: #f8f8f8;
    .item-group {
      margin: 10rpx 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .item-nickname {
      font-size: 24rpx;
      color: #eac13a;
      &::after {
        content: " : ";
      }
    }
    .item-total,
    .iconfont::before {
      font-size: 24rpx;
      color: #eac13a;
    }
  }

  .item-time {
    position: relative;
    top: -20rpx;
    font-size: 24rpx;
    color: $uni-text-color-grey;
  }

  .group-bottom {
    padding-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $uni-text-color-grey;
    .group-other {
      width: 50%;
      display: flex;
      justify-content: space-between;
      .iconfont {
        font-size: $uni-font-size-sm;
      }
      .icon-zan::before {
        margin-right: 10rpx;
      }
      .unstar::before {
        display: inline-block;
        transform: rotateX(180deg);
      }
    }
    .item-btn-event {
      padding: 0 20rpx;
      font-weight: bold;
      font-size: $uni-font-size-lg;
      color: $uni-text-color-grey;
    }
  }
}
</style>
