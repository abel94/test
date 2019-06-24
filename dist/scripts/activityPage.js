"use strict";

/**
 * 懒加载start
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
 * 懒加载 end
 * */

/**
 * 切换图片 start
 */
// ; (function () {
//     class showImg{
//         constructor() { }
//         init() {
//             this.bindEvent();
//         }
//         show() {
//             $(".left1").fadeIn("200");
//         }
//         out() {
//             $(".left1").fadeOut("200");
//         }
//         bindEvent() {
//         }
//     }
//     var showimg = new showImg();
//     // showImg.init();
// })();

/**
 * 切换图片 end
 */

/**
 * 吸顶菜单 start
 * */


;

(function () {
  window.onscroll = function () {
    var btop = document.body.scrollTop || document.documentElement.scrollTop;

    if (btop > 677) {
      $(".nav-box").css({
        position: "fixed",
        top: "64px"
      });
    } else {
      $(".nav-box").css({
        position: "static"
      });
    }
  };
})();
/**
 * 吸顶菜单 end
 * 楼梯 start
 * */
//楼梯划入样式


;

(function () {
  $(".li11").mouseenter(function () {
    $(".li11").css({
      background: "url(../images/nav.png) no-repeat  -240px 0"
    });
  });
  $(".li11").mouseleave(function () {
    $(".li11").css({
      background: "url(../images/nav.png) no-repeat left 0"
    });
  });
  $(".li22").mouseenter(function () {
    $(".li22").css({
      background: "url(../images/nav.png) no-repeat -240px -66px"
    });
  });
  $(".li22").mouseleave(function () {
    $(".li22").css({
      background: "url(../images/nav.png) no-repeat left -66px"
    });
  });
  $(".li33").mouseenter(function () {
    $(".li33").css({
      background: "url(../images/nav.png) no-repeat -240px -132px"
    });
  });
  $(".li33").mouseleave(function () {
    $(".li33").css({
      background: "url(../images/nav.png) no-repeat left -132px"
    });
  });
  $(".li44").mouseenter(function () {
    $(".li44").css({
      background: "url(../images/nav.png) no-repeat -240px -198px"
    });
  });
  $(".li44").mouseleave(function () {
    $(".li44").css({
      background: " url(../images/nav.png) no-repeat left -198px"
    });
  });
  $(".li55").mouseenter(function () {
    $(".li55").css({
      background: " url(../images/nav.png) no-repeat -240px -264px"
    });
  });
  $(".li55").mouseleave(function () {
    $(".li55").css({
      background: " url(../images/nav.png) no-repeat left -264px"
    });
  });
  $(".li66").mouseenter(function () {
    $(".li66").css({
      background: " url(../images/nav.png) no-repeat -240px -330px"
    });
  });
  $(".li66").mouseleave(function () {
    $(".li66").css({
      background: "url(../images/nav.png) no-repeat left -330px"
    });
  });
})();

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
        var st = $("html,body").scrollTop(); // console.log("当前滚动距离"+st);

        if (st >= 1950 && st < 2500) {
          //常规
          for (var i = 0; i < this.ele.length; i++) {
            if (i !== 0) {
              this.ele.eq(i).trigger("mouseleave");
            }
          }

          this.ele.eq(0).trigger("mouseenter");
        }

        if (st >= 2500 && st < 3500) {
          //易用镜头
          for (var i = 0; i < this.ele.length; i++) {
            if (i !== 1) {
              this.ele.eq(i).trigger("mouseleave");
            }
          }

          this.ele.eq(1).trigger("mouseenter");
        }

        if (st >= 3500 && st < 6200) {
          //复杂环境
          for (var i = 0; i < this.ele.length; i++) {
            if (i !== 2) {
              this.ele.eq(i).trigger("mouseleave");
            }
          }

          this.ele.eq(2).trigger("mouseenter");
        }

        if (st >= 6200 && st < 9227) {
          for (var i = 0; i < this.ele.length; i++) {
            if (i !== 3) {
              this.ele.eq(i).trigger("mouseleave");
            }
          }

          this.ele.eq(3).trigger("mouseenter");
        }

        if (st > 9227) {
          //夜景人像
          for (var i = 0; i < this.ele.length; i++) {
            if (i !== 4) {
              this.ele.eq(i).trigger("mouseleave");
            }
          }

          this.ele.eq(4).trigger("mouseenter");
        }
      }.bind(this), 100);
    }
  });
  window.Stairs = Stairs;
}(jQuery);
new Stairs(".nav-con li", [1560, 3153, 4753, 6073, 6980]);
/**
 * 楼梯 end
 * */