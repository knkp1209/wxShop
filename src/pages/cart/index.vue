<template>
  <div>
    <div v-if="list.length > 0">
      <div class="cart-list">
        <div class="one" :key="i" v-for="(goods,i) in list">
          <div class="checkbox">
            <input type="checkbox" :checked="select[i]" @click="changSelect(i)">
          </div>
          <div class="left">
            <image :src="goods.url" />
          </div>
          <div class="right">
            <span class="goods_title">
              {{goods.goods_name}}
            </span>
            <div class="goods_spec">
              <span v-for="(item,j) in goods.spec" :key="j">{{item}}</span>
            </div>
            <div class="price-quantity">
              <div class="price">
                <span class="sell">￥{{goods.sell_price}}</span>
              </div>
              <div class="quantity">
                <div>
                  <button :disabled="quantity[i] <= 1" :class="[quantity[i] <= 1 ? 'disabled' : '']" @click="dec(i)">-</button>
                  <input type="digit" v-model="quantity[i]" />
                  <button :disabled="quantity[i] >= goods.stock" :class="[quantity[i] >= goods.stock  ? 'disabled' : '']" @click="inc(i)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-nav">
        <div class="footer_letf">
          <label class="all-select" @click="allSelect()">
            <input type="checkbox" :checked="all_select" />全选</label>
          <label>合计：￥{{total}}</label>
        </div>
        <button @click="toPay">去结算</button>
      </div>
    </div>
    <div class="cart_empty" v-else>
      <image src="/static/image/cart_empty.png" />
      <p>购物车空空如也</p>
      <button @click="toShop">去逛逛</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      quantity: {},
      select: {},
      total: '0.00',
      all_select: false,
    }
  },
  methods: {
    fetchData(id) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.$http.get({
        url: 'carts'
      }).then((res) => {
        this.list = res.data.result
        this.dataSet()
      }).catch((res) => {
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
    },
    toShop() {
      this.$to.s('../home/main')
    },
    dataSet() {
      for (var i = this.list.length - 1; i >= 0; i--) {
        this.$set(this.quantity, i, this.list[i].quantity)
        this.$set(this.select, i, false)
        if (this.list[i].spec != false) {
          this.list[i].spec = JSON.parse(this.list[i].spec)
        } else {
          this.list[i].spec = {}
        }
      }
    },
    changSelect(i) {
      this.select[i] = !this.select[i]
    },
    dec(i) {
      this.quantity[i] = (Math.floor(this.quantity[i] * 100) - 100) / 100
      this.addCart(i)
      this.computeTotal()
    },
    inc(i) {
      let temp = (Math.floor(this.quantity[i] * 100) + 100) / 100
      if (temp > this.list.stock) {
        this.quantity[i] = this.list[i].stock
      } else {
        this.quantity[i] = temp
      }
      this.addCart(i)
      this.computeTotal()
    },
    computeTotal() {
      this.total = 0;
      for (let i in this.select) {
        if (this.select[i] == true) {
          this.total = ((parseFloat(this.total) * 100) + (this.list[i].sell_price * 100 * this.quantity[i])) / 100
        }
      }
      this.total = this.toDecimal2(this.total)
    },
    toDecimal2(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return false;
      }
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf('.');
      if (rs < 0) {
        rs = s.length;
        s += '.';
      }
      while (s.length <= rs + 2) {
        s += '0';
      }
      return s;
    },
    toPay() {
      let carts = []
      for (let i in this.select) {
        if (this.select[i] == true) {
          carts.push(this.list[i])
        }
      }
      if (carts.length > 0) {
        this.$to.n('../pay/main?carts=' + JSON.stringify(carts))
      } else {
        wx.showToast({
          title: '请勾选商品再点击结算',
          icon: 'none',
          duration: 500,
        });
      }
    },
    allSelect() {
      this.all_select = !this.all_select
      this.total = 0;
      if (this.all_select == false) {
        for (let i in this.select) {
          this.select[i] = false
        }
      } else {
        for (let i in this.select) {
          this.select[i] = true
          this.total = ((parseFloat(this.total) * 100) + (this.list[i].sell_price * 100)) / 100
        }
      }
      this.total = this.toDecimal2(this.total)
    },
    addCart(i) {
      let data = {
        goods_id: this.list[i].goods_id,
        quantity: this.quantity[i],
        product_id: this.list[i].product_id
      }
      this.$http.post({
        data: data,
        url: 'carts'
      }).then((res) => {
      }).catch((res) => {
        console.log('catch', res)
      })
    },
  },
  watch: {
    select: {
      handler(new_value, old_value) {
        let f = true
        let t = false
        this.total = 0;
        for (let i in new_value) {
          if (new_value[i] == false) {
            f = false;
          } else {
            this.total = ((parseFloat(this.total) * 100) + (this.list[i].sell_price * 100 * this.quantity[i])) / 100
            t = true;
          }
        }
        if ((f == true) && (t == true)) {
          this.all_select = true;
        } else {
          this.all_select = false;
        }
        this.total = this.toDecimal2(this.total)
      },
      deep: true
    }
  },
  onPullDownRefresh() {
    this.fetchData()
  },
  onShow() {
    this.fetchData()
  },
}

