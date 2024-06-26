# 喵仔修仙插件

![热开发工具效果](./resources/demo/purple.jpg)

## 部署

这是 Yunzai V4 插件

- 安装项目

miao-yunzai 目录

```sh
git clone  --depth=1 https://github.com/ningmengchongshui/xiuxian-plugin.git ./plugins/xiuxian-plugin
# 进入xiuxian
cd ./plugins/xiuxian-plugin
```

或者 plugins 目录中执行

```sh
cd ./plugins
```

```sh
git clone  --depth=1 https://github.com/ningmengchongshui/xiuxian-plugin.git
```

```sh
# 进入xiuxian
cd ./xiuxian-plugin
```

- 安装依赖

```sh
npm install pnpm -g
pnpm install
```

## 进行

- 开始游戏

发送`/个人信息`开启存档并展示游玩指令

- 更新游戏

当更新后发现错误数据时

可由玩家发送`/修复数据`

## 开发

- 启动 接口 服务

```sh
npm run koa:dev
```

后端地址 `http://localhost:9090/api`

- 后端负载均衡

```sh
npm run koa:build #编译
npm run start #后台运行
npm run kill #杀死进程
```

- 启动 web 服务

> 请阅读 web 分支

## 优势

该仓库使用一系列的现代化开发工具，确保问题能在开发时就能解决！

对于图片的开发，采用了 tsx&koa&nodemon 的结合，不仅能热开发图片，还自制了`puppeteer`截图工具，确保机器人进行截图时能完美的保持原有效果。

我们更倾向于项目的使用人员是游戏管理员，为此设计的 WEB 管理系统将有利于你更好的运营游戏

## 商用

> 该插件允许自由安装修改,插件内的素材部分来自网络,在商用前,请自行替换素材

> 该仓库有强烈的版权诉求,禁止除作者外,任意以仓库开发成员，团队名义或有损成员权益的行为作为商用噱头

## 联系

Bot Dev QQ-Group 806943302
