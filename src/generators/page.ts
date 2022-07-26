import * as fs from "fs";
import * as path from "path";
import { firstUpperCase, getCssModuleExt } from "../utils";
import { pageTpl } from "./template";

const style = (name) =>
  `.${name}Page {
  
}
`;

const config = (name) => `export default definePageConfig({
  navigationBarTitleText: '${firstUpperCase(name)}'
})
`;

function writeFileErrorHandler(err) {
  if (err) throw err;
}

/**
 * @param cssExt:文件后缀
 */
export function PageGenerator({
  cssExt,
  pagePath,
  appPath,
  chalk,
  cssModules,
  typescript,
  hooks,
}: any) {
  const jsExt = typescript ? 'tsx' : 'jsx';
  const configExt = typescript ? 'ts' : 'js';
  const pageName = pagePath.split("/").pop();
  const outputDir = path.join(appPath, "src", "pages", pagePath);
  // 创建目录
  fs.mkdirSync(outputDir, { recursive: true });
  // 页面
  fs.writeFile(
    path.join(outputDir, `index.${jsExt}`),
    pageTpl[hooks ? 'hooks' : 'class']({ name: pageName, cssExt, cssModules }),
    writeFileErrorHandler
  );
  console.log(chalk.black("创建文件：" + path.join(outputDir, `index.${jsExt}`)));
  // 样式
  fs.writeFile(
    path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`),
    style(pageName),
    writeFileErrorHandler
  );
  console.log(chalk.black("创建文件：" + path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`)));
  // 配置
  fs.writeFile(
    path.join(outputDir, `index.config.${configExt}`),
    config(pageName),
    writeFileErrorHandler
  );
  console.log(chalk.black("创建文件：" + path.join(outputDir, `index.config.${configExt}`)));
  console.log(chalk.green(`页面「${pageName}」创建成功`));
}
