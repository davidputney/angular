
const notesObj = [
  {
    id: 1,
    label: "First Notes",
    done: false,
    someRandom: 31431
  },
  {
    id: 3,
    label: "Finished third note",
    done: true
  },
  {
    id: 2,
    label: "Second note",
    done: false
  }
]

const notesObjToo = [
  {
    id: 1,
    label: "Changed Note x",
    done: false,
    someRandom: 4242
  },
  {
    id: 3,
    label: "Finished third note x",
    done: true
  },
  {
    id: 2,
    label: "Second note x",
    done: false
  }
]

angular.module("notesapp", [])
  .controller("MainCntrl", [
    function() {
      var self=this;
      self.notes = angular.copy(notesObj);
      self.notesToo = angular.copy(notesObj);

      self.changenotes = function() {
        let notes = angular.copy(notesObjToo);
        self.notes = angular.copy(notes);
        self.notesToo = angular.copy(notes);
        return self.notes;
      }
    }])
