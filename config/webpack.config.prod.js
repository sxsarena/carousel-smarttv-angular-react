var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

// App files location
var PATHS = {
  app: path.resolve(__dirname, '../source/assets/js'),
  styles: path.resolve(__dirname, '../source/assets/scss'),
  html: path.resolve(__dirname, '../source/assets/html'),
  build: path.resolve(__dirname, '../public')
};

var plugins = [
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

var sassLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?outputStyle=expanded'
];

module.exports = {
  env : process.env.NODE_ENV,
  entry: {
    app: path.resolve(PATHS.app, 'app.js')
  },
  output: {
    path: PATHS.build,
    filename: 'js/scripts.min.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: sassLoaders.join('!'),
        include: PATHS.style
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: plugins,
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devServer: {
    contentBase: path.resolve(__dirname, PATHS.build),
    port: 8000,
    historyApiFallback: true
  },
  devtool: 'eval'
};
