const {resolve} = require('path')
module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'static'),
      pathinfo: !env.prod
    },
    context: resolve(__dirname, 'frontend'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.s?css$/,
          loaders: ['style', 'css', 'sass']
        }
      ]
    }
  }
}
