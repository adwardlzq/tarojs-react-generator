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
export function getCssExt(css) {
  return cssExts[css];
}

export function getCssModuleExt(cssModuleOpened) {
  return cssModuleOpened ? ".module" : "";
}

export function getCssModuleClassName(className, cssModuleOpened) {
  return cssModuleOpened ? `{styles.${className}}` : `'${className}'`;
}

export function getCssImport(cssModuleOpened: boolean, cssExt: string) {
 return `import${cssModuleOpened ? ' styles from' : ''} './index${getCssModuleExt(cssModuleOpened)}.${cssExt}';`
}