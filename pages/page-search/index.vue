<template>
  <view class="container-page-search">
    <!-- 搜索页面 -->
    <view class="container-item-search">
      <itemSraech :input-val="inputVal" :disabled="false" />
    </view>

    <view class="container-layer-body">
      <view>
        <itemTitle v-if="findList.length>0" label="搜索发现">
          <view v-for="(temp, index) in findList" :key="index" class="container-item-tip miva-tag">
            <uniTag :text="temp" @click="tabClickHandler(temp)" />
          </view>
        </itemTitle>

        <itemTitle v-if="histroyList.length>0" label="历史搜索">
          <view class="container-item-tip">
            <uniTag v-for="(temp, index) in histroyList" :key="index" class="uni-tag" :text="temp" @click="tabClickHandler(temp)" />
          </view>
        </itemTitle>
      </view>
    </view>
  </view>
</template>

<script>
import itemSraech from '@/components/miva-item/item-search'
import itemTitle from '@/components/miva-item/item-title'
import uniTag from '@/components/uni-tag/uni-tag'
export default {
  components: {
    itemSraech,
    itemTitle,
    uniTag
  },
  data() {
    return {
      inputVal: '',
      searchList: [],
      findList: ['漫画', '动画', '灰色', 'warning', 'normal'],
      histroyList: ['九条米法']
    }
  },
  onBackPress() {
    // 隐藏键盘
    uni.hideKeyboard()
    console.log('隐藏键盘')
  },
  methods: {
    tabClickHandler(value) {
      console.log(value)
      this.inputVal = value
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes heights {
  100% {
    height: 14vw;
    border-radius: 0 0 60rpx 60rpx;
  }
}
.container-page-search {
  .container-item-search {
    height: 100vw * (9 / 21) * 0.7;
    background-color: $miva-color-global;
    border-color: #fff;
    // #ifndef MP
    animation: heights 0.5s 0.5s linear forwards;
    // #endif
    // #ifdef MP
    animation: heights 0.5s 0.5s linear forwards;
    // #endif
  }

  .item-default {
    width: 200rpx;
    height: 200rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 80rpx;
    background: #eac13a;
  }

  .container-layer-body {
    padding: 30rpx;
  }
  .miva-tag{
    margin: 10rpx;
    display: inline-block;
  }
}
</style>
