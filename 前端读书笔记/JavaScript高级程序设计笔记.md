>莎士比亚曾经说过：“好记性不如烂笔头。”

# 第六章 面向对象的程序设计
## 6.1 理解对象
### 两种属性
- 1.数据属性(4 个特性):
    - `[[Configurable]]`：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性。
    - `[[Enumerable]]`：表示能否通过 for-in 循环返回属性。
    - `[[Writeable]]`：表示能否修改属性的值。
    - `[[Value]]`：包含这个属性的数据值。

- 2.访问器属性(4 个特性):
    - `[[Configurable]]`：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为数据属性。
    - `[[Enumerable]]`：表示能否通过 for-in 循环返回属性。
    - `[[Get]]`：在读取属性时调用的函数。
    - `[[Set]]`：在写入属性时调用的函数。

读取属性的特性:
- Object.defineProperty() 
- Object.defineProperties()
- Object.getOwnPropertyDescriptor()

## 6.2 理解并创建对象
- 1.工厂模式

    解决了 Object 构造函数或者对象字面量创建单个对象时, `使用同一个接口创建很对对象, 产生大量的重复代码`。但没有解决对象的识别问题(即怎样知道一个对象的类型)，会有新的模式诞生。
    ```js
    function createPerson(name, age, job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function() {
            console.log(this.name);
        }
        return o;
    }

    var p1 = createPerson("DYJ", "28", "Angel investment");
    var p2 = createPerson("DBZ", "18", "Student");
    ```
- 2.构造函数模式(首字母大写)

    构造函数可以用来创建特定类型, 如 `Object`、`Array` 这样的原生构造函数。 
    ```js
    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function () {
            console.log(this.name);
        }
    }

    var person1 = new Person("DYJ", "28", "Angel investment");
    var person2 = new Person("DBZ", "18", "Student");

    /* p1、p2 分别保存着 Person 的一个不同的实例, 这两个对象都有一个 constructor 属性, 指向 Person */
    
    console.log(p1.constructor);  /* function Person(name, age, job) {... */

    ```

    与工厂模式不同的是:
        - 1.没有显示的创建对象
        - 2.直接将属性和方法赋给了 this 对象
        - 3.没有 return 语句
    这种方法会经历 4 个步骤:
        - 1.创建一个新对象
        - 2.将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象)
        - 3.执行构造函数中的代码(为这个新对象添加属性)
        - 4.返回新对象

    检测对象还是用 `instanceof` 可靠一点。
    ```js
    alert(person1 instanceof Object); /* true 对象均继承 Object */
    alert(person1 instanceof Person); /* true */
    alert(person2 instanceof Object); /* true */
    alert(person2 instanceof Person); /* true */
    ```
    存在的问题: 使用构造函数的主要问题, 就是每个方法都要在每个实例里面重新创建一遍。

    虽然说可以在构造函数外部来定义我们的方法。 但是引来了新的问题: 在全局作用域中定义的函数实际上值能被某个对象调用, 如果对象需要定义很多方法的话, 那么就需要定义很多个全局函数。这样一来这个自定义的引用类型就没有封装性可言了。(原型模式则解决了这个问题)！

