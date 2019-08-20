require.config({
  shim: {
    DataTable: ['jquery'],
    bootstrap: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    Cookies: '/lib/jscookie',
    api: '/js/service/api',
    step: '/js/service/step',
    tpl: '/lib/template/tpl',
    common: '/lib/common',
    bootstrap: '/lib/bootstrapmin',
    DataTable: '/lib/DataTables-1.10.15/media/js/jquery.dataTables.min'
  }
});
require(['jquery', 'Cookies', 'api', 'step', 'tpl', 'common', 'bootstrap', 'DataTable'], function($, Cookies, api, step, tpl, common, bootstrap, DataTable) {
  $(function() {
    $('.sub-header').html(tpl('subheader', {}));
    $('.main').html(tpl('teacherCompileTable', {}));
    $('.disp').on('click', function() {
      $('.iframe-list').attr('src', '/views/compile/teacherTable.html');
    });
    $('.footer').html(tpl('footer', {}));
  });
});
