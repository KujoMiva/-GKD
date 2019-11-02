<template>
  <view class="container-page-setting-bind">
    <view class="group">
      <uniList>
        <uniListItem :show-arrow="false" title="手机号" @click="routerLink('手机号绑定')">{{ 13344445556 | hidePhone }}</uniListItem>
      </uniList>
    </view>
    <view class="group">
      <uniList>
        <uniListItem :show-arrow="false" title="QQ" note="米法">
          <view class="item-btn" :class="true&&'iconfont icon-check' " @click="unBindHandler('qq')">已绑定</view>
        </uniListItem>
        <uniListItem :show-arrow="false" title="微信" note="米法">
          <view class="item-btn" :class="true&&'iconfont icon-check' " @click="unBindHandler('wx')">已绑定</view>
        </uniListItem>
        <uniListItem :show-arrow="false" title="微博" note="米米法">
          <view class="item-btn" :class="true&&'iconfont icon-check' " @click="unBindHandler('wb')">已绑定</view>
        </uniListItem>
        <uniListItem :show-arrow="false" title="邮箱" note="kujomiva@foxmail.com">
          <view class="item-btn" :class="true&&'iconfont icon-check' " @click="unBindHandler('mail')">已绑定</view>
        </uniListItem>
      </uniList>
    </view>
  </view>
</template>

<script>
// item
import uniList from '@/components/uni-list/uni-list'
import uniListItem from '@/components/uni-list-item/uni-list-item'
export default {
  components: { uniList, uniListItem },
  created() {
    uni.getStorageInfo({
      success: (res) => {
        console.log(res)
      }
    })
  },
  methods: {
    routerLink(link) {
      this.$navigateTo({ url: this.$libRouter[link] })
    },
    unBindHandler(param) {
      const filter = { qq: 'QQ', wx: '微信', wb: '微博', mail: '邮箱' }
      uni.showModal({
        title: `解除${filter[param]}绑定`,
        content: `解绑${filter[param]}帐号后将无法继续使用它登录`,
        confirmText: '解除绑定',
        cancelColor: '#F45050',
        confirmColor: '#F45050',
        success: res => {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.container-page-setting-bind{
    position: relative;
    .item-btn {
      padding: 5rpx 10rpx;
      border: 1px solid $uni-border-color;
      border-radius: 30px;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
    .icon-check::before {
      margin-right: 5rpx;
    }
}
</style>
