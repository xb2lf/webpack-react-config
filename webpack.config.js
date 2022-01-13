const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'assets/js/[name]-[chunkhash:10].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.(css|less)$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../../',
                  hmr: false,
                },
              },
              /* 'style-loader', */
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-preset-env')()
                  ],
                },
              },
              'less-loader'
            ],
          },
          {
            test: /\.(js|jsx)$/i,
            exclude: /node_modules/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  worker: 2,
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  cacheDirectory: true,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        // 按需加载
                        useBuiltIns: 'usage',
                        // 指定core-js版本
                        corejs: {
                          version: 3,
                        },
                        // 指定兼容性做到哪个版本浏览器
                        targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                          edge: '17',
                        },
                      },
                    ],
                    '@babel/preset-react'
                  ],
                  plugins: ['@babel/plugin-proposal-class-properties']
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|gif|jpe?g|svg|webp)$/i,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              outputPath: 'assets/images',
              name: '[name]-[hash:10].[ext]',
              esModule: false,
            },
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/font/[name].[hash:7].[ext]'
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:7].[ext]'
            }
          },
          {
            test: /\.html$/i,
            exclude: /node_modules/,
            loader: 'html-loader',
          },
          {
            exclude: /\.(css|less|sass|scss|js|jsx|ts|tsx|html|png|jpg|webp|gif|jpe?g|svg|mp4|webm|ogg|mp3|wav|flac|aacwoff2?|eot|ttf|otf)/,
            loader: 'file-loader'
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: '这是我的react项目',
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash:10].css'
    }),
    new OptimizeCssAssetsPlugin(),
  ],
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '../node_modules')]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            unused: true,
            warnings: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
          }
        },
      }),
    ],
  },
  externals: {
    /* react: 'react',
    'react-dom': 'react-dom' */
  },
  devtool: 'eval-source-map'
};