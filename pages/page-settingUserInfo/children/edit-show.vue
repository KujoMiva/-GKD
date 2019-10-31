<template>
  <view class="container-page-edit-show">
    <uniList>
      <uniListItem :show-arrow="false" title="谁可以看我的生日">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的评论">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的QQ帐号">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的微信帐号">
        <text class="item-note">仅自己</text>
      </uniListItem>
      <uniListItem :show-arrow="false" title="谁可以看我的微博帐号">
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
  components: { uniList, uniListItem }
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
