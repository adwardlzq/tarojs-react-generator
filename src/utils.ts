export function upperFirst(str: string) {
  return str.replace(/\b(\w)(\w*)/g, (_$0, $1, $2) => {
    return $1.toUpperCase() + $2
  })
}
export function lowerFirst(str: string) {
  return str.replace(/\b(\w)(\w*)/g, (_$0, $1, $2) => {
    return $1.toLowerCase() + $2
  })
}
const cssExts = {
  none: 'css',
  sass: 'scss',
  less: 'less',
  stylus: 'styl',
}
export function getCssExt(css: string) {
  return cssExts[css]
}

export function getCssModuleExt(cssModules: boolean) {
  return cssModules ? '.module' : ''
}

export function getCssModuleClassName(className: string, cssModules: boolean) {
  return cssModules ? `{styles.${className}}` : `'${className}'`
}

export function getCssImport(cssModules: boolean, cssExt: string) {
 return `import${cssModules ? ' styles from' : ''} './index${getCssModuleExt(cssModules)}.${cssExt}'`
}