<template style="height: 100%;">
  <div class="user">
    <div class="info" v-if="logged">
      <image :src="userInfo.avatarUrl" />
      <span>{{userInfo.nickName}}</span>
    </div>
    <div class="info" v-else>
      <image src="/static/image/user.png" />
      <span><button @getuserinfo=" login" open-type="getUserInfo" lang="zh_CN">登录</button></span>
    </div>
    <div class="order">
      <div @click="toOrder()">
        <image src="/static/image/all_order.png" />
        <span>全部</span>
      </div>
      <div @click="toOrder(0)">
        <image src="/static/image/wait_pay.png" />
        <span>待付款</span>
      </div>
      <div @click="toOrder(1)">
        <image src="/static/image/wait_product.png" />
        <span>待收货</span>
      </div>
      <div @click="toOrder(2)">
        <image src="/static/image/finished.png" />
        <span>已完成</span>
      </div>
      <div @click="toOrder(3)">
        <image src="/static/image/canceled.png" />
        <span>已取消</span>
      </div>
    </div>
  </div>
</template>
<script>
import login from '../../utils/login'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      logged: false,
    }
  },
  computed: {
    ...mapState([
      'userInfo',
    ])
  },
  methods: {
    login(e) {
      let _this = this
      login(e, _this).then(() => {
        _this.logged = wx.getStorageSync('logged')
      })
    },
    toOrder(status) {
      if (this.logged == false) {
        wx.showToast({
          title: '请先登录再查询订单信息',
          icon: 'none',
          duration: 2000,
        });
      } else {
        this.$to.n('../order/main?status=' + status)
      }
    }
  },
  onLoad(obj) {
    this.logged = wx.getStorageSync('logged')
  },
}

</script>
<style scoped>
.user {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  font-family: "Microsoft YaHei", "Arial", "黑体", "宋体", sans-serif;
  background: #f6f7fb;
  padding-top: 10rpx;
}

.user>div {
  margin: 0 15rpx 10rpx 15rpx;
  padding: 15rpx 0;
  background: #FFFFFF;
}

.user .info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.user .info image {
  flex: 1;
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 15rpx;
  border: 2rpx solid #DCDCDC;
}

.user .info span {
  flex: 3;
  padding-left: 10rpx;
}

.user .info button {
  width: 150rpx;
  height: 80rpx;
  line-height: 80rpx;
  padding-top: 10rpx;
  margin: 0;
}

.user .order {
  display: flex;
}

.user .order div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.user .order div>image {
  width: 80rpx;
  height: 80rpx;
}

.user .order div>span {
  margin-top: 5rpx;
  font-size: 30rpx;
}

</style>
