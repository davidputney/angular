function ItemService() {
  var items = [
     {id: 1, label: "Item 0"},
     {id: 2, label: "Item 1"}
   ];
   this.list = function() {
     return items;
   },
   this.add = function(item) {
     items.push(item);
   }
}

angular.module('notesappChFive', [])
  .service("ItemService", [ItemService])
  .controller('MainCtrlChFive', ["$window", function(window) {
    var self=this;
    self.tab="first";
    console.log(window);
    self.open = function(tab) {
      self.tab=tab;
    }
  }])
  .controller("subCtrl", ["ItemService", function(ItemService) {
    var self=this;
    self.list = function() {
      return ItemService.list();
    }
    console.log(self.list());
    self.add = function() {
      ItemService.add({
        id: self.list().length + 1,
        label: "Item" + self.list().length
      });
    };
  }])
  // .factory("ItemService", [function() {
  //   var items = [
  //     {id: 1, label: "Item 0"},
  //     {id: 2, label: "Item 1"}
  //   ];
  //   return {
  //     list: function() {
  //       return items;
  //     },
  //     add: function(item) {
  //       items.push(item);
  //     }
  //   };
  // }]);


  // .controller("subCtrl", [function() {
  //   var self=this;
  //   self.list = [
  //     {id:1,label:'Item 0'},
  //     {id:2,label:'Item 1'}
  //   ];
  //
  //   self.add = function() {
  //       console.log('click', self.list);
  //       self.list.push({
  //       id: self.list.length + 1,
  //       label: 'Item' + self.list.length
  //     });
  //   };
  // }]);
