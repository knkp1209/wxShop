<template>
  <div class="editAddress">
    <div>
      <label>收货人</label>
      <input type="text" v-model="consignee" placeholder="姓名" auto-focus />
    </div>
    <div>
      <label>电话号码</label>
      <input type="number" v-model="mobile" placeholder="11位手机号码" />
    </div>
    <picker mode="region" v-model="region" @change="choose">
      <div class="picker">
        <label>地区信息</label>
        <span>{{area}}</span>
      </div>
    </picker>
    <div>
      <label>
        详细地址
      </label>
      <input type="text" v-model="address" placeholder="详细地址">
    </div>
    <div class="footer">
      <button @click="save">保存</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      back: 1,
      id: 0,
      address: null,
      region: [],
      consignee: '',
      mobile: '',
      codes: '',
      area: '请选择地区',
    }
  },
  computed: {
    ...mapState([
      'addressList'
    ])
  },
  methods: {
    ...mapMutations({
      setAddressList: 'SET_ADDRESS_LIST',
      setAddress: 'SET_ADDRESS'
    }),
    choose(e) {
      this.region = e.target.value
      this.codes = e.target.code
      this.area = ''
      for (let i in e.target.value) {
        this.area += e.target.value[i]
      }
    },
    save() {
      if (this.consignee == '') {
        wx.showToast({
          icon: 'none',
          title: '收货人不能为空',
          duration: 1000
        });
        return;
      }
      if (this.mobile.length != 11) {
        wx.showToast({
          icon: 'none',
          title: '电话长度必须为11位',
          duration: 1000
        })
        return;
      }
      if (this.region.length == 0) {
        wx.showToast({
          icon: 'none',
          title: '请选择地区',
          duration: 1000
        })
      }
      if (this.address == null || this.address.length == 0 || this.address.length > 50) {
        wx.showToast({
          icon: 'none',
          title: '请填写详细地址且长度不在大于50个字符',
          duration: 1000
        })
        return;
      }
      this.submit()
    },
    submit() {
      this.$http.post({
        url: 'consignee',
        data: {
          id: this.id,
          consignee: this.consignee,
          mobile: this.mobile,
          codes: this.codes,
          region: this.region,
          address: this.address
        }
      }).then((res) => {
        this.setAddressList(this.addressList.concat(res.data.result))
        this.setAddress(res.data.result)
        if (this.back == 2) {
          wx.navigateBack({
            delta: 2
          })
        } else {
          wx.navigateBack()
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    init() {
      this.back = 1
      this.id = 0
      this.address = null
      this.region = []
      this.consignee = ''
      this.mobile = ''
      this.codes = ''
      this.area = '请选择地区'
    }
  },
  onPullDownRefresh() {
    this.fetchData()
  },
  onLoad(e) {
    this.init()
    this.back = e.back
  },
}

</script>
<style scoped>
.editAddress {
  display: flex;
  flex-flow: column;
  margin: 20rpx;
}

.editAddress div {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  margin: 0 20rpx;
  padding: 20rpx 0;
  align-items: center;
  border-bottom: 1rpx solid #DCDCDC;
}

.editAddress div label {
  flex: 1;
  vertical-align: middle;
}

.editAddress div input {
  flex: 3;
}

.editAddress div span {
  flex: 3;
}

.editAddress .footer {
  width: 100%;
  position: fixed;
  bottom: 15rpx;
  border: none;
  text-align: center;
  margin: 0;
}

.editAddress .footer button {
  background: #FF0000;
  width: 60%;
  color: #FFFFFF;
}

</style>
