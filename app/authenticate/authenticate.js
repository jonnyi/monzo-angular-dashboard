'use strict';

angular.module('myApp.authenticate', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authenticate', {
    templateUrl: 'authenticate/authenticate.html',
    controller: 'AuthenticateCtrl'
  });
}])
.controller('AuthenticateCtrl', function($location, $scope, $cookies, authservice) {
  $scope.getAccess=function(){
    var authCode = location.search.substring((location.search.indexOf('code=')+5), (location.search.indexOf('state=')-1));
    var data = authservice.getAccessToken();
    $cookies.put('auth_code', authCode);

    data.then(getAccessTokenComplete)
    .catch(getAccessTokenFailed)
    .finally(redirectHome);

    function getAccessTokenComplete(response) {
        $cookies.put('access_token', response.data.access_token);
    }
    function getAccessTokenFailed(message){
        console.log('Get access token Failed due to: ', message.data.error_description);
    }
    function redirectHome(){
      $location.path('/mainview');
    }
  };
  $scope.getAccess();
});
