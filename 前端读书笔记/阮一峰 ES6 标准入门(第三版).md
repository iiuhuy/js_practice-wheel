# ES6 标准入门第三版
http://es6.ruanyifeng.com/
## 01 简介
检查运行时环境对 ES6 的支持。 

```nodejs
npm install -g es-checker
es-checker
```

我擦, 支持度 90% 啊。
```
es-checker

ECMAScript 6 Feature Detection (v1.4.1)

Variables
  √ let and const
  √ TDZ error for too-early access of let or const declarations
  √ Redefinition of const declarations not allowed
  √ destructuring assignments/declarations for arrays and objects
  √ ... operator

Data Types
  √ For...of loop
  √ Map, Set, WeakMap, WeakSet
  √ Symbol
  √ Symbols cannot be implicitly coerced

Number
  √ Octal (e.g. 0o1 ) and binary (e.g. 0b10 ) literal forms
  √ Old octal literal invalid now (e.g. 01 )
  √ Static functions added to Math (e.g. Math.hypot(), Math.acosh(), Math.imul() )
  √ Static functions added to Number (Number.isNaN(), Number.isInteger() )

String
  √ Methods added to String.prototype (String.prototype.includes(), String.prototype.repeat() )
  √ Unicode code-point escape form in string literals (e.g. \u{20BB7} )
  √ Unicode code-point escape form in identifier names (e.g. var \u{20BB7} = 42; )
  √ Unicode code-point escape form in regular expressions (e.g. var regexp = /\u{20BB7}/u; )
  √ y flag for sticky regular expressions (e.g. /b/y )
  √ Template String Literals

Function
  √ arrow function
  √ default function parameter values
  √ destructuring for function parameters
  √ Inferences for function name property for anonymous functions
  × Tail-call optimization for function calls and recursion

Array
  × Methods added to Array.prototype ([].fill(), [].find(), [].findIndex(), [].entries(), [].keys(), [].values() )
  √ Static functions added to Array (Array.from(), Array.of() )
  √ TypedArrays like Uint8Array, ArrayBuffer, Int8Array(), Int32Array(), Float64Array()
  √ Some Array methods (e.g. Int8Array.prototype.slice(), Int8Array.prototype.join(), Int8Array.prototype.forEach() ) added to the TypedArray prototypes
  √ Some Array statics (e.g. Uint32Array.from(), Uint32Array.of() ) added to the TypedArray constructors

Object
  √ __proto__ in object literal definition sets [[Prototype]] link
  √ Static functions added to Object (Object.getOwnPropertySymbols(), Object.assign() )
  √ Object Literal Computed Property
  √ Object Literal Property Shorthands
  √ Proxies
  √ Reflect

Generator and Promise
  √ Generator function
  √ Promises

Class
  √ Class
  √ super allowed in object methods
  √ class ABC extends Array { .. }

Module
  × Module export command
  × Module import command


=========================================
Passes 38 feature Detections
Your runtime supports 90% of ECMAScript 6
=========================================
```

### Babel 转换器
Babel(babeljs.io) 是一个 ES6 转换器, 可以将 ES6 转换为 ES5。

```js
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function(item) {
    return item + 1;
});
```
Babel 将箭头函数转换为普通的函数。

#### 配置文件 .bebelrc 
Babel 的配置文件是 `.babelrc`, 放在项目的根目录下。第一步就是配置这个文件。
该文件采取 JSON 的基本格式: 
```
{
    "presets": [],
    "plugins": []
}
```
`presets` 字段设定转码规则, 最新转码规则安装:
```
npm install --save-dev babel-preset-latest
```

react 转码规则:
```
npm install --save-dev babel-preset-react
```

不同阶段语法提案的转码规则(共有4个阶段), 选装一个:
```
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-preset-stage-1
npm install --save-dev babel-preset-stage-2
npm install --save-dev babel-preset-stage-3
```

然后将这些规则加入 `.babelrc` 文件中:

