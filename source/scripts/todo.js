angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    // todoList.todos = [
    //   {text:'learn AngularJS', done:true},
    //   {text:'build an AngularJS app', done:false}];

    //
    // let sessData = [
    //   {text:'learn AngularJS', done:true},
    //   {text:'build an AngularJS app', done:false}];
    //
    // sessionStorage.setItem('todoData', JSON.stringify(sessData));

    let sessStor = sessionStorage.getItem('todoData') || false;
    todoList.todos = sessStor ? JSON.parse(sessStor) : [];


    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      console.log(todoList.todos);
      let todoFoo = todoList.todos;
      console.log(JSON.stringify(todoFoo));
      // sessionStorage.setItem('todoData', JSON.stringify(todoList.todos));
      todoList.todoText = '';
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });
