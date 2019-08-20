define([], function() {
  return {
    getpage: function(page, size, data) {
      return {
        'currentData': data.slice((page - 1) * size, page * size),
        'total': data.length
      };
    } };
});
