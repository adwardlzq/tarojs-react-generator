# tarojs-react-generator

> Taro 页面/组件创建工具，支持 Taro3 + React

## 安装


```bash
npm install tarojs-react-generator --save-dev
```

## 使用


修改项目 `config/index.js` 中的 plugins 配置

```js
const config = {
  ...
  plugins: [
    ...
    ['tarojs-react-generator', {
      css: 'sass',
      cssModules: true,
      typescript: true,
      hooks: true
    }]
  ]
  ...
}
```

### 插件配置

| 参数项 | 类型 | 用途 | 默认值 |
| :-----| :---- | :---- | :---- |
| css | string | 指定css预处理器，可选 ```none```, ```sass```, ```less```, ```stylus``` | ```sass```|
| cssModules | boolean | 是否开启cssModules，可选 ```true```, ```false```  | ```true``` |
| typescript | boolean | 是否使用typescript，可选 ```true```, ```false```  | ```false``` |
| hooks | boolean | 是否使用hooks，可选 ```true```, ```false```  | ```false``` |


### 命令行参数


| 参数项 | 类型 | 用途 |
| :-----| :---- | :---- |
| --component | string | 创建一个公共组件/页面组件 |
| --page | string | 创建一个页面 |


### 示例

##### 创建公共组件
```bash
taro g --component Button
```


##### 创建页面组件，index为页面文件夹名称
```bash
taro g --component index/Button  
```


##### 创建页面
```bash
taro g --page mine
```

```
-- 页面：pages/mine/index.tsx
-- 配置：pages/mine/index.config.tsx
-- 样式：pages/mine/index.module.scss
```



##### 创建页面（指定路径）
```bash
taro g --page index/bannerDetail
```

```
-- 页面：pages/index/bannerDetail/index.tsx
-- 配置：pages/index/bannerDetail/index.config.tsx
-- 样式：pages/index/bannerDetail/index.module.scss
```
