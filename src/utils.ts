/** 首字母大写 */
export function firstUpperCase(str: string) {
  return str.replace(/\b(\w)(\w*)/g, function (_$0, $1, $2) {
    return $1.toUpperCase() + $2;
  });
}
/** 首字母小写 */
export function firstLowerCase(str: string) {
  return str.replace(/\b(\w)(\w*)/g, function (_$0, $1, $2) {
    return $1.toLowerCase() + $2;
  });
}
const cssExts = {
  none: "css",
  sass: "scss",
  less: "less",
  stylus: "styl",
};
/** 计算css后缀 */
export function getCssExt(css) {
  return cssExts[css];
}

/**
 * 补充一下后缀，生成　.module
 * */
export function getCssModuleExt(cssModuleOpened) {
  return cssModuleOpened ? ".module" : "";
}

export function getCssModuleClassName(className, cssModuleOpened) {
  return cssModuleOpened ? `{styles.${className}}` : `"${className}"`;
}
