import store from '@/store'
import { saveFile } from '@/api/utils'
import { postObject } from './upload_handler'

export async function uploadImage({ fileInfo = null, success = null }) {
  // 获取临时密钥
  await store.dispatch('app/getSTS')
  //  没传入图片
  if (fileInfo === null) {
    const [err_check, res_check] = await uni.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera']
    })
    if (err_check) {
      return console.log('选择图片出错')
    }
    fileInfo = res_check.tempFiles[0]
  }
  const { path, size } = fileInfo // 获取文件信息
  const { credentials } = store.getters.stsCache // 获取临时密钥
  console.log(credentials)
  const requestTask = postObject({
    filePath: path,
    dir: 'image',
    credentials,
    success: res => {
      const { fileUrl } = res
      console.log(res, fileUrl)
      //   判断执行成功回调函数
      if (success) success(res)
    }
  })
  return {
    showImage: path,
    requestTask
  }
}
