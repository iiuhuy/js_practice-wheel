## 同源策略
协议、域名、端口 这三者一致, 叫同域。
如果其中有一个不一样, 就叫跨域。

## 为什么浏览器不支持跨域
cookie、LocalStorage、
DOM 元素也有同源策略, iframe 
ajax 也不支持跨域

## 为什么还要实现跨域？
例如前端在一个服务器地址上, 后端又在一个服务器地址上, 两者之间想通讯. 怎么办呢？
- 1.jsonp 
- 2.cors
- 3.postMessage 两个页面之间的通讯
- 4.Window.name
- 5.location.hash
- 6.document.domain (二级域名和一级域名之间的通讯, 同一个域下的。) 子域和父域
- 7.websocket 
- 8.nginx
- 9.http-proxy


### jsonp 
>jsonp 是一个 Promise 吗 ？  执行后, 返回的是一个 Promise

例如, 用百度搜索, 随便输入 1234567890 ， 然后 F12 打开开发者模式, Network: 然后会看到不停的在向后台发送请求, 包含一些 js、css、img 等文件。
双击点开一个 js 文件查看, 右键查看网页源码模式。 url 里面的接口就是一个标准的 jsonp 接口, 利用的就是 HTML 标签引入的文件。

- 以为 新建的 `index.html` 为例子。
从上面拿到 url, 我们修该一下, 随便改一下
```html
<!-- https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&cb=show -->
```
前面是百度的域, wd 关键字, ab=show. 然后将这个连接放到浏览器中, 我们可以看到返回的是一个 show 函数, 里面附带的是相关数据。

然后再改一下, 将 a 改为 b , 刷新一下。可以看到有个 `s:` 属性, 是个数组, 数组里面就是数据。搜的就是关于 b 开头的东西。

现在自己在 body 里面写个 script 例子, 将上面的 url 用 `<script>` 引入进来。或者直接复制请求回来的内容, 放到一起。

然后我们在浏览器中打开当前目录下的 `index.html`. F12 开发者模式, 看看 console 会输出一个 object 。

现在看到浏览器里的是一个文件域, 去访问百度的域名, 这样就实现了跨域。(把script 引入过来也是一样的效果。)

有时候可能会用一些第三方的包, 包里面有一个 `jsonp` 的东西, 如 `index.html` 中的, 


实现的过程:
```js
function jsonp(url, params, cb) { 
    // console.log(params);
    return new Promise((resolve, reject) => {
        // 这个过程不会默认执行, 需要创建一个 script 标签
        let script = document.createElement('script');

        // 需要声明一个全局的函数用, cb 即是名字 show 
        window[cb] = function(data) {  
            resolve(data);
            // 用完这个回调还得删掉, 干掉这个标签
            document.body.removeChild(script);
        }
        params = {...params, cb,}   // 将 params 加入到对象中,最后应该是个这样的模式: wd=b&cb=show
        let arrs = [];  // 简单点用个数组拼接, 详细可以查看序列化
        for(let key in params) {
            arrs.push(`${key}=${params[key]}`);
        }
        // 可以弄个链接, 去连接路径
        script.src = `${url}?${arrs.join('&')}`;    // url + params + cb
        // 最后 script 还没用, 给扔到页面去.
        document.body.appendChild(script);
    });
}
// 只能发送 get 请求, 不支持 post put delete
// 不安全 xss 攻击
jsonp({
    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    params:{wd: 'b'},
    cb: 'show',
}).then(data => {   // then 成功后, 将结果 console 出来, 能 then, 可以返回一个 Promise
    console.log(data);
})
```

如果使用回调函数, 在里面创建一个函数, 在下面发个请求, 请求完了就干掉。:
```js

```

#### 了解后端怎么实现, 用 Express
安装:
```
npm install express
```
创建一个 `server.js`:
在里面实现简单的交互.

### 缺点 
- 只能发送 get 请求, 不支持 post put delete 
- 不安全, xss 攻击

# 2.cors
目录下创建 `index.html` 文件, 在里面输入点文本内容。

再建一个 `server.js` 用 Express 来跑。
```js
let express = require('express');
let app = express();

app.use(express.static(__dirname));

app.listen(3000);
console.log("listening port 3000");
```
跑起来就能看到内容了。 

