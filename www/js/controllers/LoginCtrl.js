angular.module('LateralApp')

.controller('LoginCtrl', function($scope, $rootScope, $cordovaInAppBrowser, $state, ServerAPI) {

  // TODO include logic for already logged in user

  $scope.loginFacebook = function() {
    $cordovaInAppBrowser.open(ServerAPI.FACEBOOK_AUTH_URL, '_blank', {location: 'no'})
    .catch(function(event) {
      // TODO show error and return to login
      $state.go('login');
    });

    $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
      // method found
      // https://dbwriteups.wordpress.com/2016/01/24/sharing-data-between-hybrid-app-and-inapp-browser/
      // http://ngcordova.com/docs/plugins/inAppBrowser/
      setTimeout(getTokenFromWindow, 1000);
    });
  };

    function getTokenFromWindow(){
      $cordovaInAppBrowser.executeScript({code: "localStorage.getItem('feathers-jwt')"})
      .then(function(values) {
        var token = R.head(values);
        setTokenAndLogin(token);
      });
      // TODO show error and return to login
    }

    function setTokenAndLogin(token) {
      if (!token) {
        return $state.go('login');
      }

      // set especial localStorage token for Feathers client http://docs.feathersjs.com/authentication/readme.html#options
      window.localStorage.setItem('feathers-jwt', token);

      ServerAPI.app.authenticate().then(function(result){
        // close window
        $cordovaInAppBrowser.close();
        // redirect to dashboard
        $state.go('tab.status');
      }).catch(function(error){
        // redirect to login
        window.localStorage.removeItem('feathers-jwt');
        $state.go('login');
      });
    }

});
