module.exports = function(grunt, options){

  var projectDev  = options.projectDev;
  var projectDir  = options.projectDir;
  var projectNode = options.projectNode;

  var webpack = require("webpack");
  var webpackConfig = require("../../../config/webpack.config.prod.js");

  return {
    options: webpackConfig,
    build: {
      plugins: webpackConfig.plugins.concat(
        new webpack.DefinePlugin({
          "process.env": {
            // This has effect on the react lib size
            "NODE_ENV": JSON.stringify("production")
          }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
      )
    }
  };
};
