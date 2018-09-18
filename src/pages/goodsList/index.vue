<template>
  <div id="goods_list">
    <div>
      <div class="search bg_search" :class="[s_hidden ? 'search_none' : '']">
        <a class="search_input_icon" href="/pages/search/main?text=123">
          <div class="search_input">
            <icon class="search_cion" size='20' type='search'></icon>
            <input class="" placeholder="搜索" />
          </div>
        </a>
        <div style="width: 100vw">
          a
        </div>
      </div>
    </div>
    <div class="container">
      <div class="two" :class="[t_m_5 ? 'two_single' : '']">
        <div @click="toDetail(goods.id)" class="deuce" :key="i" v-for="(goods,i) in goods_list">
          <div>
            <image :src="goods.url" />
          </div>
          <div style="padding-left: 10rpx">
            <span class="goods_title">{{goods.name}}</span>
            <div class="price">
              <span class="sell">￥{{goods.sell_price}}</span>
              <span class="original">￥{{goods.price}}</span>
            </div>
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
      goods_list: [],
      s_hidden: false,
      t_m_5: false,
      height: 0,
    }
  },
  methods: {
    toDetail(id) {
      this.$to.n(`../goodsDetail/main?id=${id}`)
    },
    fetchData() {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.$http.get({
        url: 'goods/search',
      }).then((res) => {
        this.goods_list = res.data.result
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
    }
  },
  onPullDownRefresh() {
    this.fetchData()
  },
  onLoad() {
    this.fetchData()
  },
  onPageScroll(obj) {
    if (obj.scrollTop >= this.height) {
      //向下滚动
      this.s_hidden = true
      this.t_m_5 = true
    } else {
      //向上滚动
      this.s_hidden = false
      this.t_m_5 = false
    }
    this.height = obj.scrollTop
  }
}

</script>
<style scoped>
#goods_list {
  width: 100%;
}

.search_none {
  display: none;
}

.two_single {
  margin-top: 5rpx !important;
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
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-top: 150rpx;
  width: 100%;
  /*background: red;*/
  /*background: #FFFFFF;*/
}

.deuce {
  width: 47%;
  margin: 10rpx 1.5%;
  text-align: left;
  background: #FFFFFF;
  border-radius: 10rpx;
}

.deuce image {
  width: 100%;
  height: 351rpx;
  border-radius: 10rpx 10rpx 0 0;
  overflow: hidden;
}

</style>
