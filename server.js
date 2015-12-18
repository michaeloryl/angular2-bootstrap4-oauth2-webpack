var express = require('express')
var livereload = require('livereload');

var app = express()

app.use('/node_modules', express.static(__dirname + '/node_modules'))
app.use('/', express.static(__dirname + '/src'))

app.listen(3000)
console.log('Listening on port 3000.')

app = livereload.createServer({
  exts: ['html', 'css', 'js', 'png', 'gif', 'jpg', 'ts']
})

app.watch(__dirname + '/src')
console.log('Live reload enabled')
