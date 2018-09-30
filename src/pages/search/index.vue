<template>
  <div>
    <div class='search'>
      <div class="search_input_icon">
        <div class="search_input">
          <icon class="search_cion" size='20' type='search'></icon>
          <input class="" placeholder="请输入你要找的商品" auto-focus v-model="keyword" />
        </div>
      </div>
      <div class='search_button' @click="search">搜索</div>
    </div>
    <div class="container main">
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      if (this.keyword == '') {
        wx.showToast({
          title: '请输入你要找的商品',
          icon: 'none',
          duration: 1500,
        });
      } else {
        this.$to.r('../goodsList/main?keyword=' + this.keyword)
      }
    }
  },
  onLoad(obj) {
    if (obj.keyword) {
      this.keyword = obj.keyword
    }
  },
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
