module.exports = {
  entry: './frontend/src/index.js',
  output: {
    filename: './static/bundle.js'
  },
  devtool: 'source-map',
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
        loaders: ['style', 'css', 'sass'],
        inlcude: './frontend/src'
      }
    ]
  }
}
