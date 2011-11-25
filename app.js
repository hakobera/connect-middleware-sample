var connect = require('connect'),
    qs = require('querystring'), 
    router = require('./lib/router');

var server = module.exports = connect.createServer();

server
  .use(connect.logger())
  .use(connect.favicon())
  .use(router(__dirname + '/views'));

router.get('/', function(req,  res) {
  res.render('index');
});

router.get('/hello', function(req, res) {
  res.render('hello');
});

router.get('/echo', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  var message = req.query.message; 
  res.end(message);
});

server.listen(3000);
console.log('Server is running at port: %d',  server.address().port);
