angular.module("notesappChSix", [])
.controller("MainCtrlChSix", ['noteService', function(noteService) {
  var self=this;
  self.newTodo = {};
  noteService.query()
  .then(function(response) {
      self.items = response.data
    }, function(errorResponse) {
      console.error('Error while fetching notes')
  });
  self.add = function() {
    $http.post('http://localhost:8080/api/note', self.newTodo)
      .then(fetchToDos)
      .then(function(response) {
        self.newTodo = {};
      });
  };
}])
.factory("noteService", ["$http", function($http) {
  return {
    query: function() {
      return $http.get("http://localhost:8080/api/note");
    }
  };
}]);
