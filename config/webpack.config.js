const path = require('path');

export default {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "bundle.js"
  }
}