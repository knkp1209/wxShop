<template>
  <div>
    <div class="search" :class="[bg_search ? 'bg_search' : '' ]">
      <a class="search_input_icon" href="/pages/search/main?text=123">
        <div class="search_input">
          <icon class="search_cion" size='20' type='search'></icon>
          <input class="" placeholder="搜索" />
        </div>
      </a>
    </div>
    <swiper class="sw_banner" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
      <swiper-item :key="i" v-for="(item,i) in banners">
        <image :src="banners[i].url" class="sw_banner" />
      </swiper-item>
    </swiper>
    <div class="container main">
      <div class="category">
        <swiper class="sw_cat" :indicator-dots="indicatorDots" :interval="interval" :duration="duration">
          <swiper-item :key="i" v-for="(categorys,i) in all_category">
            <span @click="toGoodsList(category.id)" :key="i" v-for="(category,index) in categorys">
                <image :src="category.url" /><p>{{category.name}}</p>
              </span>
          </swiper-item>
        </swiper>
      </div>
      <div class="notify">
        <p class="news">新闻资讯</p>
        <swiper class="sw_notify" :interval="interval" :duration="duration" vertical="true" autoplay="true">
          <swiper-item :key="i" v-for="(item,i) in notice">
            <span>{{item}}</span>
          </swiper-item>
        </swiper>
        <p class="more">更多</p>
      </div>
      <div class="three" :key="i" v-for="(data,j) in all_goods">
        <p class="three_title">{{data.title}}</p>
        <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
          <div :key="i" v-for="(goods,i) in data.data" class="scroll-view-item_H">
            <image :src="goods.url"></image>
            <text class="goods_title">
              {{goods.name}}
            </text>
            <div class="price">
              <span class="sell"><text>￥{{goods.sell_price}}</text></span>
              <span class="original"><text>￥{{goods.price}}</text></span>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="one" :key="i" v-for="(item,i) in imgUrls">
        <div class="left">
          <image :src="imgUrls[i]" />
        </div>
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
          <div>
            <image :src="imgUrls[i]" />
          </div>
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
  data() {
    return {
      banners: [],
      notice: ['公告功能', '敬请期待!'],
      all_category: [],
      all_goods: [],
      bg_search: false, // 搜索框是否显示背景色
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000
    }
  },
  methods: {
    fetchData() {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.$http.get({
        url: 'banners',
      }).then((res) => {
        this.banners = res.data.result
      }).catch((res) => {
        console.log(res)
      })
      this.$http.get({
        url: 'categorys',
      }).then((res) => {
        this.all_category = res.data.result
      }).catch((res) => {
        console.log(res)
      })
      this.$http.get({
        url: 'goods',
      }).then((res) => {
        this.all_goods = res.data.result
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
    },
    toGoodsList(id) {
      this.$to.n('../goodsList/main')
    }
  },
  onPullDownRefresh() {
    this.fetchData()
  },
  onLoad() {
    this.fetchData()
  },
  onPageScroll(obj) {
    if (obj.scrollTop > 120) {
      this.bg_search = true
    } else {
      this.bg_search = false
    }
  }
}

</script>
<style scoped>
.sw_banner {
  width: 100%;
  height: 311rpx;
  display: block;
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
  text-overflow: ellipsis;
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
  font-family: "黑体";
  padding: 5rpx 0;
}

.scroll-view_H {
  white-space: nowrap;
}

.scroll-view-item_H {
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
  height: 80rpx;
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

.deuce image {
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
