import { firstUpperCase, getCssModuleClassName, getCssImport, firstLowerCase } from "../utils";
export const pageTpl = {
  class: ({ name, cssExt, cssModules }) => `import { Component } from 'react';
import { View } from '@tarojs/components';
${getCssImport(cssModules, cssExt)}

class ${firstUpperCase(name)} extends Component {

  componentWillUnmount() {}

  onLoad(options) {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className=${getCssModuleClassName(`${name}Page`, cssModules)}>
        ${firstUpperCase(name)}
      </View>
    )
  }
}

export default ${firstUpperCase(name)};
`,
  hooks: ({ name, cssExt, cssModules }) => `import { useEffect } from 'react';
import { useDidHide, useDidShow, useRouter } from '@tarojs/taro';
import { View } from '@tarojs/components';
${getCssImport(cssModules, cssExt)}

function ${firstUpperCase(name)}() {
  const router = useRouter();

  useEffect(() => {})

  useDidShow(() => {})

  useDidHide(() => {})

  return (
    <View className=${getCssModuleClassName(`${name}Page`, cssModules)}>
      ${firstUpperCase(name)}
    </View>
  )
}

export default ${firstUpperCase(name)};
`,
}
export const componentTpl = {
  class: ({ name, cssExt, cssModules, typescript }) => `import { Component } from 'react';
import { View } from '@tarojs/components';
${getCssImport(cssModules, cssExt)}
${typescript ? `
interface IProps {}

interface IState {}
` : ''}
class ${name} extends Component${typescript ? `<IProps, IState>` : ''} {

  render() {
    return (
      <View className=${getCssModuleClassName(`${firstLowerCase(name)}Com`, cssModules)}>
        ${name}
      </View>
    );
  }
}

export default ${name};
`,
  hooks: ({ name, cssExt, cssModules, typescript }) => `import { View } from '@tarojs/components';
${getCssImport(cssModules, cssExt)}
${typescript ? `
interface IProps {
  style?: React.CSSProperties | undefined,
}
` : ''}
${typescript ? `const ${name}: React.FC<IProps> = ({ style }) => {` : `function ${name}() {`}
  return (
    <View className=${getCssModuleClassName(`${firstLowerCase(name)}Com`, cssModules)}>
      ${name}
    </View>
  )
}

export default ${name};
`,
}