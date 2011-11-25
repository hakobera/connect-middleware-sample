var connect = require('connect'),
    Router = require('./lib/router');

var server = module.exports = connect.createServer();

var router = new Router(__dirname + '/views');

server
  .use(connect.logger())
  .use(router.router());

/*
router.get('/', function(req,  res) {
  render('index.html');
});

router.get('/hello', function(req, res) {
  render('hello.html');
});
*/

server.listen(3000);
console.log('Server is running at port: %d',  server.address().port);
