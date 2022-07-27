import { componentGenerator } from "./generators/components";
import { pageGenerator } from "./generators/page";
import { getCssExt } from "./utils";

interface optsType {
  css?: string,
  cssModules?: boolean,
  typescript?: boolean,
  hooks?: boolean,
  updateRouter?: {
    enable: boolean,
    space: number,
  }
}
export default (ctx, pluginOpts: optsType) => {
  const {
    css = "sass",
    cssModules = true,
    typescript = false,
    hooks = false,
    updateRouter = { enable: true, space: 4 },
  } = pluginOpts;
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
      "taro g --component index/Banner       (生成：src/pages/index/components/Banner/index.tsx)",
      "taro g --page mine                    (生成：src/pages/mine/index.tsx)",
      "taro g --page mine/detailPage         (生成：src/pages/mine/detailPage/index.tsx)",
    ],
    async fn() {
      const cssExt = getCssExt(css);
      const { chalk } = ctx.helper;
      let { component, page } = ctx.runOpts.options;
      const { appPath } = ctx.paths;

      if (typeof component !== "string" && typeof page !== "string") {
        return console.log(chalk.red("Usage: taro g --page <name>"));
      }

      if (typeof component === "string") {
        return componentGenerator({
          cssModules,
          componentPath: component,
          appPath,
          cssExt,
          chalk,
          typescript,
          hooks,
        });
      }

      if (typeof page === "string") {
        return pageGenerator({
          cssModules,
          pagePath: page,
          appPath,
          chalk,
          cssExt,
          typescript,
          hooks,
          updateRouter
        });
      }

    },
  });
};
