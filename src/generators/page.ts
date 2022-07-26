/**
 * 组件生成器
 */
import * as fs from "fs";
import * as path from "path";
import { firstUpperCase, getCssModuleExt } from "../utils";

/**
 * @param name  页面名称
 */
const tsx = ({ name, cssExt, cssModules }) => `import React from 'react';
import { View } from '@tarojs/components';
import${cssModules ? " styles from" : ""} './index${getCssModuleExt(
  cssModules
)}.${cssExt}';

function ${firstUpperCase(name)}() {
  return (
    <View className=${cssModules ? `{styles.${name}Page}` : `${name}Page`}>
      ${firstUpperCase(name)}
    </View>
  )
}

export default ${firstUpperCase(name)};
`;

// index.module.less
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
}: any) {
  const pageName = pagePath.split("/").pop();
  const outputDir = path.join(appPath, "src", "pages", pagePath);

  //创建目录
  fs.mkdirSync(outputDir, { recursive: true });
  // index.tsx
  fs.writeFile(
    path.join(outputDir, "index.tsx"),
    tsx({ name: pageName, cssExt, cssModules }),
    writeFileErrorHandler
  );
  console.log(chalk.black("创建文件：" + path.join(outputDir, "index.tsx")));
  // index.less
  fs.writeFile(
    path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`),
    style(pageName),
    writeFileErrorHandler
  );
  console.log(
    chalk.black(
      "创建文件：" +
        path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`)
    )
  );
  // 页面config
  fs.writeFile(
    path.join(outputDir, "index.config.ts"),
    config(pageName),
    writeFileErrorHandler
  );
  console.log(
    chalk.black("创建文件：" + path.join(outputDir, "index.config.ts"))
  );
  console.log(chalk.green(`页面「${pageName}」创建成功`));
}
