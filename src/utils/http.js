// 工具函数，以下只介绍get请求，post传入data即可。
import config from './config'

export default {
  get: (obj) => {
    obj.header['x-api-key'] = config.key
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.host + obj.url,
        header: obj.header,
        method: 'GET',
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }
}