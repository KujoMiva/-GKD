<template>
  <view class="container-item-swiper">
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="2000"
      :circular="true"
      :duration="500"
    >
      <swiper-item v-for="(temp,index) in swiperData" :key="index">
        <view class="swiper-item" @click="clickHandler(temp.id)">
          <miva-image mode="aspectFill" class="miva-image swiper-image" :src="temp.cover" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  props: {
    swiperData: {
      type: Array,
      default() {
        const array = []
        for (let i = 0; i < 5; i++) {
          array.push({
            id: i,
            cover: '/static/default_2.jpg'
          })
        }
        return array
      }
    }
  },
  methods: {
    clickHandler(id) {
      console.log('点击了swiper道具:', id)
    }
  }
}
</script>

<style lang="scss">
.container-item-swiper {
  width: 100vw;
  height: 100vw * (9 / 21);
  padding: 30rpx 5vw;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  .swiper {
    width: 100%;
    height: 100%;
    border-radius: 30rpx;
    overflow: hidden;
    .swiper-item {
      width: calc(100% - 20rpx);
      height: 100%;
      margin: 0 10rpx;
      box-sizing: border-box;
      border-radius: 30rpx;
      overflow: hidden;
      border: 1px solid #ddd;
      .swiper-image {
        width: 100%;
        height: 100%;
        // border-radius: 30rpx;
      }
    }
  }
}
</style>
