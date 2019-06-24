"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 轮播图
 *banner start
 *采用面向对象
 *@function $$ 元素选择器（可多选）
 * */
var $$ = function $$(selector, all) {
  if (all) {
    return document.querySelectorAll(selector);
  }

  return document.querySelector(selector);
}
/**
 * @var prevBtn 上一个轮播图的按钮
 * @var nextBtn 下一个轮播图的按钮
 * @var bannerLength 轮播图的ul大盒子
 * @var bannerTabs 轮播的显示位置
 * @var banImgWidth 获取能装下图片的宽
 */
;

(function () {
  var _ref = [$$(".arrow-left"), $$(".arrow-right"), $$(".banner-container"), $$(".bannerTabs"), $$(".bannerMove")],
      prevBtn = _ref[0],
      nextBtn = _ref[1],
      bannerLength = _ref[2],
      bannerTabs = _ref[3],
      banImgWidth = _ref[4];

  var bannerMove =
  /*#__PURE__*/
  function () {
    function bannerMove() {
      _classCallCheck(this, bannerMove);
    } //初始化


    _createClass(bannerMove, [{
      key: "init",
      value: function init(prevBtn, nextBtn, bannerLength, bannerTabs, banImgWidth) {
        this.timer = null;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.bannerTabs = bannerTabs;
        this.TabsList = this.bannerTabs.children;
        this.bannerLength = bannerLength;
        this.banImgWidth = banImgWidth; //二次修改适应不同的电脑

        this.imgWidth = parseInt(getComputedStyle(this.banImgWidth, null).getPropertyValue("width"));
        this.imgHeight = Math.ceil(window.screen.height * (this.imgWidth / window.screen.width));
        this.banImgWidth.style.height = this.imgHeight + "px";
        $(".banner-container div").css({
          height: this.imgHeight + "px"
        });
        this.bannerList = this.bannerLength.children;
        this.bannerLength.style.width = this.bannerList.length * 100 + "%";
        this.bannerLength.style.height = this.imgHeight + "px"; //结束

        this.index = 0;
        this.startMove();
        this.bindEvent();
        this.showTab();
      } //绑定事件

    }, {
      key: "bindEvent",
      value: function bindEvent() {
        this.prevBtn.addEventListener("click", this.toPrev.bind(this));
        this.nextBtn.addEventListener("click", this.toNext.bind(this));

        for (var i = 0; i < this.TabsList.length; i++) {
          this.TabsList[i].addEventListener("click", this.goAims.bind(this, i));
        }
      } //上一张图片

    }, {
      key: "toPrev",
      value: function toPrev() {
        clearInterval(this.timer);

        if (this.index === 0) {
          this.bannerLength.style.left = -100 * (this.bannerList.length - 1) + "%";
          this.index = this.bannerList.length - 2;
        } else {
          this.index--;
        }

        this.move(this.bannerLength, -this.imgWidth * this.index, "left");
        this.showTab();
      } //下一张图片

    }, {
      key: "toNext",
      value: function toNext() {
        clearInterval(this.timer);

        if (this.index === this.bannerList.length - 1) {
          this.bannerLength.style.left = 0;
          this.index = 1;
        } else {
          this.index++;
        }

        this.move(this.bannerLength, -this.imgWidth * this.index, "left");
        this.startMove();
        this.showTab();
      } //图片缓冲运动

    }, {
      key: "move",
      value: function move(eleNode, target, attr) {
        var g = getComputedStyle;
        clearInterval(eleNode.timer);
        eleNode.timer = setInterval(function () {
          var iNow = attr === "opacity" ? g(eleNode)[attr] * 100 : parseInt(g(eleNode)[attr]);
          var speed = (target - iNow) / 8;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          iNow += speed;
          eleNode.style[attr] = attr === "opacity" ? iNow / 100 : iNow + "px"; // 单if 不带 return的这样的情况都可以简写成三目运算符;

          iNow === target ? clearInterval(eleNode.timer) : "";
        }, 50);
      } //获取正在显示轮播图得下标

    }, {
      key: "startMove",
      value: function startMove() {
        this.timer = setInterval(this.toNext.bind(this), 6000);
      } //显示tabs所对应信息

    }, {
      key: "showTab",
      value: function showTab() {
        for (var i = 0; i < this.TabsList.length; i++) {
          this.removeClass(this.TabsList[i], "active");
        }

        if (this.index === 3) {
          this.TabsList[0].className = "active";
        } else {
          this.TabsList[this.index].className = "active";
        }
      } //移除对应的class属性

    }, {
      key: "removeClass",
      value: function removeClass(dom, class_string) {
        var classString = dom.className;
        var classArray = classString.split(" ");
        var tab_i = classArray.indexOf(class_string);
        if (tab_i !== -1) classArray.splice(tab_i, 1);
        classString = classArray.join("");
        dom.className = classString;
      } //到某一张图片

    }, {
      key: "goAims",
      value: function goAims(go_i) {
        for (var i = 0; i < this.TabsList.length; i++) {
          this.removeClass(this.TabsList[i], "active");
        }

        this.index = go_i;
        this.TabsList[this.index].className = "active";
        clearInterval(this.timer);
        this.move(this.bannerLength, -this.imgWidth * this.index, "left");
        this.startMove();
      }
    }]);

    return bannerMove;
  }();

  var banMove = new bannerMove();
  banMove.init(prevBtn, nextBtn, bannerLength, bannerTabs, banImgWidth);
})();
/**
 * banner end
 * login,register start
 * 主要是登陆注册的特效实现
 * @var goLogin 点击弹出登陆框
 * @var goRegister 点击弹出注册框
 * @var cancelLogin  取消登陆注册
 * @var loginSwitch   登陆转换到注册
 * @var regiSwitch  注册转换到登陆
 */


