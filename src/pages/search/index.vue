<template>
  <div>
    <div class='search'>
      <div class="search_input_icon">
        <div class="search_input">
          <icon class="search_cion" size='20' type='search'></icon>
          <input class="" placeholder="请输入关键字" />
        </div>
      </div>
      <div class='search_button'>搜索</div>
    </div>
    <div class="container main">
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {

  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style scoped>
.search{
  width: 100%;
  position: absolute;
  top: 5rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search_input_icon{
  width: 80%;
}
.search_cion {
  margin: 10rpx 10rpx 10rpx 10rpx;
  position: absolute;
  left: 25rpx;
  z-index: 2;
  width: 20rpx;
  height: 20rpx;
  text-align: center;
}
.search_input {
  border: 2rpx solid #d0d0d0;
  background: white;
  border-radius: 10rpx;
  margin-left: 20rpx;
}
.search_input input{
  margin-left: 60rpx;
  height: 60rpx;
  border-radius: 10rpx;
  font-size: 30rpx;
}
.search_button {
  margin-left: 15rpx;
  width: 15%;
  line-height: 150%;
  text-align: center;
  border: 2rpx solid #d0d0d0;
  border-radius: 10rpx;
}



.main {
  padding: 0 15rpx 0 15rpx;
}
</style>
