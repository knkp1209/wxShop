<template>
  <div>
    <swiper class="sw_banner" :indicator-dots="indicatorDots"
      :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item :key="i" v-for="(item,i) in imgUrls">
          <image :src="imgUrls[i]" class="sw_banner" />
        </swiper-item>
    </swiper>
    <a class="search" href="/pages/search/main?text=123">
      <div class="search_input_icon">
        <div class="search_input">
          <icon class="search_cion" size='20' type='search'></icon>
          <input class="" placeholder="搜索" />
        </div>
      </div>
      <!-- <div class='search_button'>搜索</div> -->
    </a>
    <div class="container main">
      <div class="category">
        <swiper class="sw_cat" :indicator-dots="indicatorDots"
           :interval="interval" :duration="duration">
            <swiper-item :key="i" v-for="(item,i) in imgUrls">
              <span><image :src="imgUrls[i]" /><p>分类分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类1</p></span>
              <span><image :src="imgUrls[i]" /><p>分类分类</p></span>
              <span><image :src="imgUrls[i]" /><p>分类分类1</p></span>
            </swiper-item>
        </swiper>
      </div>
      <div class="notify">
        <p class="news">新闻资讯</p>
        <swiper class="sw_notify"
           :interval="interval" :duration="duration" vertical="true" autoplay="true">
            <swiper-item :key="i" v-for="(item,i) in imgUrls">
              <span>通知</span>
            </swiper-item>
        </swiper>
        <p class="more">更多</p>
      </div>
      <div class="three" :key="i" v-for="(xxx,j) in imgUrls">
        <p class="three_title">热卖</p>
        <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
          <div id="green" :key="i" v-for="(item,i) in hot" class="scroll-view-item_H">
            <image :src="hot[i]"></image>
            <text class="goods_title">这是商品标题1这是商品标题1这是商品标题1这是商品标题1</text>
            <div class="price">
              <span class="sell"><text>￥12.9</text></span>
              <span class="original"><text>￥10.9</text></span>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="one" :key="i" v-for="(item,i) in imgUrls">
        <div class="left"><image :src="imgUrls[i]" /></div>
        <div class="right">
          <text class="goods_title">这是商品标题1这是商品标题1这是商品标题1这是商标题1这是商品标题1这是商品标题1</text>
          <div class="price m_top_150rpx">
            <span class="sell"><text>￥12.9</text></span>
            <span class="original"><text>￥10.9</text></span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="two">
        <div class="deuce" :key="i" v-for="(item,i) in imgUrls">
          <div><image :src="imgUrls[i]" /></div>
          <text class="goods_title">这是商品标题1这是商品标题1这是商品标题1这是商标题1这是商品标题1这是商品标题1</text>
          <div class="price">
            <span class="sell"><text>￥12.9</text></span>
            <span class="original"><text>￥10.9</text></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      hot: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000
    }
  },
  methods: {
  },

  created () {
    var http_obj = {}
    wx.request({
      //仅为示例，并非真实的接口地址
      url: 'https://www.newdreamvip.com/house/agent', 
      method: 'post',
      data: http_obj.data != undefined ? http_obj.data : {},
      header: {
          'applet-id': 6,
          //设置参数内容类型为json
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style scoped>
.sw_banner {
  width: 100%;
  height: 311rpx;
  display: block;
}

.search{
  width: 100%;
  position: absolute;
  top: 5rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search_input_icon{
  width: 80%;
}
.search_cion {
  margin: 10rpx 10rpx 10rpx 10rpx;
  position: absolute;
  left: 100rpx;
  z-index: 2;
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
.search_input input{
  margin-left: 60rpx;
  height: 60rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
}

.main {
  padding: 0 15rpx 0 15rpx;
}

.category {
  background: #FFFFFF;
  margin-top: 15rpx;
  padding-top: 20rpx;
  height: 340rpx;
  width: 100%;
  border-radius: 10rpx 10rpx 0 0;
}
.sw_cat {
  width: 100%;
  height: 340rpx;
  display: block;
}
.sw_cat span {
  display: inline-block;
  /*margin-bottom: 10rpx;*/
  padding: 0 1%;
  width: 18%;
  height: 150rpx;
  text-align: center;
}
.sw_cat image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
}
.sw_cat p {
  padding: 0;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}

.notify {
  background: #FFFFFF;
  margin-top: 5rpx;
  height: 50rpx;
  width: 100%;
  border-radius: 0 0 10rpx 10rpx;
}
.news {
  display: block;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 1.2em;
  font-weight: bold;
  font-style: italic;
  float: left;
  color: #FF0000;
  text-align: center;
  padding: 0 10rpx;
}
.sw_notify {
  width: 65%;
  height: 50rpx;
  line-height: 50rpx;
  display: block;
  float: left;
}
.more {
  display: block;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
}

.three {
  width: 100%;
  height: 420rpx;
  text-align: center;
  margin-top: 15rpx;
  background: #FFFFFF;
  border-radius: 10rpx;
}
.three_title {
  font-size: 40rpx;
  font-family:"黑体";
  padding: 5rpx 0;
}
.scroll-view_H{
  white-space: nowrap;
}
.scroll-view-item_H{
  background: #FFFFFF;
  display: inline-block;
  width: 220rpx;
  height: 350rpx;
  margin-left: 20rpx;
}
.scroll-view-item_H image {
  width: 220rpx;
  height: 220rpx;
  border-radius: 10rpx;
}

.goods_title {
  white-space: pre-wrap;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.price {
  display: flex;
  margin-top: 5rpx;
}
.price span {
  flex: 1;
  /*background: red;*/
  text-align: left;
}
.price .sell {
  color: #f04827;
}
.price .original {
  color: #a79d9d;
  text-decoration:line-through;
}

.two {
  width: 100%;
  margin-top: 5rpx;
  /*background: #FFFFFF;*/
}
.deuce {
  display: inline-block;
  width: 351rpx;
  height: 480rpx;
  margin: 1% 12rpx;
  text-align: center;
  background: #FFFFFF;
  border-radius: 10rpx;
}
.deuce image{
  width: 351rpx;
  height: 351rpx;
  border-radius: 10rpx 10rpx 0 0;
  overflow: hidden;
}
.deuce .price span {
  text-align: center;
}

.one {
  width: 100%;
  height: 250rpx;
  margin-top: 5rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #FFFFFF;
}
.left {
  width: 250rpx;
  /*background: red;*/
}
.left image {
  width: 250rpx;
  height: 250rpx;
  border-radius: 10rpx;
}
.right {
  flex: 1;
  padding: 0 5rpx;
  /*background: blue;*/
}
.right .m_top_150rpx {
  margin-top: 130rpx;
}
</style>