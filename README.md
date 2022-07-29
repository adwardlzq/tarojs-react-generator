# tarojs-react-generator

> Taro 页面/组件创建工具，支持 Taro 3 + React

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
      hooks: true,
      updateRouter: {
        enable: true,
        space: 4
      },
      useTemplate: {
        enable: false,
        src: 'src/tpl'
      }
    }]
  ]
  ...
}
```

### 插件配置

| 参数项 | 类型 | 用途 | 默认值 |
| :-----| :---- | :---- | :---- |
| css | string | 指定 css 预处理器，可选 ```none```, ```sass```, ```less```, ```stylus``` | ```sass```|
| cssModules | boolean | 是否开启 cssModules，可选 ```true```, ```false```  | ```true``` |
| typescript | boolean | 是否使用 typescript，可选 ```true```, ```false```  | ```false``` |
| hooks | boolean | 是否使用 hooks，可选 ```true```, ```false```  | ```false``` |
| updateRouter | object | 创建页面后更新路由配置 |  |
| useTemplate | object | 使用 EJS 自定义模板，模板名称固定为 page.ejs 和 component.ejs |  |

### updateRouter 参数

| 参数项 | 类型 | 用途 | 默认值 |
| :-----| :---- | :---- | :---- |
| enable | boolean | 是否开启，可选 ```true```, ```false```  | ```true``` |
| space | number | 插入位置缩进空格数 | ```4``` |

### useTemplate 参数

| 参数项 | 类型 | 用途 | 默认值 |
| :-----| :---- | :---- | :---- |
| enable | boolean | 是否开启，可选 ```true```, ```false```  | ```false``` |
| src | string | 模板文件所在文件夹的路径，如 'src/tpl' |  |

##### 模板示例
```js
/**
 * 模板注入变量
 * @param name: string 文件名
 * @param upperFirst: function 将首字母大写的函数
 * @param lowerFirst: function 将首字母小写的函数
 */
import { useEffect } from 'react'
import { useDidHide, useDidShow, useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import styles from './index.module.scss'

function <%= upperFirst(name) %>() {
  const router = useRouter()

  useEffect(() => {})

  useDidShow(() => {})

  useDidHide(() => {})

  return (
    <View className={styles.<%= name %>Page}>
      hello
    </View>
  )
}

export default <%= upperFirst(name) %>
```

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


##### 创建页面组件（index为页面文件夹名称）
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
