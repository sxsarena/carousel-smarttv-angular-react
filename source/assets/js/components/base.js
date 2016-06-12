'use strict';

function bind(...methods) {
  methods.forEach( (method) => this[method] = this[method].bind(this) );
}

function makeRequest(url, successHandler, errorHandler) {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.open('GET', url, true);
  xmlhttp.responseType = 'json';

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === xmlhttp.DONE) {
      if (xmlhttp.status === 200) {
        successHandler && successHandler(xmlhttp.response);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };

  xmlhttp.send();
}

module.exports  = {
  bind : bind,
  makeRequest : makeRequest
}
