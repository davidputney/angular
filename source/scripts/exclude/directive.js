// File: chapter11/directive-with-template/directive.js
angular.module('stockMarketApp')
  .directive('stockWidget', [function() {
    return {
      templateUrl: '/views/stocks.html'
    };
  }]);
