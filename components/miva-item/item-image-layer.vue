<template>
  <view class="container-item-image-layer">
    <view
      v-for="(temp, index) in imgList"
      :key="index"
      class="container-image"
      :style="styleImageHandler
        || (dataLen === 5 ? ( (index === 0 || index === 1) ? styleImage_2 : styleImageBase ) : false)
        || (dataLen === 7 ? ( (index === 0 || index === 1 || index === 2) ? styleImageBase : styleImage_4 ) : false)"
    >
      <miva-image class="item-image" :src="temp" :checked="true" />
      <view v-if="showControler" class="item-btn-delete iconfont icon-huishouzhantubiao" @click="imgDelete(index)" />
    </view>
    <view
      v-if="showControler && dataLen < 9"
      :style="styleItemBtnUpload"
      class="item-btn-upload iconfont icon-Out"
      @click="imgUpload"
    />
  </view>
</template>

<script>
// utils
import { uploadImage } from '@/utils/miva-package/upload_image'
export default {
  props: {
    imgList: {
      type: Array,
      default() { return [] }
    },
    width: {
      type: Number,
      default: uni.getSystemInfoSync().screenWidth
    },
    showControler: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    styleImageHandler() {
      if (this.dataLen === 4) {
        return this.styleImage_2
      }
      if (this.dataLen === 8) {
        return this.styleImage_4
      }
      if (this.dataLen !== 5 && this.dataLen !== 7) {
        return this.styleImageBase
      }
      return false
    },
    dataLen() {
      return this.imgList.length
    },
    styleImageBase() {
      const size = this.dataLen > 3 ? this.width / 3 : this.width / this.dataLen
      return `width: ${size}px; height: ${size}px`
    },
    styleImage_2() {
      return `width: ${this.width / 2}px; height: ${this.width / 2}px`
    },
    styleImage_4() {
      return `width: ${this.width / 4}px; height: ${this.width / 4}px`
    },
    styleItemBtnUpload() {
      return `width: ${this.width}px; height: ${this.width / 6}px`
    }
  },
  created() {
    console.log(this.width, this.imgList)
  },
  methods: {
    imgDelete(index) {
      console.log('删除:', index)
      this.$emit('delete', index)
    },
    async imgUpload() {
      const res = await uploadImage({
        success: res => {
          console.log(res)
          this.$emit('upload', res)
        }
      })
      const { requestTask } = res || {}
      requestTask.onProgressUpdate(res => {
        console.log('外面看进度:', res)
        // progress = res.progress
      })
    }
  }
}
</script>

<style lang="scss">
.container-item-image-layer {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .item-btn-upload {
    margin: 10px 0;
    position: relative;
    border: 3px dotted;
    text-align: center;
    color: $uni-text-color-grey;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 60rpx;
    }
  }
  .container-image {
    padding: 4rpx;
    position: relative;
    box-sizing: border-box;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.3s;
    .item-image {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
    }
    .item-btn-delete {
      position: absolute;
      top: 0;
      right: 0;
      border-bottom-left-radius: 10rpx;
      background-color: rgba($color: #000000, $alpha: 0.5);
      &::before {
        font-size: 60rpx;
        color: #fff;
      }
    }
  }
}
</style>
