<template>
  <view class="container-page-dynamic">
    <itemDynamic v-for="(temp, index) in 10" :key="index" :test-props="index" />

    <uniFab :pattern="pattern" horizontal="right" :content="contentFab" @trigger="trigger" />
  </view>
</template>

<script>
// item
import uniFab from '@/components/uni-fab/uni-fab'
import itemDynamic from '@/components/miva-item/item-dynamic'
export default {
  components: {
    uniFab,
    itemDynamic
  },
  data() {
    return {
      pattern: {
        color: '#ffafc9',
        backgroundColor: '#fff',
        selectedColor: '#000',
        buttonColor: '#ffafc9'
      },
      contentFab: [
        {
          iconPath: '/static/edit.png',
          selectedIconPath: '/static/edit.png',
          text: '发动态',
          active: false
        },
        {
          iconPath: '/static/top.png',
          selectedIconPath: '/static/top.png',
          text: '回顶部',
          active: false
        }
      ]
    }
  },
  methods: {
    trigger(evt) {
      console.log(evt)
      // this.contentFab[e.index].active = !e.item.active
      const { index } = evt
      if (index === 0) {
        console.log('发动态')
        this.routerLink('发动态')
        return
      }
      if (index === 1) {
        console.log('回顶部')
        uni.pageScrollTo({ scrollTop: 0, duration: 300 })
        return
      }
    },
    routerLink(url) {
      this.$navigateTo({ url: this.$libRouter[url] })
    }

  }
}
</script>

<style lang="scss">
.container-page-dynamic {
  position: relative;
  padding: 20rpx;
  padding-bottom: 100rpx;
  background-color: $uni-bg-color;
}
</style>
