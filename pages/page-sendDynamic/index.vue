<template>
  <view class="container-page-send-dynamic">
    <view>
      <view class="container-textarea">
        <textarea v-model="editValue" class="container-textarea" placeholder="在这里输入内容..." :auto-height="true" :maxlength="255" :show-confirm-bar="false" :cursor="editValue.length" focus />
      </view>
      <view class="item-edit-length" @click="submit">{{ editLen }}</view>
      <!-- <view class="item-tip iconfont icon-check icon-biaopaitubiao">在这里排版是没用的哦!</view> -->
      <div>{{ submitValue }}</div>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      editValue: '',
      submitValue: ''
    }
  },
  computed: {
    editLen() {
      return this.editValue.length
    }
  },
  methods: {
    submit() {
      const arr = []
      this.editValue.split('\n').forEach(element => {
        arr.push(`<p>${element}</p>`)
      })
      console.log(arr)
      //   arr.join('<br>')
      this.submitValue = arr.join('<br>')
    }
  }
}
</script>

<style lang="scss">
.container-page-send-dynamic {
  position: relative;
  padding: 30rpx;
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
}
</style>
