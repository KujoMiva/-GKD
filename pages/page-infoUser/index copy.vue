<template>
  <view class="container-page-infoUser">
    <view class="container-layer-top">
      <!--  -->
    </view>
    <view class="container-layer-btm">
      <QStabs
        animation-mode="line2"
        :tabs="self?['主页', `动态 ${99}`, '操作']:['主页', `动态 ${999}`]"
        :width="self?systemInfo.screenWidth/1.5:systemInfo.screenWidth"
        :current="swiperCurrent"
        :font-size="24"
        :active-color="'#EAC13A'"
        @change="tabClickHandler($event, '1')"
      />
      <swiper class="item-swiper" :current="swiperCurrent" :duration="200" @change="changeHandler">
        <swiper-item>
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class=" item-scroll">测试内容</view>
          </scroll-view>
        </swiper-item>
        <swiper-item>
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class=" item-scroll">测试内容</view>

          </scroll-view>
        </swiper-item>
        <swiper-item v-if="self">
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class=" item-scroll">测试内容</view>

          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// items
import QStabs from '@/components/QS-tabs/QS-tabs'
export default {
  components: { QStabs },
  data() {
    return {
      self: true,
      swiperCurrent: 0,
      moreMore: 'more'
    }
  },
  computed: {
    ...mapGetters(['systemInfo'])
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
.container-page-infoUser {
  position: relative;
  height: 100vh;
  .container-layer {
    &-top {
      height: calc(100vw * (9 / 16) + 60rpx);
      padding-bottom: 60rpx;
      box-sizing: border-box;
      background: #f45050;
    }
    &-btm {
      width: 100vw;
      height: calc(100vh - 100vw * (9 / 16));
      position: absolute;
      top: calc(100vw * (9 / 16));
      overflow: hidden;
      border-radius: 30px 30px 0 0;
      background: #fff;
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
