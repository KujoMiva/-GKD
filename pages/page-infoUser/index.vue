<template>
  <view class="container-page-infoUser">
    <layerInfo :tabs="tabs">
      <template #top-body>
        <view v-if="$img_2" class="item-bg">
          <miva-image class="item-bg-img" :src="$img_2" />
        </view>
        <view class="group-userinfo">
          <view>
            <mivaAvatar :user-id="34" :src="userInfo.avatar||$img_1" :size="120" :checked-avatar="true" />
            <mivaNickname :size="30" :user-info="userInfo" :shadow="$img_2" />
          </view>
          <!-- 编辑按钮 -->
          <view class="item-btn-setting iconfont icon-edit" @click="routerLink('个人信息设置')" />
        </view>
      </template>
      <template v-slot:="{page}">

        <view v-if="page===1">

          <layerBlock title="基本信息" more-text="信息">
            <view class="item-base-info">站龄: 1年 (2019年10月26日)</view>
            <view class="item-base-info">年龄: 90后 水瓶座 </view>
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

        </view>

        <view v-if="page===2">
          <view class="item-nomore">还未发布过动态</view>
        </view>

        <view class="item-nomore">- Kujo Miva -<text v-show="false"> {{ page }}</text></view>

      </template>
    </layerInfo>
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// item
import layerInfo from '@/components/miva-item/layer-info'
import layerBlock from './components/layer-block'
export default {
  components: { layerInfo, layerBlock },
  data() {
    return {
      tabs: ['主页', '动态']
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.$store.dispatch('user/getUserInfoSelf')
  },
  methods: {
    routerLink(url) {
      this.$navigateTo({ url: this.$libRouter[url] })
    }
  }
}
</script>

<style lang="scss">
.container-page-infoUser {
  position: relative;
  .group-userinfo {
    width: 100%;
    padding: 0 50rpx 100rpx;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
  }
  .item-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background: #fff;
    &-img {
      // filter: blur(2px);
      opacity: 0.7;
    }
  }
  .item-base-info{
    padding: 10rpx 0;
    font-size: 26rpx;
    color: #666;
  }
  .item-nomore{
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
