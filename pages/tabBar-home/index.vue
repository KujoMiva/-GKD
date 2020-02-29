<template>
  <view class="container-page-home">
    <view class="animation-search">
      <itemSraech />
    </view>
    <view v-show="pageShow" class="animation-body">
      <itemSwiper />
      <view class="container-layer-body">
        <itemTitile label="合辑推荐">
          <itemList lib-router="合辑作品详情" />
        </itemTitile>
        <!-- <itemTitile label="视频推荐"> -->
        <!-- <itemList lib-router="视频作品详情" /> -->
        <!-- </itemTitile> -->
        <!-- <itemTitile label="分享推荐"> -->
        <!-- <itemList lib-router="网盘分享详情" /> -->
        <!-- </itemTitile> -->
        <itemTitile label="随便看看">
          <view v-if="listShow">
            <view v-if="listData.length>0">
              <randomRender v-for="(temp,index) in listData" :key="index" :item-data="temp" />
            </view>
          </view>
          <uni-load-more :status="more" />
        </itemTitile>
      </view>
    </view>
  </view>
</template>

<script>
// item
import itemSraech from '@/components/miva-item/item-search'
import itemTitile from '@/components/miva-item/item-title'
import itemSwiper from './components/item-swiper'
import itemList from './components/item-list-home'
import randomRender from './components/item-randomRender'
import uniLoadMore from '@/components/uni-load-more/uni-load-more'
export default {
  components: {
    itemSraech,
    itemSwiper,
    itemTitile,
    itemList,
    randomRender,
    uniLoadMore
  },
  data() {
    return {
      scrollTop: 0,
      pageShow: false,
      listShow: false,
      listData: [],
      more: 'more'
    }
  },
  async created() {
    const res = await testData(this)
    this.listData = [...this.listData, ...res]
  },
  mounted() {
    uni.pageScrollTo({ scrollTop: 0 })
    setTimeout(_ => {
      this.pageShow = true
    }, 1000)
  },
  // 监听滚动事件
  onPageScroll(scrollTop) {
    this.listShow = true
  },
  // 无限加载
  onReachBottom() {
    this.more = 'loading'
    if (this.listData.length > 20) {
      this.more = 'noMore'
      return
    }
    setTimeout(async _ => {
      const res = await testData(this)
      this.listData = [...this.listData, ...res]
    }, 300)
  }
}

async function testData(vue, num = 5) {
  const array = []
  for (let i = 0; i < num; i++) {
    const useItem = Math.floor(Math.random() * 2)
    array.push({
      title:
        Math.random() * 1000 +
        '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？',
      description:
        Math.random() * 1000 +
        '但要是字母大小写不同，该如何来确定是升序排列，还是降序排序呢？',
      cover: useItem === 0 ? vue.$img_1 : vue.$img_3,
      disk_link: '',
      disk_pwd: '',
      useItem,
      created_at: '760896000000'
    })
  }
  return array
}
</script>

<style lang="scss">
.container-page-home {
  position: relative;
  &::before {
    content: "";
    width: 100vw;
    height: 0;
    position: absolute;
    top: 0;
    z-index: -1;
    display: block;
    background-color: $miva-color-global;
    animation: loading-height 0.5s 0.3s linear forwards;
  }
  .item-miva{
    width: 200rpx;
    height: 200rpx;
    position: fixed;
    z-index: -1;
    bottom: 100rpx;
    right: 100rpx;
    border: 30rpx double;
    color: $miva-color-global;
  }
  .animation-search {
    width: 0;
    margin: auto;
    transform: scale(0);
    animation: loading-scale 0.5s 0.8s linear forwards;
  }
  .animation-body {
    opacity: 0;
    animation: loading-opacity 0.5s 0s linear forwards;
  }
  .container-layer-body {
    padding: 30rpx;
  }
}

@keyframes loading-height {
  0% {
    height: 0;
    border-radius: 0 0 50% 50%;
  }
  100% {
    height: 100vw * (9 / 21) * 0.7;
    border-radius: 0;
  }
}
@keyframes loading-scale {
  0% {
    transform: scaleX(0);
  }
  25% {
    transform: scaleX(1);
  }
  100% {
    width: 100%;
    transform: scale(1);
  }
}
@keyframes loading-opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
