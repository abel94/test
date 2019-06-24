"use strict";

/**
 * 懒加载 开始
 *采用jquery.lazylode.js实现图片的懒加载
 */
;

(function () {
  $(function () {
    $("img").lazyload({
      //距离屏幕200像素开始加载
      threshold: 200,
      //采用特效渐入
      effect: "fadeIn"
    });
  });
})();
/**
 * jquery插件懒加载 end 
 * 渲染进入详情页 start
 * */


;

(function ($) {
  var loadedData = $.Callbacks();
  var addCarts = $.Callbacks();
  var addCount = $.Callbacks();
  var reduceCount = $.Callbacks();
  var getId = getCarts("detail");
  var sony_data = getCarts("carts");

  function init() {
    loadSonyData();
    bindEvent();
  }

  function showDetail(res) {
    var goodsList = res.returnData.OutMasterDatas;
    var renderList = [];
    var html = "";
    goodsList.some(function (item) {
      if (item.pageid == getId[0].id) {
        renderList = item;
        return true;
      }
    });
    html = "\n            <div class=\"pro-main\">\n            <div class=\"main-left\">\n                <div class=\"main-img\">\n                    <img width=\"536\" height=\"536\"\n                        src=\"https://www.sonystyle.com.cn".concat(renderList.imgurl, "\">\n                </div>\n                <div class=\"img-nav\">\n                    <span class=\"nav-left\"></span>\n                    <ul>\n                        <li>\n                            <img width=\"64\" height=\"64\"\n                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_rb.jpg\">\n                        </li>\n                        <li>\n                            <img width=\"64\" height=\"64\"\n                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_1.jpg.thumb.64.64.png\">\n                        </li>\n                        <li>\n                            <img width=\"64\" height=\"64\"\n                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_2.jpg.thumb.64.64.png\">\n                        </li>\n                        <li>\n                            <img width=\"64\" height=\"64\"\n                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_3.jpg.thumb.64.64.png\">\n                        </li>\n                        <li>\n                            <img width=\"64\" height=\"64\"\n                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_4.jpg.thumb.64.64.png\">\n                        </li>\n                    </ul>\n                    <span class=\"nav-right\"></span>\n                </div>\n            </div>\n            <div class=\"main-right\">\n                <h1 class=\"mp-name\">").concat(renderList.longname, "</h1>\n                <div class=\"mp-desc\">").concat(renderList.desc, "</div>\n                <div class=\"mp-buy\">\n                    <div class=\"mp-price\">\n                        <p class=\"tn fl\">\u4EF7\u683C</p>\n                        <span class=\"price fl\">RMB ").concat(renderList.defaultprice, ".00</span>\n                    </div>\n                    <div class=\"zx\">\n                        <p class=\"tn fl\">\u5C0A\u4EAB\u4EF7</p>\n                        <span class=\"reg\">RMB  ").concat(renderList.memberprice, ".00</span>\n                        <span class=\"czz\">\u53EF\u83B71\u500D\u6210\u957F\u503C</span>\n                    </div>\n                </div>\n                <div class=\"select-zone\">\n                    <div class=\"spec-z\">\n                        <p class=\"tn1 fl\">\u89C4\u683C</p>\n                        <div class=\"t-con\">\n                            <ul>\n                                <li>\n                                    <a href=\"javascript:void(0)\" rel=\"nofollow\" class=\"cur\">").concat(renderList.shortname, "</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class=\"color-z\">\n                        <p class=\"tn1 fl\">\u989C\u8272</p>\n                        <div class=\"t-con colorli\">\n                            <ul>\n                                <li>\n                                    <img\n                                        src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/yellow/color_icon_yellow_30x30.gif\">\n                                    <strong>\u9EC4\u8272</strong>\n                                </li>\n                                <li>\n                                    <a href=\"javascript:void(0)\">\n                                        <span>\n                                            <img\n                                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/black/color_icon_black_30x30.gif\">\n                                            <strong>\u9ED1\u8272</strong>\n                                        </span>\n                                    </a>\n                                </li>\n                                <li>\n                                    <a href=\"javascript:void(0)\">\n                                        <span>\n                                            <img\n                                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/white/color_icon_milkywhite_30x30.gif\">\n                                            <strong>\u767D\u8272</strong>\n                                        </span>\n                                    </a>\n                                </li>\n                                <li>\n                                    <a href=\"javascript:void(0)\" class=\"cur\">\n                                        <span>\n                                            <img\n                                                src=\"https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/pink/color_icon_palepink_30x30.gif\">\n                                            <strong>\u7C89\u7EA2\u8272</strong>\n                                        </span>\n                                    </a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class=\"num-z\">\n                        <p class=\"tn1 fl\">\u6570\u91CF</p>\n                        <div class=\"t-con\">\n                            <div class=\"num-m\">\n                                <a href=\"javascript:void(0)\" class=\"reduce\">-</a>\n                                <span class=\"num-p\">\n                                    <input type=\"text\" class=\"countValue\" value=\"1\">\n                                </span>\n                                <a href=\"javascript:void(0)\" class=\"add\">+</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"sc-add\" data-id=\"").concat(renderList.pageid, "\">\n                    <a href=\"javascript:void(0)\" class=\"buybtn\">\n                        <img src=\"https://www.sonystyle.com.cn/etc/designs/sonystyle/images/buybutton/button_cartaddition_big.png\">\n                    </a>\n                    <a href=\"javascript:void(0)\" class=\"addwish\">\n                        <img src=\"https://www.sonystyle.com.cn/etc/designs/sonystyle/images/addwish.png\"></a>\n                    </div>\n                </div>\n            </div>");
    $(".product-main").html(html); // lazyload(".com-img img");

    $(".sc-add").on("click", ".buybtn", addCarts.fire);
    $(".reduce").on("click", reduceCount.fire);
    $(".add").on("click", addCount.fire);
  } //保存数据


  function saveData(type, json) {
    localStorage.setItem(type, JSON.stringify(json));
  } //获取数据 


  function getCarts(type) {
    if (localStorage.getItem(type)) {
      return JSON.parse(localStorage.getItem(type));
    } else {
      return [];
    }
  } //删除临时数据


  function removeDetails() {
    getId.some(function (item, index) {
      if (item.id === renderList.pageid) {
        getId.splice(index, 1);
      }
    });
    saveData("detail", getId);
  }

  function reduceCartsCount() {
    var countValue = $(".countValue").val();
    countValue--;

    if (countValue == 0) {
      alert("不能再少了！！！");
      return;
    }

    $(".countValue").val(countValue);
  }

  function addCartsCount() {
    var countValue = $(".countValue").val();
    countValue++;
    $(".countValue").val(countValue);
  }

  function addCartsData(evt) {
    var e = evt || window.event;
    var target = $(e.currentTarget);
    var optEle = target.parent();
    var id = optEle.attr("data-id");
    var countValue = $(".countValue").val();
    console.log(countValue);
    var hasSameGoods = sony_data.some(function (item) {
      if (item.id == id) {
        item.count = parseInt(countValue) + parseInt(item.count);
        return true;
      }
    });

    if (!hasSameGoods) {
      sony_data.push({
        id: id,
        count: countValue
      });
    }

    saveData("carts", sony_data);
    console.log(sony_data);
  }

  function bindEvent() {
    loadedData.add(showDetail);
    addCarts.add([addCartsData, loadSonyData]);
    addCount.add([addCartsCount]);
    reduceCount.add(reduceCartsCount);
  }

  function loadSonyData() {
    fetch("./sony-music.json").then(function (res) {
      return res.json();
    }).then(loadedData.fire);
  }

  $(init);
})(jQuery);
/**
 * 渲染进入详情页 end
 * 顶部点击事件（查看更多商品） start
 * */


;

(function () {
  $(".trigger-nav").on("click", showShop);

  function showShop() {
    $(".product-nav").slideDown("slow");
    $(".trigger-nav").css({
      display: "none"
    });
    $(".trigger-nav-out").fadeIn("100");
  }

  $(".trigger-nav-out").on("click", noneShop);

  function noneShop() {
    $(".trigger-nav-out").css({
      display: "none"
    });
    $(".product-nav").slideUp("slow");
    $(".trigger-nav").fadeIn("300");
  }
})();
/**
 * 渲染进入详情页 end
 * 顶部点击事件（查看更多商品） end
 * */