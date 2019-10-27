<template>
  <view class="container-item-avatar">
    <view @click="resetAvatar">
      <mivaAvatar
        style="pointer-events: none"
        :user-id="userInfo.id"
        :src="userInfo.avatar"
        :size="size"
        :checked-avatar="false"
      />
    </view>
    <ImageCropper :src="tempFilePath" :crop-fixed="true" @confirm="confirm" @cancel="cancel" />
  </view>
</template>

<script>
// item
import ImageCropper from '@/components/invinbg-image-cropper/invinbg-image-cropper.vue'
// utils
import { uploadImage } from '@/utils/miva-package/upload_image'
// api
import { resetAvatar } from '@/api/user'
export default {
  components: { ImageCropper },
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      tempFilePath: ''
    }
  },
  methods: {
    // 修改头像
    async resetAvatar() {
      // 选择图片
      const [err_check, res_check] = await uni.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera']
      })
      if (err_check) {
        console.log('选择图片出错')
        return
      }
      const { path } = res_check.tempFiles[0]
      this.tempFilePath = path
    },
    async confirm(e) {
      const miva = this
      this.tempFilePath = ''
      this.cropFilePath = e.detail.tempFilePath
      // console.log(this.cropFilePath)
      const res = await uploadImage({
        fileInfo: { path: this.cropFilePath },
        success(res) {
          console.log(res)
          resetAvatar({ avatar: res.fileUrl })
            .then(res => {
              miva.$store.dispatch('user/getUserInfoSelf')
              uni.showToast({ title: res.message, icon: 'none', position: 'bottom' })
            })
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
