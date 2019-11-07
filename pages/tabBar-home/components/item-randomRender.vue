<template>
  <view>
    <itemListTypeA v-if="itemData.useItem === 0" :lib-router="libRouter" :item-data="itemData" />
    <itemListTypeB v-if="itemData.useItem === 1" :lib-router="libRouter" :item-data="itemData" />
  </view>
</template>
<script>
import itemListTypeA from '@/components/miva-item/item-list-type_a'
import itemListTypeB from '@/components/miva-item/item-list-type_b'
export default {
  components: {
    itemListTypeA,
    itemListTypeB
  },
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  computed: {
    libRouter() {
      const arr = ['网盘分享详情', '视频作品详情']
      return arr[this.itemData.useItem]
    }
  }
  // data() {
  //   return {
  //     useItem: 0
  //   }
  // },
  // created() {
  //   this.useItem = Math.floor(Math.random() * 2)
  //   console.log(this.useItem)
  // }
}
</script>