;

(function () {
  var _ref2 = [$$("#go-login"), $$("#go-register"), $$(".cancel-login"), $$(".login-switch"), $$(".regi-switch")],
      goLogin = _ref2[0],
      goRegister = _ref2[1],
      cancelLogin = _ref2[2],
      loginSwitch = _ref2[3],
      regiSwitch = _ref2[4];

  var userLogin =
  /*#__PURE__*/
  function () {
    function userLogin() {
      _classCallCheck(this, userLogin);
    } //初始化


    _createClass(userLogin, [{
      key: "init",
      value: function init(goLogin, goRegister, cancelLogin, loginSwitch, regiSwitch) {
        this.goLogin = goLogin;
        this.goRegister = goRegister;
        this.cancelLogin = cancelLogin;
        this.loginSwitch = loginSwitch;
        this.regiSwitch = regiSwitch;
        this.bindEvent();
      }
    }, {
      key: "bindEvent",
      value: function bindEvent() {
        this.goLogin.addEventListener("click", this.showLogin.bind(this));
        this.goRegister.addEventListener("click", this.showRegister.bind(this));
        this.cancelLogin.addEventListener("click", this.cancelL.bind(this));
        this.loginSwitch.addEventListener("click", this.l_Switch_R.bind(this));
        this.regiSwitch.addEventListener("click", this.r_Switch_l.bind(this));
      } //显示登陆

    }, {
      key: "showLogin",
      value: function showLogin() {
        $(".login-wrap").fadeIn("200");
        $(".login-input").fadeIn("200");
        $("body").css({
          opacity: "0.9"
        });
      } //显示注册

    }, {
      key: "showRegister",
      value: function showRegister() {
        $(".login-switch").attr({
          src: "https://www.sonystyle.com.cn/etc/designs/sonystyle/images/login/register_btn_01.jpg"
        });
        $(".regi-switch").attr({
          src: "https://www.sonystyle.com.cn/etc/designs/sonystyle/images/login/register_btn_02.jpg"
        });
        $(".login-wrap").fadeIn("200");
        $(".register-con").fadeIn("300");
        $("body").css({
          opacity: "0.9"
        });
      } //退出登陆

    }, {
      key: "cancelL",
      value: function cancelL() {
        $(".login-wrap").fadeOut("200");
        $(".login-input").fadeOut("200");
        $(".register-con").fadeOut("200");
        $("body").css({
          opacity: "1"
        });
      } //登陆切换注册

    }, {
      key: "l_Switch_R",
      value: function l_Switch_R() {
        $(".login-switch").attr({
          src: "https://www.sonystyle.com.cn/etc/designs/sonystyle/images/login/login_btn_01.jpg"
        });
        $(".regi-switch").attr({
          src: "https://www.sonystyle.com.cn/etc/designs/sonystyle/images/login/login_btn_02.jpg"
        });
        $(".login-input").css({
          display: "block"
        });
        $(".register-con").css({
          display: "none"
        });
      } //注册切换登陆

    }, {
      key: "r_Switch_l",
      value: function r_Switch_l() {
        $(".login-switch").attr({
          src: "https://www.sonystyle.com.cn/etc/designs/sonystyle/images/login/register_btn_01.jpg"
        });
        $(".regi-switch").attr({
          src: "https://www.sonystyle.com.cn/etc/designs/sonystyle/images/login/register_btn_02.jpg"
        });
        $(".register-con").css({
          display: "block",
          opacity: "1"
        });
        $(".login-input").css({
          display: "none"
        });
      }
    }]);

    return userLogin;
  }();

  var user = new userLogin();
  user.init(goLogin, goRegister, cancelLogin, loginSwitch, regiSwitch);
})();
/**
 * login,register end
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
 * 懒加载结束
 * ceil menu start 
 */


