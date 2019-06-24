/**
 * 购物车功能实现
 * 观察者模式
*/
; (function ($) {
    var loadedData = $.Callbacks();
    var addCarts = $.Callbacks();
    var reduceCarts = $.Callbacks();
    var remove = $.Callbacks();
    var sony_carts = getCarts();
    function renderCartsList(res){
        let goodsList = res.returnData.OutMasterDatas;
        var renderList = [];
        goodsList.forEach(goodsItem => {
            sony_carts.some(items => {
                if (goodsItem.pageid === items.id) {
                    goodsItem.count = items.count;
                    renderList.push(goodsItem);
                    return true;
                }
            })
        })
        let html = "";
        let totalPrice = 0;
        let totalsum = 0;
        renderList.forEach(item => {
            html += ` <li class="list-content">
            <div class="cart-name">
                <div class="cart-pic">
                    <img src="https://www.sonystyle.com.cn${item.imgurl}">
                </div>
                <div class="cart-com">
                    <div class="cart-title">
                       ${item.longname}
                    </div>
                </div>
            </div>
            <div class="cart-price">
                <div class="c-price">RMB ${item.memberprice}</div>
            </div>
            <div class="cart-num">
                <div class="num-m" data-id="${item.pageid}">
                    <a href="javascript:void(0)" class="reduce">-</a>
                    <span class="num-p">
                        <input type="text" disabled="disabled" value="${item.count}">
                    </span>
                    <a href="javascript:void(0)" class="add">+</a>
                </div>
            </div>
            <div class="cart-total">
                RMB
                <span class="lt_total">${(item.memberprice * item.count).toFixed(2)}</span>
            </div>
            <div class="cart-opera" data-id="${item.pageid}">
                <a href="javascript:void(0)" class="cp_del">删除</a>
            </div>
        </li>`;
            totalPrice += item.count * item.memberprice;
            totalsum += item.count;
        })
        $(".carts-list").html(html);
        $(".shop-sum1").html(totalPrice.toFixed(2));
        $(".total-sum").html(totalsum);
        $(".num-m").on("click", ".add", addCarts.fire);
        $(".num-m").on("click", ".reduce", reduceCarts.fire);
        $(".cart-opera").on("click", ".cp_del", remove.fire)
    }
    //减少数量
    function reduceCartsData(evt) {
        let e = evt || window.event();
        let target = $(e.currentTarget);
        let optEle = target.parent();
        let id = optEle.attr("data-id");
        sony_carts.some((item, index) => {
            if (item.id === id) {
                item.count--;
                item.count == 0 ? removeCartsData(id, index) : "";
            }
        })
        saveCarts("carts", sony_carts);
       
    }
    function removeCartsData(id, index) {
        sony_carts.splice(index, 1);
        saveCarts("carts", sony_carts);
    }
    function removeCarts(evt) {
        var e = evt || window.event;
        let target = $(e.currentTarget);

    }
    //增加数量
    function addCartsData(evt) {
        let e = evt || window.event();
        let target = $(e.currentTarget);
        let optEle = target.parent();
        let id = optEle.attr("data-id");
        sony_carts.some(item => {
            if (item.id === id) {
                item.count++;
            }
        })
        saveCarts("carts", sony_carts);
    }
    //删除购物车
    function removeCarts(evt) {
        let e = evt || window.event;
        let target = $(e.currentTarget);
        let optEle = target.parent();
        let id = optEle.attr("data-id");
        sony_carts.some((item, index) => {
            if (item.id == id) {
                sony_carts.splice(index, 1);
            }
        })
        saveCarts("carts", sony_carts);
    }
    //阻止冒泡
    function stopProp(e) {
        e.stopPropagation();
    }
    //获取数据
    function getCarts() {
        if (localStorage.getItem("carts")) {
            return JSON.parse(localStorage.getItem("carts"));
        } else {
            return [];
        }
    }
    //保存数据
    function saveCarts(type, json) {
        localStorage.setItem("carts", JSON.stringify(json));
    }
    function init() {
        loadSonyData();
        bindEvent();
    }
    function bindEvent() {
        loadedData.add(renderCartsList);
        addCarts.add([addCartsData,loadSonyData]);
        reduceCarts.add([reduceCartsData,loadSonyData]);
        remove.add([removeCarts,loadSonyData]);
 
    }
    function loadSonyData() {
        fetch("./sony-music.json")
            .then(res => {
                return res.json();
            })
            .then(loadedData.fire);
    }
    $(init)
})(jQuery);