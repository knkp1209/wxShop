<!--主盒子-->
<template class="container">
  <div>
    <!--左侧栏-->
    <scroll-view class="nav_left" scroll-y style="height: 100%;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
      <div v-for="(item,i) in cateItems" :key="i" :class="[curNav == item.cate_id ? 'active' : '', 'nav_left_items']"  @click="switchRightTab(item.cate_id,i)" data-index="i" data-id="item.cate_id">
        {{item.cate_name}}
      </div>
    </scroll-view>
    <scroll-view class="nav_right" scroll-y style="height: 100%;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
      <!--如果有数据，才遍历项-->
      <div v-if="cateItems[curIndex].ishaveChild">
          <div v-for="(item,i) in cateItems[curIndex].children" :key="i" class="nav_right_items">
            <!--界面跳转 -->
            <navigator url="../../detail/detail}}">
              <image :src="item.image"></image>
              <text>{{item.name}}</text>
            </navigator>
          </div>
      </div>
      <!--如果无数据，则显示数据-->
      <div class="nodata_text" v-else>该分类暂无数据</div>
    </scroll-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      cateItems: [
      {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '洁面皂',
            image: "https://csdnimg.cn/pubfooter/images/csdn_cs_qr.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          },
          {
            child_id: 1,
            name: '洁面皂',
            image: "https://csdnimg.cn/pubfooter/images/csdn_cs_qr.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          },
                    {
            child_id: 1,
            name: '洁面皂',
            image: "https://csdnimg.cn/pubfooter/images/csdn_cs_qr.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          },
          {
            child_id: 1,
            name: '洁面皂',
            image: "https://csdnimg.cn/pubfooter/images/csdn_cs_qr.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "/static/image/me.png"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '洁面皂',
            image: "/static/image/category_selected.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "/static/image/me.png"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '洁面皂',
            image: "/static/image/category_selected.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "/static/image/me.png"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      },
            {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "/static/image/me.png"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '洁面皂',
            image: "/static/image/category_selected.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "/static/image/me.png"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      },
      {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '洁面皂',
            image: "/static/image/category_selected.png"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "/static/image/cart_selected.png"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '气垫bb',
            image: "/static/image/cart_selected.png"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "/static/image/home.png"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "/static/image/home.png"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            name: '淡香水EDT',
            image: "/static/image/me.png"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 1,
    curIndex: 0
    }
  },
  methods: {
    switchRightTab: function (id,i) {
      // 把点击到的某一项，设为当前index  
      this.curNav = id
      this.curIndex = i
    }
  },

  onLoad () {

  }
}
</script>

<style scoped>
page{  
  background: #f5f5f5;  
}  
/*总体主盒子*/  
.container {  
  position: absolute;  
  width: 100%;  
  height: 100%;  
  background-color: #fff;  
  color: #939393; 
}
 /*左侧栏主盒子*/  
.nav_left{  
  /*设置行内块级元素（没使用定位）*/  
  position: absolute;
  top: 0;left: 0;
  width: 25%;  
  height: 100%;  
  /*主盒子设置背景色为灰色*/  
  background: #f5f5f5;  
  text-align: center;  
}  
/*左侧栏list的item*/  
.nav_left .nav_left_items{  
  /*每个高30px*/  
  height: 40px;  
  /*垂直居中*/  
  line-height: 40px;  
  /*再设上下padding增加高度，总高42px*/  
 
  /*只设下边线*/  
  border-bottom: 1px solid #dedede;  
  /*文字14px*/  
  font-size: 14px; 
}  
/*左侧栏list的item被选中时*/  
.nav_left .nav_left_items.active{  
  /*背景色变成白色*/  
  background: white;  
  color: #f0145a; 
}  
/*右侧栏主盒子*/  
.nav_right{  
  /*右侧盒子使用了绝对定位 
  /* */  
  position: absolute;
  top: 0;  
  right: 0;  
  flex: 1;  
  /*宽度75%，高度占满，并使用百分比布局*/  
  width: 75%;  
  height: 100%;  
  padding: 10px;  
  box-sizing: border-box;  
  background: #fff;  
}  
/*右侧栏list的item*/  
.nav_right .nav_right_items{  
  /*浮动向左*/  
  float: left;  
  /*每个item设置宽度是33.33%*/  
  width: 33.33%;  
  height: 120px;  
  text-align: center;  
}  
.nav_right .nav_right_items image{  
  /*被图片设置宽高*/  
  width: 60px;  
  height: 60px;  
  margin-top: 15px;  
}  
.nav_right .nav_right_items text{  
  /*给text设成块级元素*/  
  display: block;  
  margin-top: 15px;  
  font-size: 14px;  
  color: black;
  /*设置文字溢出部分为...*/  
  overflow: hidden;  
  white-space: nowrap;  
  text-overflow: ellipsis;  
} 
.nodata_text
{
  color: black;
  font-size: 14px;  
  text-align: center;  
}

.scroll-view-item {
  background: red;
  height: 500px;
}
</style>