;

(function () {
  $(window).scroll(function () {
    var minHeight = 700; // console.log($(this).scrollTop());

    if ($(this).scrollTop() > minHeight) {
      $(".ceil-menu-wrap").css({
        display: "block"
      });
    } else {
      $(".ceil-menu-wrap").css({
        display: "none"
      });
    }
  });
})();
/**
 * ceil menu end
 * 搜索栏下拉选项卡开始
 * 未完成如何将选择下拉菜单的值赋给输入框
 */


;

(function () {
  // $(".search-ipt").click(function(){
  //     console.log(document.activeElement.blur);
  //     if(document.activeElement.className === "search-ipt"){
  //         $(".select-wrap").css({
  //             display : "block"
  //         })
  //     }
  //     // if()
  // });
  //当输入框内有光标时
  $(".search-ipt").on("focus", function () {
    $(".select-wrap").css({
      display: "block"
    });
  }); // // console.log( $(".select-wrap").children().text());
  // $(".select-one").click(function(){
  //     console.log($(this).text());
  //     $(".search-ipt").text() = $(this).text();
  // })
  // //当输入框内没有光标时

  $(".search-ipt").on("blur", function () {
    $(".select-wrap").css({
      display: "none"
    });
  }); //选中选择框中的内容将其内容放在输入框中
})();
/**
 * 搜索栏下拉选项卡结束
 * 登陆注册验证 start
 * @var uPhone  手机号
 * @var pTip    对手机号的判断信息
 * @var uEmail  邮箱地址
 * @var eTip    对邮箱的判断信息
 * @var pwd     第一次密码
 * @var pwdTip  对密码强度的检验
 * @var cpwd    重新输入密码
 * @var cpwdTip 判断是否和第一次输入的一致
 */


;