```
{
    "presets": [
        "latest",
        "react",
        "stage-2"
    ],
    "plugins": []
}
```
**必须先写好 .babelrc 文件很重要。**

#### 命令行转码 babel-cli
Babel 提供 babel-cli 工具, 用于命令行转码。
```
npm install --global babel-cli
```
权限问题请加 sudo 

基本用法如下:
```
# 转码结果输出到标准输出.
babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
babel example.js --out-file complied.js
# 或者
babel example.js -o complied.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
babel src --out-dir lib
# 或者
babel src -d lib

# -s 参数生成 source map 文件
babel src -d lib -s
```

这样的全局转码, 不能支持不同项目使用不同版本的 Babel. 

解决方法是将 babel-cli 安装在项目之中:

```
npm install --save-dev babel-cli
```

然后改写 `package.json` 

```
{
    "devDependencies": {
        "babel-cli": "^6.0.0"
    },
    "scripts": {
        "build": "babel src -d lib"
    },
}
```
转码的时候执行: 

```
npm run build
```

#### babel-node
这是 babel-cli 工具自带的命令, 提供一个支持 ES6 的 REPL 环境。 它支持 Node 的 REPL 环境的所有功能, 而且可以直接运行 ES6 代码。

执行 `babel-node` 进入 REPL 环境:
```
$ babel-node
>(x => x * 2)(1)
2

# 可以直接运行 ES6 脚本, 将代码放到 js 文件中即可
```
babel-node 也可以安装在项目中:

```
npm install --save-dev babel-cli
```

然后改写`package.json`:
```
{
    "scripts": {
        "scirpt-name": "babel-node script.js"
    }
}
```

#### babel-register
babel-register 模块改写了 `require` 命令, 为它加上了一个钩子函数, 每当使用 require 加载后缀为 .js、.jsx、.es 和 .es6 文件时, 都会先用 Babel 进行转码。
```
npm install  --save-dev babel-register
```

使用时, 必须先加载 babel-register 模块：
```
require("babel-register");
require("./index.js");
```
这样就不用手动对 index.js 进行转码了

#### babel-core
代码需要调用 Babel 的 API 进行转码, 就要使用 babel-core 模块：

```
npm install babel-core --save
```

参考: https://old.babeljs.io/docs/usage/api/

#### babel-polyfill
Babel 默认只转换新的 JavaScript 句法(syntax), 而不转换新的 API, 如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象, 以及一些定义在全局对象上的方法。
如果想让这个类的方法运行, 必须使用 babel-polyfill 为当前的环境提供一个垫片。

```
npm install --save babel-polyfill
```
然后在头部加入下面的代码:

```
import 'babel-polyfill';
// 或者

require('babel-polyfill');
```

babel 默认不转码的 API 非常多, 查看: https://github.com/babel/babel/blob/d45ea2e5ff713b84473010e45106d9a8671261d3/packages/babel-plugin-transform-runtime/src/definitions.js

#### 浏览器环境

#### 在线转换

#### 与其他工具配合
许多工具需要 Babel 进行前置转换, 以 ESLint 和 Mocha 为例:

ESLint 用于静态检查代码的语法和风格， 安装如下:
```
npm install --save-dev eslint babel-eslint
```

然后在根目录下新建一个 `eslintrc` 文件, 在其中加入 parser 字段:

```
{
    "parser": "babel-eslint",
    "rules": {
        ...
    }
}
```

再在 `package.json` 中加入相应的 `scripts` 脚本:
```
{
    "name": "my-module",
    "script": {
        "lint": "eslint my-files.js"
    },
    "devDependencies": {
        "babel-eslint": "...",
        "eslint": "..."
    }
}
```

Mocha 是一个测试框架, 如果需要执行使用 ES6 语法的测试脚本, 可以将 package.json 的 script.test 修改如下:

```
{
    "scripts": {
        "test": "mocha --ui qunit --compilers js:babel-core/register"
    }
}
```

上面的命令中, --compilers 参数指定脚本的转码器, 规定后缀为 .js 的文件都要使用 babel-core/resgister 先进行转码。

