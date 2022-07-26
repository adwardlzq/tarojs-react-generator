# tarojs-react-generator

> Taro 页面/组件创建工具，使用函数式组件+typescript



## 安装

在 Taro 项目根目录下安装

```bash
$ npm i tarojs-react-generator --save
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro3 的最新版本。

修改项目 `config/index.js` 中的 plugins 配置为如下

```js
const config = {
  ...
  plugins: [
    ...其余插件

    'tarojs-react-generator'
  ]
  ...
}
```

```js
//可配置css编译器： 支持 
// 'none':
// 'sass':
// 'less':
// 'stylus':
const config = {
  ...
  plugins: [
    ...其余插件

    ['tarojs-react-generator',{
      css: 'sass', // 支持 none sass less stylus
      cssModules: false, // 关闭cssModules
    }]
  ]
  ...
}
```

### 插件配置
> #### generator插件支持以下参数

| 参数项 | 类型 | 是否可选 | 用途 | 默认值 |
| :-----| :---- | :---- | :---- |:---- |
| css | string | 是 | 指定css类型，可选择 ```none```, ```sass```, ```less```, ```stylus``` | ```sass```|
| cssModules | boolean | 是 | 可选项```true```, ```false```  | ```true``` |


### 命令行参数

generator插件支持以下参数

| 参数项 | 类型 | 是否可选 | 用途 |
| :-----| :---- | :---- | :---- |
| --component | string | 是 | 创建一个组件/页面级组件 |
| --page | string | 是 | 创建一个页面 |


#### 使用案例

##### 1.创建公共组件
```bash
 taro g --component Button
```


##### 2.创建页面组件
```bash
 taro g --component index/Button  // index为页面文件夹名称，自动查询为 pages/index
```


##### 3.创建页面
```bash
 taro g --page mine
```

生成结果：
```
-- 页面:          pages/mine/index.tsx
-- 页面配置:       pages/mine/index.config.tsx
-- 页面样式:      pages/mine/index.module.scss
```



##### 4.创建页面(指定路径)
```bash
 taro g --page index/bannerDetail
```

生成结果：
```
-- 页面:          pages/index/bannerDetail/index.tsx
-- 页面配置:       pages/index/bannerDetail/index.config.tsx
-- 页面样式:      pages/index/bannerDetail/index.module.scss
```
