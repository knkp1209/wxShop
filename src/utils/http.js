// 工具函数，以下只介绍get请求，post传入data即可。
import config from './config'

export default {
  get: (obj) => {
    if (obj.header == undefined) {
      obj.header = {'x-api-key':config.key}
    } else {
      obj.header['x-api-key'] = config.key
    }
    let storage = wx.getStorageSync('vuex')
    if (storage != ''){
      storage = JSON.parse(storage)
      obj.header['token'] = storage.token
    }
    let data = null
    if (obj.data != undefined) {
      data = obj.data
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.host + obj.url,
        header: obj.header,
        data: data,
        method: 'GET',
        success: function (res) {
          if (res.statusCode >= 400) {
            reject()
          }
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },
  post: (obj) => {
    if (obj.header == undefined) {
      obj.header = {'x-api-key':config.key}
    } else {
      obj.header['x-api-key'] = config.key
    }
    let storage = wx.getStorageSync('vuex')
    if (storage != ''){
      storage = JSON.parse(storage)
      obj.header['token'] = storage.token
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.host + obj.url,
        header: obj.header,
        data: obj.data,
        method: 'POST',
        success: function (res) {
          if (res.statusCode >= 400) {
            reject(res)
          }
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }
}