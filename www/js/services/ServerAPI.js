angular.module('LateralApp')

.factory('ServerAPI', function() {

  var HOST = 'http://1cc278c7.ngrok.io';

  var app = feathers()
  .configure(feathers.rest(HOST).jquery(jQuery))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

  return {
    HOST: HOST,
    FACEBOOK_AUTH_URL: HOST + '/auth/facebook',
    app: app
  };

});
