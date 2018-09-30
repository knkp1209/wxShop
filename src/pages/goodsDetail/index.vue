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
      <button class="button_none" @click="toCart">
        <image src="/static/image/cart.png" />
      </button>
      <block v-if="logged">
        <button class="button_none" @click="love">
          <image :src="[ goods.collection ? '/static/image/love_selected.png':'/static/image/love.png']" />
        </button>
        <button class="button-green" @click="pre('addCart')">加入购物车</button>
        <button class="button-red" @click="pre('buy')">立即购买</button>
      </block>
      <block v-else>
        <button class="button_none" @getuserinfo="(e) => checkLogin(e,'love')" open-type="getUserInfo" lang="zh_CN">
          <image :src="[ goods.collection ? '/static/image/love_selected.png':'/static/image/love.png']" />
        </button>
        <button class="button-green" @getuserinfo="(e) => checkLogin(e,'addCart')" open-type="getUserInfo" lang="zh_CN">加入购物车</button>
        <button class="button-red" @getuserinfo="(e) => checkLogin(e,'buy')" open-type="getUserInfo" lang="zh_CN">立即购买</button>
      </block>
    </div>
    <!-- sku选择 -->
    <div class="sku_div" :class="[choose_sku ? 'choose_sku' : '']">
      <div class="exit" @click="choose_sku = false">
      </div>
      <div class="goods">
        <div class="price">
          <span class="sell">￥{{goods.sell_price}}</span>
          <span class="original">￥{{goods.price}}</span>
          <span>库存：{{goods.stock}}{{goods.unit}}</span>
          <span>销量：{{goods.sale}}{{goods.unit}}</span>
        </div>
        <div class="close" @click="choose_sku = false">X</div>
      </div>
      <div class="sku">
        <div v-for="(spec,i) in specs" :key="i">
          <span>{{spec.name}}</span>
          <radio-group class="radio-group" @change="(e) => radioChange(e,spec.name,i)">
            <span class="radio" v-for="(value, index) in spec.values" :key="index">
              <radio :value="value" />{{value}}
            </span>
          </radio-group>
        </div>
        <div class="quantity">
          <span>数量</span>
          <div>
            <button :disabled="quantity <= 1" :class="[quantity <= 1 ? 'disabled' : '']"  @click="dec">-</button>
            <input type="digit" v-model="quantity" />
            <button :disabled="quantity >= goods.stock" :class="[quantity >= goods.stock  ? 'disabled' : '']" @click="inc">+</button>
          </div>
        </div>
      </div>
      <div class="buy">
        <button class="button-green" @click="addCart">加入购物车</button>
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
      product_id: false,
      quantity: 1,
      specs: {}, // 规格列表
      specs_length: 0, // 规格长度
      post_spec: {},
      logged: false,
      choose_sku: false,
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
      })
      let data = { goods_id: id, spec: spec }
      this.$http.post({
        url: 'products',
        data: data
      }).then((res) => {
        console.log(res)
        let p = res.data.result
        this.product_id = p.id
        this.goods.sell_price = p.sell_price
        this.goods.price = p.price
        this.goods.sale = p.sale
        this.goods.stock = p.stock
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
      })
    },
    arrange(specs) {
      if (specs == null) {
        this.specs = {}
        this.specs_length = 0
      } else {
        this.specs = JSON.parse(specs)
        this.specs_length = Object.keys(this.specs).length
      }
    },
    radioChange(e, name, i) {
      if (this.post_spec[i] == undefined) {
        this.post_spec[i] = {}
      }
      this.post_spec[i][name] = e.target.value
      if (Object.keys(this.post_spec).length == this.specs_length) {
        this.fetchProduct(this.post_spec, this.goods.id)
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
    love() {
      this.goods.collection = !this.goods.collection
      let data = {
        goods_id: this.goods.id,
        collection: this.goods.collection
      }
      this.$http.post({
        data: data,
        url: 'collection'
      }).then((res) => {
        // console.log(res)
      }).catch((res) => {
        console.log('catch', res)
      })
    },
    // 跳到购物车
    toCart() {
      this.$to.s('../cart/main')
    },
    checkLogin(e, name) {
      let _this = this
      login(e, _this).then(() => {
        _this.pre(name)
        _this.logged = wx.getStorageSync('logged')
      })
    },
    pre(name) {
      if (name == 'addCart') {
        if (this.specs_length > 0) {
          this.choose_sku = true
        } else {
          this.addCart()
        }
      } else if (name == 'buy') {
        if (this.specs_length > 0) {
          this.choose_sku = true
        } else {
          this.buy()
        }
      }
    },
    addCart() {
      let data = {
        goods_id: this.goods.id,
        quantity: this.quantity
      }
      if (this.choose_sku == true) {
        if (this.product_id == false) {
          wx.showToast({
            title: '请选择规格',
            icon: 'none',
            duration: 500,
          });
          return false;
        } else {
          data.product_id = this.product_id
        } 
      }
      this.$http.post({
        data: data,
        url: 'carts'
      }).then((res) => {
        wx.showToast({
          title: '添加成功',
          duration: 1000
        });
        console.log(res)
      }).catch((res) => {
        console.log('catch', res)
      })
    },
    // 购买
    buy() {
      console.log(this.goods.id)
    },
    goodsInit() {
      this.goods = {}
      this.choose_sku = false
      this.specs = {} // 规格列表
      this.specs_length = 0 // 规格长度
      this.post_spec = {}
      this.logged = wx.getStorageSync('logged')
      this.product_id = false
    },
    dec() {
      this.quantity = (Math.floor(this.quantity * 100) - 100) / 100
    },
    inc() {
      let temp = (Math.floor(this.quantity * 100) + 100) / 100
      if (temp > this.goods.stock) {
        this.quantity = this.goods.stock
      } else {
        this.quantity = temp
      }
    }
  },
  onPullDownRefresh() {
    let id = this.goods.id
    this.goodsInit()
    this.fetchData(id)

  },
  onLoad(obj) {
    this.goodsInit()
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

.sku .quantity {
  margin-top: 20rpx;
}

.sku .quantity div {
  width: 240rpx;
  height: 100rpx;
  border-radius: 10rpx;
  display: flex;
  margin-left: 10rpx;
}

.sku .quantity input {
  flex: 2;
  padding: 0rpx;
  text-align: center;
  min-height: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  border: 1rpx solid #DCDCDC;
  border-radius: 8rpx;
  margin: 0rpx 2rpx;
  box-sizing:border-box;
  vertical-align:middle;
}

.sku .quantity button {
  flex: 1;
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: #FFFFFF;
  padding: 0rpx;
  color: #000000;
}

.sku .quantity .disabled {
  color:#DCDCDC;
}

.buy {
  height: 100rpx;
  background: #FF0000;
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
  width: 60rpx;
  height: 60rpx;
  /*margin: 0rpx 25rpx;*/
  /*background: red;*/
}

</style>