</script>
<style scoped>
.cart_empty {
  text-align: center;
  padding-top: 45%;
}

.cart_empty button {
  width: 200rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0rpx;
  color: #FFFFFF;
  background: #FF0000;
}

.cart_empty image {
  width: 200rpx;
  height: 200rpx;
}

.cart-list {
  width: 100%;
  height: 92%;
  bottom: 90rpx;
  position: fixed;
  /*overflow-y: hidden;*/
  overflow-x: hidden;
  background: #FFFFFF;
}

.one {
  width: 100%;
  height: 200rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #FFFFFF;
  margin: 30rpx 0;
  position: relative;
  box-shadow: 0 0 20rpx #f3ecec;
  padding: 0rpx 10rpx;
}

.left {
  width: 200rpx;
  height: 200rpx;
  line-height: 200rpx;
  text-align: center;
}

.left image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
}

.one .checkbox {
  line-height: 200rpx;
}

.one input {
  vertical-align: middle;
}

.right {
  flex: 1;
  padding: 0 15rpx;
  display: flex;
  flex-direction: column;
  /*background: blue;*/
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
  font-size: 30rpx;
  padding: 2rpx 0rpx;
}

.goods_spec {
  display: flex;
  position: absolute;
  bottom: 65rpx;
}

.goods_spec span {
  display: inline-block;
  margin: 0 5rpx;
  font-size: 25rpx;
  text-align: center;
  color: #737577;
}

.price-quantity {
  display: flex;
  position: absolute;
  bottom: 5rpx;
  height: 60rpx;
}

.one .quantity div {
  width: 240rpx;
  display: flex;
  margin-left: 10rpx;
}

.one .quantity input {
  flex: 2;
  padding: 0rpx;
  text-align: center;
  min-height: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  border: 1rpx solid #DCDCDC;
  border-radius: 8rpx;
  margin: 0rpx 2rpx;
  box-sizing: border-box;
  vertical-align: middle;
}

.one .quantity button {
  flex: 1;
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: #FFFFFF;
  padding: 0rpx;
  color: #000000;
}

.one .quantity .disabled {
  color: #DCDCDC;
}

.cart-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 90rpx;
  font-size: 30rpx;
}

.cart-nav .footer_letf {
  flex: 1;
  padding-left: 10rpx;
  height: 89rpx;
  line-height: 89rpx;
  border-top: 1rpx solid #DCDCDC;
}

.footer_letf .all-select {
  font-size: 25rpx;
}

.footer_letf label+label {
  margin-left: 20rpx;
}


.cart-nav button {
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 0rpx;
  width: 200rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #f44336;
  font-size: 30rpx;
}

</style>
