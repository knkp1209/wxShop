<template>
  <div class="pay">
    <div class="main">
      <div class="address">
        <div v-if="address" @click="toAddressList">
          <div class="consignee">
            {{address.consignee}}
            {{address.mobile}}
          </div>
          <div>
            {{address.province}}{{address.city}}{{address.county}}&nbsp;{{address.address}}
          </div>
        </div>
        <div v-else>
          <button @click="createAddress(1)">新增收货地址</button>
        </div>
      </div>
      <div class="goods_list">
        <div :key="i" v-for="(item,i) in goods_list">
          <div class="left">
            <image :src="item.url" />
          </div>
          <div class="right">
            <span class="title">
              {{item.goods_name}}
            </span>
            <div class="spec">
              <span v-for="(item,j) in item.spec" :key="j">{{j}}:{{item}}</span>
            </div>
            <div class="p_q">
              <span class="sell_price">￥{{item.sell_price}}</span>
              <span>X {{item.quantity}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <label>
          留言：
        </label>
        <input type="text" v-model="remark" placeholder="留言给卖家">
      </div>
      <div class="count">
        <div>
          <span>
            商品金额
          </span>
          <span>
            ￥{{goods_total}}
          </span>
        </div>
        <div>
          <span>
            运费
          </span>
          <span>
            ￥{{freight_fee}}
          </span>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>
        ￥{{order_total}}
      </span>
      <form @submit="submit" report-submit='true'>
        <button form-type="submit">提交订单</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      post_goods_list: [],
      goods_list: [],
      freight_fee: '0.00',
      goods_total: '0.00',
      order_total: '0.00',
      remark: '',
      onLoad: true,
    }
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
        url: 'consignee',
      }).then((res) => {
        this.setAddressList(res.data.result)
        if (this.addressList.length > 0) {
          this.setAddress(this.addressList[0])
        } else {
          this.setAddress(null)
        }
        this.fetchCount()
      }).catch((res) => {
        console.log(res)
      })
    },
    fetchCount() {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      let data = {
        goods_list: this.post_goods_list,
        address_id: this.address == null ? null : this.address.id
      }
      this.$http.post({
        url: 'order/count',
        data: data,
      }).then((res) => {
        let data = res.data.result
        let temp = data.goods_list
        for (let i in temp) {
          if (temp[i]['spec'] != '') {
            temp[i]['spec'] = JSON.parse(temp[i]['spec'])
          }
        }
        this.freight_fee = data.freight_fee
        this.goods_total = data.goods_total
        this.order_total = data.order_total
        this.goods_list = temp
        wx.hideLoading()
      }).catch((res) => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000,
        });
      })
    },
    toAddressList() {
      this.$to.n('../addressList/main')
    },
    createAddress(back) {
      this.$to.n('../editAddress/main?back=' + back)
    },
    submit(e) {
      if (this.address == null) {
        wx.showToast({
          title: '请选择收货地址',
          icon: 'none',
          duration: 500,
        });
        return false;
      }
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      let data = {
        goods_list: this.post_goods_list,
        address_id: this.address.id,
        formId: e.target.formId,
        remark: this.remark
      }
      this.$http.post({
        url: 'order/pay',
        data: data,
      }).then((res) => {
        let result = res.data.result
        let _this = this
        wx.requestPayment({
          timeStamp: result.timeStamp,
          nonceStr: result.nonceStr,
          package: result.package,
          signType: result.signType,
          paySign: result.paySign,
          success(res) {
            _this.$to.r('../payResult/main?status=1')
          },
          fail(res) {
            _this.$to.r('../payResult/main?status=0')
          }
        })
      }).catch((res) => {
        console.log('yang')
        console.log(res)
      }).finally(() => {
        wx.hideLoading()
      })
    }
  },
  onShow() {
    if (!this.onLoad) {
      this.fetchCount()
    }
    this.onLoad = false
  },
  onLoad(obj) {
    this.onLoad = true
    this.fetchData()
    this.post_goods_list = JSON.parse(obj.goods_list)
    console.log(this.goods_list)
  },
}

</script>
<style scoped>
.pay {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Microsoft YaHei", "Arial", "黑体", "宋体", sans-serif;
}

.pay .main {
  background: #f6f7fb;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin-bottom: 100rpx;
  font-size: 30rpx;
}

.pay .main>div {
  margin: 10rpx 10rpx;
  background: #FFFFFF;
}

.pay .main .address {
  border-bottom: 6rpx dashed red;
}

.pay .main .address .consignee {
  font-size: 40rpx;
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
  display: flex;
  flex-direction: column;
}

.pay .main .goods_list>div {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 180rpx;
  margin: 5rpx 5rpx;
  background: #fcfcfe;
}

.pay .main .goods_list .left {
  flex: 1;
  overflow: hidden;
}

.pay .main .goods_list image {
  width: 170rpx;
  height: 170rpx;
  border-radius: 10rpx;
}

.pay .main .goods_list .right {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.pay .main .goods_list .right .title {
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 80rpx;
}

.pay .main .goods_list .right .spec {
  height: 40rpx;
  line-height: 40rpx;
}

.pay .main .goods_list .right .spec>span {
  display: inline-block;
  margin: 0 5rpx;
  font-size: 25rpx;
  text-align: center;
  color: #737577;
}



.pay .main .goods_list .right .p_q {
  height: 50rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8rpx 10rpx 0 0;
}

.pay .main .goods_list .right .p_q .sell_price {
  color: #f04827;
  text-align: left;
}


.pay .main .remark {
  display: flex;
  align-items: center;
}

.pay .main .remark input {
  flex: 3;
  font-size: 26rpx;
}

.pay .main .count>div {
  display: flex;
  justify-content: space-between;
}

.pay .footer {
  position: fixed;
  bottom: 0rpx;
  height: 100rpx;
  width: 100%;
  background: black;
  z-index: 999;
  display: flex;
}

.pay .footer span {
  flex: 2;
  background: #FFFFFF;
  padding-left: 10rpx;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  line-height: 99rpx;
  height: 99rpx;
  border-top: 1rpx solid #DCDCDC;
  color: #f04827;
}

.pay .footer button {
  height: 100%;
  width: 100%;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 0rpx;
  background-color: #f44336;
}

.pay .footer form {
  flex: 1;
}

</style>
