module.exports = function(grunt, options){

  var projectDir = options.projectDir;

  return {
    server: {
      options: {
        port: 8000,
        hostname: 'localhost',
        base: '.',
        open: true,
        livereload: true
      }
    }
  };

};
