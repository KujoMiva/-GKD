<template>
  <view class="container-page-open-advter">
    <miva-image class="tiem-open-advter-bg" :src="bgPng" mode="aspectFill" />
    <view class="item-btn-next" @click="routerLink">{{ timeNum }} 进入</view>
    <view class="container-btm">
      <miva-image class="item-logo" :src="logPng" mode="aspectFit" />
      <view class="item-copy">- power by KujoMiva &copy; 2019 -</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bgPng: 'https://kujomiva-1259361798.cos.ap-chengdu.myqcloud.com/default/b0b06a7fbc0196b2c316fe4869fcb6db.jpg',
      logPng: 'https://kujomiva-1259361798.cos.ap-chengdu.myqcloud.com/default/eab618c06709b4a04a5a276b612383a8.png',
      timeNum: 5,
      timer: null
    }
  },
  mounted() {
    this.timer = setInterval(_ => {
      this.timeNum--
      if (this.timeNum > 0) return
      clearInterval(this.timer)
      this.routerLink()
    }, 1000)
  },
  methods: {
    routerLink() {
      clearInterval(this.timer)
      uni.switchTab({ url: this.$libRouter['首页'] })
    }
  }
}
</script>

<style lang="scss">
.container-page-open-advter {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f8f8f8;
  .tiem-open-advter-bg {
    width: 100%;
    height: 80vh;
  }
  .item-btn-next{
    padding: 10rpx 30rpx;
    position: fixed;
    bottom: 21vh;
    left: 3vw;
    font-size: 38rpx;
    border-radius: 30px;
    background-color: rgba($color: #000000, $alpha: .4);
    color: #fff;
  }
  .container-btm {
    width: 100vw;
    height: 20vh;
    padding: 30rpx 0;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: #f8f8f8;
    .item-logo{
      width: 30vh;
      height: 10vh;
      padding: 10rpx 0;
    }
    .item-copy {
      font-size: 24rpx;
      white-space: nowrap;
      color: #aaa;
    }
  }
}
</style>
