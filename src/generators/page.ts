import * as fs from 'fs'
import * as path from 'path'
import { firstUpperCase, getCssModuleExt } from '../utils'
import { pageTpl } from './template'
import { parse } from '@babel/parser'
import generator from '@babel/generator'
import traverse from '@babel/traverse'
import * as t from '@babel/types'

const createStyle = (name: string) =>
  `.${name}Page {
  
}
`

const createConfig = (name: string) => `export default definePageConfig({
  navigationBarTitleText: '${firstUpperCase(name)}'
})
`

function writeFileErrorHandler(err) {
  if (err) throw err
}

const updateRouterList = (appPath: string, page: string, updateRouter: { enable: boolean, space: number }) => {
  if (updateRouter.enable === false) return
  const spaces = Array(updateRouter.space || 4).fill(' ').join('')
  const configPath = path.join(appPath, 'src/app.config.ts')
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) throw (err)
    const ast = parse(data, {
      sourceType: 'module',
    })
    traverse(ast, {
      ArrayExpression(astPath) {
        if (astPath.parent['key'].name === 'pages') {
          astPath.node.elements = astPath.node.elements.filter((item: any) => item.value !== page)
          astPath.node.elements.forEach((item: any) => {
            item.extra.raw = `\n${spaces}'${item.extra.rawValue}'`
          })
          const newEle = t.stringLiteral(page)
          newEle.extra = {
            rawValue: page,
            raw: `\n${spaces}'${page}'\n`
          }
          astPath.node.elements.push(newEle)
        }
      }
    })
    const newFile = generator(ast)
    fs.writeFileSync(configPath, newFile.code)
  })
}
interface P {
  cssExt: string,
  pagePath: string,
  appPath: string,
  chalk: any,
  cssModules: boolean,
  typescript: boolean,
  hooks: boolean,
  updateRouter: {
    enable: boolean,
    space: number
  }
}
export function pageGenerator({
  cssExt,
  pagePath,
  appPath,
  chalk,
  cssModules,
  typescript,
  hooks,
  updateRouter
}: P) {
  const jsExt = typescript ? 'tsx' : 'jsx'
  const configExt = typescript ? 'ts' : 'js'
  const pageName = pagePath.split('/').pop() ?? ''
  const outputDir = path.join(appPath, 'src', 'pages', pagePath)
  // 创建目录
  fs.mkdirSync(outputDir, { recursive: true })
  // 页面
  fs.writeFile(
    path.join(outputDir, `index.${jsExt}`),
    pageTpl[hooks ? 'hooks' : 'class']({ name: pageName, cssExt, cssModules }),
    writeFileErrorHandler
  )
  console.log(chalk.black('创建文件：' + path.join(outputDir, `index.${jsExt}`)))
  // 样式
  fs.writeFile(
    path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`),
    createStyle(pageName),
    writeFileErrorHandler
  )
  console.log(chalk.black('创建文件：' + path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`)))
  // 配置
  fs.writeFile(
    path.join(outputDir, `index.config.${configExt}`),
    createConfig(pageName),
    writeFileErrorHandler
  )
  console.log(chalk.black('创建文件：' + path.join(outputDir, `index.config.${configExt}`)))
  // 更新路由
  updateRouterList(appPath, `pages/${pagePath}/index`, updateRouter)
  console.log(chalk.green(`页面「${pageName}」创建成功${updateRouter.enable === false ? `，${chalk.blue('请记得更新路由配置')}` : '，路由配置已自动更新'}`))
}
