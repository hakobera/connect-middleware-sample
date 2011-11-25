var fs = require('fs'), 
    url = require('url'), 
    qs = require('querystring');

/**
 * Simple routing module for connect.
 *
 * @param {String} viewRoot Root path of view files.
 * @constructor
 */

exports = module.exports = function router(viewRoot) {
  if (!viewRoot) {
    throw new Error('viewRoot is required');
  }
  
  var stack = [];

  exports.get = function(path, handler) {
    stack.push({ path: path, handler: handler });
  };
  
  return function(req, res, next) {
    console.log('router#start');
    
    if (req.method !== 'GET') {
      return next();
    } 
    res.render = function(name) {
      var viewFile = viewRoot + '/' + name + '.html';
      fs.readFile(viewFile, function(err, data) {
        if (err) {
          next(err);
        } else {
          res.writeHeader(200, { 'Content-Type': 'text/html' });
          res.end(data); 
        }
      }); 
    };    

    var handled = false, 
        path = url.parse(req.url, true),
        i,  l,  handle;
    for (i = 0, l = stack.length; i < l; ++i) {
      handle = stack[i];
      if (path.pathname === handle.path) {
        console.log(handle);
        req.query = path.query;
        handle.handler(req, res, next);
        handled = true; 
        break; 
      }
    }
    if (!handled) {
      next();
    }
    console.log('router#end');
  };
};
