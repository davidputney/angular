// angular.module('notesAppChSeven', [])
//   .controller("simpleCntlChSeven", ["$location", "$window", function($location, $window) {
//     let self=this;
//     self.navigate = function() {
//       $location.path('/some/where');
//     };
//     self.navigateTwo = function() {
//       $location.path('/some/where/else');
//     }
//   }]);
//

// angular.module('notesAppChSeven', [])
//   .factory("ItemService", [function() {
//     var items = [
//       {id: 1, label: "Item 0"},
//       {id: 2, label: "Item 1"}
//     ];
//     return {
//       list: function() {
//         return items;
//       },
//       add: function(item) {
//         items.push(item);
//       }
//     };
//   }])
//   .controller("simpleCntlChSeven", ["ItemService", function(ItemService) {
//     var self=this;
//     self.items = ItemService.list()
// }]);

angular.module('notesAppChSeven', [])
  .controller("simpleCntlChSeven", ["$http", function($http) {
    var self=this;
    self.items = [];
    self.errorMessage = '';

    $http.get('http://localhost:8080/api/note').then(function(response) {
      self.items = response.data;
    }, function(errorResponse) {
      self.errorMessage = errorResponse.data.msg;
    });
}]);
