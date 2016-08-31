angular.module('LateralApp')

.controller('LoginCtrl', function($scope, $rootScope, $cordovaInAppBrowser, $state, ServerAPI) {

  // TODO include logic for already logged in user, and error cases

  $scope.loginFacebook = function() {
    $cordovaInAppBrowser.open(ServerAPI.FACEBOOK_AUTH_URL, '_blank', {location: 'no'})
    .catch(function(event) {
      $state.go('login');
    });

    $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
      getTokenFromWindow()
      .then(setTokenAndLogin);
    });
  };

    function getTokenFromWindow(){
      return new Promise(function(resolve, reject) {
        // method found
        // https://dbwriteups.wordpress.com/2016/01/24/sharing-data-between-hybrid-app-and-inapp-browser/
        // http://ngcordova.com/docs/plugins/inAppBrowser/
        setTimeout(function() {

          $cordovaInAppBrowser.executeScript({code: "localStorage.getItem('feathers-jwt')"})
          .then(function(values) {
            var token = R.head(values);
            resolve(token);
          });

        }, 1000);
      });
    }

    function setTokenAndLogin(token) {
      if (!token) {
        return $state.go('login');
      }

      // set especial localStorage token for Feathers client http://docs.feathersjs.com/authentication/readme.html#options
      window.localStorage.setItem('feathers-jwt', token);

      ServerAPI.app.authenticate()
      .then(function(result){
        // redirect to dashboard
        $state.go('tab.status');
        // close window
        setTimeout(function() { $cordovaInAppBrowser.close(); }, 1000);
      }).catch(function(error){
        // redirect to login
        window.localStorage.removeItem('feathers-jwt');
        $state.go('login');
      });
    }

});
