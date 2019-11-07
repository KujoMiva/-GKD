<template>
  <view class="container-page-info-video">
    <view class="container-layer-top">
      <video class="item-video" :src="test" />
    </view>
    <view class="container-layer-btm">
      <!--  -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      test: 'https://unm-video.oss-cn-beijing.aliyuncs.com/%E6%88%91%E4%BB%AC%E7%9A%84%E5%85%B0%E5%B7%9E%E7%89%9B%E8%82%89%E9%9D%A2_2~1.mp4'
    }
  }
}
</script>

<style lang="scss">
.container-page-info-video {
  position: relative;
  height: 100vh;
  background: red;
    .container-layer {
    &-top {
      height: calc(100vw * (9 / 16) + 60rpx);
      padding-bottom: 60rpx;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      // background-color: $miva-color-global;
      background-color: #000;
    }
    &-btm {
      width: 100vw;
      height: calc(100vh - 100vw * (9 / 16));
      position: absolute;
      top: calc(100vw * (9 / 16));
      z-index: 2;
      overflow: hidden;
      background: #fff;
      box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.5);
    }
  }
  .item-video {
    width: 100%;
    height: 100%;
  }
}
</style>
