<template>
  <view class="container-item-friend">

    <view class="group-layer-left">
      <mivaAvatar :user-id="34" :size="120" :src="$img_1" :checked-avatar="false" />
      <view class="group-info">
        <mivaNickname />
        <view class="item-content">这个人的个性签名</view>
      </view>
    </view>

    <view v-if="isFollow===null" class="item-btn-event iconfont icon-more1" @click="btnEventHandler" />

    <view v-else class="item-btn-follow iconfont" :class="styleBtnFollow" @click="btnBindHandler">{{ textBtnFollow }}</view>

  </view>
</template>

<script>
export default {
  props: {
    isFollow: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    styleBtnFollow() {
      return this.isFollow ? ' icon-check' : 'icon-Close'
    },
    textBtnFollow() {
      return this.isFollow ? '已关注' : '关注'
    }
  },
  methods: {
    btnEventHandler() {
      uni.showActionSheet({
        itemList: ['设置备注名', '发送私信', '取消关注'],
        success: function(res) {
          uni.showToast({
            title: '选中了第' + (res.tapIndex + 1) + '个按钮',
            icon: 'none',
            position: 'bottom'
          })
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    },
    btnBindHandler() {
      if (this.isFollow) return
      uni.showToast({ title: '关注成功', icon: 'none', position: 'bottom' })
    }
  }
}
</script>

<style lang="scss">
.container-item-friend {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 60rpx;
  .group-layer-left {
    display: flex;
  }
  .group-info {
    // width: 80%;
    padding-left: 20rpx;
    font-size: $uni-font-size-lg;
    .item-content {
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
  }
  .iconfont {
    color: $uni-text-color-grey;
    &::before {
      margin-right: 5rpx;
    }
  }
  .item-btn-follow {
    padding: 5rpx 10rpx;
    border: 1px solid $uni-border-color;
    border-radius: 30px;
    white-space: nowrap;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }

  .icon-Close::before {
    display: inline-block;
    transform: rotate(45deg);
  }
}
</style>