### Traceur 转码器
Google 公司的转码器。https://github.com/google/traceur-compiler
 
## 02 let 和 const 命令
let 用于声明, 类似 var, 但是声明的变量只在 let 命令所在的代码块内有效:
```js
{
    let a = 10;
    var b = 1;
}
```
for 循环的计时器就很适合使用 let 命令。
- 不存在变量提升:
var 命令会发生**变量提升** 的现象, 即变量可以在声明之前使用, 值为 undefined。 let 则只能在声明后使用。
- 暂时性死区:
意思是只要块级作用域内存在 let 命令, 它所声明的变量就 **绑定(binding)** 这个区域, 不受外部影响。
ES6 明确规定, 如果区块中存在 let 和 const 命令, 则这个区块对这些命令声明的变量从一开始就形成封闭作用域。只要在声明之前就使用这些变量, 就会报错。从而也就意味着 type 不是一个百分之百安全的操作。
- 不允许重复声明: let 不允许在相同的作用域内重复声明同一个变量。

### 块级作用域
ES5 只有全局作用域和函数作用域, 没有块级作用域。带来了很多场合不合理。
ES6 为 JavaScript 新增了块级作用域。
- 允许块级作用域的任意嵌套。
- 外层作用域无法读取内层作用域的变量。
- 内层作用域可以定义外层作用域的同名变量。
### 块级作用域与函数声明
ES5 规定, 函数只能在顶层作用域和函数作用域之中声明, 不能在块级作用域声明。
ES6 引入了块级作用域(下面 3 条只针对 ES6 的浏览器实现有效。并且允许声明函数的规则只在使用大括号时成立):
- 明确允许在块级作用域之中声明函数。类似 let, 在块级作用域中不能引用。
- 函数声明类似于 var, 即会提升到全局作用域或者函数作用域头部。
- 同时, 函数声明还会提升到所在的块级作用域的头部。
因为环境导致的差异, 应该避免在块级作用域内声明函数。如果确实需要, 也应该写成函数表达式的形式, 而不是函数声明的形式。

### const 命令
声明一个只读常量, 作用域与 let 命令相同, 只在声明所在的块级作用域内有效。不会提升，只能在声明后使用。
本质: 保证的并不是变量的值不得改动, 而是变量指向的那个内存地址不能改动。

### ES6 声明变量的 6 种方法
- var 
- function
- const
- let 
- import
- class
关于顶层对象的属性, 为了保持兼容 var 和 function 声明的全局变量依旧是顶层对象属性。而 let、const、class、声明的变量不属于顶层对象的属性。

global 对象。


## 03 变量的解构赋值
解构: ES6 允许按照一定模式从数组和对象中提取值, 然后对象进行赋值。 就称为解构！

新的写法, **模式匹配**: 只要等号两边的模式相同, 左边的变量就会被赋予对应的值。如使用嵌套数组进行解构的例子:
```js
let [foo, [[bar], barz]] = [1,[[2], 3]];
foo // 1
bar // 2
barz // 3
```
如果解构不成功, 变量的值就等于 undefined 。

- 不完全解构, 即等号左边的模式只匹配一部分的等号右边的数组。 这种仍可以匹配成功:
```js
let [x, y] = [1,2,3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```
如果等号右边的不是数组(或者严格来说是不可遍历的结构)， 那么将会报错。

对于 Set 结构, 也可以使用数组的解构赋值。

```js
let [x, y, z] = new Set(['a','b','c']);
x // "a"
```

只要某种数据结构具有 Iterator 接口, 都可以采用数组形式的解构赋值。

- 解构赋值运行指定默认值. 需要用 undefined 进行判断, 一个数组成员不严格等于 undefined , 默认值是不会生效的。

### 对象的解构
与数组不同, 数组的元素是按次序排列的, 变量的取值是由它的位置决定的； 而对象的属性没有次序, 变量必须与属性同名才能取到正确的值。

