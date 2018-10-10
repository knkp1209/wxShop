<template>
  <div class="address_list">
    <div class="main">
      <div v-for="(item,i) in addressList" :key="i" @click="choose(item)">
        <div>
          {{item.consignee}}
          {{item.mobile}}
        </div>
        <div class="address">
          {{item.province}}{{item.city}}{{item.county}}&nbsp;{{item.address}}
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="createAddress(2)">新增收货地址</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {},
  computed: {
    ...mapState([
      'addressList',
    ])
  },
  methods: {
    ...mapMutations({
      setAddress: 'SET_ADDRESS',
    }),
    toAddressList(category) {
      let cat = {
        name: category.name,
        id: category.id
      }
      this.$to.n('../goodsList/main?category=' + JSON.stringify(cat))
    },
    createAddress(back) {
      this.$to.n('../editAddress/main?back=' + back)
    },
    choose(item) {
      this.setAddress(item)
      wx.navigateBack()
    }
  }
}

</script>
<style scoped>
.address_list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.address_list .main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  justify-content: space-around;
  margin-bottom: 100rpx;
  padding-bottom: 10rpx;
}

.address_list .main > div {
  margin-bottom: 10rpx;
  margin-left: 10rpx;
  box-shadow: 5rpx 5rpx 1rpx #FF0000;
}

.address_list .main .address  {
  font-size: 30rpx;
}


.address_list .footer {
  position: fixed;
  bottom: 0rpx;
  height: 100rpx;
  width: 100%;
  z-index: 999;
}

.address_list .footer button {
  background: #FF0000;
  width: 60%;
  color: #FFFFFF;
}

</style>
