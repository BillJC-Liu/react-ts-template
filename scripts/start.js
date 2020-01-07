'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// 即未使用 catch 处理的 Promise 错误
// Fundebug 插件捕获的这个错误之后，开发者将受到报警，然后可以在我们的控制台查看错误详情：
process.on('unhandledRejection', err => {
  throw err;
});

const path = require('path');
const fs = require('fs');
const url = require('url');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const clearConsole = require('react-dev-utils/clearConsole');
const chalk = require('react-dev-utils/chalk');
const openBrowser = require('react-dev-utils/openBrowser');

const resolveApp = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);

const webpackConfig = require('./../webpack.config');
const isInteractive = process.stdout.isTTY;

const useTypeScript = fs.existsSync(resolveApp('tsconfig.json'));
const appName = require(resolveApp('package.json')).name;
const HOST = process.env.HOST || '0.0.0.0';
const port = webpackConfig.devServer && webpackConfig.devServer.port || '3000'
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

// webpack 实列
// appName 
// webpack 配置项
// useTypeScript  ts.config.json
// urls 
const config = webpackConfig('development');
const urls = prepareUrls(protocol, HOST, port);

const compiler = createCompiler({
  webpack,
  appName,
  config,
  useTypeScript,
  urls
})


new Promise((resolve, reject) => {
  resolve(choosePort(HOST, port))
}).then(newPort => {
  if (newPort == null) {
    return
  }
  const devServer = new WebpackDevServer(compiler,
    {
      //启用生成文件的gzip压缩
      compress: true,
      // 启用热重新加载服务器。它将提供/sockjs节点/端点
      // 对于WebpackDevServer客户机，以便它可以了解文件是什么时候
      // 更新。WebpackDevServer客户端作为入口点包括在内
      // 在网页包开发配置中。注意，只有变化
      // 到CSS当前已热重新加载。JS更改将刷新浏览器。
      hot: true,
      hotOnly: true,
      // 告诉WebpackDevServer使用相同的“根”路径很重要
      // 正如我们在配置中指定的那样。在发展中，我们始终从/开始服务。
      publicPath: '/',
      clientLogLevel: 'silent',
      // quiet: true,
    }
  );

  devServer.listen(newPort, HOST, err => {
    if (err) {
      return console.log(err);
    }
    if (isInteractive) {
      clearConsole();
    }
    if (process.env.NODE_PATH) {
      console.log(
        chalk.yellow('Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.')
      );
      console.log();
    }

    console.log(chalk.cyan('Starting the development server...\n'));
    // 打开浏览器
    openBrowser(urls.localUrlForBrowser);
    console.log(`服务已启在 ${newPort} 端口`);
  });
}).catch(err => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});
