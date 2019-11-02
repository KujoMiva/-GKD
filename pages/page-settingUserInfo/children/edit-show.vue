<template>
  <view class="container-page-edit-show">
    <uniList>
      <uniListItem :show-arrow="false" title="谁可以看我的生日" @click="resetHandler">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的评论" @click="resetHandler">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的QQ帐号" @click="resetHandler">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的微信帐号" @click="resetHandler">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的微博帐号" @click="resetHandler">
        <text class="item-note">仅自己</text>
      </uniListItem>
    </uniList>
  </view>
</template>

<script>
// item
import uniList from '@/components/uni-list/uni-list'
import uniListItem from '@/components/uni-list-item/uni-list-item'
export default {
  components: { uniList, uniListItem },
  data() {
    return {
      baseArr: ['所有人', '我关注的人', '仅自己']
    }
  },
  methods: {
    resetHandler() {
      uni.showActionSheet({
        itemList: this.baseArr,
        success: res => {
          const { tapIndex: value } = res
          console.log('success-log:', res, value)
        },
        fail: err => {
          console.log('fail-log:', err)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.container-page-edit-show {
  position: relative;
  .item-note {
    font-size: $uni-font-size-sm;
    color: $uni-text-color-grey;
  }
}
</style>
