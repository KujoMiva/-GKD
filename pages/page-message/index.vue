<template>
  <view class="container-page-info-message">
    <QStabs class="item-tabs" animation-mode="line2" :width="tabsItemWidth" :tabs="tabs" :current="swiperCurrent" :font-size="24" :active-color="'#FFE454'" @change="tabClickHandler($event, '1')" />
    <swiper class="item-swiper" :current="swiperCurrent" :duration="200" @change="changeHandler">
      <!-- 私信列表 -->
      <swiper-item>
        <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
          <view class="item-page">
            <itemPrivateLetter v-for="a in 10" />
          </view>
        </scroll-view>
      </swiper-item>
      <!-- 评论列表 -->
      <swiper-item>
        <scroll-view class="item-swiper" :show-scrollbar="false" :scroll-y="true">
          <view class="item-page">
            <itemComment v-for="a in 10" />
          </view>
        </scroll-view>
      </swiper-item>
      <!-- @我列表 -->
      <swiper-item>
        <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
          <view class="item-page">
            <itemCallme v-for="a in 10" />
          </view>
        </scroll-view>
      </swiper-item>
      <!-- 系统消息列表 -->
      <swiper-item>
        <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
          <view class="item-page">
            <itemSystemMessage v-for="a in 10" />
          </view>
        </scroll-view>
      </swiper-item>

    </swiper>
  </view>
</template>

<script>
// items
import QStabs from '@/components/QS-tabs/QS-tabs'
import itemCallme from './components/item-callme'
import itemComment from './components/item-comment'
import itemPrivateLetter from './components/item-private-letter'
import itemSystemMessage from './components/item-system-message'
export default {
  components: {
    QStabs,
    itemCallme,
    itemComment,
    itemPrivateLetter,
    itemSystemMessage
  },
  data() {
    return {
      ...uni.getSystemInfoSync(),
      tabs: ['私信', '评论', '@我', '通知'],
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
    routerLink(url) {
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
.container-page-info-message {
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
