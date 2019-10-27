// 用户头像组件
<template>
  <view
    :id="src"
    class="container-components-item-header"
    :style="{
      width: `${size}rpx`,
      height: `${size}rpx`
    }"
    @click="routerLink"
  >
    <miva-image
      class="item-avatar item-avatar-round"
      :src="src || 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/github.svg'"
      :checked="checkedAvatar"
    />
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    size: {
      type: [Number, String],
      default: 80
    },
    src: {
      type: String,
      default: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/github.svg'
    },
    userId: {
      type: [Number, String],
      default: null
    },
    checkedAvatar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 跳转去个人信息页面
    async routerLink() {
      // 查看用户大头像
      if (this.checkedAvatar) {
        return
      }
      // 如果props没有传过来userid 就跳转去登录页面
      if (!this.userId) {
        this.$navigateTo({ url: '/pages/page-group-account/login' })
        return
      }
      // 如果vuex里的用户信息不存在,就获取用户信息
      if (this.userInfo === null || !this.userInfo.user_id) {
        await this.$store.dispatch('user/getUserInfoSelf')
      }
      // 判断如果用户id和props传来的id一样就跳转去用户个人信息页面, 如果不一样就跳转去他人信息页面
      // eslint-disable-next-line
      if (this.userInfo && this.userInfo.user_id == this.userId) {
        this.$switchTab({ url: '/pages/page-tabbar-self/selfInfo' })
      } else {
        this.$navigateTo({ url: `/pages/page-tabbar-self/otherInfo?id=${this.userId}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-components-item-header {
  width: 80rpx;
  height: 80rpx;
  position: relative;
  .item-avatar {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    &-round {
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>
