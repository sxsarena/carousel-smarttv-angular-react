var webpackConfig = require('./config/webpack.config.dev');

webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/, exclude: /(node_modules)/,
    loader: 'babel-loader'
  }
];

webpackConfig.module.postLoaders = [{
  test: /\.(js|jsx)$/, exclude: /(node_modules|source\/assets\/js\/tests)/,
  loader: 'istanbul-instrumenter'
}];

module.exports = function(config, options){

  config.set({
    basePath:  '',
    frameworks: ['mocha', 'chai'],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './source/assets/js/tests/*.spec.js'
    ],
    preprocessors: {
      './source/assets/js/tests/*.spec.js': ['webpack']
    },
    plugins: [
      "karma-chai",
      "karma-mocha",
      "karma-phantomjs-launcher",
      "karma-mocha-reporter",
      "karma-webpack"
    ],
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
    exclude: [
    ],
    reporters: [ 'mocha' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false
  });
};
