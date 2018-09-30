<template>
  <div id="goods_list">
    <div>
      <div class="search bg_search" :class="[s_hidden ? 'search_none' : '']">
        <div class="search_input_icon" @click="search">
          <div class="search_input">
            <icon class="search_cion" size='20' type='search'></icon>
            <input placeholder="搜索" :value="keyword" />
          </div>
        </div>
        <div class="sort">
          <span @click="active('sale')" :class="[sale ? 'active' : '' ]">销量</span>
          <span @click="activePrice('price')">
            <label :class="[price ? 'active' : '' ]">价格</label>
            <label>
              <i class="triangle" :class="[price_asc ? 't_active' : '' ]"></i>
              <i class="inverted_triangle" :class="[price_desc ? 'i_t_active' : '' ]"></i>
            </label>
          </span>
          <span @click="active('new_goods')" :class="[new_goods ? 'active' : '' ]">新品优先</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="two" :class="[t_m_5 ? 'two_single' : '']" v-if="goods_list.length > 0">
        <div @click="$to.Goods(goods.id)" class="deuce" :key="i" v-for="(goods,i) in goods_list">
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
      <div style="margin-top: 48%; height: 100vh; width: 100% background:red" v-else>
        没有搜索到你要的商品，试试其他的!
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods_list: [],
      keyword: false,
      cat_id: false,
      page: 1,
      num: 20,
      sort: false,
      no_more:false,
      price: false,
      sale: false,
      price_asc: false,
      price_desc: false,
      new_goods: false,
      s_hidden: false,
      t_m_5: false,
      height: 0,
    }
  },
  methods: {
    fetchData() {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      let data = {
        page: this.page,
        num: this.num
      }
      if (this.cat_id) {
        data.cat_id = this.cat_id
      }
      if (this.keyword) {
        data.keyword = this.keyword
      }
      if (this.sort) {
        data.sort = this.sort
      }
      if (this.price_asc) {
        data.sort_type = 'asc'
      }
      if (this.price_desc) {
        data.sort_type = 'desc'
      }
      this.$http.get({
        url: 'goods/search',
        data: data
      }).then((res) => {
        if (res.data.result.length < this.num) {
          this.no_more = true
        }
        this.goods_list = this.goods_list.concat(res.data.result)
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
    },
    active(name) {
      let list = ['sale', 'new_goods','price']
      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] == name) {
          this[name] = true
        } else {
          this[list[i]] = false
        }
      }
      this.price_asc = false
      this.price_desc = false
      this.sort = name
      this.goods_list = []
      this.fetchData()
    },
    activePrice() {
      let list = ['sale', 'new_goods']
      for (var i = list.length - 1; i >= 0; i--) {
        this[list[i]] = false
      }
      this.price = true
      if (this.price_asc ^ this.price_desc) {
        let temp = this.price_asc
        this.price_asc = this.price_desc
        this.price_desc = temp
      } else {
        this.price_asc = true
      }
      this.sort = 'price'
      this.goods_list = []
      this.fetchData()
    },
    init() {
      this.goods_list = []
      this.page = 1
      this.num = 20
      this.sort = false
      this.no_more =false
      this.price = false
      this.sale = false
      this.price_asc = false
      this.price_desc = false
      this.new_goods = false
      this.s_hidden = false
      this.t_m_5 = false
      this.height = 0
    },
    search() {
      this.$to.r('../search/main?keyword=' + this.keyword)
    }
  },
  onPullDownRefresh() {
    this.init()
    this.fetchData()
  },
  onReachBottom() {
    if (this.no_more == false) {
      this.page = ++this.page
      this.fetchData()
    } else {
      wx.showToast({
        title: '没有更多了',
        duration: 1000
      });
    }
  },
  onLoad(obj) {
    this.init()
    if (obj.category != undefined) {
      obj.category = JSON.parse(obj.category)
      this.keyword = obj.category.name
      this.cat_id  = obj.category.id
    } else {
      this.keyword = obj.keyword
      this.cat_id = false
    }
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

#goods_list .sort {
  width: 100%;
  padding: 10rpx 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#goods_list .sort span {
  /*background: blue;*/
  display: flex;
  flex-flow: row;
}

#goods_list .sort span label {
  display: inline-block;
}

.active {
  color: #f04827;
}

.triangle {
  display: block;
  width: 0px;
  height: 0px;
  border-width: 10rpx;
  border-style: solid;
  margin-left: 5rpx;
  border-color: transparent transparent #000000 transparent;
  margin-bottom: 10rpx;
}

.inverted_triangle {
  display: block;
  width: 0px;
  height: 0px;
  border-width: 10rpx;
  border-style: solid;
  margin-left: 5rpx;
  border-color: #000000 transparent transparent transparent;
}

.t_active {
  border-color: transparent transparent #f04827 transparent;
}

.i_t_active {
  border-color: #f04827 transparent transparent transparent;
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
