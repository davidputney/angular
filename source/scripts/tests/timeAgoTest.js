describe('timeAgo Filter', function() {
  beforeEach(module('filtersApp'));

  var filter;
  beforeEach(inject(function(timeAgoFilter) {
    filter = timeAgoFilter;
  }));


  it('should respond based on timestamp', function() {
    var currentTime = new Date().getTime();
    currentTime -= 10000;
    expect(filter(currentTime)).toEqual('seconds ago');
    var fewMinutesAgo = currentTime - 10000 * 60;
    expect(filter(fewMinutesAgo)).toEqual('minutes ago');
    var fewHoursAgo = currentTime - 10000 * 60 * 68;
    expect(filter(fewHoursAgo)).toEqual('hours ago');
    var fewDaysAgo = currentTime - 10000 * 60 * 68 * 26;
    expect(filter(fewDaysAgo)).toEqual('days ago');
    var fewMonthsAgo = currentTime - 10000 * 60 * 68 * 26 * 32;
    expect(filter(fewMonthsAgo)).toEqual('months ago');
    expect(true).toEqual(true);
  });
  it('should be true', function() {
    expect(true).toEqual(true);
  });
});
