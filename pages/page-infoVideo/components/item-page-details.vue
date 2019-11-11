<template>
  <view class="container-item-page-details">

    <view class="item-title">{{ detailsData.title }}</view>

    <view class="item-group-user-info">
      <mivaAvatar style="margin-right: 10rpx" />
      <mivaNickname />
    </view>

    <view class="item-time">{{ detailsData.created_at | formatTime }}</view>

    <view class="item-description" v-html="detailsData.description" />

    <view class="item-group-events">
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

    <view class="item-group-tags">
      <view v-for="(temp, index) in detailsData.tag" :key="index" class="item-tags">
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
  components: { uniTag, itemTitle, itemListTypeA },
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

<style lang="scss">
.container-item-page-details {
  .item {
    &-title {
      padding: 20rpx 0;
      font-size: $uni-font-size-title;
    }
    &-time {
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
    &-description {
      padding: 20rpx 0;
      font-size: $uni-font-size-base;
    }
    &-group-user-info {
      padding: 20rpx 0;
      display: flex;
    }
    &-group-events {
      padding: 20rpx 0;
      display: flex;
      justify-content: space-around;
      text-align: center;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
      .iconfont {
        font-size: 50rpx;
        font-weight: bold;
      }
    }
    &-group-tags {
      padding: 20rpx 0;
    }
    &-tags {
      margin: 10rpx;
      display: inline-block;
    }
  }
}
</style>
