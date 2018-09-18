# Sass 相关
相对于 Less 来说更友好一点。

参考网站: 
- 官网: https://sass-lang.com/
- 中文网: https://www.sass.hk/
- 阮一峰: http://www.ruanyifeng.com/blog/2012/06/sass.html (有了这篇文章日常的基本操作就不用看官网文档)

## 安装
SASS 是 Ruby 语言写的，但是两者的语法没有关系。所有第一步是安装 Ruby。

- https://www.sass.hk/install/

我是在 Ubuntu 16.04 下.

```
sudo apt-get install ruby

ruby -v
ruby 2.3.1p112 (2016-04-26) [x86_64-linux-gnu]
```
我装的时候出现了错误, 直接谷歌解决就行。

已经安装好了 Ruby，接着在命令行输入下面的命令(权限问题加 sudo))：
```
sudo gem install sass    

sass -v 
Ruby Sass 3.5.7
```
顺带装一下 compass:
```
sudo gem install compass

compass -v
Compass 1.0.3 (Polaris)
```

## 使用(编译)
可以使用 [koala 这个神器的东东](http://koala-app.com/)。
使用 Sass 的方法去创建样式, 需要编译成 普通 的 CSS 才能用。编译的方法很多。

Sass 语法比较恶心，像 python 一样没有花括号，也不让写分号，python 这样我还能理解。  推荐用 scss.
