// 工具函数，以下只介绍get请求，post传入data即可。
import config from './config'

export function httpRequest (http_obj) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + http_obj.url,
      data: http_obj.data == undefined ? null,
      // header: 
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}