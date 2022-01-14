const { resolve } = require('path');
const webapck = require('webpack');

module.exports = {
  entry: {
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个manifest.json --> 提供和react的映射关系
    new webapck.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名字
      path: resolve(__dirname, 'dll/manifest.json'), // 输出文件路径
    }),
  ],
  mode: 'production',
};