import { camSafeUrlEncode } from '@/utils'
// 腾讯cos直传
const CosAuth = require('@/static/cos-auth.min.js')
const Bucket = 'kujomiva-1259361798'
const Region = 'ap-chengdu'
// const prefix = `https://${Bucket}.cos.${Region}.myqcloud.com`
const ForcePathStyle = false // 是否使用后缀式，涉及签名计算和域名白名单配置
/**
 *
 * @param {string} filePath 文件地址
 * @param {string} dir 文件夹
 * @param {object} credentials 临时密钥
 * @param {function} success 成功回调函数
 * @param {function} fail 失败回调函数
 * @returns {object} requestTask
 */
export function postObject({ filePath, dir = 'default', credentials = {}, success = _ => { }, fail = _ => { } } = {}) {
  // 请求用到的参数
  let prefix = 'https://' + Bucket + '.cos.' + Region + '.myqcloud.com/'
  if (ForcePathStyle) {
    prefix = 'https://cos.' + Region + '.myqcloud.com/' + Bucket + '/' // 这个是后缀式，签名也要指定 Pathname: '/' + Bucket + '/'
  }
  // const signPathname = dir
  let signPathname = '/' + dir // PostObject 接口 Key 是放在 Body 传输，所以请求路径和签名路径是 /
  if (ForcePathStyle) {
    signPathname = '/' + Bucket + '/' // 如果使用后缀式请求，域名是地域域名，Bucket 是放在路径里
  }
  const Key = filePath.substr(filePath.lastIndexOf('/') + 1) // 这里指定上传的文件名
  const filename = camSafeUrlEncode(Key).replace(/%2F/g, '/')
  const fileUrl = `${prefix}${signPathname}/${filename}`
  return uni.uploadFile({
    url: prefix + signPathname,
    // url: prefix,
    name: 'file',
    filePath: filePath,
    formData: {
    //   key: `${signPathname}/${Key}`,
      'key': Key,
      'success_action_status': 200,
      'Signature': CosAuth({
        SecretId: credentials.tmpSecretId,
        SecretKey: credentials.tmpSecretKey,
        Method: 'POST',
        Pathname: signPathname
      }),
      'x-cos-security-token': credentials.sessionToken,
      'Content-Type': ''
      // 'Content-Type': 'image'
    },
    success: res => {
      console.log('postObject:', res)
      success({ fileUrl })
    },
    fail: err => {
      fail({ ...err, message: '上传失败' })
      uni.showToast({ title: 'postObject 上传失败', icon: 'none', position: 'bottom' })
    }
  })
}

export function putObject() {

}
