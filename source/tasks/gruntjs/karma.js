module.exports = function(grunt, options){

  var continuousIntegrationMode = grunt.option('ci') || false;

  return {
    karma: {
      unit: {
        configFile: 'source/tasks/config/karma.conf.js',
        singleRun: continuousIntegrationMode,
        reporters: continuousIntegrationMode ? ['teamcity'] : ['progress']
      }
    }
  };

};
