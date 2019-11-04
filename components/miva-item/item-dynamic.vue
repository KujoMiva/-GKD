<template>
  <view class="container-item-dynamic">
    <view class="layer-left">
      <mivaAvatar :user-id="34" :src="userInfo.avatar||$img_1" :size="80" :checked-avatar="false" />
    </view>
    <view class="layer-right">

      <view class="group-info">
        <mivaNickname :user-info="userInfo" />
        <view class="item-time">{{ 760896000000 | formatTime }}</view>
      </view>

      <view class="group-body-text">我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。</view>

      <itemImageLayer :width="layerRightInfo.width" :img-list="dynamicData.img_list" />

      <view class="group-bottom">
        <!-- 点赞评论数组 -->
        <view class="group-other">
          <view class="other-star iconfont icon-Share" @click="btnShareHandler">100</view>
          <view class="other-comment iconfont icon-liuyantubiao" @click="btnCommentHandler">99</view>
          <view class="other-star iconfont icon-aixintubiao" @click="btnStarHandler">100</view>
        </view>

        <!-- 附加操作 -->
        <view class="item-btn-event iconfont icon-more1" @click="btnEventHandler" />
      </view>

      <!-- 关注按钮 -->
      <view class="item-btn-follw iconfont icon-aixintubiao" @click="btnFollowHandler">关注</view>

    </view>
  </view>
</template>

<script>
import itemImageLayer from '@/components/miva-item/item-image-layer'
export default {
  components: { itemImageLayer },
  props: {
    testProps: {
      type: Number,
      default: 0
    },
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
  data() {
    return {
      layerRightInfo: {},
      dynamicData: {
        img_list: []
      }
    }
  },
  created() {
    for (let i = 0; i < this.testProps; i++) {
      this.dynamicData.img_list.push('/static/default_1.jpg')
    }
  },
  mounted() {
    const layerRight = uni
      .createSelectorQuery()
      .in(this)
      .select('.layer-right')
    layerRight
      .fields({ size: true }, data => {
        this.layerRightInfo = data
      })
      .exec()
  },
  methods: {
    routerLink(url) {
      this.$navigateTo({ url: this.$libRouter[url] })
    },
    btnEventHandler() {
      uni.showActionSheet({
        itemList: ['分享', '取消关注', '举报'],
        success: function(res) {
          console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
        },
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
    },
    btnFollowHandler() {
      uni.showToast({ title: '点击了关注按钮', icon: 'none', position: 'bottom' })
    },
    btnShareHandler() {
      uni.showToast({ title: '点击了分享按钮', icon: 'none', position: 'bottom' })
    },
    btnCommentHandler() {
      uni.showToast({ title: '点击了评论按钮', icon: 'none', position: 'bottom' })
      this.routerLink('动态详情')
    },
    btnStarHandler() {
      uni.showToast({ title: '点了一个赞', icon: 'none', position: 'bottom' })
    }
  }
}
</script>

<style lang="scss">
.container-item-dynamic {
  position: relative;
  display: flex;
  padding: 50rpx 0 30rpx;
  border-bottom: 1px solid $uni-border-color;
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
  .item-time {
    position: relative;
    top: -20rpx;
    font-size: 24rpx;
    color: $uni-text-color-grey;
  }
  .group-body-text {
    padding-bottom: 30rpx;
    font-size: $uni-font-size-lg;
    color: $uni-text-color;
  }
  .group-bottom {
    padding-top: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .group-other {
    width: 100% * 0.7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    view {
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
      &::before {
        margin-right: 10rpx;
        font-size: $uni-font-size-lg;
      }
    }
  }
  .item-btn-event {
    padding: 0 20rpx;
    font-weight: bold;
    font-size: $uni-font-size-lg;
    color: $uni-text-color-grey;
  }
  .item-btn-follw {
    padding: 10rpx 30rpx;
    position: absolute;
    top: 70rpx;
    right: 0;
    font-size: 24rpx;
    border-radius: 5px;
    background: $miva-color-pink;
    color: $uni-text-color-inverse;
    &::before {
      margin-right: 5px;
      font-weight: bold;
    }
  }
}
</style>
