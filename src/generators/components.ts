import * as fs from 'fs'
import * as path from 'path'
import {
  firstUpperCase,
  firstLowerCase,
  getCssModuleExt,
} from '../utils'
import { componentTpl } from './template'

const createStyle = (name: string) =>
  `.${firstLowerCase(name)}Com {
  
}
`

function writeFileErrorHandler(err) {
  if (err) throw err
}
interface P {
  cssExt: string,
  componentPath: string,
  appPath: string,
  chalk: any,
  cssModules: boolean,
  typescript: boolean,
  hooks: boolean
}
export function componentGenerator({
  cssModules,
  componentPath,
  appPath,
  chalk,
  cssExt,
  typescript,
  hooks,
}: P) {
  const jsExt = typescript ? 'tsx' : 'jsx'
  const pathArr = componentPath.split('/')
  const componentName = firstUpperCase(pathArr.pop() ?? '')
  const pagePath = pathArr.join('/')
  if (pathArr.length > 1) {
    // 检测页面是否存在
    const pageDir = path.join(appPath, 'src', 'pages', pagePath)
    if (!fs.existsSync(pageDir)) {
      return console.log(chalk.red(`页面目录【${pageDir}】不存在，无法创建组件`))
    }
  }
  const outputDir = path.join(
    appPath,
    'src',
    pagePath ? 'pages' : '',
    pagePath || '',
    'components',
    componentName
  )
  fs.mkdirSync(outputDir, { recursive: true })
  // 页面
  fs.writeFile(
    path.join(outputDir, `index.${jsExt}`),
    componentTpl[hooks ? 'hooks' : 'class']({ name: componentName, cssExt, cssModules, typescript }),
    writeFileErrorHandler
  )
  console.log(chalk.black('创建文件：' + path.join(outputDir, `index.${jsExt}`)))
  // 样式
  fs.writeFile(
    path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`),
    createStyle(componentName),
    writeFileErrorHandler
  )
  console.log(chalk.black('创建文件：' + path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`)))
  console.log(chalk.green(`组件「${componentName}」创建成功`))
}
