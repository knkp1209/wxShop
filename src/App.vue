<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background: #f9f6f6;
  font-size: 30rpx;
  font-family: "Microsoft YaHei","Arial","黑体","宋体",sans-serif;
}

/* Button Login Start */
.button_none:after {
  border: none;
}
.button_none{
  background: #FFFFFF;
  width: 140rpx !important;
  height: 100% !important;
  padding: 20rpx 0rpx 0rpx 0rpx !important;
  vertical-align: center;
}
/* Button Login End */


/* search Start */
.bg_search {
  background: #FFFFFF;
  top: 0rpx !important;
}

.search {
  width: 100%;
  position: fixed;
  top: 5rpx;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  z-index: 999;
}

.search_input_icon {
  width: 80%;
}

.search_cion {
  margin: 10rpx 10rpx 10rpx 10rpx;
  position: absolute;
  left: 100rpx;
  width: 20rpx;
  height: 20rpx;
  text-align: center;
}

.search_input {
  border: 2rpx solid #d0d0d0;
  background: #FFFFFF;
  border-radius: 10rpx;
  margin-left: 20rpx;
}

.search_input input {
  margin-left: 60rpx;
  height: 60rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
}

.search_button {
  margin-left: 15rpx;
  width: 15%;
  line-height: 150%;
  text-align: center;
  border: 2rpx solid #d0d0d0;
  border-radius: 10rpx;
}
/* search End */

/* goods price Start */
.price {
  display: flex;
  margin-top: 5rpx;
  overflow: auto;
}

.price span {
  /*flex: 1;*/
  /*background: red;*/
  text-align: left;
}

.price span+span{
  padding-left: 10rpx;
}

.sell {
  color: #f04827;
}

.original {
  padding-left: 20rpx;
  color: #a79d9d;
  text-decoration: line-through;
}

/* goods price End */
</style>
