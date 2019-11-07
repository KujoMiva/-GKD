<template>
  <view class="container-components-list-b">
    <view @click="routerLink(233)">
      <miva-image class="list-b-cover" :src="itemData.cover" />
    </view>
    <!-- 下方容器 -->
    <view class="container-btm">
      <!-- 标题 -->
      <view class="list-b-title">{{ itemData.title }}</view>
      <view class="other-time">{{ itemData.created_at | formatTime }}</view>
      <view class="container-group">
        <!-- 用户信息组 -->
        <view class="group-user-info">
          <mivaAvatar :user-id="34" :size="60" :checked-avatar="false" />
          <view class="user-nickname">九条米法</view>
        </view>
        <!-- 点赞评论数组 -->
        <view class="group-other">
          <view class="other-star iconfont icon-aixintubiao">100</view>
          <view class="other-comment iconfont icon-liuyantubiao">99</view>
        </view>
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
      console.log(this.libRouter, id)
      this.$navigateTo({ url: this.$libRouter[this.libRouter] }, { id })
    }
  }
}
</script>

<style lang="scss">
.container-components-list-b {
  height: 450rpx;
  padding: 50rpx 0;
  .list-b {
    &-cover {
      width: 100%;
      height: 300rpx;
      border-radius: 30rpx;
      overflow: hidden;
    }
    &-title {
      font-size: 28rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
  .other-time {
    text-align: right;
    font-size: 24rpx;
    color: #aaa;
  }
  .container-group {
    height: 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    color: #aaa;
  }
  .group {
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
  .iconfont {
    font-size: 28rpx;
  }
}
</style>

