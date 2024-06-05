# 修仙管理页

## 部署

- 安装项目

```sh
git clone  --depth=1 -b web https://gitee.com/ningmengchongshui/xiuxian-plugin.git ./xiuxian-web
```

```sh
cd ./xiuxian-web
```

- 安装依赖

选择你可以执行的工具进行加载

```sh
npm install yarn -g
yarn
```

```sh
# 或者
npm install pnpm -g
pnpm install
```

```sh
# 或者
npm install cnpm -g
cnpm install
```

- 执行打包

打包生产 `index.js`

```sh
npm run build
```

- 启动 WEB 管理器

```sh
npm run dev
```

地址 `http://localhost:5173/`

账户密码 `123456`

- 前端负载均衡

对项目进行打包后

使用 Nginx 部署 dist 目录即可

```sh
npm run build #打包
```

## 商用

> 该插件允许自由安装修改,插件内的素材部分来自网络,在商用前,请自行替换素材

> 该仓库有强烈的版权诉求,禁止除作者外,任意以仓库开发成员，团队名义或有损成员权益的行为作为商用噱头

## 联系

Bot Dev QQ-Group 806943302
