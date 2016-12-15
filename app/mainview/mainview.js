'use strict';
angular.module('myApp.mainview', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mainview', {
    templateUrl: 'mainview/mainview.html',
    controller: 'mainviewCtrl'
  });
}])
.controller('mainviewCtrl', function ($scope, $location, $cookies, authservice) {
  $scope.isAuthenticated = true;
  $scope.accounts = {}
  $scope.transactions = {}

  $scope.getAuthCode = function() {
      var client_id="oauthclient_00009FHZdaBygboJja9JAn";
      var redirect_uri="http://localhost:8000/";
      var state_token="12345";
      var url="https://auth.getmondo.co.uk/?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=code&state=" + state_token;
      window.location.replace(url);
  }

  $scope.testAccess = function(){
    authservice.getWhoAmI().then(accessPass)
    .catch(accessFail);

    function accessPass(data){
      console.log('Test access Succeed', data);
      $scope.isAuthenticated = true;
    }
    function accessFail(message){
      console.log('Test access Failed due to: ', message.data.error_description);
      $scope.isAuthenticated = false;
    }
  }

  $scope.getAccount = function(){
    return authservice.getAccounts().then(function(data) {
        $scope.accounts = data;
        $cookies.put('account_id', data.data.accounts[0].id);
        return $scope.accounts;
    });
  }

  $scope.getTransactions = function(){
    return authservice.getTransactions().then(function(data) {
      $scope.transactions = data;
      return $scope.transactions;
    });
  }

  $scope.testAccess();
  $scope.getAccount();
  $scope.getTransactions();
});
