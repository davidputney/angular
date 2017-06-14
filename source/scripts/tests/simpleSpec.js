// File: chapter3/ controllerSpec.js
describe('Controller: MainCntrl', function() {
  // Instantiate a new version of my module before each test
  beforeEach( module('notesapp'));
  var ctrl;
  // Before each unit test, instantiate a new instance // of the controller
  beforeEach( inject(function( $controller) {
    ctrl = $controller('MainCntrl');
  }));
  it('should have notes data available on load', function() {
    expect(ctrl.notes).toBeNonEmptyArray();
    expect(ctrl.notesToo).toBeNonEmptyArray();
  });
  it('should change the data on click', function() {
    var func = ctrl.changenotes();
    var notesBefore = notesObjToo;
    expect(func).toEqual(notesBefore);
  });
  // it('should have items available on load', function() {
  //   expect(ctrl.items).toEqual([
  //     {id: 1, label: 'First', done: true},
  //     {id: 2, label: 'Second', done: false}
  //   ]);
  // });
  // it('should have highlight items based on state', function() {
  //   var item = {id: 1, label: 'First', done: true};
  //   var actualClass = ctrl.getDoneClass(item);
  //   expect(actualClass.finished).toBeTruthy();
  //   expect(actualClass.unfinished).toBeFalsy();
  //
  //   item.done = false;
  //   actualClass = ctrl.getDoneClass(item);
  //   expect(actualClass.finished).toBeFalsy();
  //   expect(actualClass.unfinished).toBeTruthy();
  // });
  // it('should be greater than five', function() {
  //   var testVal = 5;
  //   var actualVal = ctrl.fooBar(8);
  //   expect(actualVal).toBeGreaterThan(5);
  // });
});
