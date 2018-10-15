<template>
  <div class="pay_result">
    <div>
      <div v-if="status == 1">
        <image src="/static/image/pay_success.png" />
        <span>支付成功</span>
      </div>
      <div v-else>
        <image src="/static/image/pay_fail.png" />
        <span>支付失败，去订单页重新支付</span>
      </div>
    </div>
    <div>
      <button @click="toOrder">查看订单</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: '1'
    }
  },
  methods: {
    toOrder() {
      this.$to.n('../order/main?status=undefined')
    }
  },
  onLoad(obj) {
    this.status = obj.status
    console.log(this.status)
  },
}

</script>
<style scoped>
.pay_result div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
}

.pay_result image {
  width: 400rpx;
  height: 400rpx;
}
</style>
