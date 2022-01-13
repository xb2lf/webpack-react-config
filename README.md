# Webpack react configuration

## webpack info version

- webpack@4.46.0
- webpack-cli@3.3.12
- webpack-dev-server@3.10.3 or webpack-dev-server@3.11.3

## others version

- please refer to package.json

### todo

- Fix html-webpack-plugin to set title dynamically

```js
// webpack.config.js

{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'assets/admin.html'
    })
  ]
}
```

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body></body>
</html>
```

When we use the `html-loader` at the same time, `<%= htmlWebpackPlugin.options.title %>` will be parsed into ordinary string
