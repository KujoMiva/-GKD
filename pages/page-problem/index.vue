<template>
  <view class="container-page-problem">
    <uniList>
      <uniListItem
        title="忘记密码"
        @click="routerLink('设置密码')"
      />
    </uniList>
  </view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue'
import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
export default {
  components: { uniList, uniListItem },
  methods: {
    routerLink(url) {
      this.$navigateTo({ url: this.$libRouter[url] })
    }
  }
}
</script>
