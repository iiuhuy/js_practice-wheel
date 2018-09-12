# Echarts 学习笔记①
有天突然在 羡辙 的微博上, 看到她和 钰猫 在 B站上出了 ECharts 相关的视频。 emmm, 赶紧去学习了一下。 [B站传送门](https://www.bilibili.com/video/av31172702?t=613)

## 搭建本地环境
- fork ECharts 仓库项目: https://github.com/apache/incubator-echarts
- 还需要 fork zrender 这个库 https://github.com/ecomfe/zrender

- 将两个项目放到同一个目录下,  然后 
```
cd incubator-echarts
npm i
```

- 接下来需要做的事情是, 把 echarts 下面的 zrender 给删除；
```
rm -rf node_modules/zrender
```

- 然后把它软链接到下载的 zrender 项目:
```
ln -s /media/alvinmi/Data/1_alvinmi/ECharts_Practice/zrender /media/alvinmi/Data/1_alvinmi/ECharts_Practice/incubator-echarts/node_modules/zrender
```

- 这个路径根据自己存放 clone 到本地项目的路径为准。最后验证一下, 看是否能够打出 `node_modeles/zrender` 目录:
```
ls node_modules/zrender
```

会有以下这些文件:
```
404.html  build  dist  index.html  index.js  jsdoc.json  LICENSE  package.json  README.md  src  test  zrender.all.js
```

这样本地的环境就算搭建完成了。Ubuntu 16.04 & MAC-OS 是没问题的。Windows 下命令不一样。

## 运行
如果需要运行的话：

```
node build/build.js
```
我 build 的时候, 报了一个错: `Error: Cannot find module 'rollup'`，然后需要安装以下这个包:

```
npm install rollup --save 
```

再重新 `node build/build.js`。
这样的一个操作会把 echarts 是源代码进行解析, 生成到 echarts 的 dist 目录下. 目前生成的名字就是 `echarts.js` 文件。 你是用 vscode 的话, 也可以看到当前目录下, 只有 echarts.js & echarts.js.map 文件是更新的。

现在去 test 目录下, 去运行一个例子。然后可以看到它会 `require` echarts, 这个 echarts 就是刚刚生成的 echarts.js 文件。