如果变量名与属性名不一致, 必须写成下面的这样:
```js
var {foo: baz} = {foo: 'aaa', bar: 'bbb'};
baz    // "aaa"

let obj = {first: 'hello', last: 'world'};
let {first: f, last: l} = obj;

f   // "hello"
l   // "world"
```
后面的才是变量

另一个例子:
```js
var node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
};

var {loc, loc: {start}, loc{start: {line}}} = node;
line    // 1
loc     // Object {start； Object}
start   // Object {line: 1, column: 5}
```
有三次解构赋值, 分别是对 loc、start、line 三个属性的解构赋值。需要注意的是最后一次对 line 属性的解构赋值之中, 只有 line 是变量, loc 和 start 都是模式, 不是变量

对象的解构也可以指定默认值, 默认值生效的条件是, 对象的属性值严格等于 undefined。 如果解构失败, 变量的值等于 undefined。

如果解构模式是嵌套的对象, 而且子对象所在的父属性不存在, 那么将会报错。
```js
// 报错
let {foo: {bar}} = {baz: "baz"}
```

如果要将一个已经声明的变量用于解构赋值, 必须小心:

```js
// 错误的写法
let x;
{x} = {x:1};
// SyntaxError: syntax error

// 上面的代码因为 JavaScript 引擎会将 {x} 理解成一个代码块,从而发生语法错误。
// 正确的写法
let x;
({x} = {x:1});
```
### 数组解构
由于数组本质是特殊的对象, 因此可以对数组进行对象属性的解构。
```js
let arr = [1, 2, 3];
let {0:first, [arr.length - 1]: last} = arr;

first   // 1
last    // 3
```

字符串解构, 类似数组都有一个 .length 属性

###　数值和布尔值的解构赋值
解构赋值时,　如果等号右边是数值和布尔值,　则会先转为对象。
```js
let {toString: s} = 123;
s === Number.prototype.toString     // true

let {toString: s} = true;
s === Boolean.prototype.toString    // true
```
数值和布尔值的包装对象都有　toString 属性, 因此变量 s 都能取到值。

**解构赋值的规则是: 只要等号右边的值不是对象或者数组, 就先将其转为对象。** 由于 undefined 和 null 无法转为对象. 就会报错

### 函数参数的解构赋值
函数的参数也可以使用解构赋值。
```js
function add([x, y]) {
    return x + y;
}

add([1,3]);     // 4   
```
### 括号问题
只要有可能, 就不要在模式中放置圆括号。

不能使用括号的情况：
- 1.变量声明语句:
    ```js
    // 全部报错
    
    let [(a)] = [1];
    
    let {x: (c)} {};
    let ({x: c}) = {};
    let {(x: c)} = {};
    let {(x): c} = {};

    let {o: ({p: p})} = {o: {p: 2}}; 
    ```
    上面的 6 个语句都会报错, 因为它们都是变量声明语句, 模式不能使用圆括号。
- 2.函数参数
        
    函数参数也属于变量声明, 因此不能使用圆括号。
- 3.赋值语句的模式
    ```js
    // 全部报错
    ({p: a}) = {p: 42};
    ([a]) = [5];

    // 上面的代码将整个模式放在圆括号内, 导致错误。
    // 下面也如此
    [({p: a}), {x: c}] = [{}, {}];
    ```

可以使用圆括号的情况只有一种: 赋值语句的非模式部分可以使用圆括号。
```js
[(b)] = [3];    // 正确
({p: (d)} = {});// 正确
[(parseInt.prop)] = [3];    // 正确
```
上面 3 行语句都可以正确执行, 因为它们都是赋值语句, 而不是声明语句, 另外它们的圆括号都不属于模式的一部分。

### 用途
变量解构赋值的用途很多。
- 交换变量的值
    ```js
    let x = 1;
    let y = 2;

    [x,y] = [y, x];
    ```
