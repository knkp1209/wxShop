<template>
  <div class="pay">
    <div class="main">
      <div class="address">
        <div v-if="address" @click="toAddressList">
          <div>
            {{address.consignee}}
            {{address.mobile}}
          </div>
          <div class="addressinfo">
            {{address.province}}{{address.city}}{{address.county}}&nbsp;{{address.address}}
          </div>
        </div>
        <div v-else>
          <button @click="createAddress(1)">新增收货地址</button>
        </div>
      </div>
      <div class="goods_list">
        <div class="one" :key="i" v-for="(item,i) in goods">
          <div class="left">
            <image :src="item.url" />
          </div>
          <div class="right">
            <span class="item_title">
              {{item.goods_name}}
            </span>
            <div class="item_spec">
              <span v-for="(item,j) in item.spec" :key="j">{{item}}</span>
            </div>
            <div class="price-quantity">
              <div class="price">
                <span class="sell">￥{{item.sell_price}}</span>
              </div>
              <div class="quantity">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
      </div>
      <div class="count">
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
        <p>skdkfdskdkf</p>
      </div>
    </div>
    <div class="footer">
      aaa
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    goods: []
  },
  computed: {
    ...mapState([
      'addressList',
      'address'
    ])
  },
  methods: {
    ...mapMutations({
      setAddress: 'SET_ADDRESS',
      setAddressList: 'SET_ADDRESS_LIST'
    }),
    fetchData() {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.$http.get({
        url: 'user_address',
      }).then((res) => {
        this.setAddressList(res.data.result)
        if (this.addressList.length > 0) {
          this.setAddress(this.addressList[0])
        } else {
          this.setAddress(null)
        }
      }).catch((res) => {
        console.log(res)
      })
      this.$http.get({
        url: 'categorys/home',
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
    toAddressList() {
      this.$to.n('../addressList/main')
    },
    createAddress(back) {
      this.$to.n('../editAddress/main?back=' + back)
    }
  },
  onPullDownRefresh() {
    this.fetchData()
  },
  onLoad(obj) {
    console.log(JSON.parse(obj.carts))
    this.fetchData()
  },
}

</script>
<style scoped>
.pay {
  width: 100%;
  height: 100%;
  background: red;
  display: flex;
  flex-direction: column;
}

.pay .main {
  background: blue;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: space-around;
  margin-bottom: 100rpx;
}

.pay .main>div {
  margin-bottom: 20rpx;
}

.pay .main .address {
  background: #FFFFFF;
  border-bottom: 5rpx dashed red;

}

.pay .main .address>div>div {
  padding-left: 10rpx;
}

.pay .main .address .addressinfo {
  font-size: 30rpx;
}

.pay .main .address>div>button {
  background: #FF0000;
  width: 40%;
  height: 60rpx;
  line-height: 60rpx;
  margin-bottom: 10rpx;
  color: #FFFFFF;

}


.pay .main .goods_list {
  background: yellow;
}

.pay .main .remark {
  background: green;
}

.pay .main .count {
  background: yellow;
}

.pay .footer {
  position: fixed;
  bottom: 0rpx;
  height: 100rpx;
  width: 100%;
  background: black;
  z-index: 999;
}

</style>
