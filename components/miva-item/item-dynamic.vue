<template>
  <view class="container-item-dynamic">
    <view class="layer-left">
      <mivaAvatar :user-id="34" :src="userInfo.avatar||$img_1" :size="80" :checked-avatar="false" />
    </view>
    <view class="layer-right">

      <view class="group-info">
        <mivaNickname :user-info="userInfo" />
        <view class="item-time">2019年10月28日</view>
      </view>

      <view class="group-body-text">我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。</view>

      <view class="group-image">
        <view
          v-for="(temp, index) in dynamicData['img-list']"
          :key="index"
          class="container-image"
          :style="styleImageHandler
            || (dataLen === 5 ? ( (index === 0 || index === 1) ? styleImage_2 : styleImageBase ) : false)
            || (dataLen === 7 ? ( (index === 0 || index === 1 || index === 2) ? styleImageBase : styleImage_4 ) : false)"
        >
          <miva-image class="item-image" :src="temp" :checked="true" />
        </view>
      </view>

      <!-- 点赞评论数组 -->
      <view class="group-other">
        <view class="other-star iconfont icon-Share">100</view>
        <view class="other-comment iconfont icon-liuyantubiao">99</view>
        <view class="other-star iconfont icon-aixintubiao">100</view>
      </view>

      <!-- 附加操作 -->
      <view class="item-btn-event iconfont icon-more1" @click="eventHandler" />

      <!-- 关注按钮 -->
      <view class="item-btn-follw iconfont icon-aixintubiao">关注</view>

    </view>
  </view>
</template>

<script>
export default {
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
        'img-list': []
      }
    }
  },
  computed: {
    styleImageHandler() {
      if (this.dataLen === 4) {
        return this.styleImage_2
      }
      if (this.dataLen === 8) {
        return this.styleImage_4
      }
      if (this.dataLen !== 5 && this.dataLen !== 7) {
        return this.styleImageBase
      }
      return false
    },
    dataLen() {
      return this.dynamicData['img-list'].length
    },
    styleImageBase() {
      const { width } = this.layerRightInfo
      const size = this.dataLen > 3 ? width / 3 : width / this.dataLen
      return `width: ${size}px; height: ${size}px`
    },
    styleImage_2() {
      const { width } = this.layerRightInfo
      return `width: ${width / 2}px; height: ${width / 2}px`
    },
    styleImage_4() {
      const { width } = this.layerRightInfo
      return `width: ${width / 4}px; height: ${width / 4}px`
    }
  },
  created() {
    for (let i = 0; i < this.testProps; i++) {
      this.dynamicData['img-list'].push('/static/default_1.jpg')
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
    eventHandler() {
      uni.showActionSheet({
        itemList: ['分享', '取消关注', '举报'],
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
.container-item-dynamic {
  position: relative;
  display: flex;
  padding: 30rpx 0;
  &::after {
    content: "";
    width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $uni-border-color;
  }
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
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
  .group-body-text {
    padding-bottom: 30rpx;
    font-size: $uni-font-size-lg;
  }
  .group-image {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .container-image {
      padding: 4rpx;
      box-sizing: border-box;
      border-radius: 5px;
      overflow: hidden;
      .item-image {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;
      }
    }
  }
  .group-other {
    width: 100% * 0.7;
    padding-top: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    view {
      margin: 5rpx;
      font-size: $uni-font-size-base;
      color: $uni-text-color-grey;
      &::before {
        margin: 10rpx;
        font-size: $uni-font-size-lg;
        font-weight: bold;
      }
    }
  }
  .item-btn-event {
    position: absolute;
    bottom: 17px;
    right: 5px;
    color: $uni-text-color-grey;
  }
  .item-btn-follw {
    padding: 10rpx 30rpx;
    position: absolute;
    top: 25px;
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
