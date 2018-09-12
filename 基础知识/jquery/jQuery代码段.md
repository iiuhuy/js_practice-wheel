# jQuery 常用的代码段
> 主要来自于 《锋利的 jQuery (第二版)》

## 1.禁用页面，禁用页面的右键菜单
```js
//禁用右键菜单
$(document).ready(function(){
    $(document).bind('contextmenu',function(e){
        return false;
    })
})
```

## 2.新窗口打开界面
//新窗口打开界面
            $(document).ready(function(){
                //1.href='http://'的超链接将会在新窗口打开连接
                $('a[href^="http://"]').attr("target","_blank")
                //rel='external'的超链接将会在新窗口打开连接
                $('a[rel$="external"]').click(function(){
                    this.target = "_blank";
                })
            })

作者：范小饭_
链接：https://www.jianshu.com/p/deef9dd07f2a
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。