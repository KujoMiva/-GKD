<template>
  <view class="container-layer-info">
    <view class="container-layer-top">
      <slot name="top-body" />
    </view>
    <view class="container-layer-btm">
      <QStabs
        animation-mode="line2"
        :tabs="tabs"
        :width="tabsItemWidth"
        :current="swiperCurrent"
        :font-size="24"
        :active-color="'#EAC13A'"
        @change="tabClickHandler($event, '1')"
      />
      <swiper class="item-swiper" :current="swiperCurrent" :duration="200" @change="changeHandler">
        <swiper-item v-for="(temp, index) in tabs" :key="index">
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class="item-scroll">
              <slot :page="index+1"> {{ `第${index+1}页内容` }} </slot>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
// items
import QStabs from '@/components/QS-tabs/QS-tabs'
export default {
  components: { QStabs },
  props: {
    tabs: {
      type: Array,
      default() {
        return ['测试', '测试', '测试']
      }
    }
  },
  data() {
    return {
      ...uni.getSystemInfoSync(),
      swiperCurrent: 0
    }
  },
  computed: {
    tabsItemWidth() {
      const { screenWidth, tabs } = this
      return tabs.length < 3 ? screenWidth / (tabs.length / 2) : 250
    }
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
.container-layer-info {
  position: relative;
  height: 100vh;
  .container-layer {
    &-top {
      height: calc(100vw * (9 / 16) + 60rpx);
      padding-bottom: 60rpx;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      background-color: $miva-color-global;
    }
    &-btm {
      width: 100vw;
      height: calc(100vh - 100vw * (9 / 16));
      position: absolute;
      top: calc(100vw * (9 / 16));
      overflow: hidden;
      border-radius: 30px 30px 0 0;
      background: #fff;
      box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: .5);
    }
  }
  .item-swiper {
    height: calc(100vh - 100vw * (9 / 16));
  }
  .item-scroll {
    padding: 20rpx;
    box-sizing: border-box;
  }
}
</style>
