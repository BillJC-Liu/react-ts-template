# react-ts-template
react ts 模板

## 技术
- 整体技术栈：React react-router redux antd ts(x) webpack 
- 支持 sass less css-module
- 默认引入antd 支持css 或者 less ，默认css
- 支持ts(x) 和js(x)，建议统一代码方式。默认tsx

## 内部支持/工具
- 支持js的新语法 `可选链条` `双问号`
- redux 小工具 `spa-redux-tool` 提高写`reducer` `action`效率，并且代码进行好管理。
  [spa-redux-tool](https://github.com/BillJC-Liu/spa-redux-tool)
- iconfont 一键引入工具，无需手动替换字体文件，从iconfont拿到链接，命令一键替换，提高开发效率


## 代码架构
- 统一定制 layout 布局，传入菜单对象即可。
- 所有路由写入菜单对象中，生成全局路由表，无需再去配置，统一管理
- page 输出页面
- component 
  - common  公共组件
  - page 对应到页面的 UI 
- model 数据逻辑（redux）
- service 请求
- config 放一些静态的全局变量
- 


## 记录下我在搭建这个模板的过程中遇到的问题
 
### webpack 配置项

```javascript 
  // 添加需要解析的文件格式
  resolve: {
    // 这里需要注意 不能是单引号 会导致引入的组件 undefined
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
```

### tsconfig 中 module 问题
  `module`是用来指定要使用的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 
  
  `lib`用于指定要包含在编译中的库文件: ["es6", "dom" , "esnext"]

  当`"module":"commonjs"`时，它无法解析到`react-dom`中的`render`方法，或者是`react`中`createElement`方法。需要改为`"module":"esnext"`，`lib`中同时需要`esnext`。
  
  > https://jkchao.github.io/typescript-book-chinese/project/dynamicImportExpressions.html
  
  > 使用 "module": "esnext" 选项：TypeScript 为 Webpack Code Splitting 生成 import() 语句。
  
  > 进一步了解有关信息，推荐阅读这篇文章：Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4.

## webpack配置中遇到的问题

### 1. devServer 中的 historyApiFallback

&emsp;&emsp;react-router 中提供两个路由属性，`BrowserRouter` 与 `HashHistory`。`BrowserRouter`是服务端路由，`HashHistory`是前端路由。

&emsp;&emsp;`HashHistory`会在根路由后面带一个`#`号，`#`号后面的路由不会传给服务器，所以服务器返回的始终是根路由的页面（index.html），所以index.html会始终引用到打包好的bundle.js。在展示上带个`#`号会相对不雅观。

&emsp;&emsp;`BrowserRouter`不会有`#`号，他会把整个路由传给服务器。如果服务器找不到页面，页面就是丢失，展示`404`。所以将`historyApiFallback：true`。告诉服务器，当页面不存在时，就返回根路径。从而能加载到bundle.js。

### 2. 对于jsx|js 文件中使用可选链和双问好语法配置
&emsp;&emsp;在babel中加入两个插件包即可。 `@babel/plugin-proposal-optional-chaining`  `@babel/plugin-proposal-nullish-coalescing-operator`

