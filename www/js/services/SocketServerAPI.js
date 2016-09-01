angular.module('LateralApp')

.factory('SocketServerAPI', function(config) {

  var HOST = config.server.url;

  var socket = io(HOST);
  var app = feathers()
  .configure(feathers.hooks())
  .configure(feathers.socketio(socket));

  return {
    HOST: HOST,
    app: app,
    socket: socket
  };

});