- 3.原型模式

    首先我们创建的每个函数都有一个 `prototype` (原型)属性, 这个属性是一个指针, 指向一个对象, 该对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

    使用原型对象的好处就是: 可以让所有对象实共享它所包含的属性和方法，(换句话说, 不必在构造函数中定义对象实例的信息, 而是可以将这些信息直接添加到原型对象中)。

    ```js
    function Person() {

    }

    Person.prototype.name = "DYJ";
    Person.prototype.name = 28;
    Person.prototype.job = "Angel investment";
    Person.prototype.sayName = function() {
        alert(this.name);
    };

    var person1 = new Person();
    person1.sayName();  /* DYJ */

    var person2 = new Person();
    person2.sayName();  /* DYJ */

    alert(person1.sayName == person2.sayName); /* true */
    
    ```

    理解原型对象:
    - 只要创建一个新函数, 就会根据一组特定的规则为该函数创建一个 `prototype` 属性, 指向原型对象。
    - 在默认情况下, 所有原型对象都会自动获得一个 `constructor` (构造函数) 属性, 这个属性是一个指向 `prototype` 属性所在函数的指针。
    - 当调用构造函数创建一个新实例后, 该实例的内部将包含一个指针( **[[Prototype]]** 内部属性), 指向构造函数的原型对象 (Object) 。
        
        - 没有标准的访问 **[[Prototype]]**, 但在 Firefox、Safari、Chrome 在每个对象上都支持一个属性 `__proto__`。重要的一点是**这个连接存在与实例与构造函数的原型对象之间, 而不是存在与实例与构造函数之间**。
    - 实例和构造函数之间没有直接关系。
    - 通过 `isPrototype()` 来检测构造函数和实例之间是否有关系。
    - 当代码读取某个属性时, 都会执行一次搜索, 目标是具有给定名字的属性。先从对象实例开始, 没有没有找到则搜索原型对象。
    - 原型最初只包含 `constructor` 属性, 而该属性也是共享的，因此可以通过对象实例访问。
    - 为对象添加一个属性时, 这个属性就会**屏蔽**原型对象中保存的同名属性，换句话说这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。使用 `delete` 可以完全删除实例属性, 从而能够重新访问原型中的属性。
    - 使用 `hasOwnPrototype()` 来检测属性存在于实例中还是原型中。该方法是从 Object 继承来的
    - 原型与 in 操作符(两种方式使用 in 操作符)
        
        - 1.在 `for-in` 循环中使用。
        - 2.单独使用。 单独使用时, in 操作符会在通过对象能够访问给定属性时返回 true。
        - 3.无论属性存在于实例中还是存在于原型中, 同时使用 `hasOwnProperty()` 方法和 in 操作符, 就能确定该属性到底是存在于对象中, 还是存在于原型中。如下:
        ```js
        function hasPrototypeProperty(object, name){|
            return !object.hasOwnProperty(name) && (name in object);
        }
        ``` 
    - 用对象字面量重写原型对象。每添加一个属性和方法都要敲一遍 `Person.prototype`。对象字面量重写:
        ```js
        function Person{
        }

        Person.prototype = {
            constructor: Person,  /* 这里重写了 prototype, 不在默认有 constructor 属性 */
            name : "DYJ",
            age : 28,
            job : "Angel investment",
            sayName : function() {
                alert(this.name);
            }
        };
        ``` 
        重设 `constructor` 属性会导致它的 [[Enumerable]] 特性被设置为 true。默认是不可枚举的，因此可以试试:
        ```js
        /* 重设构造函数, 只适用于 ECMAScript5 兼容的浏览器 */
        Object.defineProperty(Person.prototype, "constructor", {
            enumerable: false,
            value: Person
        });
        ```
    - 组合使用构造函数和原型模式时, 使用构造函数定义实例属性, 而使用原型定义共享的属性和方法。
    - *动态原型模式、寄生构造函数模式、稳妥构造函数模式。





## 6.3 理解继承
JavaScript 主要是通过原型链继承。原型链的构建是通过将一个类型的实例赋值给另一个构造函数的原型的实现。

### 原型链的基本概念
**原型链的基本概念**: 基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。构造函数＆原型＆实例的关系:　每个构造函数都有一个原型对象, 原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。　如果让原型对象等于另一个类型的实例, 结果会怎么样呢？　此时的原型对象将包含一个指向另一个原型的指针,　相应的, 另一个原型中也包含着一个指向另一个构造函数的指针。　假如另一个原型又是另一个类型的实例, 如此层层递进,　就构成了实例与原型的链条。

别忘了默认的原型: 所有函数的默认原型都是 Object 的实例, 因此默认原型会包含一个内部指针, 指向 Object.prototype。正因如此所有自定义类型都会继承 toString()、valueOf() 等默认方法的根本原因。

确定原型和实例的关系: 两种方法`instanceof()` 和 `isPrototypeOf()`。

谨慎的定义方法: 使用字面量添加新方法的时候, 


原型链的问题是: 
- 1。对象实例共享所有继承的属性和方法(主要包含了引用类型值的原型), 因此不宜单独使用。包含引用类型值的原型属性会被所有实例共享, 这也是为什么要在构造函数中, 而不是在原型对象中定义属性的原因。
- 2.在创建子类型的实例时， 不能向超类的构造函数中传递参数。实际上, 应该说是在不影响所有对象实例的情况下, 给超类型的构造函数传递参数。所以很少会单独使用原型链。

解决这个问题的技术是借用构造函数, 即在子类型构造函数的内部调用超类型构造函数。最多的继承模式是组合继承, 该模式使用原型链继承共享的属性和方法，　而通过借用构造函数继承实例属性。

- 1.JavaScript 中最常用的继承：组合继承(伪经典继承)。融合了原型链和构造函数的优点。
    ```js
    function SuperType(name) {
        this.name = name;
        this.color = ['red','blue','green'];
    }

    SuperType.prototype.sayName = function() {
        console.log(this.name);
    }

    function SubType(name, age) {
        SuperType.call(this, name); /* 借用构造函数 */
        this.age = age;
    }
    SubType.prototype = new SuperType();  /* 原型继承 */
    SubType.prototype.constructor = SubType; /* constructor 在上一句中被重写 */
    SubType.prototype.sayAge = function() {
        console.log(this.age);
    }

    var instance1 = new SubType("DYJ", 28);
    instance1.sayName();    /* DYJ */
    instance1.sayAge();     /* 28 */
    ```
- 2.原型式继承、寄生式继承、寄生组合式继承。


