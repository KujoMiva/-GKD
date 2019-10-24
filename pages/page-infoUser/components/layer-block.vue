<template>
  <view class="container-layer-block">
    <!--  pageStart -->
    <view class="item-title">{{ titie }}</view>
    <slot>插槽内容</slot>
    <view class="item-btn-more">更多{{ moreText }}</view>
    <!-- pageEnd -->
  </view>
</template>

<script>
export default {
  props: {
    titie: {
      type: String,
      default: '默认标题'
    },
    moreText: {
      type: String,
      default: '内容'
    }
  }
}
</script>

<style lang="scss" scoped>
.container-layer-block {
  position: relative;
}
</style>