现在已经有了第一个域名 localhost:3000, 再起一个 `server2.js`. 然后端口使用 4000. 
这样就满足了跨域的需求, 3000 端口 访问 4000 的数据。(协议、域名、端口号 一个不一样就跨域了)
里面一个设置一个接口 `app.get('/getData')` 再写前端: `index.html`里面使用 ajax 来访问。
把两个 server 都 node 起来, 然后浏览器中是报错的, 但是 ajax 这个时候是肯定发给服务器了, 只是被浏览器屏蔽了。 把 log 打出来看看:
```js
{ 
  host: 'localhost:4000',
  connection: 'keep-alive',
  origin: 'http://localhost:3000',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
  dnt: '1',
  accept: '*/*',
  referer: 'http://localhost:3000/',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'if-none-match': 'W/"e-+8c8pD8AxO4Nx3vT6ykz/qfgcvI"' 
}
```
里面有个参数很重要 origin， 意思就是当前访问我服务器的是哪个源。后面 url 就是。 这个时候我们就应该判断一下这个源能否访问。能就放行, 不能就不放行。

使用中间件(不要忘记加 next):
- 1.先把源取出来。
- 2.判断、设置
```js
app.use(function(req, res, next) {  
    // 取出源
    let origin = req.headers.origin;

    if(whitList.includes(origin)) {
        // 设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // 中间价需要加 next
    next();
});
```
现在就能访问啦。

服务端传数据, 不单单只是通过 url 来获取数据, 还能往外发数据。
- 1.路径参数
- 2.设置请求方式.
    - 设置请求头:`xhr.setRequestHeader('name','w3c')`
        这个时候报错, 提示 请求头 失败。需要设置请求头, 可能有的人觉得和前端没有关系, 又在服务器里设置:
        ```js
        res.setHeader('Access-Control-Allow-Headers', 'name'); // 设置请求头
        ```
        就能访问了。

这个时候不发请求了, 改成 `PUT`, 表示在这个 url 路径下修改东西。
emmm, 一刷新又报错了。提示:
```js
Failed to load http://localhost:4000/getData: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
```
来吧, 继续加个允许的方法。 然后需要在 `server2.js` 里面添加一个 put 方法。 
但是这存在一个问题, 在 network 中查看会看到发送了两个请求, 理论上就发送了一个请求。 分别点开 getData， 上面一个 getData 里面的请求方法是 OPTIONS， 下面一个才是我们发的 PUT 请求方法。

为什么会多发送一个请求？
我们知道PUT请求是可以发送请求体的, 但是想跨域怎么办? 是不是得先发一个预警(预测)出来, 先测试一下能不能跨域, 如果能跨域再把请求体发给你。 
我们可以这样判断:
```js
if(req.method === 'OPTIONS'){
    res.end();  // OPTIONS 直接停掉, 不做任何处理
}
```
好, 再重启服务, 刷新一下。咦, 握草。怎么还有, 多刷几次， 刷刷刷刷~~~ 发现, 这个 OPTIONS 不是一直在发, 是隔段时间再发的。那么又需要设置， 设呗:
```js
res.hasHeader('Access-Control-Max-Age', 6);     
```
后面的参数, 这个时间的单位是秒, FireFox 中上限是 24 小时(86400 秒), 而在 Chromium 中则是 10 分钟（即 600 秒）。Chromium 同时规定了一个默认值 5 秒。

如果值为 -1, 则表示禁用缓存，每一次请求都需要提供预检请求，即用 OPTIONS 请求进行检测。
参考 [HTTP-MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age)。

### 下面使用一下常用的头
允许携带 cookie 的头, 我们前端页面里, 会携带一个 cookie 的东西, HTML(`index.html`)DOM 里面设置:
```js
docement.cookie = 'name=alibaba';
```
把名字设置为 alibaba 。我们刷新一下, 没有报错, 但是服务器的 log 中也没有。 因为 cookie 是不允许跨域的。 那如果我们必须带上, 可以使用 ajax 设置 `withCredentials(携带凭证)` 为 `true`。

设置好了刷新一下, 发现又报错了, 因为还没设置头, 提示缺少 携带凭证 这个头。设置头:
```js
res.hasHeader('Access-Control-Allow-Credentials', true);
```
重启 node, 刷新看看行不行, 主要看服务器有没有收到。
```js
{ 
  host: 'localhost:4000',
  connection: 'keep-alive',
  'content-length': '0',
  origin: 'http://localhost:3000',
  name: 'w3c',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
  dnt: '1',
  accept: '*/*',
  referer: 'http://localhost:3000/index.html',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
  cookie: 'connect.sid=s%3ARrBECBXz062X20uHQ9SEZNOeH9HC5l9p.55ab2gsv2a%2BI8a5lpNQWJOut1v6oEMOhFvtwEKc4NvE; name=alibaba' 
}
```
OK， 已经收到了。然后服务器回应一下, 在 put 中:
```js
res.setHeader('name', '我王境泽.'); 
```

