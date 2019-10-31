<template>
  <view class="container-page-edit-input">

    <view v-if="notTextarea">
      <view class="container-input">
        <input v-model="editValue" :placeholder="editNow | textPlacehold" :adjust-position="true" focus>
      </view>
      <view v-show="showTip" v-if="!editVerify" class="item-tip iconfont icon-Close">{{ editNow | textError }}</view>
      <view v-show="showTip" v-else class="item-tip iconfont icon-check">可以使用~ </view>
    </view>

    <view v-else>
      <view class="container-textarea">
        <textarea v-model="editValue" class="container-textarea" :placeholder="editNow | textPlacehold" :auto-height="true" :maxlength="255" :show-confirm-bar="false" :cursor="editValue.length" focus />
      </view>
      <view class="item-edit-length">{{ editLen }}</view>
      <view class="item-tip iconfont icon-check icon-biaopaitubiao">在这里排版是没用的哦!</view>
    </view>

  </view>
</template>

<script>
// api
import { resetUserInfo } from '@/api/user'

export default {
  filters: {
    textPlacehold(editNow) {
      const textObj = {
        qq: 'QQ',
        wx: '微信',
        nickname: '昵称',
        description: '签名'
      }
      return `请输入${textObj[editNow]}`
    },
    textError(editNow) {
      const textObj = {
        qq: 'qq号格式不正确',
        wx: '微信号格式不正确',
        nickname: '昵称格式不正确,可使用1-10个字母、数字、下划线和减号'
      }
      return textObj[editNow]
    }
  },
  data() {
    return {
      showTip: false,
      editNow: '',
      editValue: ''
    }
  },
  computed: {
    editVerify() {
      const verObj = {
        qq: /^[1-9]([0-9]{5,11})$/.test(this.editValue),
        wx: /^[A-Za-z]{1}[A-Za-z0-9_\-\u4e00-\u9fa5]{5,19}$/.test(this.editValue),
        nickname: /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,8}$/.test(this.editValue)
      }
      return verObj[this.editNow]
    },
    notTextarea() {
      const TextareaList = ['description']
      return TextareaList.indexOf(this.editNow) === -1
    },
    editLen() {
      return this.editValue.length
    }
  },
  watch: {
    editValue() {
      this.showTip = true
    }
  },
  onLoad(option) {
    console.log('edit-input-log:', option)
    this.editNow = option.edit
    this.editValue = option.default === 'undefined' || option.default === 'null' ? '' : option.default
  },
  async onNavigationBarButtonTap() {
    // 打开提示
    this.showTip = true
    // 判断输入格式
    if (!this.editValue) {
      uni.showToast({ title: '输入格式不正确', icon: 'none', position: 'bottom' })
      return
    }
    uni.showLoading({ title: '修改中', mask: true })
    await this.settingHandler()
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
  },
  methods: {
    async settingHandler() {
      console.log('settingHandler-log', { [this.editNow]: this.editValue })
      await resetUserInfo({ [this.editNow]: this.editValue })
    }
  }
}
</script>

<style lang="scss">
.container-page-edit-input {
  position: relative;
  padding: 30rpx;
  .container-input {
    padding: 50rpx 0 20rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $uni-border-color;
    input {
      width: 100%;
      padding-left: 20rpx;
    }
  }
  .container-textarea {
    width: 100%;
    min-height: 228rpx;
    position: relative;
  }
  .item-edit-length {
    text-align: right;
    font-size: $uni-font-size-base;
    color: $uni-text-color-grey;
  }
  .item-tip {
    padding-top: 20rpx;
    font-size: 28rpx;
    color: $uni-color-error;
    &::before {
      margin-right: 10rpx;
      font-size: 30rpx;
    }
  }
  .icon-check {
    color: $uni-text-color-grey;
  }
}
</style>