- 从函数返回多个值
    
    函数只能返回一个值, 如果要返回多个值, 只能将它们放在数组或对象里返回。有了解构赋值, 取出这些值就非常方便了。
    ```js
    // 返回一个数组
    function example() {
        return [1, 2, 3];
    }

    let [a, b, c] = example();

    // 返回一个对象
    function example() {
        return {
            foo: 1,
            bar: 2
        };
    }

    let {foo, bar} = example();
    ```
- 函数参数的定义

    解构赋值可以方便地将一组参数与变量名对应起来。
    ```js
    // 参数是一组有次序的值
    function f([x, y, z]) {...}
    f([1,2,3]);

    // 参数是一组无次序的值
    function f({x, y, z}) {...}
    f({z: 3, y: 2, x: 1});
    ```
- 提取 JSON 数据

    解构赋值对提取 JSON 对象中的数据尤其有用。
    ```js
    let jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5432]
    };

    let {id, status, data: number} = jsonData;

    console.log(id, status, number);    // 42, "OK", [867, 5432]
    ```
- 函数参数的默认值
    ```js
    jQuery.ajax = function(url, {
        async = true,
        beforeSend = function() {},
        cache = true,
        complete = function() {},
        crossDomain = false,
        global = true,
        // ...more config
    }) {
        // ... do stuff
    };
    ```
    指定参数的默认值, 避免了在函数体内部再写 `var foo = config.foo || 'default foo';` 这样的语句。

- 遍历 Map 结构

    任何不部署了 Iterator(迭代器) 接口的对象都能用 for...of 循环遍历。 Map 结构原声支持 Iterator 接口, 配合变量的解构赋值获取键名和键值就非常方便了。
    ```js
    var map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
        console.log(key + " is " + value);
    }

    // first is hello
    // second is world
    ```

- 输入模块的指定方法

    加载模块时, 往往需要指定输入的方法。 解构赋值使得输入语句非常清晰。 

    ```js
    const {SourceMapConsumer, SourceNode } = require("source-map"); 
    ```

## 04 字符串的扩展

## 05 正则的扩展

## 06 数值的扩展

## 07 函数的扩展
在 ES6 之前, 不能直接为函数的参数指定默认值。只能采用通用的方法。为了避参数等于空字符，结果被改为默认值。通常需要先判断一下参数 y 是否被赋值, 如果没有再令其等于默认值。

参数变量是默认声明的, 不能使用 let、const 再次声明。
```js
function foo(x = 5) {
    let x = 1;  // error
    const x = 2;    // error
}
```
参数变量是默认声明的, 在函数体中不能使用 let 或 const 再次声明, 否则会报错。
使用默认参数时, 参数名不能有同名参数。

### 与解构赋值默认值结合使用
参数默认值可以与解构赋值的默认值结合起来使用。
```js
function foo({x, y = 5}) {
    console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2})   // 1, 2
foo()   // Uncaught TypeError: Cannot destructure property `x` of 'undefined' or 'null'.
// 原因是就 foo 函数的参数为对象是才解构赋值, 否则会报错
```

对象解构赋值的例子:

```js
function fetch(url, {body = '', method = "GET", headers = {}}){
    console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错
```
如果函数 fetch 的第二个参数是一个对象, 就可以为它的 3 个属性设置默认值。

可以结合函数参数的默认值, 省略第二个参数：
```js
function fetch(url, {method = 'GET'} = {}) {
    console.log(method);
}

fetch('http://example.com')
// "GET"
```

#### 默认参数的位置
通常, 定义了默认值的参数应该是函数的尾参数。 因为这样比较容易看出到底省略了哪些参数。 如果非尾部的参数设置默认值, 实际上这个参数是无法省略的。

####　函数的　length 属性
指定了默认值后, 函数的 length 属性将返回没有指定默认值的参数个数。也就是说, 指定了默认值后, length 属性将失真。
```js 
(function (a) {}).length    // 1
(function (a = 5) {}).length    // 0
```
如果设置了默认值的参数不是尾参数(最后一个), 那么 length 属性也就不再计入后面的参数了。
```js
(function (a = 0, b, c) {}).length  // 0
(function (a, b = 1, c) {}).length  // 1
```

