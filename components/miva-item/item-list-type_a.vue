<template>
  <view class="container-components-list-a">
    <view class="container-top" @click="routerLink(233)">
      <!-- 封面 -->
      <miva-image class="list-a-cover" :src="itemData.cover" />
      <!-- 内容容器 -->
      <view class="group-body">
        <!-- 标题 -->
        <view class="list-a-title">{{ itemData.title }}</view>
        <!-- 简介 -->
        <view class="list-a-description">{{ itemData.description }}</view>
        <view class="other-time">{{ itemData.created_at | formatTime }}</view>
      </view>
    </view>
    <view class="container-btm">
      <!-- 用户信息组 -->
      <view class="group-user-info">
        <mivaAvatar :user-id="33" :size="60" :checked-avatar="false" />
        <view class="user-nickname">九条米法</view>
      </view>
      <!-- 点赞评论数组 -->
      <view class="group-other">
        <view class="other-star iconfont icon-aixintubiao">100</view>
        <view class="other-comment iconfont icon-liuyantubiao">99</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    libRouter: {
      type: String,
      required: true
    },
    itemData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    routerLink(id) {
      this.$navigateTo({ url: this.$libRouter[this.libRouter] }, { id })
    }
  }
}
</script>

<style lang="scss">
.container-components-list-a {
  height: 240rpx;
  padding: 50rpx 0;
  .container {
    &-top {
      display: flex;
      height: 200rpx;
      position: relative;
    }
    &-btm {
      height: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      color: #aaa;
    }
  }
  .group {
    &-body {
      width: calc(100% - 200rpx);
      .other-time {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 24rpx;
        color: #aaa;
      }
    }
    &-other,
    &-user-info {
      display: flex;
      align-items: center;
      view {
        margin: 5rpx;
        &::before {
          font-weight: bold;
          margin: 5rpx;
          color: #f45050;
        }
      }
    }
  }
  .list-a {
    &-cover {
      width: 160rpx;
      height: 160rpx;
      margin-right: 30rpx;
      border-radius: 10rpx;
      overflow: hidden;
      box-shadow: 0 0 1px #000;
    }
    &-title {
      font-size: 28rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    &-description {
      padding-top: 10rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 24rpx;
      color: #666;
    }
  }
  .iconfont {
    font-size: 28rpx;
  }
}
</style>
