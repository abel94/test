
module.exports = {
      scripts : {
            "index" : {
                  src : "./src/scripts/index/"
            },
            "page" : {
                  src : "./src/scripts/page/"
            },
            "details" : {
                  src : "./src/scripts/details/"
            },
            "carts" : {
                  src : "./src/scripts/carts/"
            },
            "activityPage" : {
                  src : "./src/scripts/activityPage/"
            }
      },
      scss : {
            "index" :{
                  src : "./src/scss/index/"
            },
            "reset" : {
                  src : "./src/scss/_commont/"
            },
            "stairs" : {
                  src : "./src/scss/stairs/"
            },
            "page" : {
                  src : "./src/scss/page/"
            },
            "details" : {
                  src : "./src/scss/details/"
            }
            ,
            "carts" : {
                  src : "./src/scss/carts/"
            },
            "activityPage" : {
                  src : "./src/scss/activityPage/"
            }
      },
      // 服务器代理配置;
      proxyList : {
            "/pxx" : {
                  url : "https://apiv2.pinduoduo.com/api/fiora/subject/goods/",
                  // 默认重写路径
                  // rewrite : true
            },
            "/dt" :{
                  url : "https://www.duitang.com/napi/blog/list/by_filter_id/"
            }
      }
}