#### 作用域
一旦设置了参数的默认值, 函数进行声明初始化时, 参数会形成一个单独的作用域(context)，等到初始化结束，这个作用域就会消失。

感觉明白了作用域, 其实也差不多, 如果参数没有设置默认值时, 单独作用域找不到变量， 就会去上层的作用域(直至全局作用域) 中找，没有则报错。

如果参数的默认值是一个函数, 该函数的作用域也遵守这个规则。
```js
let foo = 'oouter';

function bar(func = x => foo) {
    let foo = 'inner';
    console.log(func());
}
bar();      // outer
```
函数 bar 的参数 func 的默认值是一个匿名函数, 返回值为变量 foo 。 函数参数形成的单独作用域(即匿名函数的作用域)里面并没有定义变量 foo， 所以指向外层的全局变量 foo.

下面一个更复杂的例子:

```js
var x = 1;
function foo(x, y = function() {x = 2;}) {
    var x = 3;
    y();
    console.log(x);
}

foo()   // 3
x       // 1
```
函数 foo 的参数形成一个单独作用域, 这个作用域中首先声明了变量 x, 然后声明了变量 y 。 y 的默认值是一个匿名函数, 这个匿名函数内部的变量 x 指向同一个作用域的第一个参数 x 。函数 foo 内部又声明了一个内部变量 x, 该变量与第一个参数 x 由于不是同一个作用域, 所以不是同一个变量, 因此执行 y 后, 内部变量 x 和外部全局变量 x 的值都没有变。
要明白这里运行时, 是有三个作用域的， 全局作用域、foo 内部作用域、匿名函数作用域。应该就能理解, 刚开始看这段文字的时候, 真的懵逼. 然后分别在三个作用域里, console.log 就明白了。

#### 应用
利用参数默认值可以指定某一个参数不得省略, 如果省略就抛出一个错误。

```js
function throwIfMissiong() {
    throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
}

foo();      //  Error: Missing parameter
```
如果调用的时候没有参数, 以上代码中的 foo 函数就会调用默认值 throwIfMissing 函数, 从而抛出一个错误。

### rest 参数
ES6 引入了 rest 参数(形式为 “... 变量名”)，用于获取函数的多余参数, 这样就不需要使用 arguments 对象了，rest 参数搭配的变量是一个数组, 该变量将多余的参数放入其中。 
```js
function add(...values) {
    let sum = 0;

    for (var val of values) {
        sum += val;
    }

    return sum;
}

add(1,2,3)  // 6
```
利用 rest 参数, 可以向该函数传入任意数目的参数。 

下面是一个 rest 参数代替 arguments 变量的例子。
```js
// arguments 变量的写法
function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}

// rest 参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

rest 之后不能有其他参数, 即它只能是最后一个参数。否则会报错！ 函数的 length 属性不包括 rest 参数。

### 严格模式
ES5 开始, 函数内部可以设定为严格模式。 
```js
function doSomething(a,b) {
    'use strict';

    // code
}
```
ES6 中做了一些修改, 规定只要函数参数使用了默认值、解构赋值或者拓展运算符, 那么函数内部就不能显式设定为严格模式, 否则就会报错。
原因是, 函数内部的严格模式同时适用于函数体和函数参数。 

两个方法可以避规这种限制:
- 1.设定全局性的严格模式,这是合法的
    ```js
    'use strict';

    function soSomething(a, b = a) {
        // code
    }
    ```
- 2.把函数包在一个无参数的立即执行函数里面
    ```js
    const soSomething = (function() {
        'use strict';
        
        return function(value = 666) {
            return value;
        };
    }());
    ```
### name 属性
函数的 name 属性返回该函数的函数名。这个属性早就被浏览器支持, 直到 ES6 才写入标准。

ES6 中有修改, 如果将匿名函数赋值给一个变量, ES5 中的 name 返回一个空字符串, ES6 的 name 属性返回实际的名字。

Function 构造函数返回的函数实例, name 属性的值为 anonymous。

bind 返回的函数，name 属性值会加上 bound 前缀。

### 箭头函数
ES6 允许使用**箭头** `=>` 定义函数。
`var f = v => v;`
上面的箭头函数等效于:
```js
var f = function(v) {
    return v;
};
```
- 箭头函数不需要参数或需要多个参数, 就使用圆扩号代表参数部分。
- 箭头函数的代码块部分多于一条语句, 就要使用大括号将其括起来, 并使用 return 语句返回。
- 箭头函数直接返回一个对象, 必须在对象外面加上括号。
    ```js
    var getTempItem = id => ({id: id, name: "Temp"});
    ```
- 箭头函数可以与变量解构结合使用。
    ```js
    const full = ({first, last}) => first + ' ' + last;

    // 等同于
    function full(person) {
        return person.first + ' ' + person.last;
    }
    ```
箭头函数的一个用处是简化回调函数:
```js
// 正常函数的写法
[1,2,3].map(function(x) {
    return x * x;
});

