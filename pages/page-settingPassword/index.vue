<template>
  <view class="container-page-resetpassword">
    <view v-if="verifyCode.time" class="login-title">验证码有效期 {{ verifyCode.time }}s</view>
    <view v-else class="login-title">{{ title }}</view>
    <view v-if="verifyCode.time" class="verify-tip">验证码已发送至 +86 {{ verifyCode.phone }}</view>
    <view class="container-group-input">
      <!-- 手机号   -->
      <view v-if="!verifyCode.time" class="container-input">
        <view class="item-path">+86</view>
        <input
          v-model="accountInfo.phone"
          class="input-account"
          type="number"
          placeholder="请输入手机号"
          :adjust-position="true"
        >
      </view>
      <view v-else class="container-group-password">
        <!-- 验证码 -->
        <view class="container-input">
          <input
            v-model="accountInfo.verifyCode"
            class="input-password"
            type="number"
            placeholder="请输入验证码"
            :adjust-position="true"
          >
        </view>
        <!-- 新密码 -->
        <view class="container-input">
          <input
            v-model="accountInfo.password"
            class="input-password"
            placeholder="请输入新密码"
            :password="!passwordShow"
            :adjust-position="true"
          >
          <view
            style="font-size: 50rpx; color:#666"
            :class="['iconfont', passwordShow?'icon-eye_protection':'icon-visible']"
            @click="passwordShow = !passwordShow"
          />
        </view>
      </view>
    </view>
    <button
      v-if="!verifyCode.time"
      class="item-submit"
      :class="verifyAccount&&'item-submit-disabled'"
      :disabled="verifyAccount"
      @click="sendSMS"
    >获取短信验证码</button>
    <button
      v-else
      class="item-submit"
      :class="verifyPassword&&'item-submit-disabled'"
      :disabled="verifyPassword"
      @click="submit"
    >提交</button>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { resetPassword } from '@/api/user'
export default {
  data() {
    return {
      title: '请输入手机号',
      passwordShow: false,
      accountInfo: {
        phone: '',
        password: '',
        verifyCode: ''
      },
      redirect_to: ''
    }
  },
  computed: {
    ...mapGetters(['systemInfo', 'verifyCode']),
    verifyAccount() {
      return this.accountInfo.phone.length !== 11
    },
    verifyPassword() {
      return (
        this.accountInfo.password.length < 6 ||
        this.accountInfo.verifyCode.length !== 6
      )
    }
  },
  watch: {
    verifyCode(val) {
      if (val.time !== null) {
        this.accountInfo.phone = val.phone
        return
      }
    }
  },
  methods: {
    sendSMS() {
      this.$store.dispatch('user/verifyCode', this.accountInfo.phone)
    },
    async submit(verifyCode) {
      uni.showLoading({
        title: '设置中',
        mask: true
      })
      const { message = '' } = (await resetPassword(this.accountInfo)) || {}
      await this.$store.dispatch('user/removeVerifyCode')
      uni.hideLoading()
      // 隐藏键盘
      uni.hideKeyboard()
      this.accountInfo = {
        phone: '',
        password: '',
        verifyCode: ''
      }
      uni.showToast({ title: message, icon: 'none', position: 'bottom' })
      uni.navigateBack({ delta: 2 })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-page-resetpassword {
  padding: 100rpx;
  .login-title {
    font-size: 48rpx;
  }
  .verify-tip {
    padding: 20rpx 0;
    font-size: 28rpx;
  }
  .container-group-input {
    padding: 100rpx 0 60rpx;
    input {
      width: 100%;
      margin-right: 20rpx;
      font-size: 34rpx;
    }
    .container-input {
      padding: 50rpx 0 30rpx;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
    }
    .input-account {
      padding-left: 20rpx;
    }
    .item-path {
      font-size: 28rpx;
      &::after {
        content: "\e699";
        font-family: "iconfont";
        padding-left: 10rpx;
        color: #aaa;
      }
    }
  }
  .item-submit {
    background: #eac13a;
    transition: all 1s;
  }
  .item-submit-disabled {
    background: #fff5cb;
    &::after {
      display: none;
    }
  }
}
</style>
