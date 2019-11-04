<template>
  <view class="container-page-info-dynamic">
    <itemDynamic :test-props="7" />

    <itemComment v-for="a in 3" />

  </view>
</template>

<script>
// items
import itemDynamic from '@/components/miva-item/item-dynamic'
import itemComment from '@/components/miva-item/item-comment'
export default {
  components: { itemDynamic, itemComment }
}
</script>

<style lang="scss">
.container-page-info-dynamic {
  position: relative;
  padding: 0 20rpx;
}
</style>
