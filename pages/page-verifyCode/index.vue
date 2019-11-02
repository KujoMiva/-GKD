<template>
  <view class="container-page-verifycode">
    <view class="login-title">输入验证码</view>
    <view class="verify-tip">验证码已发送至 +86 {{ (verifyCode.phone || phone) | hidePhone }}</view>
    <view class="container-verifycode">
      <view
        v-for="(temp,index) in 6"
        :key="index"
        class="miva-input"
        :class="[verifycode.length!==index||'miva-input-next', verifycode[index]&&'miva-input-act']"
      >{{ verifycode[index] }}</view>
      <input
        v-model="verifycode"
        class="miva-item-input"
        :cursor="verifycode.length"
        :maxlength="6"
        type="number"
        focus
      >
    </view>
    <view v-if="!verifyCode.time" class="item-tip" @click="sendSMS">重新发送验证码</view>
    <view v-else class="item-tip">{{ verifyCode.time }} 秒后可重新发送验证码</view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      verifycode: '',
      phone: '',
      redirect_to: ''
    }
  },
  computed: {
    ...mapGetters(['verifyCode'])
  },
  watch: {
    async verifycode(verifyCode) {
      if (this.verifycode.length === 6) {
        uni.showLoading({
          title: '验证中',
          mask: true
        })
        const loginRes = await this.$store.dispatch('user/loginVer', {
          account: this.phone,
          verifyCode: this.verifycode
        })
        uni.hideLoading()
        // 隐藏键盘
        await uni.hideKeyboard()
        this.verifycode = ''
        if (loginRes.code !== 200) return
        this.$navigateBack({ delta: 2, animationType: 'slide-out-bottom' })
      }
    }
  },
  onLoad(option) {
    this.phone = option.phone
    this.redirect_to = option.redirect_to
    this.sendSMS()
  },
  methods: {
    sendSMS() {
      this.$store.dispatch('user/verifyCode', this.phone)
    }
  }
}
</script>

<style lang="scss" scoped>
.container-page-verifycode {
  padding: 100rpx;
  .login-title {
    font-size: 48rpx;
  }
  .verify-tip {
    padding: 20rpx 0;
    font-size: 28rpx;
  }
  .container-verifycode {
    display: flex;
    justify-content: space-between;
    position: relative;
    .miva-input {
      width: calc(100% / 6);
      height: 100rpx;
      line-height: 100rpx;
      margin: 10rpx;
      border-bottom: 2px solid #ddd;
      text-align: center;
      &-act {
        border-color: $miva-color-global;
      }
      &-next::after {
        content: "";
        position: relative;
        top: 8rpx;
        display: inline-block;
        border: 1px solid $miva-color-global;
        height: 40rpx;
        animation: miva-shan 0.8s infinite;
      }
    }
    .miva-item-input {
      width: 200%;
      height: 100%;
      opacity: 0;
      position: absolute;
      left: -100%;
    }
  }
  .item-tip {
    padding: 20rpx 0;
    font-size: 24rpx;
    color: $miva-color-global;
  }
}

@keyframes miva-shan {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
