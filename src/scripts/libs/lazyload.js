var timer = null;
var cHeight = document.documentElement.clientHeight;
function lazyload(selector){
      let imgList = document.querySelectorAll(selector);
      // console.log(imgList);
      // 元素的offset操作会导致页面回流;
      let itemArray = Array.from(imgList).map(item => {
            // console.log(item);
            return {
                  img:item,
                  top : item.offsetTop,
                  src : item.getAttribute("data-src")
            }
      })
      // console.log(itemArray);
      load(itemArray);
      window.addEventListener("scroll",load.bind(null,itemArray));
}

function load(itemArray){
      if(timer !== null) return ;
      // console.log(1);
      timer = setTimeout(() => {
            //比对;
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var min = scrollTop + cHeight;
            itemArray.forEach( item => {
                  if(item.top < min){
                        item.img.src = item.src;
                  }
            })
            timer = null;
      },500)
}
