
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
    self.modal;
    let dataUrl = 'https://putneyangular.firebaseio.com/notes.json'
    getData.notes(dataUrl).then(function(response) {
      self.data = response.data;
    }, function(errResponse) {
    }
  );
  self.saveAction = function() {
    var self=this;
    let fooBar = self.data;
    fooBar.push(self.formData);
    let dataVal = setData.notes(fooBar);
    self.data = dataVal;
  },
  self.removeAlert = function(e) {
    var self=this;
    self.modal = e.target.value;
    console.log(self.modal);
  },
  self.dismissAlert = function(e) {
    console.log('dismiss', e.target.value);
    var self=this;
    self.modal = e.target.value;
  },
  self.removeAction = function(e) {
    var self=this;
    let foo = self.data.slice();
    foo.splice(e.target.value, 1);
    let dataVal = setData.notes(foo);
    self.data = dataVal;
    self.modal = null;
  }
}])
.factory('getData', ['$http', function($http){
  return {
    notes: function(url) {
      return $http.get(url)
    }
  }
}])
.factory('setData', ['$http', function($http) {
  var self=this;
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




 //  var notes = [
 //     {
 //       "note": "This is note number one here here hehre",
 //       "author": "Heywood Jablowme",
 //       "done": true
 //     },
 //     {
 //       "note": "This is two this is note text here",
 //       "author": "Seymour Butz",
 //       "done": false
 //     },
 //     {
 //       "note": "This is note three here here here here",
 //       "author": "Cora Spondent",
 //       "done": false
 //     }
 // ];
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
