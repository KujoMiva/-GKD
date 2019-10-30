<template>
  <view class="container-page-setting-userinfo">
    <!--  -->
    <view class="group group-base-info">
      <uniList>
        <!--  -->
        <uniListItem title="头像" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('头像设置')">
          <mivaAvatar style="pointer-events: none" :user-id="userInfo.id" :src="userInfo.avatar" :size="100" :checked-avatar="false" />
        </uniListItem>
        <!--  -->
        <uniListItem title="昵称" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'nickname', default: userInfo.nickname })">{{ userInfo.nickname }}</uniListItem>
        <!--  -->
        <picker mode="selector" :value="userInfo.sex - 1 || 0" :range="sexArr" @change="resetSex">
          <uniListItem title="性别" :show-arrow="false" :show-slot="true" :hover="true">{{ userInfo.sex | sex }}</uniListItem>
        </picker>
        <!--  -->
      </uniList>
    </view>
    <!--  -->
    <view class="group">
      <uniList>
        <!--  -->
        <picker mode="date" :start="`1970-01-01`" :end="new Date().Format('yyyy-MM-dd')" @change="resetBirthday">
          <uniListItem title="生日" :show-arrow="false" :show-slot="true" :hover="true">{{ new Date(userInfo.birthday) | formatTime }}</uniListItem>
        </picker>
        <!--  -->
        <uniListItem title="qq" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'qq', default: userInfo.qq })">{{ userInfo.qq }}</uniListItem>
        <!--  -->
        <uniListItem title="微信" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'wx', default: userInfo.wx })">{{ userInfo.wx }}</uniListItem>
        <!--  -->
        <uniListItem note="此类项可以在 [设置] 页中设为隐私" :show-arrow="false" />
      </uniList>
    </view>
    <!--  -->
    <view class="group">
      <uniList>
        <uniListItem title="签名" :can-warp="true" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'description', default: userInfo.description })"><view style="word-break: break-all">{{ userInfo.description }}</view></uniListItem>
      </uniList>
    </view>
    <!--  -->
    <view class="group">
      <uniList>
        <uniListItem title="帐号和绑定设置" :can-warp="true" :show-arrow="false" :show-slot="true" :hover="true" @click="resetBind" />
        <uniListItem title="个人主页展示设置" :can-warp="true" :show-arrow="false" :show-slot="true" :hover="true" @click="resetShow" />
      </uniList>
    </view>
    <!--  -->
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// api
import { resetUserInfo } from '@/api/user'
// item
import uniList from '@/components/uni-list/uni-list'
import uniListItem from '@/components/uni-list-item/uni-list-item'
export default {
  components: { uniList, uniListItem },
  filters: {
    sex(val) {
      const sex = { 1: '男', 2: '女', 3: '保密' }
      return sex[val]
    }
  },
  data() {
    return {
      sexArr: ['男', '女', '保密']
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.$store.dispatch('user/getUserInfoSelf')
  },
  methods: {
    routerLink(url, query = {}) {
      if (!query.default) {
        query.default = ''
      }
      this.$navigateTo({ url: this.$libRouter[url] }, query)
    },
    // 修改性别
    async resetSex(evt) {
      console.log('修改性别', evt.detail)
      const { value } = evt.detail
      await resetUserInfo({ sex: Number(value) + 1 })
      await this.$store.dispatch('user/getUserInfoSelf')
    },
    // 修改生日
    async resetBirthday(evt) {
      console.log('修改生日', evt.detail)
      const { value } = evt.detail
      await resetUserInfo({ birthday: value })
      await this.$store.dispatch('user/getUserInfoSelf')
    },
    // 修改QQ
    resetQQ() {
      console.log('修改QQ')
    },
    // 修改签名
    resetDescription() {
      console.log('修改签名')
    },
    // 帐号绑定设置
    resetBind() {
      console.log('帐号绑定设置')
    },
    // 个人主页展示设置
    resetShow() {
      console.log('个人主页展示设置')
    }
  }
}
</script>

<style lang="scss">
.container-page-setting-userinfo {
  position: relative;
  .group {
    padding-top: 20rpx;
    background-color: #f4f4f4;
  }
}
</style>
