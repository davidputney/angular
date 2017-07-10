angular.module('notesApp', ['ngRoute'])
.value('Constant', {
  MAGIC_NUMBER: 42
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
      templateUrl: '/views/notes.html',
      controller: 'notesController as notes'
    });
  }])
  .controller('notesController', ['getData', 'setData', function(getData, setData) {
    var self=this;
    let data;
    let dataUrl = 'https://putneyangular.firebaseio.com/notes.json'
    getData.notes(dataUrl).then(function(response) {
      self.data = response.data;
    }, function(errResponse) {
    }
  );
  self.saveAction = function() {
    let foo = setData.notes(self.data);

    console.log('foo', foo);
  }
}])
.factory('getData', ['$http', function($http){
  return {
    notes: function(url) {
      return $http.get(url)
    }
  }
}])
// this is where you stopped on Friday. You were in the middle of making a service that would save the values to the database and then return a success callback in the form of a notificaton that it had updated in the DB
// url of the documentation https://firebase.google.com/docs/database/web/read-and-write

.factory('setData', ['$http', function($http) {
  var self=this;
  // var database = firebase.database();
  let url = '/notes'
  var database = firebase.database().ref(url);
  return {
    notes: function(notes) {
      database.set(notes);
      let bar;
      database.on('value', function(snapshot) {
        bar = snapshot.val();
      });
      return bar;
    }
  }
}])





// let fooPromise = new Promise(function(resolve, reject) {
//   var request = new XMLHttpRequest();
//   var url = 'https://putneyangular.firebaseio.com/users.json'
//   request.onreadystatechange = function() {
//     if (request.readyState === 4) {
//       if (request.status === 200) {
//         resolve(request.responseText)
//       } else {
//         reject('shit')
//       }
//     }
//   };
//   request.open("GET", url , true);
//   request.send(null);
// }).then(function(val) {
//   console.log('val', val);
// })


// var request = new XMLHttpRequest();
// var url = 'https://putneyangular.firebaseio.com/users.json'
// request.onreadystatechange = function() {
//     if (request.readyState === 4) {
//         if (request.status === 200) {
//             document.body.className = 'ok';
//             console.log(request.responseText);
//         } else {
//             document.body.className = 'error';
//         }
//     }
// };
// request.open("GET", url , true);
// request.send(null);




//   var notes = [
//      {
//        "note": "This is note number one here here hehre",
//        "author": "Heywood Jablowme",
//        "done": true
//      },
//      {
//        "note": "This is two this is note text here",
//        "author": "Seymour Butz",
//        "done": false
//      },
//      {
//        "note": "This is note three here here here here",
//        "author": "Cora Spondent",
//        "done": false
//      }
//  ];
// //
// //
// var database = firebase.database();
//
// firebase.database().ref('notes/').set(notes);

// let foo = firebase.database().ref('/users/');
//
// foo.on('value', function(snapshot) {
//   console.log('val', snapshot.val().chats);
//
// })
