// Example file for environment variables configuration.
// Usage:
// 1) just clone this file and change the name to config.js
// 2) put all the values you want in both environments
// 3) run `gulp watch`, the real file will be generated in ./www/js/config.js
// Notes: ./config.js and ./www/js/config.js will be ignored by git.
angular.module('LateralApp')

// @if ENV == 'DEVELOPMENT'
.constant('config', {
  env: 'DEVELOPMENT',
  server: {
    url: 'http://1cc278c7.ngrok.io'
  }
});
// @endif
// @if ENV == 'PRODUCTION'
.constant('config', {
  env: 'PRODUCTION',
  server: {
    url: 'https://lateral.social'
  }
});
// @endif
