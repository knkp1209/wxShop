<template>
  <div class="order">
    <div class="header">
      <span :class="[status == 'all' ? 'active' : '']" @click="fetchOrder()">
        <i>全部</i>
      </span>
      <span :class="[status == 0 ? 'active' : '']" @click="fetchOrder(0)">
        <i>待付款</i>
      </span>
      <span :class="[status == 1 ? 'active' : '']" @click="fetchOrder(1)">
        <i>待收货</i>
      </span>
      <span :class="[status == 2 ? 'active' : '']" @click="fetchOrder(2)">
        <i>已完成</i>
      </span>
      <span :class="[status == 3 ? 'active' : '']" @click="fetchOrder(3)">
        <i>已取消</i>
      </span>
    </div>
    <div class="main" v-if="list.length > 0">
      <div v-for="(order,i) in list" :key="i">
        <div class="right">
          <span v-if="order.status == 0">待付款</span>
          <span v-else-if="order.status == 1">待收货</span>
          <span v-else-if="order.status == 2">已完成</span>
          <span v-else-if="order.status == 3">已取消</span>
        </div>
        <div v-if="order.order_goods.length == 1" class="goods">
          <div>
            <image :src="order.order_goods[0].url" />
          </div>
          <span>{{order.order_goods[0].goods_name}}</span>
        </div>
        <div v-else class="goods">
          <div v-for="(goods,j) in order.order_goods" :key="j">
            <image :src="goods.url" />
          </div>
        </div>
        <div class="right">
          共{{order.order_goods.length}}件商品，实付款<span>￥{{order.order_total}}</span>
        </div>
        <div class="right">
          <button v-if="order.status == 0" @click="rePay(order.id)">去支付</button>
          <button v-else-if="order.status == 1" @click="un">查看物流</button>
          <button v-else-if="order.status == 2" @click="un">再次购买</button>
          <button v-else-if="order.status == 3" @click="un">再次购买</button>
        </div>
      </div>
    </div>
    <div v-else style="text-align: center;">
      <span>暂无数据</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: 'all',
      list: []
    }
  },
  methods: {
    fetchData(status = false) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      let url = 'order'
      if (status !== false) {
        url += '/' + status
      }
      this.$http.get({
        url: url,
      }).then((res) => {
        console.log(res)
        this.list = res.data.result
      }).catch((res) => {
        console.log(res)
      }).finally((res) => {
        wx.hideLoading()
      })
    },
    rePay(order_id) {
      this.$http.put({
        url: 'order/repay/' + order_id,
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
    },
    fetchOrder(status) {
      if (status == undefined) {
        this.status = 'all'
        this.fetchData()
      } else {
        this.status = status
        this.fetchData(status)
      }
    },
    un() {
      wx.showToast({
        title: '该功能尚没开发完成，敬请期待！',
        icon: 'none',
        duration: 1000,
      });
    }
  },
  onLoad(obj) {
    if (obj.status == 'undefined') {
      this.fetchData()
    } else {
      this.status = obj.status
      this.fetchData(obj.status)
    }
  },
}

</script>
<style scoped>
.order {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  font-family: "Microsoft YaHei", "Arial", "黑体", "宋体", sans-serif;
}

.order .header {
  height: 50rpx;
  background: #FFFFFF;
  display: flex;
  padding: 5rpx 10rpx;
  justify-content: space-between;
  background: #FFFFFF;
  border-bottom: 1rpx solid #DCDCDC;
}

.order .header span {
  height: 50rpx;
}

.order .header span>i {
  height: 40rpx;
  line-height: 40rpx;
  font-size: 30rpx;
}

.order .header .active {
  color: #FF0000;
  border-bottom: 6rpx solid #FF0000;
}


.order .main {
  background: #f6f7fb;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  font-size: 30rpx;
}


.order .main>div {
  margin: 10rpx 0rpx;
  background: #FFFFFF;
}

.order .main .right {
  text-align: right;
  padding: 0 30rpx;
}

.order .main .right>button {
  /*width: 200rpx;*/
  height: 50rpx;
  line-height: 50rpx;
  color: #FF0000;
  background: #FFFFFF;
  padding: 0rpx 25rpx;
  margin-right: 0;
  border-radius: 30rpx;
  border: 1rpx solid #FF0000;
  display: inline-block;
  font-size: 30rpx;
  text-align: center;
  /*    
  text-decoration: none;
  
  */
}


.order .main .goods {
  display: flex;
  background: #f6f7fb;
  padding: 10rpx 10rpx;
}

.order .main .goods div {
  height: 150rpx;
  width: 150rpx;
  background: #FFFFFF;
  border-radius: 15rpx;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15rpx;
}

.order .main .goods image {
  height: 100rpx;
  width: 100rpx;
  border-radius: 15rpx;

}

.order .main .goods span {
  flex: 3;
  margin-left: 20rpx;
}

</style>
