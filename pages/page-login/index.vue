<template>
  <view class="container-page-login">
    <view class="login-title">欢迎登录</view>
    <view class="container-group-input">
      <view class="container-input">
        <view class="item-path">+86</view>
        <input v-model="accountInfo.account" class="input-account" type="number" placeholder="请输入手机号" :adjust-position="true">
      </view>
      <view v-if="passwordLogin" class="container-input">
        <input v-model="accountInfo.password" class="input-password" placeholder="请输入密码" :password="!passwordShow" :adjust-position="true">
        <view style="font-size: 50rpx; color:#666" :class="['iconfont', passwordShow?'icon-eye_protection':'icon-visible']" @click="passwordShow = !passwordShow" />
      </view>
      <view v-else class="item-verify-tip">未注册的手机号验证后自动创建账户</view>
    </view>
    <button v-if="passwordLogin" class="item-submit" :class="(verifyAccount||verifyPassword)&&'item-submit-disabled'" :disabled="verifyAccount||verifyPassword" @click="submit">登录</button>
    <button v-else class="item-submit" :class="verifyAccount&&'item-submit-disabled'" :disabled="verifyAccount" @click="routerLink('登录验证码', {phone:accountInfo.account})">获取短信验证码</button>
    <!-- tip -->
    <view class="container-group-tip">
      <text @click="passwordLogin = !passwordLogin">{{ !passwordLogin?'密码登录':'验证码登录' }}</text>
      <text @click="routerLink('遇到问题')">遇到问题</text>
    </view>
    <!-- copy -->
    <view class="container-copy">
      登录代表同意
      <text @click="routerLink('用户协议')">用户协议</text>、
      <text @click="routerLink('隐私政策')">隐私政策</text>, 并授权使用您的帐号信息 (如昵称、头像) 以便您同意管理
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      passwordLogin: true,
      passwordShow: false,
      accountInfo: {
        account: '',
        password: ''
      },
      redirect_to: ''
    }
  },
  computed: {
    ...mapGetters(['systemInfo']),
    verifyAccount() {
      return this.accountInfo.account.length !== 11
    },
    verifyPassword() {
      return this.accountInfo.password.length < 6
    }
  },
  onLoad(option) {
    this.redirect_to = option.redirect_to
  },
  mounted() {
    // #ifdef H5
    const copy = document.querySelector('.container-copy')
    copy.style.top = `${this.systemInfo.windowHeight - 60}px`
    // #endif
  },
  onNavigationBarButtonTap(evt) {
    console.log(evt)
    this.routerLink('帮助')
  },
  methods: {
    async submit() {
      uni.showLoading({ title: '登录中', mask: true })
      const loginRes = await this.$store.dispatch('user/loginPwd', this.accountInfo)
      uni.hideLoading()
      // 隐藏键盘
      uni.hideKeyboard()
      // #ifdef APP-PLUS
      plus.key.hideSoftKeybord()
      // #endif
      if (loginRes.code !== 200) return
      this.$navigateBack({ delta: 1, animationType: 'slide-out-bottom' })
    },
    routerLink(url, query = {}) {
      this.$navigateTo({ url: this.$libRouter[url] }, query)
    }
  }
}
</script>

<style lang="scss">
.container-page-login {
  padding: 100rpx;
  .login-title {
    font-size: 48rpx;
  }
  .icon-eye_protection {
    color: $miva-color-global !important;
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
      border-bottom: 1px solid $uni-border-color;
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
    background: $miva-color-global;
    &-disabled {
      background: lighten($miva-color-global, 20%);
      &::after {
        display: none;
      }
    }
  }
  .item-verify-tip {
    padding-top: 20rpx;
    font-size: 28rpx;
    white-space: nowrap;
    color: #666;
  }
  .container-group-tip {
    padding-top: 80rpx;
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    color: #666;
  }
  .container-copy {
    padding: 0 60rpx;
    position: fixed;
    bottom: 60rpx;
    left: 0;
    font-size: 24rpx;
    color: #aaa;
    text {
      color: $miva-color-global;
    }
  }
}
</style>
