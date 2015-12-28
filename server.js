var express = require('express');
var livereload = require('livereload');

var app = express();

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/__build__', express.static(__dirname + '/__build__'));
app.use('/', express.static(__dirname + '/src'));

/* If using HTML5 style URLs in the client app, you'll need dummy URL support here for your routes */
//app.use('/public', express.static(__dirname + '/src'));
//app.use('/protected', express.static(__dirname + '/src'));

app.listen(3000);
console.log('Listening on port 3000.');

app = livereload.createServer({
    exts: ['html', 'css', 'js', 'png', 'gif', 'jpg', 'ts']
});

app.watch(__dirname + '/src');
console.log('Live reload enabled');
