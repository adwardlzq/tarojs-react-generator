/**
 * 组件生成器
 */
import * as fs from "fs";
import * as path from "path";
import {
  firstUpperCase,
  firstLowerCase,
  getCssModuleClassName,
  getCssModuleExt,
} from "../utils";

const tsx = ({ name, cssExt, cssModules }) => `import React from 'react';
import { View } from '@tarojs/components';
import${cssModules ? " styles from" : ""} './index${getCssModuleExt(
  cssModules
)}.${cssExt}';

interface PropsType {
  style?: React.CSSProperties|undefined,
}

const ${name}: React.FC<PropsType> = ({ style }) => {
  return (
    <View className=${getCssModuleClassName(
      `${firstLowerCase(name)}Com`,
      cssModules
    )}>
      ${name}
    </View>
  )
}
export default ${name};
`;

const style = (name) =>
  `.${firstLowerCase(name)}Com {
  
}
`;

function writeFileErrorHandler(err) {
  if (err) throw err;
}


export function ComponentGenerator({
  cssModules,
  componentPath,
  appPath,
  chalk,
  cssExt,
}: any) {
  const pathArr = componentPath.split("/");
  const componentName = firstUpperCase(pathArr.pop());
  const pagePath = pathArr.join("/");
  if (pathArr.length > 1) {
    //检测页面是否存在
    const pageDir = path.join(appPath, "src", "pages", pagePath);
    if (!fs.existsSync(pageDir)) {
      return console.log(
        chalk.red(`页面目录【${pageDir}】不存在，无法创建组件！`)
      );
    }
  }
  const outputDir = path.join(
    appPath,
    "src",
    pagePath ? "pages" : "",
    pagePath || "",
    "components",
    componentName
  );
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFile(
    path.join(outputDir, `index.tsx`),
    tsx({
      name: componentName,
      cssExt,
      cssModules,
    }),
    writeFileErrorHandler
  );
  console.log(chalk.black("创建文件：" + path.join(outputDir, `index.tsx`)));
  // index.${cssExt}
  fs.writeFile(
    path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`),
    style(componentName),
    writeFileErrorHandler
  );
  console.log(
    chalk.black(
      "创建文件：" +
        path.join(outputDir, `index${getCssModuleExt(cssModules)}.${cssExt}`)
    )
  );

  console.log(chalk.green(`组件「${componentName}」创建成功`));
}
