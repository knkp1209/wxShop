<template>
  <div>
    <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <swiper-item v-for="(banner,i) in goods.banners" :key="i">
        <image :src="banner.url" :data-src="banner.url" @click="previewImage"></image>
      </swiper-item>
    </swiper>
    <div class="detail">
      <span class="title">{{goods.name}}</span>
      <div class="price">
        <span class="sell">￥{{goods.sell_price}}</span>
        <span class="original">￥{{goods.price}}</span>
      </div>
    </div>
    <span class="title">商品详情</span>
    <rich-text :nodes="goods.detail" bindtap="tap"></rich-text>
    <!-- 底部悬浮栏 -->
    <div class="detail-nav">
      <image @click="toCar" src="/static/image/cart.png" />
      <image @click="addLike" :src="[ isLike ? '/static/image/love_selected.png':'/static/image/love.png']" />
      <button class="button-green" @click="preCar" formType="submit">加入购物车</button>
      <button class="button-red" @getuserinfo="preBuy" open-type="getUserInfo" lang="zh_CN">立即购买</button>
    </div>
    <!-- sku选择 -->
    <div class="sku_div" :class="[choose_sku ? 'choose_sku' : '']">
      <div class="exit" @click="choose_sku = false">
      </div>
      <div class="goods">
        <div class="price">
          <span>库存：{{goods.stock}}{{goods.unit}}</span>
          <span class="sell">￥{{goods.sell_price}}</span>
          <span class="original">￥{{goods.price}}</span>
        </div>
        <div class="close" @click="choose_sku = false">X</div>
      </div>
      <div class="sku">
        <div v-for="(spec,i) in specs" :key="i">
          <span>{{spec.name}}</span>
          <radio-group class="radio-group" @change="(e) => radioChange(e,spec.name)">
            <span class="radio" v-for="(value, index) in spec.values" :key="index">
              <radio :value="value" />{{value}}
            </span>
          </radio-group>
        </div>
      </div>
      <div class="buy">
        <button class="button-green" @click="addCar" formType="submit">加入购物车</button>
        <button class="button-red" @click="buy">立即购买</button>
      </div>
    </div>
  </div>
</template>
<script>
import login from '../../utils/login'
export default {
  data() {
    return {
      goods: {},
      choose_sku: false,
      specs: {}, // 规格列表
      specs_length: 0, // 规格长度
      post_spec: {},
      isLike: true,
      indicatorDots: true, //是否显示面板指示点
      autoplay: true, //是否自动切换
      interval: 3000, //自动切换时间间隔,3s
      duration: 1000, //  滑动动画时长1s
    }
  },
  methods: {
    fetchData(id) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.$http.get({
        url: 'goods/' + id,
      }).then((res) => {
        this.goods = res.data.result
        this.arrange(res.data.result.specs)
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
    },
    fetchProduct(spec, id) {
      wx.showLoading({
        title: '获取中...',
        mask: true
      })
      this.$http.post({
        url: 'product/' + id,
        data: spec
      }).then((res) => {
        this.goods = res.data.result
        this.arrange(res.data.result.specs)
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
    },
    arrange(specs) {
      this.specs = JSON.parse(specs)
      this.specs_length = Object.keys(this.specs).length
      console.log(this.specs)
    },
    radioChange(e, name) {
      console.log(e)
      this.post_spec[name] = e.target.value
      if (Object.keys(this.post_spec).length == this.specs_length) {
        console.log(this.post_spec)
        this.fetchProduct(this.post_spec, this.goods.id)
        console.log('可以发送请求')
      }
    },
    previewImage(e) {
      let current = e.target.dataset.src;
      let urls = [];
      for (var i = this.goods.banners.length - 1; i >= 0; i--) {
        urls.push(this.goods.banners[i].url)
      }
      wx.previewImage({
        current: current, // 当前显示图片的http链接  
        urls: urls // 需要预览的图片http链接列表  
      })
    },
    // 收藏
    addLike() {
      this.isLike = !this.isLike
    },
    // 跳到购物车
    toCar() {
      this.$to.s('../cart/main')
    },
    // 立即购买
    preBuy(e) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      login(e,this).then(() => {
        if (this.specs_length > 0) {
          this.choose_sku = true
          wx.hideLoading()
        } else {
          console.log('wen')
          this.buy()
          
        }
      }).finally(() =>{
        wx.hideLoading()
      })
    },
    // 立即购买
    buy() {
      console.log('a')
    },
  },
  onPullDownRefresh() {
    this.fetchData(this.goods.id)
  },
  onLoad(obj) {
    console.log(obj);
    this.fetchData(obj.id)
  },
}

</script>
<style scoped>
.choose_sku {
  display: flex !important;
  flex-direction: column;
}

.sku_div {
  position: fixed;
  bottom: 0rpx;
  display: none;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  /*background: red;*/
}

.sku_div span {
  font-size: 32rpx;
  padding-top: 10rpx;
  padding-left: 10rpx;
}

.exit {
  flex: 5;
}

.goods {
  background: #FFFFFF;
  display: flex;
  flex-flow: row wrap-reverse;
  justify-content: flex-start;
  align-items: flex-end;
}

.goods .price {
  flex: 8;
}

.goods .close {
  text-align: right;
  padding-right: 20rpx;
}

.goods .stock {
  flex: 1;
}

.sku {
  min-height: 550rpx;
  max-height: 550rpx;
  background: #FFFFFF;
  overflow: auto;
}

.buy {
  height: 100rpx;
  background: red;
}









/* 直接设置swiper属性 */

swiper {
  height: 500rpx;
}

swiper-item image {
  width: 100%;
  height: 100%;
}

.detail {
  display: flex;
  flex-direction: column;
  margin-top: 15rpx;
  margin-bottom: 0rpx;
}

.detail .title {
  font-size: 40rpx;
  margin: 10rpx;
  color: #000000;
  text-align: justify;
}

.detail .price {
  color: red;
  font-size: 40rpx;
  margin: 10rpx;
}

.detail-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100rpx;
  border-top: 1rpx solid #DCDCDC;
}

.button-green {
  background-color: #4caf50;
  /* Green */
}

.button-red {
  background-color: #f44336;
  /* 红色 */
}

button {
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30rpx;
  border-radius: 0rpx;
  width: 50%;
  height: 100rpx;
  line-height: 100rpx;
}

.detail-nav image {
  width: 80rpx;
  height: 60rpx;
  margin: 0rpx 25rpx;
  /*background: red;*/
}

</style>