这个时候, 刷新也没有问题, 再看看头有没有? 头也有。 那么需要用代码拿到，`index.html` 中使用 ajax添加 log:
```js
console.log(xhr.getResponseHeader('name'));
```
这个又会报错了，`Refused to get unsafe header "name"`。拒绝得到不安全的内容, 那我们得告诉它, 没问题. 这数据很安全。继续添加头:
```js
res.setHeader('Access-Control-Expose-Headers', 'name'); // 多个的话, 就加逗号
```

# 3.postMessage
创建 `3.postMessage` 目录。
分别创建:
- a.html
- a.js
- b.html
- b.js

现在需要做一件事, 想在 `a.html` 里面把 `b.html` 嵌入进来。怎么嵌？
使用 `iframe`:
```html
<iframe src="http://localhost:4000/b.html" 
    frameborder="0" id="frame" onload="load()"></iframe>
```
当 iframe 加载完之后, b 也已经加载完了。 添加 script:

```js
// a.html
function load() {  
    // 拿到 frame
    let frame = document.getElementById('frame');
    // 拿到 frame 里面的 window , 发送的时候要告诉域 
    frame.contentWindow.postMessage('emmm, 真香~',
    'http://localhost:4000')
}
```
这个时候就向 b.html 发送了消息。b 得接收一下:
```js
// b.html 
window.onmessage = function(e) {
    console.log(e.data);
}  
```
在 network 中看看是不有两个 页面。log 会打出 `a.html` 中的内容。
这个时候, b 又向 a 发送消息:
```js
window.onmessage = function(e) {
    console.log(e.data);
    e.source.postMessage('香个锤子！', e.origin);
}  
```
发送了之后, a 那边得接收一下把。 接收方法和 b 中的一样:
```js
function load() {  
    // 拿到 frame
    let frame = document.getElementById('frame');
    // 拿到 frame 里面的 window , 发送的时候要告诉域 
    frame.contentWindow.postMessage('emmm, 真香~',
    'http://localhost:4000')

    // 接收一下 b 的消息
    window.onmessage = function (e) {  
        console.log(e.data);
    }
}
```

# 4.window.name
创建新目录: `4.window.name`。 里面分别添加:
- a.html
- b.html
- c.html
- a.js
- b.js

开启两个服务, 写 `a.html`。 这种方式不难, 只需要绕个弯。 注释参考 html 文档。


# 5.hash
创建 `5.hash` 目录, 分别创建下面 5 个文件:
- a.html
- b.html
- c.html
- a.js
- b.js

详情参考, html 。 还是挺简单的, 逆天的逻辑, emmm。 很多还是用 postMessage

# 6.domain
创建 `6.domain` 目录, 分别创建下面 4 个文件:
- a.html
- b.html
- a.js
- b.js

域名的关系:
- 一级域名 例如: www.baidu.com
- 二级域名 例如: video.baidu.com

只能是一级域名和二级域名的关系: 
需要配置地址映射,例如:
192.127.100.1  www.xxx.cn
192.127.100.1  a.xxx.cn
192.127.100.1  b.xxx.cn

共同使用 `document.domain = 'xxx.cn'`. 就能实现跨域。 domain 用得还是挺多的。

# 7.websocket
双攻。
新建 `7.websocket` 目录。 创建下面的文件:
- socket.html
- server.js

需要用到 ws 库:
- npm install ws
    - ws@6.0.0

然后简单写一下例子.  socket 通讯协议是根据 TCP/IP

# 8.nginx
先去下载： http://nginx.org/en/download.html

- 在服务器添加 a.json 文件。 内容随便填写 json 的内容。

- 我们将 2.cors 里面的 `index.html` 拿过来改一下。

- 在创建一个 `server.js` 服务文件。用 node 跑起来，这个时候去浏览器访问: http://localhost:3000/index.html

会报错, 就跟之前添加头的错误信息一样, 所以需要在 nginx 里面配置。

主要是配置文件。后面再好好看看 nginx. 注意一下在 nginx 里面配置文件的写法。代理的话, 也是网上找例子学吧。

# 9.


