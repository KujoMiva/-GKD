<template>
  <view class="container-page-send-dynamic">
    <itemEditer class="item-editer" @getValue="getEditerValue" />
    <itemImageLayer :width="layerWidth" :img-list="dynamicData.img_list" :show-controler="true" @delete="imgDeleteHanlder" @upload="imgUploadHandler" />
  </view>
</template>

<script>
import itemEditer from '@/components/miva-item/item-editer'
import itemImageLayer from '@/components/miva-item/item-image-layer'
export default {
  components: {
    itemEditer,
    itemImageLayer
  },
  data() {
    return {
      layerWidth: 0,
      dynamicData: {
        body: '',
        img_list: []
      }
    }
  },
  // created() {
  //   for (let i = 0; i < 7; i++) {
  //     this.dynamicData['img_list'].push(`/static/default_${i % 2 === 0 ? 1 : 2}.jpg`)
  //   }
  // },
  mounted() {
    const layerRight = uni.createSelectorQuery().in(this).select('.item-editer')
    layerRight.fields({ size: true }, data => {
      this.layerWidth = data.width
    }).exec()
  },
  onNavigationBarButtonTap(evt) {
    this.submit()
  },
  methods: {
    submit() {
      console.log(this.dynamicData)
    },
    getEditerValue(val) {
      this.dynamicData.body = val
    },
    imgUploadHandler(res) {
      this.dynamicData.img_list.push(res.fileUrl)
    },
    imgDeleteHanlder(index) {
      this.dynamicData.img_list.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
.container-page-send-dynamic {
  position: relative;
  padding: 30rpx;

}
</style>
