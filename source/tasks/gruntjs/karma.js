module.exports = function(grunt, options){

  var continuousIntegrationMode = grunt.option('ci') || false;

  return {
    test: {
      configFile: './source/tasks/gruntjs/config/karma.conf.js',
      singleRun: continuousIntegrationMode,
      reporters: continuousIntegrationMode ? ['teamcity'] : ['progress']
    }
  };

};