(function () {
  var _ref3 = [$$("#u_phone"), $$("#p_tip"), $$("#u_email"), $$("#e_tip"), $$("#pwd"), $$("#pwd_tip"), $$("#cpwd"), $$("#cpwd_tip"), $$(".status")],
      uPhone = _ref3[0],
      pTip = _ref3[1],
      uEmail = _ref3[2],
      eTip = _ref3[3],
      pwd = _ref3[4],
      pwdTip = _ref3[5],
      cpwd = _ref3[6],
      cpwdTip = _ref3[7],
      status = _ref3[8]; //正则库

  var regList = {
    "phone": /^1[34578]\d{9}$/,
    "hasNumber": /\d/,
    "hasLetter": /[a-zA-Z]/,
    "hasSC": /[\!\@\#\$\%\^]/,
    "minlength6": /^.{0,5}$/,
    "mail": /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9a-z]{2,9}\.[a-z]{2,6}(\.[a-z]{2,3})?$/i
  };

  var Regis =
  /*#__PURE__*/
  function () {
    function Regis() {
      _classCallCheck(this, Regis);
    }

    _createClass(Regis, [{
      key: "init",
      value: function init(uPhone, pTip, uEmail, eTip, pwd, pwdTip, cpwd, cpwdTip, status) {
        this.uPhone = uPhone;
        this.pTip = pTip;
        this.uEmail = uEmail;
        this.eTip = eTip;
        this.pwd = pwd;
        this.pwdTip = pwdTip;
        this.cpwd = cpwd;
        this.cpwdTip = cpwdTip;
        this.status = status;
        this.bindEvent();
      }
    }, {
      key: "bindEvent",
      value: function bindEvent() {
        this.uPhone.addEventListener("blur", this.validatePhone.bind(this));
        this.uEmail.addEventListener("blur", this.validateEmail.bind(this));
        this.pwd.addEventListener("blur", this.validatePwdStrength.bind(this));
        this.cpwd.addEventListener("blur", this.validatePwd.bind(this));
      } //验证手机号

    }, {
      key: "validatePhone",
      value: function validatePhone() {
        // if(regList.phone.test(this.uPhone.value)){
        //     this.success(this.pTip);
        // }else{
        //     this.error(this.pTip);
        // }
        if (this.uPhone.value.length == 0) return this.error2(this.pTip);
        regList.phone.test(this.uPhone.value) ? this.success(this.pTip) : this.error(this.pTip);
      } //验证邮箱

    }, {
      key: "validateEmail",
      value: function validateEmail() {
        if (!this.uEmail.value) return this.error2(this.eTip);
        regList.mail.test(this.uEmail.value) ? this.success(this.eTip) : this.error(this.eTip);
      } //验证密码强度

    }, {
      key: "validatePwdStrength",
      value: function validatePwdStrength() {
        if (!this.pwd.value) return this.error2(this.pwdTip);
        var strength = 0;

        if (regList.hasNumber.test(this.pwd.value)) {
          strength++;
        }

        if (regList.hasLetter.test(this.pwd.value)) {
          strength++;
        }

        if (regList.hasSC.test(this.pwd.value)) {
          strength++;
        }

        if (regList.minlength6.test(this.pwd.value)) {
          this.error(this.pwdTip, "请输入6位以上字符作为密码");
        }

        if (strength === 3) {
          this.success(this.pwdTip);
        } else if (strength === 2) {
          this.success(this.pwdTip);
          this.error(this.pwdTip, "密码强度不足，建议升级密码");
        } else if (strength === 1) {
          this.error(this.pwdTip, "密码强度严重不足，强烈建议升级密码");
        }
      } //验证密码是否一致

    }, {
      key: "validatePwd",
      value: function validatePwd() {
        if (!this.cpwd.value) return this.error2(this.cpwdTip);
        this.pwd.value === this.cpwd.value ? this.success(this.cpwdTip) : this.error(this.cpwdTip);
      } //验证成功

    }, {
      key: "success",
      value: function success(tip) {
        tip.nextElementSibling.style.display = "block";
        tip.style.display = "none";
      } //验证失败

    }, {
      key: "error",
      value: function error(tip, tipMes) {
        if (!tipMes) {
          this.status.style.display = "none";
          tip.style.display = "block";
        } else {
          this.status.style.display = "none";
          tip.style.display = "block";
          tip.innerHTML = tipMes;
        }
      }
    }, {
      key: "error2",
      value: function error2(tip) {
        this.status.style.display = "none";
        tip.style.display = "none";
      }
    }]);

    return Regis;
  }();

  var regis = new Regis();
  regis.init(uPhone, pTip, uEmail, eTip, pwd, pwdTip, cpwd, cpwdTip, status);
})();
/**
* 登陆注册验证 end
* 楼梯开始
*/


;
!function ($) {
  function Stairs(selector, options) {
    this.init.apply(this, arguments);
  }

  $.extend(Stairs.prototype, {
    init: function init(selector, options) {
      this.ele = null;
      this.options = options;

      if (typeof selector !== "string" || (this.ele = $(selector)).length === 0 || !(options instanceof Array) || options.length === 0) {
        console.warn("error");
      }

      this.floor_timer = null;
      this.bindEvent();
    },
    bindEvent: function bindEvent() {
      this.ele.on("click", this.changeFloor.bind(this));
      $(window).on("scroll", this.findFloor.bind(this));
    },
    changeFloor: function changeFloor(evt) {
      var target = evt.target;
      var index = $(target).index();
      $("html,body").stop().animate({
        scrollTop: this.options[index]
      });
      if (index === 5) return;
      $(target).addClass("active").siblings().removeClass("active");
    },
    findFloor: function findFloor() {
      clearTimeout(this.floor_timer);
      this.floor_timer = setTimeout(function () {
        var st = $("html,body").scrollTop();

        if (st > 1200) {
          $(".stairs-aims").css({
            display: "block"
          });
        } else {
          $(".stairs-aims").css({
            display: "none"
          });
        }

        if (st < 1560) {
          $(".stairs-aims").children().removeClass("active");
        }

        if (st >= 1560 && st < 3153) {
          this.ele.eq(0).addClass("active").siblings().removeClass("active");
        }

        if (st >= 3153 && st < 4753) {
          this.ele.eq(1).addClass("active").siblings().removeClass("active");
        }

        if (st >= 4753 && st < 6073) {
          this.ele.eq(2).addClass("active").siblings().removeClass("active");
        }

        if (st >= 6073 && st < 6908) {
          this.ele.eq(3).addClass("active").siblings().removeClass("active");
        }

        if (st >= 6908) {
          this.ele.eq(4).addClass("active").siblings().removeClass("active");
        }
      }.bind(this), 100);
    }
  });
  window.Stairs = Stairs;
}(jQuery);
new Stairs(".stairs-aims li", [1560, 3153, 4753, 6073, 6980, 0]);
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
/**
 * 购物车加入5个商品以上开始滚动 end
 * 注册 start
 */


