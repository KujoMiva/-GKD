<template>
  <view class="container-page-infoUser">
    <layerInfo :tabs="tabs">
      <template #top-body>
        <view v-if="$img_2" class="item-bg">
          <miva-image class="item-bg-img" :src="$img_2" />
        </view>
        <view class="group-userinfo">
          <view @click="routerLink('用户信息')">
            <mivaAvatar :user-id="34" :src="$img_1" :size="120" :checked-avatar="true" />
            <mivaNickname :size="30" :shadow="$img_2" />
          </view>
          <!-- 编辑按钮 -->
          <view class="item-btn-setting iconfont icon-edit" @click="routerLink('个人信息设置')" />
        </view>
      </template>
      <template v-slot:="{page}">
        <view v-if="page===1">第一页内容</view>
        <view v-if="page===2">第二页内容</view>
        <view v-if="page===3">第三页内容</view>
      </template>
    </layerInfo>
  </view>
</template>

<script>
// item
import layerInfo from '@/components/miva-item/layer-info'
export default {
  components: { layerInfo },
  data() {
    return {
      tabs: ['测试第一页', '测试第二页', '测试第三页']
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
  .item-btn-setting {
    position: absolute;
    top: 0;
    right: 50rpx;
    font-size: 50rpx;
    color: #000;
  }
}
</style>
