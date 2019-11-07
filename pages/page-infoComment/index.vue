<template>
  <view class="container-page-info-comment">
    <itemComment :show-children="false" :is-children="false" />
    <view class="group-children-comment">
      <view class="item-title">回复</view>
      <itemComment v-for="a in 3" :show-children="false" />
    </view>
  </view>
</template>

<script>
// items
import itemComment from '@/components/miva-item/item-comment'
export default {
  components: { itemComment }
}
</script>

<style lang="scss">
.container-page-info-comment{
    position: relative;
    .group-children-comment {
      padding: 20rpx;
      box-sizing: border-box;
    }
    .item-title {
      font-weight: bold;
      font-size: $uni-font-size-title;
    }
}
</style>
