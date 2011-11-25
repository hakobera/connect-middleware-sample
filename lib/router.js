/**
 * Simple routing module for connect.
 *
 * @param {String} viewRoot Root path of view files.
 * @constructor
 */
function Router(viewRoot) {
  if (!viewRoot) {
    throw new Error('viewRoot is required');
  }
  this.viewRoot = viewRoot;
}

Router.prototype.router = function() {
  return function(req, res, next) {
    console.log('router#start');
    next();
    console.log('router#end');
  };
};

module.exports = Router;
