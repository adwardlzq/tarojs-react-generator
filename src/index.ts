import { ComponentGenerator } from "./generators/components";
import { PageGenerator } from "./generators/page";
import { getCssExt } from "./utils";

export default (ctx, pluginOpts) => {
  const { css = "sass", cssModules = true } = pluginOpts;
  ctx.registerCommand({
    // 命令名
    name: "g",
    // 执行 taro g --help 时输出的 options 信息
    optionsMap: {
      "--component": "组件名称(大写)",
      "--page": "页面路径",
    },
    // 执行 taro g --help 时输出的使用例子的信息
    synopsisList: [
      "taro g --component Button             (生成：src/components/Button/index.tsx)",
      "taro g --component index/Banner       (生成：pages/index/components/Banner.tsx)",
      "taro g --page index                   (生成：pages/index/index.tsx)",
      "taro g --page mine                    (生成：pages/mine/index.tsx)",
      "taro g --page mine/detailPage         (生成：pages/mine/detailPage/index.tsx)",
    ],
    async fn() {
      const cssExt = getCssExt(css);
      const { chalk } = ctx.helper;
      let { component, page } = ctx.runOpts.options;
      const { appPath } = ctx.paths;

      if (typeof component !== "string" && typeof page !== "string") {
        return console.log(chalk.red("请输入需要创建的组件/页面名称！！"));
      }

      if (typeof component == "string") {
        return ComponentGenerator({
          cssModules,
          componentPath: component,
          appPath,
          cssExt,
          chalk,
        });
      }

      //如果是创建页面
      if (typeof page === "string") {
        return PageGenerator({
          cssModules,
          pagePath: page,
          appPath,
          chalk,
          cssExt,
        });
      }

    },
  });
};
