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
  }
}