angular.module('LateralApp')

.controller('StatusCtrl', function($scope, config, SocketAPI) {

  $scope.server = {
    url: config.server.url,
    isOnline: false
  };

  SocketAPI.socket.on('connect', updateServerData);
  SocketAPI.socket.on('disconnect', updateServerData);
  SocketAPI.socket.on('error', updateServerData);

  function updateServerData() {
    $scope.server.isOnline = SocketAPI.socket.connected;
    $scope.$apply();
  }

});
