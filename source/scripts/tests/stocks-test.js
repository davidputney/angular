describe('Stock Widget Directive Rendering', function() {

  beforeEach(module('stockMarketApp'));

  var compile, mockBackend, rootScope;

  beforeEach(inject(function($compile, $httpBackend, $rootScope) {
    compile = $compile;
    mockBackend = $httpBackend;
    rootScope = $rootScope;
  }));

  it('should render html based on scope properly', function() {
    var scope = rootScope.$new();
    var scopeClickCalled = "";
    scope.myStock = {
      name: 'Best Stock',
      price: 100,
      previous: 200
    };
    scope.title = 'the best';
    scope.userClick = function(stockPrice, stockPrevious, stockName) {
      scopeClickCalled = stockPrice + ';' + stockPrevious + ';' + stockName;
    };

    mockBackend.expectGET('/views/stocks.html').respond(
      '<div ng-bind="stockTitle"></div>' +
      '<div ng-bind="stockData.price"></div>'
    );

    var element = compile(
      '<div stock-widget' +
      ' stock-data="myStock"' +
      ' stock-title="This is {{title}}"></div>' +
      'when-select="userClick(stockPrice,' +
        'stockPrevious, stockName)">' +
        '</div>'
    )(scope)

    scope.$digest();
    mockBackend.flush();

    var compiledElementScope = element.isolateScope();

    expect(compiledElementScope.stockData).toEqual(scope.myStock);
    expect(compiledElementScope.getChange(compiledElementScope.stockData)).toEqual(-50);

    expect(scopeClickCalled).toEqual('');
    compiledElementScope.onSelect();
    console.log('scopeClickCalled', scopeClickCalled);
    expect(scopeClickCalled).toEqual('100;200;Best Stock');
    // expect(false).toEqual(true);

    expect(element.html()).toEqual(
      '<div ng-bind="stockTitle" class="ng-binding">'
      + 'This is the best' + '</div>'
      + '<div ng-bind="stockData.price" class="ng-binding">' + '100' + '</div>');
  });
});
