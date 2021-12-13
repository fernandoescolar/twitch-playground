var express = require('express');
var app = express();
var server = require('http').Server(app);

app.use(express.static('public'));

server.listen(8080, function () {
  console.log('Manager http://localhost:8080/manager');
  console.log('OBS Overlays:');
  console.log(' - notification:  http://localhost:8080/notifications')
  console.log(' - camera:        http://localhost:8080/camera');
});

module.exports = server;