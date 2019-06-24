/**
 * 懒加载 开始
 *采用jquery.lazylode.js实现图片的懒加载
 */
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
 * jquery插件懒加载 end 
 * 渲染进入详情页 start
 * */
; (function ($) {
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
        let goodsList = res.returnData.OutMasterDatas;
        let renderList = [];
        let html ="";
        goodsList.some(item => {
            if (item.pageid == getId[0].id) {
                renderList = item;
                return true;
            }
        })
        html = `
            <div class="pro-main">
            <div class="main-left">
                <div class="main-img">
                    <img width="536" height="536"
                        src="https://www.sonystyle.com.cn${renderList.imgurl}">
                </div>
                <div class="img-nav">
                    <span class="nav-left"></span>
                    <ul>
                        <li>
                            <img width="64" height="64"
                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_rb.jpg">
                        </li>
                        <li>
                            <img width="64" height="64"
                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_1.jpg.thumb.64.64.png">
                        </li>
                        <li>
                            <img width="64" height="64"
                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_2.jpg.thumb.64.64.png">
                        </li>
                        <li>
                            <img width="64" height="64"
                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_3.jpg.thumb.64.64.png">
                        </li>
                        <li>
                            <img width="64" height="64"
                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/headphone/wf_sp700n/product/img_wf_sp700n_p_4.jpg.thumb.64.64.png">
                        </li>
                    </ul>
                    <span class="nav-right"></span>
                </div>
            </div>
            <div class="main-right">
                <h1 class="mp-name">${renderList.longname}</h1>
                <div class="mp-desc">${renderList.desc}</div>
                <div class="mp-buy">
                    <div class="mp-price">
                        <p class="tn fl">价格</p>
                        <span class="price fl">RMB ${renderList.defaultprice}.00</span>
                    </div>
                    <div class="zx">
                        <p class="tn fl">尊享价</p>
                        <span class="reg">RMB  ${renderList.memberprice}.00</span>
                        <span class="czz">可获1倍成长值</span>
                    </div>
                </div>
                <div class="select-zone">
                    <div class="spec-z">
                        <p class="tn1 fl">规格</p>
                        <div class="t-con">
                            <ul>
                                <li>
                                    <a href="javascript:void(0)" rel="nofollow" class="cur">${renderList.shortname}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="color-z">
                        <p class="tn1 fl">颜色</p>
                        <div class="t-con colorli">
                            <ul>
                                <li>
                                    <img
                                        src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/yellow/color_icon_yellow_30x30.gif">
                                    <strong>黄色</strong>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <span>
                                            <img
                                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/black/color_icon_black_30x30.gif">
                                            <strong>黑色</strong>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <span>
                                            <img
                                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/white/color_icon_milkywhite_30x30.gif">
                                            <strong>白色</strong>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" class="cur">
                                        <span>
                                            <img
                                                src="https://www.sonystyle.com.cn/content/dam/sonystyle/products/color/pink/color_icon_palepink_30x30.gif">
                                            <strong>粉红色</strong>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="num-z">
                        <p class="tn1 fl">数量</p>
                        <div class="t-con">
                            <div class="num-m">
                                <a href="javascript:void(0)" class="reduce">-</a>
                                <span class="num-p">
                                    <input type="text" class="countValue" value="1">
                                </span>
                                <a href="javascript:void(0)" class="add">+</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sc-add" data-id="${renderList.pageid}">
                    <a href="javascript:void(0)" class="buybtn">
                        <img src="https://www.sonystyle.com.cn/etc/designs/sonystyle/images/buybutton/button_cartaddition_big.png">
                    </a>
                    <a href="javascript:void(0)" class="addwish">
                        <img src="https://www.sonystyle.com.cn/etc/designs/sonystyle/images/addwish.png"></a>
                    </div>
                </div>
            </div>`;
        $(".product-main").html(html);
        // lazyload(".com-img img");
        $(".sc-add").on("click" , ".buybtn" , addCarts.fire);
        $(".reduce").on("click" , reduceCount.fire);
        $(".add").on("click" , addCount.fire);
    }
    //保存数据
    function saveData(type, json) {
        localStorage.setItem(type, JSON.stringify(json));
    }
    //获取数据 
    function getCarts(type) {
        if (localStorage.getItem(type)) {
            return JSON.parse(localStorage.getItem(type));
        } else {
            return [];
        }
    }
    //删除临时数据
    function removeDetails(){
        getId.some( (item ,index)=>{
            if(item.id === renderList.pageid){
                getId.splice(index ,1);
            }
        })
        saveData("detail" , getId);
    }
    function reduceCartsCount(){
        let countValue = $(".countValue").val();
            countValue--;
        if(countValue==0){
            alert("不能再少了！！！");
            return ;
        }
        $(".countValue").val(countValue);
    }
    function addCartsCount(){
        let countValue = $(".countValue").val();
        countValue++;
        $(".countValue").val(countValue);
    }
    function addCartsData(evt){
        let e = evt || window.event;
        let target = $(e.currentTarget);
        let optEle = target.parent();
        let id = optEle.attr("data-id");
        let countValue = $(".countValue").val();
        console.log(countValue);
        let hasSameGoods =sony_data.some(item=>{
            if(item.id == id){
                item.count = parseInt(countValue) + parseInt(item.count);
                return true;
            }
        })
        if(!hasSameGoods){       
            sony_data.push({
                id:id,
                count : countValue
            })
        }
        saveData("carts" , sony_data);
        console.log(sony_data);
    }
    function bindEvent() {
        loadedData.add(showDetail);
        addCarts.add([addCartsData,loadSonyData]);
        addCount.add([addCartsCount]);
        reduceCount.add(reduceCartsCount);
        
    }
    function loadSonyData() {
        fetch("./sony-music.json")
            .then(res => {
                return res.json();
            })
            .then(loadedData.fire);
    }

    $(init);
})(jQuery);
/**
 * 渲染进入详情页 end
 * 顶部点击事件（查看更多商品） start
 * */
;(function(){
    $(".trigger-nav").on("click" , showShop);
    function showShop(){
        $(".product-nav").slideDown("slow");
        $(".trigger-nav").css({
            display : "none" 
        })
        $(".trigger-nav-out").fadeIn("100");
    }
    $(".trigger-nav-out").on("click" , noneShop);
    function noneShop(){
        $(".trigger-nav-out").css({
            display : "none" 
        });
        $(".product-nav").slideUp("slow");
        $(".trigger-nav").fadeIn("300");
    }
})();
/**
 * 渲染进入详情页 end
 * 顶部点击事件（查看更多商品） end
 * */