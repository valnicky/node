var common = require('../common');
var assert = require('assert');
var net = require('net');

var conns = 0, conns_closed = 0;

var server = net.createServer(function(socket) {
  conns++;
  assert.equal(common.localhost_ipv4, socket.localAddress);
  assert.equal(socket.localPort, common.PORT);
  socket.on('end', function() {
    server.close();
  });
  socket.resume();
});

server.listen(common.PORT, common.localhost_ipv4, function() {
  var client = net.createConnection(common.PORT, common.localhost_ipv4);
  client.on('connect', function() {
    client.end();
  });
});

process.on('exit', function() {
  assert.equal(1, conns);
});
