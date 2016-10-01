const webpack = require('webpack')
const {resolve} = require('path')

module.exports = env => {
  const addPlugin = (add, plugin) => add ? plugin : undefined
  const ifProd = plugin => addPlugin(env.prod, plugin)
  const removeEmpty = array => array.filter(i => !!i)
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
    },
    plugins: removeEmpty([
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }))
    ])
  }
}