// 箭头函数的写法
[1,2,3].map(x => x * x);
```

下边是 rest 参数与箭头函数结合的例子:
```js
const numbers = (...nums) => nums;

numbers(1,2,3,4,5);      // [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail;]

headAndTail(1,2,3,4,5);     // [1,[2,3,4,5]] 
```
#### 注意事项
箭头函数有一下几个注意事项:
- 1.函数体内的 this 对象就是定义时所在的对象, 而不是试用时所在的对象。
- 2.不可以当作构造函数。也就是说, 不能使用 new 命令, 否则会抛出一个错误
- 3.不可以使用 arguments 对象，该对象在函数体内不存在, 如果要用, 可以用 rest 参数代替。
- 4.不可以使用 yield 命令, 因此箭头函数不能用作 Generator 函数。



## 08 数组的扩展

## 09 对象的扩展

## 10 Symbol 

## 11 Set 和 Map 数据结构

## 12 Proxy

## 13 Reflect

## 14 Promise 对象

## 15 Iterator 和 for...of 循环

## 16 Generator 函数的语法

## 17 Generator 函数的异步应用

## 18 async 函数

## 19 Class 的基本语法

## 20 Class 的继承

## 21 修饰器

## 22 Modele 的语法

## 23 Module 的加载实现

## 24 编程风格
- http://jscs.info/
- https://github.com/airbnb/javascript
### 块级作用域
**let 取代 var**
```js
`use strict`;

if(true) {
    let x = 'hello';
}

for( let i = 0; i < 10; i++) {
    console.log(i);
}
```
反正使用 let 就完事了。

**全局变量和线程安全**
let 和 const 之间优先使用 const, 尤其是在全局环境中, 不应该设置变量, 只应该设置常量。
const 优于 let 有一下几个原因。
- const 可以设置提醒阅读程序的人, 这个变量不应该改变。
- const 比较符合函数变成思想, 运算不改变值, 只是新建值, 而且这样有利于将来的分布式运算。
- JavaScript 编译器会对 const 进行优化, 所以多使用 const 有利于提供程序的运行效率， let 和 const 的本质区别其实就是编译器内部的处理不同。
```js
const [a, b, c] = [1, 2, 3];
```

### 字符串
静态自妇产一律使用 单引号或者反引号, 不要使用双引号。 
动态字符串使用反引号。
```js
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable 可接受
const a = `foobar`;

// good 
const a = 'foobar';
const b = `foo${a}bar`;
const c = 'foobar'; 
```

### 解构赋值
使用数组成员对变量赋值时, 优先使用解构赋值。
```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

函数的参数如果是对象的成员, 优先使用解构赋值:
```js
// bad
function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
}

// good 
function getFullName(obj) {
    const { fisrtName, lastName} = obj;
}
```

## 25 读懂 ECMAScript 规范

## 26 ArrayBuffer

