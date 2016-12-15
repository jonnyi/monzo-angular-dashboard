(function() {
    'use strict';

    angular
        .module('myApp.mainview')
        .factory('authservice', authservice);

    authservice.$inject = ['$http', '$cookies'];

    function authservice($http, $cookies) {
        var service = {
            getAccessToken: getAccessToken,
            getAccounts: getAccounts,
            getBalance: getBalance,
            getTransactions: getTransactions,
            getWhoAmI: getWhoAmI
        };

        return service;

        ////////////////

        function getAccessToken() {
          var url = "https://api.getmondo.co.uk/oauth2/token";
          var data = {
              grant_type: 'authorization_code',
              client_id: 'oauthclient_00009FHZdaBygboJja9JAn',
              client_secret: 'rEhpKM+WRIBs/zqRiStHxfFdWF+c9k6z3BjP0VqgTdCBUkLX0aurWQNKXVbQVkibKNUOojIRLB9pikDzxdwW',
              redirect_uri: 'http://localhost:8000/',
              code: $cookies.get('auth_code')
          };
          var request = {
            dataType: "json",
            url: url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            cache: false,
            async: false,
            data: $.param(data)
          }
          return $http(request)
        }

        function getAccounts(){
          var path = "/accounts"
          return requestHelper(path, null);
        }

        function getBalance(){
          var path = "/balance";
          return requestHelper(path, null);
        }

        function getTransactions(){
          var path = "/transactions"
          var params = {
            'expand[]': 'merchant',
            account_id: $cookies.get('account_id')
          }
          return requestHelper(path, params);
        }

        function getWhoAmI(){
          var path = "/ping/whoami"
          return requestHelper(path, null);
        }

        function requestHelper(path, params){
          var accesscode = $cookies.get('access_token');
          var request = {
            dataType: "json",
            url: "https://api.monzo.com" + path,
            headers: {'Authorization': 'Bearer ' + accesscode},
            method: 'GET'
          }
          if(params){
            request.params = params;
          }

          console.log("----------");
          console.log("Making request");
          console.log("URL: " + request.url);
          console.log("Method: " + request.method);
          console.log("Data: ");
          console.log(request.params);
          console.log("----------");

          return $http(request);
        };
    }
})();
