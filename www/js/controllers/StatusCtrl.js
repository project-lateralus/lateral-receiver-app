angular.module('LateralApp')

.controller('StatusCtrl', function($scope, config, SocketServerAPI) {

  $scope.server = {
    url: config.server.url,
    isOnline: false
  };

  SocketServerAPI.socket.on('connect', updateServerData);
  SocketServerAPI.socket.on('disconnect', updateServerData);

  function updateServerData() {
    $scope.server.isOnline = SocketServerAPI.socket.connected;
    $scope.$apply();
  }

});
