module.exports = function(grunt, options){

  var projectDev  = options.projectDev;
  var projectDir  = options.projectDir;
  var projectNode = options.projectNode;

  return {
    site: {
      options: {
        alias: {
          'react': './node_modules/react/dist/react.js',
          'react-dom': './node_modules/react-dom/dist/react-dom.js',
          'react-addons': './node_modules/react/dist/react-with-addons.js',
          'jquery': './node_modules/jquery/dist/jquery.js'
        },
        debug: false,
        transform: [['babelify', {presets: ['es2015', 'react']}]]
      },
      src: [
        '<%= projectDev %>/js/config.js',
        '<%= projectDev %>/js/scripts.jsx'
      ],
      dest: '<%= projectDir %>/js/scripts.js'
    }
  };
};
