<template>
  <view class="container-page-info-video">
    <view class="container-layer-top">
      <video v-if="showVideo" class="item-video" :src="test" />
    </view>
    <view class="container-layer-btm">
      <!--  -->
      <QStabs
        class="item-tabs"
        animation-mode="line2"
        :tabs="tabs"
        :width="tabsItemWidth"
        :current="swiperCurrent"
        :font-size="24"
        :active-color="'#FFE454'"
        @change="tabClickHandler($event, '1')"
      />
      <swiper class="item-swiper" :current="swiperCurrent" :duration="200" @change="changeHandler">

        <swiper-item>
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class="item-scroll">
              <itemPageDetails :details-data="detailsData" :more-list="moreList" />
            </view>
          </scroll-view>
        </swiper-item>

        <swiper-item>
          <scroll-view class="item-swiper" :show-scrollbar="false" scroll-y="true">
            <view class="item-scroll">
              <itemComment v-for="a in 3" />
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
import itemComment from '@/components/miva-item/item-comment'
import itemPageDetails from './components/item-page-details'

export default {
  components: { QStabs, itemComment, itemPageDetails },
  data() {
    return {
      ...uni.getSystemInfoSync(),
      showVideo: false,
      test:
        'https://unm-video.oss-cn-beijing.aliyuncs.com/%E6%88%91%E4%BB%AC%E7%9A%84%E5%85%B0%E5%B7%9E%E7%89%9B%E8%82%89%E9%9D%A2_2~1.mp4',
      tabs: ['详情', '评论'],
      id: 0,
      detailsData: {},
      swiperCurrent: 0,
      moreMore: 'more',
      moreList: []
    }
  },
  computed: {
    tabsItemWidth() {
      const { screenWidth, tabs } = this
      return tabs.length < 3 ? screenWidth / (tabs.length / 2) : 250
    }
  },

  created() {
    setTimeout(_ => {
      this.showVideo = true
    }, 1000)
  },
  onLoad(option) {
    this.id = option.id
    const { id } = this
    this.detailsData = {
      title:
        id + '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？',
      description:
        id + '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？',
      cover:
        'http://cq-photo.oss-cn-huhehaote.aliyuncs.com/uploads/20190924/080504d289846ef803cc77026e850a60.png',
      disk_link: '',
      disk_pwd: '',
      created_at: '760896000000',
      tag: [
        '漫画',
        '动画',
        '灰色',
        'warning',
        'mal',
        '灰色',
        'warning',
        'normal'
      ]
    }
    // 更多推荐
    for (let i = 0; i < 5; i++) {
      this.moreList.push({
        title:
          i + '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？',
        description:
          i + '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？',
        cover:
          'http://cq-photo.oss-cn-huhehaote.aliyuncs.com/uploads/20190924/080504d289846ef803cc77026e850a60.png',
        disk_link: '',
        disk_pwd: '',
        created_at: '760896000000'
      })
    }
  },
  onBackPress() {
    this.showVideo = false
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
.container-page-info-video {
  position: relative;
  height: 100vh;
  background: red;
  .container-layer {
    &-top {
      height: calc(100vw * (9 / 16) + 60rpx);
      padding-bottom: 60rpx;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      // background-color: $miva-color-global;
      background-color: #000;
    }
    &-btm {
      width: 100vw;
      height: calc(100vh - 100vw * (9 / 16));
      position: absolute;
      top: calc(100vw * (9 / 16));
      z-index: 2;
      overflow: hidden;
      background: #fff;
      box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.5);
    }
  }
  .item-tabs {
    box-shadow:  0 0 3px $uni-border-color;
  }
  .item-swiper {
    height: calc(100vh - 100vw * (9 / 16) - 60rpx);
    // height: 80%;
  }
  .item-scroll {
    padding: 0 20rpx;
    box-sizing: border-box;
  }
  .item-video {
    width: 100%;
    height: 100%;
  }
}
</style>
