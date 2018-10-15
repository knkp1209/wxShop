import config from './config'

export default (e, vue) => {
  if (e.target.encryptedData == undefined) {
    wx.showModal({
      title: '请重新授权',
      content: '如需使用此功能请再次点击并选择允许',
    })
    console.log('未登录')
    return Promise.reject();
  }
  wx.showLoading({
    title: '登录中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        wx.request({
          url: config.host + 'wechat/login',
          header: { 'x-api-key': config.key },
          data: {
            code: res.code,
            encryptedData: e.target.encryptedData,
            iv: e.target.iv
          },
          method: 'POST',
          success(r) {
            if (r.statusCode >= 400) {
              reject()
            }
            vue.$store.commit('SET_USER_INFO', (e.target.userInfo))
            vue.$store.commit('SET_TOKEN', r.data.result)
            wx.setStorageSync('logged', true),
              resolve()
          },
          fail(r) {
            console.log(r)
            reject()
          },
          complete() {
            wx.hideLoading()
          }
        })
      },

    })
  })
}
