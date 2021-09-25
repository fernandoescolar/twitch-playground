var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static('public'));

server.listen(8080, function () {
  console.log('Cliente http://localhost:8080');
  console.log('Manager http://localhost:8080/manager.html');
});

module.exports = server;