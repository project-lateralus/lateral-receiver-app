angular.module('LateralApp')

.factory('RestAPI', function(config) {

  var HOST = config.server.url;

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
