
angular.module('notesApp', ['ngRoute'])
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
    self.noteNumber;
    let dataUrl = 'https://putneyangular.firebaseio.com/notes.json'
    getData.notes(dataUrl).then(function(response) {
      self.data = response.data;
      self.noteNumber = self.data.length -1;
    }, function(errResponse) {
    }
  );
  self.editAction = function() {
    let self=this;
    // console.log(self.noteNumber);
    let foo = self.data.slice();

    foo[self.noteNumber] = self.editData;

    if (self.noteNumber + 1 === self.data.length) {
      let blankNote = {}
      blankNote.note = '';
      blankNote.author = '';
      blankNote.done = 'NO';
      foo.push(blankNote);
    }
    let dataVal = setData.notes(foo);
    self.data = dataVal;
    self.noteNumber = self.data.length -1;
    self.editData = null;
  },
  self.removeAlert = function(e) {
    var self=this;
    console.log('click');
    self.modal = e.target.value;
  },
  self.dismissAlert = function(e) {
    var self=this;
    self.modal = e.target.value;
  },
  self.removeAction = function(e) {
    var self=this;
    let foo = self.data.slice();
    foo.splice(e.target.value, 1);
    let dataVal = setData.notes(foo);
    self.data = dataVal;
    self.noteNumber = self.data.length -1;
    self.modal = null;
  }
  self.setActive = function(e) {
    var self=this;
    self.noteNumber = parseInt(e.target.dataset.note);
    self.editData = self.data[self.noteNumber];
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




//   var notes = [
//      {
//        "note": "This is note number one here here hehre",
//        "author": "Heywood Jablowme",
//        "done": "NO"
//      },
//      {
//        "note": "This is two this is note text here",
//        "author": "Seymour Butz",
//        "done": "YES"
//      },
//      {
//        "note": "This is note three here here here here",
//        "author": "Cora Spondent",
//        "done": "NO"
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
