module.exports = function(grunt, options){

  var projectDev  = options.projectDev;
  var projectDir  = options.projectDir;
  var projectNode = options.projectNode;

  return {
    options: {
      mangle: {
        except: ['jQuery']
      }
    },
    site: {
      files: {
        '<%= projectDir %>/js/scripts.min.js':
        [
          '<%= projectNode %>/react/dist/react.min.js',
          '<%= projectNode %>/react-dom/dist/react-dom.min.js',
          '<%= projectNode %>/react/dist/react-with-addons.min.js',
          '<%= projectNode %>/jquery/dist/jquery.min.js',
          '<%= projectDev %>/js/scripts.js'
        ]
      }
    }
  };
};
