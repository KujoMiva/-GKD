import request from '@/utils/request'

export function getSTS() {
  return request.get({
    url: '/uploadWebKey'
  })
}

export function saveFile({ url, title, filename, filepath, mimetype, size }) {
  return request.post({
    url: '/uploadWebSave',
    data: {
      url, title, filename, filepath, mimetype, size
    }
  })
}
