angular.module('notesapptoo', ['ngMessages'])
  .controller('MainCtrl',[function() {
    var self = this;
    self.modelOptions = {
      updateOn: "blur",
      debounce: 100,
      getterSetter: true
    }
    self.submit1=function() {
      console.log('User clicked submit with ', self.user1);
    };
    self.submit2=function() {
      console.log(' User clicked submit with ', self.user2);
    };
  }]);
