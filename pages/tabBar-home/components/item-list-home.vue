<template>
  <view class="container-components-list-home">
    <view v-for="(temp, index) in itemData" :key="index" class="container-leyer-netdisk" @click="routerLink(temp.id)">
      <!-- 点赞组 -->
      <view class="group-star">
        <view class="other-star iconfont icon-aixintubiao">{{ temp.star }}</view>
      </view>
      <miva-image mode="aspectFill" class="netdisk-cover" :src="temp.cover" />
      <view class="netdisk-title">{{ temp.title }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Array,
      default() {
        const arr = []
        for (let i = 0; i < 6; i++) {
          arr.push({
            id: i,
            title: '默认标题默认标题默认标题默认标题默认标题默认标题',
            cover: '/static/default_1.jpg',
            star: 100 + i
          })
        }
        return arr
      }
    }
  },
  methods: {
    routerLink(id) {
      this.$navigateTo({
        url: `/pages/page-group-details/index?id=${id}`
      })
    }
  }
}
</script>

<style lang="scss">
.container-components-list-home {
  display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  .container-leyer-netdisk {
    width: calc(100% / 3);
    height: 100vw / 3;
    padding: 20rpx;
    position: relative;
    box-sizing: border-box;
    .group-star {
      width: calc(100% - 60rpx);
      padding: 0 10rpx 10rpx;
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      z-index: 2;
      text-align: right;
      border-radius: 10rpx 10rpx 0 0;
      background: linear-gradient(rgba($color: #000000, $alpha: .3) 80%, rgba($color: #000000, $alpha: .0));
      color: #fff;
    }
    .netdisk-cover {
      width: 100%;
      height: 80%;
      border-radius: 10rpx;
      // box-shadow:0 0 1px #000;
    }
    .netdisk-title {
      height: 20%;
      font-size: 28rpx;
      text-align: center;
      overflow: hidden;
    }
  }
  .iconfont {
    font-size: 28rpx;
    &::before {
      font-weight: bold;
    }
  }
}
</style>
