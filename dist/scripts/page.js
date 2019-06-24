"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 懒加载 开始
 *采用jquery.lazylode.js实现图片的懒加载
 */

/**
*@function $$ 元素选择器（可多选）
* */
var $$ = function $$(selector, all) {
  if (all) {
    return document.querySelectorAll(selector);
  }

  return document.querySelector(selector);
};

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
 * 懒加载结束
 * 页面渲染
 */

/**
  * 楼梯结束
  * 购物车加入5个商品以上开始滚动 start
  */


;

(function () {
  var carLength = $(".car-list").children("li").length;

  if (carLength === 0) {
    $(".car-con").css({
      width: "500px",
      left: "-453px"
    });
  }

  if (carLength > 1) {
    $(".car-con").css({
      width: "520px",
      left: "-473px"
    });
  }

  if (carLength > 5) {
    $(".car-list").css({
      height: "255px"
    });
  }
})();

;

(function () {
  var Pagination =
  /*#__PURE__*/
  function () {
    function Pagination() {
      _classCallCheck(this, Pagination);
    }

    _createClass(Pagination, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.searchList = $$(".search-list");
        this.pagePrev = $$(".page-prev");
        this.pageNext = $$(".page-next");
        this.pageR = $$(".pageR");
        this.pageCou = $$(".page-count");
        this.pageAvg1 = $$(".page-avg1");
        this.pageAvg2 = $$(".page-avg2");
        this.pageAvg3 = $$(".page-avg3");
        this.btnList = [];
        this.renderNum = 20;
        this.page = 1; //购物车数据仓库

        this.sony_carts = this.getCarts("carts");
        this.sony_datail = this.getCarts("detail");
        this.page_total = 0;
        this.getXhr().then(function (res) {
          _this.jsonData = res;

          _this.render();

          _this.renderPageBtn();

          _this.pageAvg1.innerHTML = parseInt(_this.page_total / 3);
          _this.pageAvg2.innerHTML = parseInt(_this.page_total / 2);
          _this.pageAvg3.innerHTML = parseInt(_this.page_total / 1);
          _this.pageCou.innerHTML = _this.page_total;

          _this.bindEvent();

          _this.renderCarts();

          _this.bindEventCarts();
        });
      } //分页事件

    }, {
      key: "bindEvent",
      value: function bindEvent() {
        var _this2 = this;

        this.pagePrev.addEventListener("click", this.prevPage.bind(this));
        this.pageNext.addEventListener("click", this.nextPage.bind(this));
        this.btnList.forEach(function (ele, index) {
          ele.addEventListener("click", _this2.toPage.bind(_this2, index + 1));
        });
        this.pageNext.parentNode.addEventListener("click", this.reRender.bind(this));
      } //添加购物车事件区 statr

    }, {
      key: "bindEventCarts",
      value: function bindEventCarts() {
        $(".mini-car").on("mouseenter", this.renderCartsList.bind(this));
        $(".delete-car").on("click", ".delete", this.removeCartsData.bind(this));
      } //分页按钮被选中渲染

    }, {
      key: "reRender",
      value: function reRender() {
        var _this3 = this;

        this.btnList.forEach(function (ele, index) {
          if (index + 1 === _this3.page) {
            ele.className = "active";
          } else {
            ele.className = "";
          }
        });
        this.render();
      } //上一页

    }, {
      key: "prevPage",
      value: function prevPage() {
        if (this.page === 1) {
          return false;
        } else {
          this.page--;
        }
      } //下一页

    }, {
      key: "nextPage",
      value: function nextPage() {
        if (this.page === this.page_total) {
          return false;
        } else {
          this.page++;
        }
      }
    }, {
      key: "toPage",
      value: function toPage(index) {
        this.page = index;
      } //获取json文件

    }, {
      key: "getXhr",
      value: function getXhr() {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "./sony-music.json");
          xhr.send(null);

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            }
          };
        });
      } //按钮渲染

    }, {
      key: "renderPageBtn",
      value: function renderPageBtn() {
        var returnData = this.jsonData.returnData.OutMasterDatas;
        this.page_total = Math.ceil(returnData.length / this.renderNum);
        var btnWrap = document.createDocumentFragment();

        for (var i = 1; i <= this.page_total; i++) {
          var li = document.createElement("li");
          li.innerHTML = i;

          if (i === this.page) {
            li.className = "active";
          }

          btnWrap.appendChild(li);
          this.btnList.push(li);
        }

        this.pageR.parentNode.insertBefore(btnWrap, this.pageR);
      } //分页数据渲染

    }, {
      key: "render",
      value: function render() {
        var returnData = this.jsonData.returnData.OutMasterDatas;
        var html = "";

        for (var i = this.renderNum * (this.page - 1); i < this.renderNum * this.page; i++) {
          var item = returnData[i];
          if (!item) continue;
          html += " \n                    <div class=\"listCom\">\n                    <h4 class=\"com-title\">".concat(item.status.length === 0 ? "主推型号" : item.status, "</h4>\n                    <div class=\"com-img go-details\" data-id=\"").concat(item.pageid, "\">\n                        <img width=\"230\" height=\"232\"\n                        src=\"./images/loading.gif\"\n                        data-src=\"https://www.sonystyle.com.cn").concat(item.imgurl, "\">\n                    </div>\n                    <div class=\"com-con\">\n                        <div class=\"con-name\">\n                            ").concat(item.longname, "\n                        </div>\n                        <div class=\"con-price\">\n                            <p class=\"fl\">\n                                <span>RMB</span>\n                                <strong class=\"com-price\">").concat(item.memberprice, "</strong>\n                            </p>\n                            <a class=\"fr\" href=\"javascript:void(0)\" class=\"chose_blog\">\u5BF9\u6BD4</a>\n                        </div>\n                    </div>\n                    <div class=\"addCar\" data-id=\"").concat(item.pageid, "\">\n                        <a href=\"javascript:void(0)\">\n                            <img src=\"./images/collect.png\">\n                        </a>\n                        <a href=\"javascript:void(0)\" class=\"add-carts\" >\n                            <img src=\"./images/carit.png\">\n                        </a>\n                    </div>\n                </div>");
        }

        this.searchList.innerHTML = html;
        lazyload(".com-img img");
        this.renderCarts();
        $(".addCar").on("click", ".add-carts", this.addCartsData.bind(this));
        $(".go-details").on("click", this.getShowId.bind(this));
      } //------------------------------添加购物车区start 采用jQuery
      //向购物车中添加商品

    }, {
      key: "addCartsData",
      value: function addCartsData(evt) {
        var e = evt || window.event;
        var target = $(e.currentTarget);
        var optEle = target.parent();
        var id = optEle.attr("data-id");
        console.log(id);
        var hasSameGoods = this.sony_carts.some(function (item) {
          if (item.id == id) {
            item.count++;
            return true;
          }
        });

        if (!hasSameGoods) {
          this.sony_carts.push({
            id: id,
            count: 1
          });
        }

        this.saveData("carts", this.sony_carts);
        console.log(this.sony_carts);
        this.renderCarts();
      } //删除购物车商品

    }, {
      key: "removeCartsData",
      value: function removeCartsData(evt) {
        var _this4 = this;

        var e = evt || window.event;
        var target = $(e.currentTarget);
        var optEle = target.parent();
        var id = optEle.attr("data-id");
        this.sony_carts.some(function (item, index) {
          if (item.id === id) {
            _this4.sony_carts.splice(index, 1);
          }
        });
        console.log(this.sony_carts);
        this.saveData("carts", this.sony_carts);
        this.renderCartsList();
        this.renderCarts();
      } //渲染购物车图标

    }, {
      key: "renderCarts",
      value: function renderCarts() {
        var total = 0;
        this.sony_carts.forEach(function (item) {
          total += item.count;
        });
        $(".car-count").html(total);
        $(".countSum").html(total);
      } //渲染在购物车之中的数据

    }, {
      key: "renderCartsList",
      value: function renderCartsList() {
        var _this5 = this;

        var goodsList = this.jsonData.returnData.OutMasterDatas;
        var renderList = [];
        goodsList.forEach(function (goodsItem) {
          _this5.sony_carts.some(function (items) {
            if (goodsItem.pageid === items.id) {
              goodsItem.count = items.count;
              renderList.push(goodsItem);
              return true;
            }
          });
        });
        var html = "";
        var totalPrice = 0;
        renderList.forEach(function (item) {
          html += "<li>\n                                <img src=\"https://www.sonystyle.com.cn".concat(item.imgurl, "\">\n                                <span class=\"com-name\">").concat(item.shortname, "</span>\n                                <span class=\"com-qty\">X").concat(item.count, "</span>\n                                <div class=\"com-price\">RMB\n                                    <span>").concat(item.count * item.memberprice, "</span></div>\n                                <div data-id=\"").concat(item.pageid, "\" class=\"delete-car fl\"><a href=\"javascript:void(0)\" class=\"delete\">\u5220\u9664</a></div>\n                            </li>");
          totalPrice += item.count * item.memberprice;
        });
        $(".car-list").html(html);
        $(".sum-car").html(totalPrice.toFixed(2));
        this.renderCarts();
        this.bindEventCarts();
      } //保存数据

    }, {
      key: "saveData",
      value: function saveData(type, json) {
        localStorage.setItem(type, JSON.stringify(json));
      } //获取数据 

    }, {
      key: "getCarts",
      value: function getCarts(type) {
        if (localStorage.getItem(type)) {
          return JSON.parse(localStorage.getItem(type));
        } else {
          return [];
        }
      } //阻止冒泡

    }, {
      key: "stopProp",
      value: function stopProp(e) {
        e.stopPropagation();
      }
    }, {
      key: "getShowId",
      value: function getShowId(evt) {
        var _this6 = this;

        var e = evt || window.event;
        var target = $(e.currentTarget);
        var id = target.attr("data-id");
        this.sony_datail.some(function (item, index) {
          _this6.sony_datail.splice(index, 1);
        });
        this.saveData("detail", this.sony_datail);
        console.log(this.sony_datail);
        this.sony_datail.push({
          id: id
        });
        this.saveData("detail", this.sony_datail);
        console.log(this.sony_datail);
        window.location.href = "./details.html";
      } //--------------------------------添加购物车区 end

    }]);

    return Pagination;
  }();

  var pages = new Pagination();
  pages.init();
})();
/**
 * 购物车加入5个商品以上开始滚动
 */


;

(function () {
  var carLength = $(".car-list").children("li").length;

  if (carLength === 0) {
    $(".car-con").css({
      width: "500px",
      left: "-453px"
    });
  }

  if (carLength > 1) {
    $(".car-con").css({
      width: "520px",
      left: "-473px"
    });
  }

  if (carLength > 5) {
    $(".car-list").css({
      height: "255px"
    });
  }
})();