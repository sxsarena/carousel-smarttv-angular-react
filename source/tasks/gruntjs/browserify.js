module.exports = function(grunt, options){

  var projectDev  = options.projectDev;
  var projectDir  = options.projectDir;
  var projectNode = options.projectNode;

  return {
    site: {
      options: {
        alias: {
          'react': './node_modules/react/dist/react.js',
          'react-dom': './node_modules/react-dom/dist/react-dom.js'
        },
        debug: false,
        transform: [['babelify', {presets: ['es2015', 'stage-0', 'react']}]]
      },
      src: [
        '<%= projectDev %>/js/app.js'
      ],
      dest: '<%= projectDir %>/js/scripts.js'
    }
  };
};
