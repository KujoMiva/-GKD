<template>
  <view class="container-page-infoUser">
    <view class="container-layer-top">
      <itemTop :user-info="renderUserInfo" />
    </view>
    <view class="container-layer-btm">
      <QStabs animation-mode="line2" :tabs="tabs" :width="tabsItemWidth" :current="swiperCurrent" :font-size="24" :active-color="'#EAC13A'" @change="tabClickHandler($event, '1')" />
      <swiper class="item-swiper" :current="swiperCurrent" :duration="200" @change="changeHandler">
        <swiper-item>
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class="item-scroll">
              <layerBlock title="基本信息" more-text="信息">
                <view class="item-base-info">站龄: 1年 (2019年10月26日)</view>
                <view class="item-base-info">年龄: 90后 水瓶座</view>
                <view class="item-base-info">地区: 陕西省 西安市</view>
              </layerBlock>

              <layerBlock title="我的作品" note="22个, 被收藏33次" more-text="作品">
                <view class="item-nomore">还未发布过作品</view>
              </layerBlock>

              <layerBlock title="我的收藏" note="666" more-text="收藏">
                <view class="item-nomore">还未收藏过作品</view>
              </layerBlock>

              <layerBlock title="我的评论" note="233" more-text="评论">
                <view class="item-nomore">还未评论过作品</view>
              </layerBlock>

              <view class="item-nomore" style="padding-bottom:0">&copy; Kujo Miva - No.{{ $route.query.id }} -</view>
            </view>
          </scroll-view>
        </swiper-item>

        <swiper-item>
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class="item-scroll">
              <itemDynamic v-for="(temp, index) in 10" :key="index" :test-props="index" />
              <view class="item-nomore" style="padding-bottom:0">&copy; Kujo Miva - No.{{ $route.query.id }} -</view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
/**
 * 这里判断是否是自己的用户信息
 * 如果不是则调用查询用户信息的接口
 */
// vuex
import { mapGetters } from 'vuex'
// items
import QStabs from '@/components/QS-tabs/QS-tabs'
import itemTop from './components/item-top'
import layerBlock from './components/layer-block'
import itemDynamic from '@/components/miva-item/item-dynamic'
// api
import { getUserInfoOther } from '@/api/user'
export default {
  components: { QStabs, itemTop, layerBlock, itemDynamic },
  data() {
    return {
      ...uni.getSystemInfoSync(),
      tabs: ['主页', `动态 ${999}`],
      swiperCurrent: 0,
      moreMore: 'more',
      renderUserInfo: {}
    }
  },
  computed: {
    ...mapGetters(['systemInfo', 'userInfo']),
    isUserSelf() {
      return Number(this.$route.query.id) === Number(this.userInfo.user_id)
    },
    tabsItemWidth() {
      const { screenWidth, tabs } = this
      return tabs.length < 3 ? screenWidth / (tabs.length / 2) : 250
    }
  },
  async created() {
    await this.$store.dispatch('user/getUserInfoSelf')
    if (this.isUserSelf === false) {
      const otherUserInfo = await getUserInfoOther({
        id: this.$route.query.id
      })
      console.log('他人用户信息', otherUserInfo)
      this.renderUserInfo = otherUserInfo.data
    } else {
      console.log('是个人用户信息')
      this.renderUserInfo = this.userInfo
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
.container-page-infoUser {
  position: relative;
  height: 100vh;
  .container-layer {
    &-top {
      height: calc(100vw * (8 / 16) + 60rpx);
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      background-color: $miva-color-global;
    }
    &-btm {
      width: 100vw;
      height: calc(100vh - 100vw * (8 / 16));
      position: absolute;
      top: calc(100vw * (8 / 16));
      overflow: hidden;
      border-radius: 30px 30px 0 0;
      background: #fff;
      box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.5);
    }
  }
  .item-swiper {
    height: calc(100vh - 100vw * (8 / 16) - 60rpx);
  }
  .item-scroll {
    padding: 0 20rpx;
    padding-bottom: 100rpx;
    box-sizing: border-box;
  }
  .item-base-info {
    padding: 10rpx 0;
    font-size: 26rpx;
    color: #666;
  }
  .item-nomore {
    padding: 100rpx;
    text-align: center;
    font-size: 24rpx;
    color: #aaa;
  }
  .item-btn-setting {
    position: absolute;
    top: 0;
    right: 50rpx;
    font-size: 50rpx;
    color: #000;
  }
}
</style>
