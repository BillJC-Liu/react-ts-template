const fs = require('fs')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const postcssNormalize = require('postcss-normalize');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

process.env.NODE_ENV = 'development'

// 源映射占用大量资源，并且可能导致大型源文件的内存不足问题。
// 要注意开启的环境
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const resolveApp = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);

const resolveModule = (resolveFn, filePath) => {
  const extension = [".ts", ".tsx", ".js", "jsx", ".json"].find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.tsx`);
};



module.exports = function (webpackEnv = 'development') {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const getStyleLoaders = (cssOptions, preProcessor) => {
    let loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      {
        loader: 'css-loader',
        options: cssOptions
      }, {
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
            // 保护有用的浏览器样式而不是去掉他们。
            // 一般化的样式：为大部分HTML元素提供。
            // 修复浏览器自身的bug并保证各浏览器的一致性。
            // 优化css可用性：用一些小技巧。
            // 解释代码：用注释和详细的文档来。

            // 注意：Normalize支持包括手机浏览器在内的超多浏览器，
            // 同时对HTML5元素、排版、列表、嵌入的内容、表单和表格都进行了一般化。
            // 尽管这个项目基于一般化的原则，但我们还是在合适的地方使用了更实用的默认值。
            postcssNormalize(),
          ],
        }
      }
    ].filter(Boolean)

    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
            javascriptEnabled: true
          },
        }
      );
    }

    return loaders
  }

  return {
    // mode: isEnvDevelopment ? 'development' : isEnvProduction && 'production',
    mode: 'development',
    // sourceMap 报错代码行数跟踪
    devtool:
      isEnvProduction ?
        'source-map' :
        isEnvDevelopment ? 'cheap-module-source-map' : 'cheap-module-source-map',
    devServer: {
      // 是否在起服务后去打开页面
      open: false,
      // 端口
      port: 9527,
      // 这个API在react-router中使用BrowserRouter时，它是用h5的路由方式进行跳转
      // 在使用 BrowserRouter 时，浏览器会把pathname发给server，然而server是没有这些接口的
      // 会导致该页面没有挂在的 js 文件 ，需要  historyApiFallback: true 
      // 如果找不到页面，就会默认返回首页 。 弊端：无法使用 SSR 。
      // 根路径下就会挂载入口js文件
      // HashHistory 根路径后面添加一个#号
      historyApiFallback: true,
    },
    entry: [
      // 引入热模块的包
      // isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
      // 入口文件
      resolveModule(resolveApp, 'src/index'),
      // 引入polyfills 兼容IE
      // require.resolve('./polyfills'),
    ].filter(Boolean),
    output: {
      // 在编译时不知道最终输出文件的 publicPath 的情况下，
      // publicPath 可以留空，并且在入口起点文件运行时动态设置。
      // 如果你在编译时不知道 publicPath，你可以先忽略它，
      // 并且在入口起点设置 __webpack_public_path__
      // publicPath: '/',

      // 打包出来的路径
      path: path.resolve(process.cwd(), "build"),
      // isEnvDevelopment ? path.resolve(process.cwd(), "build")
      //   :  path.resolve(process.cwd(), "build") , 
      // 打包出来的文件名
      filename: 'build/[name].[hash:8].js',
      // 将js代码进行分割 它应该与filename相同
      // 将页面代码进行分割，减少首页的大小，从而优化首屏速度
      chunkFilename: 'build/[name].[hash:8].js'

      // devtoolModuleFilenameTemplate
    },
    // 添加需要解析的文件格式
    resolve: {
      // 这里需要注意 不能是单引号 会导致引入的文件路径找不到
      // 匹配那些后缀名的文件
      extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
      // 自定义别名
      // 项目中不再需要 ../../ 的方式来寻找路径
      alias: {
        '@': resolveApp('src'),
        '@com': resolveApp('src/component'),
        '@page': resolveApp('src/page'),
        '@model': resolveApp('src/model'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: resolveApp('src'),
          loader: 'babel-loader',
          options: {
            customize: require.resolve(
              'babel-preset-react-app/webpack-overrides'
            ),
            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent:
                        '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                    },
                  },
                },
              ],
            ],
            // 开启缓存功能，加快重建
            cacheDirectory: true,
            cacheCompression: false,
            compact: isEnvProduction,
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }, {
          test: /\.(woff|woff2|svg|ttf)$/,
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
            // 不能在css中进行模块化，因为会导致antd 在使用css样式的模式下，className被hash掉
          })
        },
        {
          test: /\.module\.css?$/,
          use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: true,
            modules: true,
            // localIdentName
            getLocalIdent: '[local]_[hash:base64:6]'
          })
        },
        {
          test: /\.(scss|sass)$/,
          exclude: /\.module\.(scss|sass)$/,
          use: getStyleLoaders({
            importLoaders: 2,
            sourceMap: true
          })
        },
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: getStyleLoaders({
            importLoaders: 2
          }, 'less-loader')
        }
      ]
    },
    plugins: [
      // cleanWebpackPlugin 清楚打包好的文件夹
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: resolveApp('public/index.html'),
        minify: {
          removeComments: true, // 去掉注释
          collapseWhitespace: true, // 删除空白符与换行符
          minifyCSS: true// 压缩内联css
        }
      }),
      // isEnvDevelopment &&
      // new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean)
  }
}