# 第七章 函数表达式
定义函数的两种方式：
- 函数声明: 重要特征, ***函数生命提升*, 即在执行代码之前会先读取函数声明。
- 函数表达式: 最常见， **匿名函数**(也叫拉姆达函数), 即 function 后面没有标识符。

## 7.1 递归
在一个函数通过名字调用自身的情况下构成的, 如下所示:
```js
function factorial(num) {
    if(num <= 1) {
        return 1;
    }else {
        return num * factorial(num - 1);
    }
}
```
这是一个经典的递归阶乘函数。

如果中途 factorial 被设为 null。 那么再次调用就会出错。 可以使用 `arguments.callee` 代替函数。严格模式下不能通过 `arguments.callee` 访问。不过可以使用命名函数表达式来达成相关的结果:
```js
var factorial = (function f(num) {
    if(num <= 1) {
        return 1;
    }else {
        return num * f(num - 1);
    }
});
```
这样就创建了一个名为 f() 的命名函数表达式, 然后将它赋值给变量 factorial 。即把函数赋值给另一个变量。

## 7.2 闭包
要清楚**闭包**和**匿名函数**的区别.
- 闭包, 是指有权访问另一个 函数作用域 中的变量的函数。当在函数内部定义了其他函数时, 就创建了闭包。
- 匿名函数，上面提到了, 是 function 关键字后面没有 标识符。

作用域链: 当代码在一个环境中执行时, 会创建变量对象的一个**作用域链**。 作用域链的用途就是,保证对执行环境有权访问的所有变量和函数有序访问。

前面第四章关于 执行环境 的总结(作用域链见4.2):
- 执行环境有全局执行环境(也称为全局环境)和函数执行环境之分。
- 每次进入一个新执行环境,都会创建一个用于搜索变量和函数的作用域链。
- 函数的局部环境不仅有权访问函数作用域中的变量, 而且有权访问其包含(父)环境,乃至全局环境。
- 全局环境只能访问在全局环境中定义的变量和函数, 而不能直接访问局部环境中的任何数据。
- 变量的执行环境有助于确定应该何时释放内存。

当某个函数被调用时, 会创建作用域一个执行环境(execution context)及相应的作用域链。然后使用 arguments 和其他命名参数的值来初始化函数的活动对象(activation object)。作用域链的终点即全局执行环境。

作用域链的本质：是一个指向变量对象的指针列表, 它引用但不实际包含变量对象。

一般来讲, 当函数执行完毕后，局部活动对象就会被销毁,内存中仅保存全局作用域(全局执行环境的变量对象)。但是闭包的情况又有所不同。

闭包只能取得包含函数中任何变量的最后一个值:
```js
function createFunction() {
    var result = [];
    for(var i = 0; i < 10; i++) {
        result[i] = function() {
            return i;
        };
    }
    return result;
}

console.log(createFunction()[0]());
console.log(createFunction()[1]());
```

### 关于 this 对象
this 对象是在运行时基于函数的执行环境绑定的： 在全局函数中, this 等于 window; 而当函数被作为某个对象的方法调用时, this 等于那个对象。

匿名函数的执行环境具有全局性, 因此其 this 对象通常指向 window。
```js
var name = "The Window";

var object = {
    name : "My Object",

    getNameFunc : function() {
        return function() {
            return this.name;
        };
    }
};

console.log(object.getNameFunc()());  /* The Window (在非严格模式下) */
```

## 7.3 模仿块级作用域
用匿名函数来模仿块级作用域, 第一个括号的作用是将函数声明转换成函数表达式(函数声明不能通过后面加括号来调用)，第二个括号来调用这个函数。

用作块级作用域(通常称为**私有作用域**)。

这段代码会出现语法错误:
```js
function() {
    /* 这里是块级作用域 */
}();    /*  出错！ */
```
这段代码会导致语法错误, 是因为 JavaScript 将 function 关键字当作一个函数声明的开始, 而函数声明后面不能跟圆括号。然而, 函数表达式则可以跟圆括号。要将函数声明转换为函数表达式的话, 像下面这样加括号即可。

块级作用域:
```js
(function() {
    /* 这里是块级作用域 */
})();
```
上面的代码定义并且立即调用了一个匿名函数。将函数声明包含在一对圆括号中, 表示它实际上是一个函数表达式。 而紧随身后的另一对圆括号会立即调用这个函数。
## 7.4 静态对象
- 1.在任何函数中定义的变量, 都可以认为是私有变量。(因为不能在函数外部访问这些变量)。
- 2.有权访问私有变量和私有函数的公有方法称为特权方法。
    - 在构造函数中定义特权方法.
        ```js
        function MyObject() {
            /* 私有方法和私有函数 */
            var privateVariable = 10;

            function privateFunction() {
                return false;
            }

            /* 特权方法 */
            this.publicMethod = function() {
                privateVariable++;
                return privateFunction();
            }
        }
        ```

# 第八章 BOM

# 第九章 