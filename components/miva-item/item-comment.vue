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
          <view class="iconfont icon-zan" @click="btnStarHandler">{{ 22 }}</view>
          <view class="iconfont icon-zan unstar" @click="btnUnStarHandler">{{ 33 }}</view>
        </view>
        <view class="item-btn-event iconfont icon-more1" @click="btnEventHandler" />
      </view>
      <!-- 回复 -->
      <view class="group-comment">
        <view v-for="a in 3" class="item-box">
          <view class="item-group">
            <text class="item-nickname">九条米法</text>
            <text class="item-body" @click="routerLink('评论详情页')">但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？</text>
          </view>
        </view>
        <view class="item-total" @click="routerLink('评论详情页')">共999条回复 <text class="iconfont icon-right" /></view>
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
  },
  methods: {
    routerLink(url) {
      this.$navigateTo({ url: this.$libRouter[url] })
    },
    btnStarHandler() {
      uni.showToast({ title: '点了一个赞', icon: 'none', position: 'bottom' })
    },
    btnUnStarHandler() {
      uni.showToast({ title: '点了一个踩', icon: 'none', position: 'bottom' })
    },
    btnEventHandler() {
      uni.showActionSheet({
        itemList: ['举报'],
        success: function(res) {
          console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.container-item-comment {
  position: relative;
  display: flex;
  padding: 30rpx 0;
  color: $uni-text-color;
  .layer {
    &-left {
      width: 15%;
      padding-top: 20rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-right {
      width: 85%;
    }
  }
  .item-floor {
    padding-top: 20rpx;
    white-space: nowrap;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
  .group-time {
    font-size: 24rpx;
    color: #aaa;
  }
  .group-body {
    padding-bottom: 30rpx;
    font-size: 28rpx;
  }

  .group-comment {
    padding: 20rpx !important;
    box-sizing: border-box;
    border-radius: 0 20rpx 20rpx 20rpx;
    font-size: 24rpx;
    background: $uni-bg-color-grey;
    .item-group {
      margin: 20rpx 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .item-nickname {
      font-size: 24rpx;
      color: $miva-color-pink;
      &::after {
        content: ' : ';
      }
    }
    .item-total,
    .iconfont::before {
      font-size: $uni-font-size-sm;
      color: $miva-color-pink;
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
        font-size: $uni-font-size-base;
      }
      .icon-zan::before {
        margin-right: 10rpx;
        font-size: $uni-font-size-lg;
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
