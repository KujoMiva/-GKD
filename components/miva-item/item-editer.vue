<template>
  <view class="container-item-editer">
    <view class="container-textarea">
      <textarea
        v-model="editValue"
        class="container-textarea"
        :placeholder="placeholder"
        :auto-height="true"
        :maxlength="maxLength"
        :show-confirm-bar="false"
        :cursor="editValue.length"
        focus
      />
    </view>
    <view class="item-edit-length" @click="submit">{{ editLen }}</view>
    <view v-if="tipShow" class="item-tip iconfont icon-check icon-biaopaitubiao">{{ tip }}</view>
  </view>
</template>

<script>
export default {
  props: {
    maxLength: {
      type: [Number, String],
      default: 255
    },
    placeholder: {
      type: String,
      default: '在这里输入内容...'
    },
    value: {
      type: String,
      default: ''
    },
    tipShow: {
      type: [String, Boolean],
      default: true
    },
    tip: {
      type: String,
      default: '这里是提示消息!'
    }
  },
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
  watch: {
    editValue(val) {
      const bufferArr = []
      val.replace(/\</g, '&lt;').split('\n').forEach(elm => {
        const val = elm || ' '
        bufferArr.push(`<p style="font-size:17px;white-space:pre-wrap;word-break: break-all">${val}</p>`)
      })
      this.submitValue = bufferArr.join('')
      this.$emit('getValue', this.submitValue)
    }
  },
  created() {
    this.editValue = this.value
  }
}
</script>

<style lang="scss">
.container-item-editer {
  position: relative;
  // padding: 30rpx;
  .container-textarea {
    width: 100%;
    min-height: 228rpx;
    position: relative;
    font-size: 17px;
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
