export default {
  n:(url) => {
    wx.navigateTo({
      url: url
    })
  },
  s: (url) => {
  	wx.switchTab({
    	url: url
  	})
  },
  r: (url) => {
    wx.redirectTo({
      url: url
    })
  },
  Goods: (id) => {
    wx.navigateTo({
      url: `../goodsDetail/main?id=${id}`
    })
  },
}