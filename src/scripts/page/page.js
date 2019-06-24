/**
 * 懒加载 开始
 *采用jquery.lazylode.js实现图片的懒加载
 */
/**
*@function $$ 元素选择器（可多选）
* */
let $$ = (selector, all) => {
    if (all) {
        return document.querySelectorAll(selector);
    }
    return document.querySelector(selector);
}
    ; (function () {
        $(function () {
            $("img").lazyload({
                //距离屏幕200像素开始加载
                threshold: 200,
                //采用特效渐入
                effect: "fadeIn",
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
; (function () {
    let carLength = $(".car-list").children("li").length;
    if (carLength === 0) {
        $(".car-con").css({
            width: "500px",
            left: "-453px"
        })
    }
    if (carLength > 1) {
        $(".car-con").css({
            width: "520px",
            left: "-473px"
        })
    }
    if (carLength > 5) {
        $(".car-list").css({
            height: "255px"
        })
    }
})();
; (function () {
    class Pagination {
        constructor() { }
        init() {
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
            this.page = 1;
            //购物车数据仓库
            this.sony_carts = this.getCarts("carts");
            this.sony_datail = this.getCarts("detail");
            this.page_total = 0;
            this.getXhr().then((res) => {
                this.jsonData = res;
                this.render();
                this.renderPageBtn();
                this.pageAvg1.innerHTML = parseInt(this.page_total / 3);
                this.pageAvg2.innerHTML = parseInt(this.page_total / 2);
                this.pageAvg3.innerHTML = parseInt(this.page_total / 1);
                this.pageCou.innerHTML = this.page_total;
                this.bindEvent();
                this.renderCarts();
                this.bindEventCarts();
            });
        }
        //分页事件
        bindEvent() {
            this.pagePrev.addEventListener("click", this.prevPage.bind(this));
            this.pageNext.addEventListener("click", this.nextPage.bind(this));
            this.btnList.forEach((ele, index) => {
                ele.addEventListener("click", this.toPage.bind(this, index + 1));
            })
            this.pageNext.parentNode.addEventListener("click", this.reRender.bind(this));
        }
        //添加购物车事件区 statr
        bindEventCarts() {
            $(".mini-car").on("mouseenter", this.renderCartsList.bind(this));
            $(".delete-car").on("click", ".delete", this.removeCartsData.bind(this));
        }
        //分页按钮被选中渲染
        reRender() {
            this.btnList.forEach((ele, index) => {
                if (index + 1 === this.page) {
                    ele.className = "active";
                } else {
                    ele.className = "";
                }
            })
            this.render();
        }
        //上一页
        prevPage() {
            if (this.page === 1) {
                return false;
            } else {
                this.page--;
            }
        }
        //下一页
        nextPage() {
            if (this.page === this.page_total) {
                return false;
            } else {
                this.page ++;
            }
        }
        toPage(index) {
            this.page = index;
        }
        //获取json文件
        getXhr() {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "./sony-music.json");
                xhr.send(null);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
            })
        }
        //按钮渲染
        renderPageBtn() {
            let returnData = this.jsonData.returnData.OutMasterDatas;
            this.page_total = Math.ceil(returnData.length / this.renderNum);
            let btnWrap = document.createDocumentFragment();
            for (var i = 1; i <= this.page_total; i++) {
                let li = document.createElement("li");
                li.innerHTML = i;
                if (i === this.page) {
                    li.className = "active";
                }
                btnWrap.appendChild(li);
                this.btnList.push(li);
            }
            this.pageR.parentNode.insertBefore(btnWrap, this.pageR);
        }
        //分页数据渲染
        render() {
            let returnData = this.jsonData.returnData.OutMasterDatas;
            var html = "";
            for (var i = this.renderNum * (this.page - 1); i < this.renderNum * this.page; i++) {
                let item = returnData[i];
                if (!item) continue;
                html += ` 
                    <div class="listCom">
                    <h4 class="com-title">${item.status.length === 0 ? "主推型号" : item.status}</h4>
                    <div class="com-img go-details" data-id="${item.pageid}">
                        <img width="230" height="232"
                        src="./images/loading.gif"
                        data-src="https://www.sonystyle.com.cn${item.imgurl}">
                    </div>
                    <div class="com-con">
                        <div class="con-name">
                            ${item.longname}
                        </div>
                        <div class="con-price">
                            <p class="fl">
                                <span>RMB</span>
                                <strong class="com-price">${item.memberprice}</strong>
                            </p>
                            <a class="fr" href="javascript:void(0)" class="chose_blog">对比</a>
                        </div>
                    </div>
                    <div class="addCar" data-id="${item.pageid}">
                        <a href="javascript:void(0)">
                            <img src="./images/collect.png">
                        </a>
                        <a href="javascript:void(0)" class="add-carts" >
                            <img src="./images/carit.png">
                        </a>
                    </div>
                </div>`;
            }
            this.searchList.innerHTML = html;
            lazyload(".com-img img");
            this.renderCarts();
            $(".addCar").on("click", ".add-carts", this.addCartsData.bind(this));
            $(".go-details").on("click" , this.getShowId.bind(this));
        }
        //------------------------------添加购物车区start 采用jQuery
        //向购物车中添加商品
        addCartsData(evt) {
            let e = evt || window.event;
            let target = $(e.currentTarget);
            let optEle = target.parent();
            let id = optEle.attr("data-id");
            console.log(id);
            let hasSameGoods = this.sony_carts.some(item => {
                if (item.id == id) {
                    item.count++;
                    return true;
                }
            })
            if (!hasSameGoods) {
                this.sony_carts.push({
                    id: id,
                    count: 1
                })
            }
            this.saveData("carts", this.sony_carts);
            console.log(this.sony_carts);
            this.renderCarts();
        }
        //删除购物车商品
        removeCartsData(evt) {
            let e = evt || window.event;
            let target = $(e.currentTarget);
            let optEle = target.parent();
            let id = optEle.attr("data-id");
            this.sony_carts.some((item, index) => {
                if (item.id === id) {
                    this.sony_carts.splice(index, 1);
                }
            })
            console.log(this.sony_carts);
            this.saveData("carts", this.sony_carts);
            this.renderCartsList();
            this.renderCarts();
        }
        //渲染购物车图标
        renderCarts() {
            let total = 0;
            this.sony_carts.forEach(item => {
                total += item.count;
            })
            $(".car-count").html(total);
            $(".countSum").html(total);
        }
        //渲染在购物车之中的数据
        renderCartsList() {
            let goodsList = this.jsonData.returnData.OutMasterDatas;
            var renderList = [];
            goodsList.forEach(goodsItem => {
                this.sony_carts.some(items => {
                    if (goodsItem.pageid === items.id) {
                        goodsItem.count = items.count;
                        renderList.push(goodsItem);
                        return true;
                    }
                })
            })
            let html = "";
            let totalPrice = 0;
            renderList.forEach(item => {
                html += `<li>
                                <img src="https://www.sonystyle.com.cn${item.imgurl}">
                                <span class="com-name">${item.shortname}</span>
                                <span class="com-qty">X${item.count}</span>
                                <div class="com-price">RMB
                                    <span>${item.count * item.memberprice}</span></div>
                                <div data-id="${item.pageid}" class="delete-car fl"><a href="javascript:void(0)" class="delete">删除</a></div>
                            </li>`
                totalPrice += item.count * item.memberprice;
            })
            $(".car-list").html(html);
            $(".sum-car").html(totalPrice.toFixed(2));
            this.renderCarts();
            this.bindEventCarts();
        }
        //保存数据
        saveData(type, json) {
            localStorage.setItem(type, JSON.stringify(json));
        }
        //获取数据 
        getCarts(type) {
            if (localStorage.getItem(type)) {
                return JSON.parse(localStorage.getItem(type));
            } else {
                return [];
            }
        }
        //阻止冒泡
        stopProp(e) {
            e.stopPropagation();
        }
        getShowId(evt){
            let e = evt || window.event;
            let target = $(e.currentTarget);
            let id =target.attr("data-id");
            this.sony_datail.some( (item ,index)=>{
                    this.sony_datail.splice(index ,1);
            })
            this.saveData("detail" , this.sony_datail);
            console.log(this.sony_datail);
            this.sony_datail.push({
                id : id
            });
            this.saveData("detail" , this.sony_datail);
            console.log(this.sony_datail);
            window.location.href = "./details.html";
        }
        //--------------------------------添加购物车区 end
    }
    var pages = new Pagination();
    pages.init();
})();
/**
 * 购物车加入5个商品以上开始滚动
 */
; (function () {
    let carLength = $(".car-list").children("li").length;
    if (carLength === 0) {
        $(".car-con").css({
            width: "500px",
            left: "-453px"
        })
    }
    if (carLength > 1) {
        $(".car-con").css({
            width: "520px",
            left: "-473px"
        })
    }
    if (carLength > 5) {
        $(".car-list").css({
            height: "255px"
        })
    }
})();
