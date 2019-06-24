"use strict";

/**
 * 购物车功能实现
 * 观察者模式
*/
;

(function ($) {
  var loadedData = $.Callbacks();
  var addCarts = $.Callbacks();
  var reduceCarts = $.Callbacks();
  var remove = $.Callbacks();
  var sony_carts = getCarts();

  function renderCartsList(res) {
    var goodsList = res.returnData.OutMasterDatas;
    var renderList = [];
    goodsList.forEach(function (goodsItem) {
      sony_carts.some(function (items) {
        if (goodsItem.pageid === items.id) {
          goodsItem.count = items.count;
          renderList.push(goodsItem);
          return true;
        }
      });
    });
    var html = "";
    var totalPrice = 0;
    var totalsum = 0;
    renderList.forEach(function (item) {
      html += " <li class=\"list-content\">\n            <div class=\"cart-name\">\n                <div class=\"cart-pic\">\n                    <img src=\"https://www.sonystyle.com.cn".concat(item.imgurl, "\">\n                </div>\n                <div class=\"cart-com\">\n                    <div class=\"cart-title\">\n                       ").concat(item.longname, "\n                    </div>\n                </div>\n            </div>\n            <div class=\"cart-price\">\n                <div class=\"c-price\">RMB ").concat(item.memberprice, "</div>\n            </div>\n            <div class=\"cart-num\">\n                <div class=\"num-m\" data-id=\"").concat(item.pageid, "\">\n                    <a href=\"javascript:void(0)\" class=\"reduce\">-</a>\n                    <span class=\"num-p\">\n                        <input type=\"text\" disabled=\"disabled\" value=\"").concat(item.count, "\">\n                    </span>\n                    <a href=\"javascript:void(0)\" class=\"add\">+</a>\n                </div>\n            </div>\n            <div class=\"cart-total\">\n                RMB\n                <span class=\"lt_total\">").concat((item.memberprice * item.count).toFixed(2), "</span>\n            </div>\n            <div class=\"cart-opera\" data-id=\"").concat(item.pageid, "\">\n                <a href=\"javascript:void(0)\" class=\"cp_del\">\u5220\u9664</a>\n            </div>\n        </li>");
      totalPrice += item.count * item.memberprice;
      totalsum += item.count;
    });
    $(".carts-list").html(html);
    $(".shop-sum1").html(totalPrice.toFixed(2));
    $(".total-sum").html(totalsum);
    $(".num-m").on("click", ".add", addCarts.fire);
    $(".num-m").on("click", ".reduce", reduceCarts.fire);
    $(".cart-opera").on("click", ".cp_del", remove.fire);
  } //减少数量


  function reduceCartsData(evt) {
    var e = evt || window.event();
    var target = $(e.currentTarget);
    var optEle = target.parent();
    var id = optEle.attr("data-id");
    sony_carts.some(function (item, index) {
      if (item.id === id) {
        item.count--;
        item.count == 0 ? removeCartsData(id, index) : "";
      }
    });
    saveCarts("carts", sony_carts);
  }

  function removeCartsData(id, index) {
    sony_carts.splice(index, 1);
    saveCarts("carts", sony_carts);
  }

  function removeCarts(evt) {
    var e = evt || window.event;
    var target = $(e.currentTarget);
  } //增加数量


  function addCartsData(evt) {
    var e = evt || window.event();
    var target = $(e.currentTarget);
    var optEle = target.parent();
    var id = optEle.attr("data-id");
    sony_carts.some(function (item) {
      if (item.id === id) {
        item.count++;
      }
    });
    saveCarts("carts", sony_carts);
  } //删除购物车


  function removeCarts(evt) {
    var e = evt || window.event;
    var target = $(e.currentTarget);
    var optEle = target.parent();
    var id = optEle.attr("data-id");
    sony_carts.some(function (item, index) {
      if (item.id == id) {
        sony_carts.splice(index, 1);
      }
    });
    saveCarts("carts", sony_carts);
  } //阻止冒泡


  function stopProp(e) {
    e.stopPropagation();
  } //获取数据


  function getCarts() {
    if (localStorage.getItem("carts")) {
      return JSON.parse(localStorage.getItem("carts"));
    } else {
      return [];
    }
  } //保存数据


  function saveCarts(type, json) {
    localStorage.setItem("carts", JSON.stringify(json));
  }

  function init() {
    loadSonyData();
    bindEvent();
  }

  function bindEvent() {
    loadedData.add(renderCartsList);
    addCarts.add([addCartsData, loadSonyData]);
    reduceCarts.add([reduceCartsData, loadSonyData]);
    remove.add([removeCarts, loadSonyData]);
  }

  function loadSonyData() {
    fetch("./sony-music.json").then(function (res) {
      return res.json();
    }).then(loadedData.fire);
  }

  $(init);
})(jQuery);