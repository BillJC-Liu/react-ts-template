# react-ts-template
react ts 模板
## 记录下我在搭建这个模板的过程中遇到的问题
 
### webpack 配置项

```javascript 
  // 添加需要解析的文件格式
  resolve: {
    // 这里需要注意 不能是单引号 会导致引入的组件 undefined
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
```

### tsconfig 中 module：esnext 的问题
  `module`是用来指定要使用的模块标准: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 
  
  `lib`用于指定要包含在编译中的库文件: ["es6", "dom" , "esnext"]

  当`"module":"commonjs"`时，它无法解析到`react-dom`中的`render`方法，或者是`react`中`createElement`方法。需要改为`"module":"esnext"`，`lib`中同时需要`esnext`。
  
  > https://jkchao.github.io/typescript-book-chinese/project/dynamicImportExpressions.html
  > 使用 "module": "esnext" 选项：TypeScript 为 Webpack Code Splitting 生成 import() 语句。
  > 进一步了解有关信息，推荐阅读这篇文章：Dynamic Import Expressions and webpack 2 Code Splitting integration with TypeScript 2.4.
