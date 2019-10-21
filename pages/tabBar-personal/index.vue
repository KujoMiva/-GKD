<template>
  <view class="container-page-personal">
    <view class="group-userinfo">
      <mivaAvatar :user-id="34" :src="$img_1" :size="120" :checked-avatar="34!==undefined" />
      <mivaNickname />
      <!-- 设置按钮 -->
      <view class="item-btn-setting iconfont icon-settings" @click="routerLink('系统设置')" />
    </view>
    <!-- 宫格 -->
    <uniGrid :column="4" :show-border="false" :highlight="false">
      <uniGridItem v-for="(temp, index) in topItemList" :key="index">
        <view style="text-align:center" @click="routerLink(temp.link)">
          <view class="item-icon iconfont" :class="temp.icon" />
          <view style=" font-weight: bold;color:#000">{{ temp.title }}</view>
        </view>
      </uniGridItem>
    </uniGrid>
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// items
import uniGrid from '@/components/uni-grid/uni-grid.vue'
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
export default {
  components: { uniGrid, uniGridItem },
  data() {
    return {
      topItemList: [
        { title: '消息', icon: 'icon-shoucangtubiao', link: '系统设置' },
        { title: '好友', icon: 'icon-kafeitubiao', link: '系统设置' },
        { title: '粉丝', icon: 'icon-liuyantubiao', link: '系统设置' },
        { title: '动态', icon: 'icon-labtubiao', link: '系统设置' }
      ]
    }
  },
  computed: {
    ...mapGetters(['systemInfo'])
  },
  methods: {
    routerLink(link) {
      this.$navigateTo({ url: this.$libRouter[link] })
    }
  }
}
</script>

<style lang="scss">
.container-page-personal {
  position: relative;
  .group-userinfo {
    padding: 50rpx 50rpx 0;
    position: relative;
  }
  .item-btn-setting {
    position: absolute;
    top: 50rpx;
    right: 50rpx;
    font-size: 50rpx;
    color: #000;
  }
  .item-icon {
    font-size: 60rpx;
    font-weight: bold;
    color: #000;
  }
}
</style>
