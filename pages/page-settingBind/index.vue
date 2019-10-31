<template>
  <view class="container-page-setting-bind">
    帐号绑定设置
  </view>
</template>

<script>
export default {
  created() {
    uni.getStorageInfo({
      success: (res) => {
        console.log(res)
      }
    })
  }
}
</script>

<style lang="scss">
.container-page-setting-bind{
    position: relative;
}
</style>