;

(function () {
  var registerBtn = $$("#register-btn");
  var form = $$("#register_form");
  var uPhoneIpt = $$("#u_phone");
  var uEmailIpt = $$("#u_email");
  var pwdIpt = $$("#pwd");
  var cpwdIpt = $$("#pwd");
  var loading = false;

  form.onsubmit = function (evt) {
    var e = evt || window.event;
    e.preventDefault();
  };

  registerBtn.onclick = function (evt) {
    if (loading) return false;
    var uPhone = uPhoneIpt.value;
    var uEmail = uEmailIpt.value;
    var pwd = pwdIpt.value;
    console.log(uPhone, uEmail, pwd);
    loading = true;
    registerBtn.disabled = "disabled";
    xhrPost("http://10.9.65.206/register.php", {
      uPhone: uPhone,
      uEmail: uEmail,
      pwd: pwd
    }).then(function (res) {
      console.log(res);
      registerBtn.removeAttribute("disabled");
      res = JSON.parse(res);

      if (res.statu === "success") {
        alert("注册成功");
        uPhoneIpt.value = "";
        uEmailIpt.value = "";
        pwdIpt.value = "";
        cpwdIpt.value = "";
        setTimeout(function (a) {
          // 存cookie;
          cookie("tocken", res.password, {
            expires: 20
          });
          cookie("uPhone", uPhone, {
            expires: 20
          });
        }, 1000);
      } else if (res.statu === "error") {
        alert("注册失败");
      }
    });
  };
})();
/**
 * 注册end
 * 登陆start 
 */


;

(function () {
  var loginForm = $$("#login_form");
  var loginUser = $$("#login_user");
  var loginPass = $$("#login_pass");
  var loginBtn = $$("#login_btn");
  var cookie_user = getCookie("uPhone");
  var cookie_pass = getCookie("password");
  console.log(cookie_pass, cookie_user);

  loginForm.onsubmit = function (evt) {
    var e = evt || window.event;
    e.preventDefault();
  };

  loginBtn.onclick = function (evt) {
    var uPhone = loginUser.value;
    var password = loginPass.value;
    xhrPost("http://10.9.65.206/login.php", {
      uPhone: uPhone,
      password: password
    }).then(function (res) {
      res = JSON.parse(res);

      if (res.statu === "success") {
        alert("登陆成功");
      } else if (res.statu === "error") {
        alert("登陆失败");
      }
    });
  };
})();
/**
 * login end
 * 最新活动轮播图 start
 */


;

(function ($) {
  var swiper = new Swiper("#swiper", {
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next"
    },
    loop: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicMainBullets: 2,
      clickable: true
    }
  });
  swiper.params.autoplay.reverseDirection = true;
})(jQuery);
/**
 * 最新活动轮播图 end
 * index 购物车数据渲染 start
 **/


;

(function () {
  var ShowCarts =
  /*#__PURE__*/
  function () {
    function ShowCarts() {
      _classCallCheck(this, ShowCarts);
    }

    _createClass(ShowCarts, [{
      key: "init",
      value: function init() {
        this.sony_data = this.getData("carts");
        this.showCartsData();
      }
    }, {
      key: "bindEvent",
      value: function bindEvent() {}
    }, {
      key: "showCartsData",
      value: function showCartsData(res) {
        console.log(res);
      }
    }, {
      key: "getData",
      value: function getData(type) {
        if (!localStorage.getItem(type)) {
          return JSON.parse(localStorage.getItem(type));
        } else {
          return [];
        }
      }
    }, {
      key: "saveData",
      value: function saveData(type, json) {
        localStorage.setItem(type, JSON.stringify(json));
      }
    }, {
      key: "loadSonyData",
      value: function loadSonyData() {
        fetch("./sony-music.json").then(function (res) {
          return res.json();
        }).then(function (res) {
          console.log(res);
        });
      }
    }]);

    return ShowCarts;
  }();

  var showData = new ShowCarts();
})();
/** 
 * index 购物车数据渲染 end
*/