<template>
  <view class="container-page-setting-userinfo">
    <view class="group group-base-info">
      <uniList>
        <uniListItem title="头像" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('头像设置')">
          <mivaAvatar style="pointer-events: none" :user-id="userInfo.id" :src="userInfo.avatar" :size="100" :checked-avatar="false" />
        </uniListItem>
        <uniListItem title="昵称" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'nickname', default: userInfo.nickname })">{{ userInfo.nickname }}</uniListItem>
        <uniListItem title="性别" :show-arrow="false" :show-slot="true" :hover="true" @click="resetSex">{{ userInfo.sex | sex }}</uniListItem>
      </uniList>
    </view>
    <view class="group">
      <uniList>
        <picker mode="date" :start="`1970-01-01`" :end="new Date().Format('yyyy-MM-dd')" @change="resetBirthday">
          <uniListItem title="生日" :show-arrow="false" :show-slot="true" :hover="true">{{ new Date(userInfo.birthday) | formatTime }}</uniListItem>
        </picker>
        <uniListItem title="qq" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'qq', default: userInfo.qq })">{{ userInfo.qq }}</uniListItem>
        <uniListItem title="微信" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'wx', default: userInfo.wx })">{{ userInfo.wx }}</uniListItem>
        <uniListItem note="此类项可以在 [设置] 页中设为隐私" :show-arrow="false" />
      </uniList>
    </view>
    <view class="group">
      <uniList>
        <uniListItem title="签名" :can-warp="true" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('用户信息input', { edit: 'description', default: userInfo.description })">
          <view style="word-break: break-all">{{ userInfo.description }}</view>
        </uniListItem>
      </uniList>
    </view>
    <view class="group">
      <uniList>
        <uniListItem title="帐号绑定设置" :can-warp="true" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('帐号绑定设置')" />
        <uniListItem title="个人主页展示设置" :can-warp="true" :show-arrow="false" :show-slot="true" :hover="true" @click="routerLink('个人主页展示设置')" />
      </uniList>
    </view>
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
      console.log('settingUserInfoRouterLink-log:', url, query)
      this.$navigateTo({ url: this.$libRouter[url] }, query)
    },
    // 修改性别
    async resetSex(evt) {
      // const { value } = evt.detail
      // await resetUserInfo({ sex: Number(value) + 1 })
      // await this.$store.dispatch('user/getUserInfoSelf')
      uni.showActionSheet({
        itemList: this.sexArr,
        success: async res => {
          const { tapIndex: value } = res
          await resetUserInfo({ sex: Number(value) + 1 })
          await this.$store.dispatch('user/getUserInfoSelf')
          console.log('success-log:', res)
        },
        fail: err => {
          console.log('fail-log:', err)
        }
      })
    },
    // 修改生日
    async resetBirthday(evt) {
      const { value } = evt.detail
      await resetUserInfo({ birthday: value })
      await this.$store.dispatch('user/getUserInfoSelf')
    }
  }
}
</script>

<style lang="scss">
.container-page-setting-userinfo {
  position: relative;
}
</style>
