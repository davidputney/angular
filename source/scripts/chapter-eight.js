angular.module("filtersApp", [])
.controller("timeAgo", [function() {
  var self=this;

  self.startTime = new Date().getTime();
  console.log(this.startTime);
  self.someTimeAgo = new Date().getTime() - (1000 * 60 * 60 * 4);

  self.foo = {
    a:'a',
    b:'b',
    c:'c'
};

}])
.filter('timeAgo', [function() {
  var ONE_MINUTE = 1000 * 60;
  var ONE_HOUR = ONE_MINUTE * 60;
  var ONE_DAY = ONE_HOUR * 24;
  var ONE_MONTH = ONE_DAY * 30;

  return function(ts, optShowSecondsMessage) {
    if (optShowSecondsMessage !== false) {
      optShowSecondsMessage = true;
    }
    var currentTime = new Date().getTime();
    var diff = currentTime - ts;

    if (diff < ONE_MINUTE && optShowSecondsMessage) {
      return "seconds ago"
    } else if (diff < ONE_HOUR) {
      return "minutes ago"
    } else if (diff < ONE_DAY) {
      return "hours ago"
    } else if (diff < ONE_MONTH) {
      return "days ago"
    } else {
      return "months ago"
    }
  };
}]);



// angular.module("notesappChEight", [])
// .controller("MainCtrlChEight", ["currencyFilter", function(currencyFilter) {
//   var self=this;
//
//   self.notes = [
//     {label: 'FC Todo', type: 'chore', done: false, num: 1},
//     {label: 'FT Todo', type: 'task', done: false, num: 2},
//     {label: 'FF Todo', type: 'fun', done: true, num: 2 },
//     {label: 'SC Todo', type: 'chore', done: true, num: 2},
//     {label: 'ST Todo', type: 'task', done: true, num: 2},
//     {label: 'SF Todo', type: 'fun', done: true, num: 2},
//     {label: 'TC Todo', type: 'chore', done: false, num: 2},
//     {label: 'TT Todo', type: 'task', done: false, num: 2},
//     {label: 'TF Todo', type: 'fun', done: false, num: 2}
//   ];
//
//
//   self.converted = false;
//   self.notesData = self.notes;
//
//   self.convertMoney = function(val) {
//       let convert = !self.converted
//       ? .79
//       : 1.26;
//
//       let
//
//       self.notesData = self.notesData.map((el) => {
//         el.num = currencyFilter(el.num * convert);
//         return el;
//       });
//       self.converted = !self.converted;
//   };
//
//   self.loadFunc = function() {
//     return self.notesData;
//   }
//
//   self.sortOrder = ['+type', '-label']
//   self.filterOptions = {
//     "string": "",
//     "object": {done: false, label: "C"},
//     "function": function(note) {
//       return note.type === "task" && note.done === false;
//     }
//   };
//   self.currentFilter = "string";
// }]);
