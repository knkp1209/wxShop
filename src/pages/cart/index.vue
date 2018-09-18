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
.search_cion {
  left: 30rpx;
}
.main {
  padding: 0 15rpx 0 15rpx;
}
</style>
