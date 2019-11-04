<template>
  <view class="container-components-list-comment">
    <view class="container-layer-left">
      <mivaAvatar :user-id="1" :size="80" :checked-avatar="false" />
    </view>
    <view class="container-layer-right">
      <!-- 昵称 -->
      <view class="group-nickname">
        <text class="item-nickname">九条米法</text>
      </view>
      <!-- 时间 -->
      <view class="group-time">{{ 760896000000 | formatTime }}</view>
      <!-- 内容 -->
      <view class="group-body">{{ '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？' }}</view>
      <!-- 附加项 -->
      <view class="container-layer-other">
        <view class="group-other">
          <view class="iconfont">
            <text class="iconfont icon-zan" />
            <text>{{ 22 }}</text>
          </view>
          <view class="iconfont">
            <text class="unstar iconfont icon-zan" />
            <text>{{ 22 }}</text>
          </view>
        </view>
        <view class="iconfont icon-more1" @click="moreActionHandler" />
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
  methods: {
    moreActionHandler() {
      uni.showActionSheet({
        itemList: ['加入黑名单', '举报'],
        success: res => {
          const { tapIndex } = res
          console.log(tapIndex)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.container-components-list-comment {
  display: flex;
  padding: 30rpx 0;
  .container-layer {
    &-left {
      width: calc(100% / 6);
      padding: 20rpx;
      box-sizing: border-box;
    }
    &-right {
      width: calc(100% - (100% / 6));
      padding-right: 20rpx;
      > view {
        padding-bottom: 15rpx;
        box-sizing: border-box;
      }
    }
  }
  .item-nickname {
    font-size: 30rpx;
  }
  .group-time {
    font-size: 24rpx;
    color: #aaa;
  }
  .group-body {
    font-size: 28rpx;
    color: #666;
  }
  .container-layer-other{
    display: flex;
    justify-content: space-between;
    color: #aaa;
  }
  .group-other {
    width: 50%;
    display: flex;
    justify-content: space-between;
    view {
      font-size: 24rpx;
      display: inline-block;
    }
    .icon-zan {
      margin-right: 10rpx;
      font-size: 30rpx;
    }
    .unstar {
      display: inline-block;
      transform: rotateX(180deg);
    }
  }
  .group-comment{
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
      color: #EAC13A;
      &::after {
        content: ' : '
      }
    }
    .item-total,.iconfont::before {
      font-size: 24rpx;
      color: #EAC13A;
    }
  }
}
</style>
