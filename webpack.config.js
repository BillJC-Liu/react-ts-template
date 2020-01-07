const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const postcssNormalize = require('postcss-normalize');

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const getStyleLoaders = (cssOptions, preProcessor) => {
    return [
      isEnvDevelopment && require.resolve('style-loader'),
      {
        loader: 'css-loader',
        options: cssOptions
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            postcssNormalize(),
          ],
        }
      }
    ]
  }


  return {
    // mode: isEnvDevelopment ? 'development' : isEnvProduction && 'production',
    mode: 'development',
    // sourceMap 报错代码行数跟踪
    devtool: isEnvProduction ? 'source-map' : isEnvDevelopment && 'cheap-module-source-map',
    devServer: {
      open: true,
      port: 8080,
    },
    entry: [
      // 开发环境下热更新
      isEnvDevelopment &&
      require.resolve('react-dev-utils/webpackHotDevClient'),
      './src/index'
    ].filter(Boolean),
    // output: {
    //   filename: "bundle.js",
    //   path: path.resolve(__dirname, "bundle"),
    // },
    output: {
      path: isEnvDevelopment ? path.resolve(__dirname, "./build") : undefined,
      filename: "build/bundle.js"
    },
    // 添加需要解析的文件格式
    resolve: {
      // 这里需要注意 不能是单引号 会导致引入的文件路径找不到
      extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }, {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }, {
        text: /\.(woff|woff2|svg|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'font/[name].[ext]?[hash:8]',
            publicPath: ''
          }
        }]
      }, {
        test: /\.css?$/,
        exclude: /\.module\.css?$/,
        use: getStyleLoaders({
          // 1的意思是用postcss-loader加载器
          // 2的意思是用postcss-loaders和sass-loader加载器
          importLoaders: 1,
          modules: true,
          localIdentName: '[local]_[hash:base64:6]'
        })
      }, {
        test: /\.(scss|sass)$/,
        exclude: /\.module\.(scss|sass)$/,
        use: getStyleLoaders({
          importLoaders: 2,
          sourceMap: true
        })
      },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: './public/index.html',
        minify: {
          removeComments: true, // 去掉注释
          collapseWhitespace: true, // 删除空白符与换行符
          minifyCSS: true// 压缩内联css
        }
      }),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean)
  }
}