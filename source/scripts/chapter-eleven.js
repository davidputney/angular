angular.module("stockMarketApp", [])
  .directive("stockWidget", [function() {
      return {
        templateUrl: '/views/stocks.html',
        restrict: 'AE',
        scope: {
          stockData: '=',
          stockTitle: '@',
          whenSelect: '&'
        },
        link: function($scope, $element, $attrs) {
          $scope.getChange = function(stock) {
            return Math.ceil(
              ((stock.price - stock.previous) / stock.previous) * 100
            )
          };
          $scope.onSelect = function() {
            $scope.whenSelect({
              stockName: $scope.stockData.name,
              stockPrice: $scope.stockData.price,
              stockPrevious: $scope.stockData.previous
            })
          }
        }
      };
    }])
  .controller("MainCtrlEleven", [function() {
    var self=this;
    console.log('works');
    self.stocks = [
      {
        name: 'First Stock',
        price: 100,
        previous: 220
      },
      {
        name: 'Second Stock',
        price: 140,
        previous: 120
      },
      {
        name: 'Third Stock',
        price: 110, previous: 110
      },
      {
        name: 'Fourth Stock',
        price: 400,
        previous: 420
      }
    ]

    self.onStockSelect = function(price, name) {
      console.log("price ", price, " name ", name);
    }

    // self.changeAllStocks = function() {
    //   console.log('change all');
    //   var foo = self.stocks.map((el, i) => el = { name: 'Controller Stock', price: 200, previous: 250 });
    //   self.stocks = foo;
    // },
    // self.changeFirstStock = function() {
    //   self.stocks[0].name = "Changed first stock"
    // }

    // self.stockTemplate = '/views/stocks.html';

    // self.getChange = function(stock) {
    //   return Math.ceil(
    //     ((stock.price - stock.previous) / stock.previous) * 100
    //   )
    // };
  }]);

// angular.module("stockMarketApp", [])
//   .directive("stock-widget", [function() {
//     return {
//       templateURL: 'stock.html'
//     };
//   }]);
