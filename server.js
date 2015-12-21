var express = require('express')
var livereload = require('livereload');

var app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.get('/auth/callback', function(req, res) {
  console.log("Request cookies: %j", req.cookies);
  console.log("Request originalUrl: %j", req.originalUrl);
  console.log("Request path: %j", req.path);
  console.log("Request query: %j", req.query);
  res.send('Received the callback');
});
app.use('/', express.static(__dirname + '/src'));
app.use('/public', express.static(__dirname + '/src'));
app.use('/protected', express.static(__dirname + '/src'));
app.use('/colin', express.static(__dirname + '/src'));
app.use('/auth/callback', express.static(__dirname + '/src'));

app.listen(3000);
console.log('Listening on port 3000.');

app = livereload.createServer({
  exts: ['html', 'css', 'js', 'png', 'gif', 'jpg', 'ts']
});

app.watch(__dirname + '/src');
console.log('Live reload enabled');
