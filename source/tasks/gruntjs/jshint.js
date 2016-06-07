module.exports = function(grunt, options){

  var projectDev = options.projectDev;

  return {
    options: {
        jshintrc: 'source/tasks/config/.jshintrc'
    },
    site: ['<%= projectDev %>/js/{,*/,**/}*.js']
  };
};
