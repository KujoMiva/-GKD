<template>
  <view class="container-page-dynamic">
    <view>
      <itemDynamic v-for="(temp, index) in testData" :key="index" :test-props="index" />
    </view>
    <uni-load-more :status="more" />
    <uniFab :pattern="pattern" horizontal="right" :content="contentFab" @trigger="trigger" />
  </view>
</template>

<script>
// item
import uniFab from '@/components/uni-fab/uni-fab'
import itemDynamic from '@/components/miva-item/item-dynamic'
import uniLoadMore from '@/components/uni-load-more/uni-load-more'
export default {
  components: {
    uniFab,
    itemDynamic,
    uniLoadMore
  },
  data() {
    return {
      testData: 5,
      more: 'more',
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

  // 无限加载
  onReachBottom() {
    this.more = 'loading'
    if (this.testData > 20) {
      this.more = 'noMore'
      return
    }
    setTimeout(async _ => {
      this.testData += 5
    }, 300)
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
