define([
  'jquery',
  'Cookies'

], function($, Cookies, easyui, ealangpack) {
  return $.ajaxSetup({
    headers: { 'Authorizontion': Cookies.get('Authorizontion') },
    statusCode: {
      401: function() {
        window.top.location.href = '/login.html';
      }
    }

  });
});
