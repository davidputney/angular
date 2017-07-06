describe("simpleCntlChSeven with server calls", function() {
  beforeEach(module("notesAppChSeven"));
  var ctrl, mockBackend;

  beforeEach(inject(function($controller, $httpBackend) {
    mockBackend = $httpBackend;
    mockBackend.expectGET('http://localhost:8080/api/note').respond(200, [{id: 1, label: 'Mock'}]);
    ctrl = $controller("simpleCntlChSeven")
  }));

  it('should load items from server', function() {
    expect(ctrl.items).toEqual([])
    mockBackend.flush();
    expect(ctrl.items).toEqual([{id: 1, label:"Mock"}]);
  });

  afterEach(function() {
    mockBackend.verifyNoOutstandingExpectation();
    mockBackend.verifyNoOutstandingRequest();
  })
});



// describe('simpleCntlChSeven with inline mock', function() {
//
//   beforeEach(module('notesAppChSeven'));
//
//   var service;
//
//   beforeEach(inject(function(ItemService) {
//     service = ItemService;
//   }));
//
//   it('should expect return default items', function(){
//     expect(service.list()).toEqual(
//       [
//         {id: 1, label: "Item 0"},
//         {id: 2, label: "Item 1"}
//       ]
//     );
//   })
//   it("should add new items", function() {
//     var newItem = {id: 3, label: "New item"};
//     service.add(newItem);
//     expect(service.list()).toEqual(
//       [
//         {id: 1, label: "Item 0"},
//         {id: 2, label: "Item 1"},
//         newItem
//       ]);
//   });
// });



// describe('simpleCntlChSeven', function() {
//
//   beforeEach(module('notesAppChSeven'));
//
//   var ctrl, $loc;
//   beforeEach(inject(function($controller, $location) {
//     ctrl = $controller('simpleCntlChSeven');
//     $loc = $location;
//   }));
//
//   it('should navigate away from the current page', function() {
//     expect($loc.path()).toEqual("");
//     $loc.path('/here');
//     ctrl.navigate();
//     expect($loc.path()).toEqual('/some/where');
//   });
//
//   it('should navigate away from the current page', function() {
//     expect($loc.path()).toEqual("");
//     $loc.path('/there');
//     ctrl.navigateTwo();
//     expect($loc.path()).toEqual('/some/where/else');
//   });
//
// });
