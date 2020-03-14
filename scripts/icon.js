const generate = require('iconfont-transform-component')
const path = require('path')
function resolve(relativePath) {
  return path.resolve(__dirname, `../src/${relativePath}`)
}
const iconGenerateConfig = {
  namespace: 'ics',
  iconCssPath: resolve('style/icon.css'),
  iconFontFilePath: resolve('static/iconfont'),
  iconComponentPath: resolve('component/common/Icon/index.tsx'),
  name: 'ics',
}
generate(iconGenerateConfig)
