const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: { index: './src/index.tsx' },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "bundle"),
  },
  // 添加需要解析的文件格式
  resolve: {
    // 这里需要注意 不能是单引号 会导致引入的文件路径找不到
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-react'],
        //   plugins: ['@babel/plugin-proposal-class-properties']
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        // 压缩 去掉注释
        removeComments: true
      }
    })
  ]
}