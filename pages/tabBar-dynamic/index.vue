<template>
  <view class="container-page-dynamic">
    <itemDynamic v-for="(temp, index) in 10" :key="index" :test-props="index" />
  </view>
</template>

<script>
import itemDynamic from '@/components/miva-item/item-dynamic'
export default {
  components: {
    itemDynamic
  }
}
</script>

<style lang="scss">
.container-page-dynamic{
    position: relative;
    padding: 20rpx;
    padding-bottom: 100rpx;
}
</style>
