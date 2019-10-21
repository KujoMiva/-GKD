<template>
  <image
    v-if="isRouterShow"
    class="miva-image"
    :class="[className,error&&'miva-image-error', load&&'miva-image-load']"
    :mode="mode"
    :src="useImage"
    :lazy-load="lazyLoad"
    @error="errorHandler"
    @load="loadHandler"
    @click="clickHandler"
  />
  <image v-else class="miva-image" :class="[className,error&&'miva-image-error', load&&'miva-image-load']" />
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'aspectFill'
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'miva-image-default'
    },
    src: {
      type: String,
      default: ''
    },
    checked: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      useImage: '',
      isRouterShow: true,
      error: false,
      load: true,
      timer: null,
      reloadCount: 0 // 重新加载计数器
    }
  },
  watch: {
    src(val) {
      try {
        this.mivaImageLoad()
      } catch (error) {
        this.useImage = val
      }
    }
  },
  created() {
    // #ifndef APP-PLUS
    this.useImage = this.src
    // #endif

    // #ifdef APP-PLUS
    this.mivaImageLoad()
    // #endif
  },
  methods: {
    // #ifdef APP-PLUS
    mivaImageLoad() {
      uni.getStorage({
        key: this.src,
        success: res => {
          // console.log('获取缓存图片成功', res.data.savedFilePath)
          this.useImage = res.data.savedFilePath
          if (!res.data.savedFilePath) {
            // console.log('第一次加载重复图片, 只能开销大点了')
            this.useImage = this.src
          }
        },
        fail: async _ => {
          // console.log('获取缓存图片失败储存这张图片', err)
          // 防止相同图片重复保存
          await uni.setStorage({
            key: this.src,
            data: {}
          })
          this.useImage = this.src
          this.saveImage(this.src)
        }
      })
    },
    saveImage(imageInfo) {
      // 下载图片
      uni.downloadFile({
        url: this.src,
        success: res => {
          // console.log('下载图片成功', res)
          // 保存图片
          uni.saveFile({
            tempFilePath: res.tempFilePath,
            success: saveRes => {
              // console.log('保存图片成功', saveRes)
              this.useImage = saveRes.savedFilePath
              // 把保存的图片写入缓存中记录
              uni.setStorage({
                key: this.src,
                data: saveRes
              })
            }
          })
        }
      })
    },
    // #endif
    clickHandler() {
      if (this.error) {
        return this.reload()
      }

      if (this.checked) {
        return this.preview()
      }
    },
    preview() {
      uni.previewImage({
        current: 1,
        urls: [this.src],
        longPressActions: true
      })
    },
    async reload() {
      this.reloadCount++
      this.isRouterShow = false
      this.error = false
      this.load = true
      this.useImage = this.src
      await this.$nextTick()
      this.isRouterShow = true
    },
    errorHandler(e) {
      this.error = true
      this.load = false
      clearTimeout(this.timer)
      // 限制最多重新加载3次
      if (this.reloadCount > 3) return
      this.timer = setTimeout(res => {
        this.reload()
      }, 1000 * 3)
    },
    loadHandler(e) {
      this.load = false
    }
  }
}
</script>

<style lang="scss">
@keyframes miva-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.miva-image-default {
  width: inherit;
  height: inherit;
}
.miva-image {
  position: relative;
  color: #969799;
  div,
  img {
    position: relative;
    z-index: 2;
  }
  &-load {
    background-color: #f8f8f8;
    &::before {
      font-family: iconfont;
      content: "\e65d";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      font-size: 60rpx;
      animation: miva-rotate 0.8s linear infinite;
    }
    &::after {
      content: "加载中";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 100%);
      z-index: 1;
      font-size: 24rpx;
    }
  }
  &-error {
    background-color: #f8f8f8;
    &::before {
      font-family: iconfont;
      content: "\e61b";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      font-size: 60rpx;
    }
    &::after {
      content: "加载失败";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 100%);
      z-index: 1;
      font-size: 24rpx;
    }
  }
}
</style>
