require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([4],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(16);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_66cd6e9e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(19);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(17)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-66cd6e9e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_66cd6e9e_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\home\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66cd6e9e", Component.options)
  } else {
    hotAPI.reload("data-v-66cd6e9e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 17:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
      hot: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000
    };
  },

  methods: {},

  created: function created() {
    var http_obj = {};
    wx.request({
      //仅为示例，并非真实的接口地址
      url: 'https://www.newdreamvip.com/house/agent',
      method: 'post',
      data: http_obj.data != undefined ? http_obj.data : {},
      header: {
        'applet-id': 6,
        //设置参数内容类型为json
        'content-type': 'application/json'
      },
      success: function success(res) {
        console.log(res.data);
      }
    });
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
});

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('swiper', {
    staticClass: "sw_banner",
    attrs: {
      "indicator-dots": _vm.indicatorDots,
      "autoplay": _vm.autoplay,
      "interval": _vm.interval,
      "duration": _vm.duration
    }
  }, _vm._l((_vm.imgUrls), function(item, i) {
    return _c('swiper-item', {
      key: i,
      attrs: {
        "mpcomid": '0-' + i
      }
    }, [_c('image', {
      staticClass: "sw_banner",
      attrs: {
        "src": _vm.imgUrls[i]
      }
    })])
  })), _vm._v(" "), _c('a', {
    staticClass: "search",
    attrs: {
      "href": "/pages/search/main?text=123"
    }
  }, [_c('div', {
    staticClass: "search_input_icon"
  }, [_c('div', {
    staticClass: "search_input"
  }, [_c('icon', {
    staticClass: "search_cion",
    attrs: {
      "size": "20",
      "type": "search"
    }
  }), _vm._v(" "), _c('input', {
    attrs: {
      "placeholder": "搜索"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "container main"
  }, [_c('div', {
    staticClass: "category"
  }, [_c('swiper', {
    staticClass: "sw_cat",
    attrs: {
      "indicator-dots": _vm.indicatorDots,
      "interval": _vm.interval,
      "duration": _vm.duration
    }
  }, _vm._l((_vm.imgUrls), function(item, i) {
    return _c('swiper-item', {
      key: i,
      attrs: {
        "mpcomid": '1-' + i
      }
    }, [_c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类1")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类分类")])], 1), _vm._v(" "), _c('span', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    }), _c('p', [_vm._v("分类分类1")])], 1)])
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "notify"
  }, [_c('p', {
    staticClass: "news"
  }, [_vm._v("新闻资讯")]), _vm._v(" "), _c('swiper', {
    staticClass: "sw_notify",
    attrs: {
      "interval": _vm.interval,
      "duration": _vm.duration,
      "vertical": "true",
      "autoplay": "true"
    }
  }, _vm._l((_vm.imgUrls), function(item, i) {
    return _c('swiper-item', {
      key: i,
      attrs: {
        "mpcomid": '2-' + i
      }
    }, [_c('span', [_vm._v("通知")])])
  })), _vm._v(" "), _c('p', {
    staticClass: "more"
  }, [_vm._v("更多")])], 1), _vm._v(" "), _vm._l((_vm.imgUrls), function(xxx, j) {
    return _c('div', {
      key: _vm.i,
      staticClass: "three"
    }, [_c('p', {
      staticClass: "three_title"
    }, [_vm._v("热卖")]), _vm._v(" "), _c('scroll-view', {
      staticClass: "scroll-view_H",
      staticStyle: {
        "width": "100%"
      },
      attrs: {
        "scroll-x": ""
      }
    }, _vm._l((_vm.hot), function(item, i) {
      return _c('div', {
        key: i,
        staticClass: "scroll-view-item_H",
        attrs: {
          "id": "green"
        }
      }, [_c('image', {
        attrs: {
          "src": _vm.hot[i]
        }
      }), _vm._v(" "), _c('text', {
        staticClass: "goods_title"
      }, [_vm._v("这是商品标题1这是商品标题1这是商品标题1这是商品标题1")]), _vm._v(" "), _c('div', {
        staticClass: "price"
      }, [_c('span', {
        staticClass: "sell"
      }, [_c('text', [_vm._v("￥12.9")])]), _vm._v(" "), _c('span', {
        staticClass: "original"
      }, [_c('text', [_vm._v("￥10.9")])])])])
    }))], 1)
  }), _vm._v(" "), _vm._l((_vm.imgUrls), function(item, i) {
    return _c('div', {
      key: i,
      staticClass: "one"
    }, [_c('div', {
      staticClass: "left"
    }, [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    })]), _vm._v(" "), _vm._m(0, true)])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "two"
  }, _vm._l((_vm.imgUrls), function(item, i) {
    return _c('div', {
      key: i,
      staticClass: "deuce"
    }, [_c('div', [_c('image', {
      attrs: {
        "src": _vm.imgUrls[i]
      }
    })]), _vm._v(" "), _c('text', {
      staticClass: "goods_title"
    }, [_vm._v("这是商品标题1这是商品标题1这是商品标题1这是商标题1这是商品标题1这是商品标题1")]), _vm._v(" "), _vm._m(1, true)])
  }))])], 1)
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "right"
  }, [_c('text', {
    staticClass: "goods_title"
  }, [_vm._v("这是商品标题1这是商品标题1这是商品标题1这是商标题1这是商品标题1这是商品标题1")]), _vm._v(" "), _c('div', {
    staticClass: "price m_top_150rpx"
  }, [_c('span', {
    staticClass: "sell"
  }, [_c('text', [_vm._v("￥12.9")])]), _vm._v(" "), _c('span', {
    staticClass: "original"
  }, [_c('text', [_vm._v("￥10.9")])])])])
},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "price"
  }, [_c('span', {
    staticClass: "sell"
  }, [_c('text', [_vm._v("￥12.9")])]), _vm._v(" "), _c('span', {
    staticClass: "original"
  }, [_c('text', [_vm._v("￥10.9")])])])
}]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-66cd6e9e", esExports)
  }
}

/***/ })

},[15]);
//# sourceMappingURL=main.js.map