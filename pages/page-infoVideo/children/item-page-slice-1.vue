<template>
  <view class="item-page-slice">
    <view class="details-title">{{ detailsData.title }}</view>
    <view class="details-info">
      <view class="info-time">{{ detailsData.created_at | formatTime }}</view>
    </view>
    <view class="details-description" v-html="detailsData.description" />
    <view class="details-events">
      <view class="item-events">
        <view class="iconfont icon-aixintubiao" />
        <view>{{ 11 }}</view>
      </view>
      <view class="item-events">
        <view class="iconfont icon-shoucangtubiao" />
        <view>{{ 22 }}</view>
      </view>
      <view class="item-events">
        <view class="iconfont icon-fenxiangtubiao" />
        <view>{{ 33 }}</view>
      </view>
    </view>
    <view class="details-tags">
      <view v-for="(temp, index) in detailsData.tag" :key="index" class="container-item-tip miva-tag">
        <uniTag :circle="true" size="small" :text="temp" />
      </view>
    </view>
    <!-- 推荐 -->
    <itemTitle label="更多推荐">
      <view v-if="moreList.length>0">
        <itemListTypeA v-for="(temp,index) in moreList" :key="index" lib-router="视频作品详情" :item-data="temp" />
      </view>
    </itemTitle>
  </view>
</template>

<script>
import uniTag from '@/components/uni-tag/uni-tag'
import itemTitle from '@/components/miva-item/item-title'
import itemListTypeA from '@/components/miva-item/item-list-type_a'
export default {
  components: {
    uniTag,
    itemTitle,
    itemListTypeA
  },
  props: {
    detailsData: {
      type: Object,
      default() {
        return {}
      }
    },
    moreList: {
      type: Array,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-page-slice {
  padding: 30rpx;
  box-sizing: border-box;
  & > view {
    padding-bottom: 30rpx;
  }
}
.details-title {
  font-size: 30rpx;
  font-weight: bold;
}
.details-info {
  display: flex;
  font-size: 24rpx;
  color: #aaa;
}
.details-description {
  &,
  & * {
    font-size: 24rpx !important;
    color: #aaa !important;
  }
}
.details-events {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 24rpx;
  color: #aaaaaa;
  .iconfont {
    font-size: 50rpx;
    font-weight: bold;
    color: #666;
  }
}
.miva-tag {
  margin: 10rpx;
  display: inline-block;
}
</style>
