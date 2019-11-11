<template>
  <view class="container-page-friend">
    <QStabs
      class="item-tabs"
      animation-mode="line2"
      :width="tabsItemWidth"
      :tabs="tabs"
      :current="swiperCurrent"
      :font-size="24"
      active-color="#FFE454"
      @change="tabClickHandler($event, '1')"
    />
    <swiper class="item-swiper" :current="swiperCurrent" :duration="200" @change="changeHandler">
      <swiper-item>
        <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
          <view class="item-page">
            <itemFriend v-for="a in 10" />
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
          <view class="item-page">
            <itemFriend v-for="a in 10" :is-follow="true" />
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
// items
import QStabs from '@/components/QS-tabs/QS-tabs'
import itemFriend from './components/item-friend'

export default {
  components: {
    QStabs,
    itemFriend
  },
  data() {
    return {
      ...uni.getSystemInfoSync(),
      tabs: ['关注', '粉丝'],
      swiperCurrent: 0
    }
  },
  computed: {
    tabsItemWidth() {
      const { screenWidth, tabs } = this
      return screenWidth / (tabs.length / 2)
    }
  },
  onLoad(option) {
    this.swiperCurrent = Number(option.page) || 0
  },
  methods: {
    routerLInk(url) {
      this.$navigateTo({ url })
    },
    tabClickHandler(index, i) {
      this.swiperCurrent = index
    },
    changeHandler(evt) {
      this.swiperCurrent = evt.detail.current
    }
  }
}
</script>

<style lang="scss">
.container-page-friend {
  position: relative;
  .item-tabs {
    border-bottom: 1px solid #f8f8f8;
  }
  .item-swiper {
    // background-color: #f45050;
    height: calc(100vh - 80rpx);
    // #ifdef H5
    height: calc(100vh - 80rpx - 100rpx);
    // #endif
  }
  .item-page {
    padding: 20rpx;
  }
}
</style>
