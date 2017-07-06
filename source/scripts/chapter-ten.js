angular.module('fifaApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/team_list.html',
      controller: 'TeamListCtrl as teamListCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .when('/team/:code', {
      templateUrl: 'views/team_details.html',
      controller: 'TeamDetailsCtrl as teamDetailsCtrl',
      resolve: {
        auth: ['$q', '$location', 'userService',
        function($q, $location, userService) {
          return userService.session()
          .then(
            function(success) {},
            function(err) {
              $location.path('/login');
              $location.replace();
              return $q.reject(err);
            });
        }]
      }
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  });


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
      });
    },
    login: function(user) {
      return $http.post('http://localhost:8080/api/login', user)
      .then(function(response) {
        service.isLoggedIn = true;
        return response;
      });
    }
  };
  return service;
}]);

// File: chapter10/routing-example/app/scripts/controllers.js
angular.module('fifaApp')
  .controller('MainCtrl', ['userService',
  function(userService) {
    var self=this;
    self.userService = userService;
    userService.session();
  }])
  .controller('TeamListCtrl', ['FifaService',
  function(FifaService) {
    var self=this;
    self.teams = [];
    FifaService.getTeams().then(function(resp) {
      self.teams = resp.data;
    });
  }])

  .controller('LoginCtrl', ['userService', '$location',
  function (userService, $location) {
    var self=this;
    self.user = {username: '', password: ''};
    self.login = function() {
      userService.login(self.user).then(function(success) {
        $location.path('/');
      }, function(error) {
        self.errorMessage = error.data.msg;
      })
    };
  }])
  .controller("TeamDetailsCtrl",
  ['$location', '$routeParams', 'FifaService',
  function($location, $routeParams, FifaService) {
    var self=this;
    self.team = {};
    FifaService.getTeamDetails($routeParams.code)
      .then(function(resp) {
        self.team = resp.data
      }, function(error) {
        $location.path('/login');
      });
  }]);




// angular.module('fooApp', [])
//   .controller('fooAppCtrl', [function() {
//     this.fooBar = 'foobar';
//   }]);

// angular.module('resolveApp', ['ngRoute'])
//   .config(['$routeProvider', function($routeProvider) {
//     $routeProvider.when('/', {
//       template: '<h1>Main page</h1>',
//     })
//     .when('/detail/:detId', {
//       template: '<h2>{{myCtrl.foo}} loaded {{myCtrl.detailId}}' + ' and query string is {{myCtrl.qstr}}</h2>',
//       controller: ['$routeParams', function($routeParams) {
//         this.foo = $routeParams.r;
//         this.detailId = $routeParams.detId;
//         this.qstr = $routeParams.q;
//       }],
//       controllerAs: "myCtrl"
//     });
//   }]);


// angular.module("notesappChTen", ['ngRoute'])
//   .config(["$routeProvider", function($routeProvider) {
//     $routeProvider.when('/',
//     {template: '<h5>This is the default route</h5>'})
//     .when('/second',
//     {template: '<h5>This is the second route</h5>'})
//     .otherwise({redirectTo: '/'});
//   }]);

// angular.module("resolveApp", ['ngRoute'])
//   .value('Constant', {MAGIC_NUMBER:42})
//   .config(['$routeProvider', function($routeProvider) {
//     $routeProvider.when('/', {
//       template: '<h1>Main page</h1>',
//     })
//     .when('/protected', {
//       template: '<h2>Protected page</h2>',
//       resolve: {
//         immediate: ["Constant", function(Constant) {
//           console.log('immediate');
//           return Constant.MAGIC_NUMBER * 4;
//         }],
//       async: ['$http', function($http) {
//         var foo = $http.get('http://localhost:8080/api/hasAccess');
//         console.log(foo);
//         return $http.get('http://localhost:8080/api/hasAccess');
//       }]
//     },
//     controller: ['immediate', 'async', function(immediate, async) {
//       console.log("immediate", immediate);
//       console.log('async', async);
//     }]
//   });
// }]);
