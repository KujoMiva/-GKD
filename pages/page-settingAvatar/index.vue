<template>
  <view class="container-pages-edit-avatar">
    <!-- 更换头像页面 -->
    <itemAvatar :user-info="userInfo" :size="200" />
  </view>
</template>

<script>
// vuex
import { mapGetters } from 'vuex'
// item
import itemAvatar from './components/item-avatar'
export default {
  components: { itemAvatar },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.$store.dispatch('user/getUserInfoSelf')
  }
}
</script>
