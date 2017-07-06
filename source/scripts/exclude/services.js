// File: chapter10/routing-example/app/scripts/services.js
angular.module('fifaApp')
  .factory('FifaService', ['$http',
    function($http) {
      return {
        getTeams: function() {
          return $http.get('http://localhost:8080/api/team');
        },

        getTeamDetails: function(code) {
          return $http.get('http://localhost:8080/api/team/' + code);
        }
      }
  }])
  .factory('UserService', ['$http', function($http) {
    var service = {
      isLoggedIn: false,

      session: function() {
        return $http.get('http://localhost:8080/api/session')
              .then(function(response) {
          service.isLoggedIn = true;
          return response;
        }, function(error) {
          console.log('error', error);
        }
      );
      },

      login: function(user) {
        return $http.post('http://localhost:8080/api/login', user)
          .then(function(response) {
            console.log(response);
            service.isLoggedIn = true;
            return response;
        });
      }
    };
    return service;
  }]);
