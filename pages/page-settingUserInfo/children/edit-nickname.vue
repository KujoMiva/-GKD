<template>
  <view class="container-page-deit-nickname">
    <view class="container-input">
      <input v-model="editNickname" placeholder="请输入昵称" :adjust-position="true" focus>
    </view>
    <view v-if="verifyNickname" class="item-tip iconfont icon-Close">昵称不能少于两个汉字</view>
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// api
import { resetUserInfo } from '@/api/user'
export default {
  data() {
    return {
      editNickname: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    verifyNickname() {
      return this.editNickname.length < 2
    }
  },
  async created() {
    this.editNickname = this.userInfo.nickname
  },
  async onNavigationBarButtonTap() {
    uni.showLoading({ title: '修改中', mask: true })
    await resetUserInfo({ nickname: this.editNickname })
    await this.$store.dispatch('user/getUserInfoSelf')
    uni.hideLoading()
    // 隐藏键盘
    uni.hideKeyboard()
    // #ifdef APP-PLUS
    plus.key.hideSoftKeybord()
    // #endif
    this.$navigateBack({ delta: 1 })
  },
  onBackPress() {
    // 隐藏键盘
    uni.hideKeyboard()
    // #ifdef APP-PLUS
    plus.key.hideSoftKeybord()
    // #endif
  }
}
</script>

<style lang="scss">
.container-page-deit-nickname {
  position: relative;
  padding: 30rpx;
  .container-input {
    padding: 50rpx 0 20rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    input {
      width: 100%;
      padding-left: 20rpx;
    }
  }
  .item-tip {
    padding-top: 20rpx;
    font-size: 28rpx;
    color: #f45050;
    &::before {
      margin-right: 10rpx;
      font-size: 30rpx;
    }
  }
}
</style>
