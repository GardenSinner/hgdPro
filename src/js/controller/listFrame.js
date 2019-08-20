require.config({
  shim: {
    DataTable: ['jquery'],
    bootstrap: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    Cookies: '/lib/jscookie',
    step: '/js/service/step',
    api: '/js/service/api',
    tpl: '/lib/template/tpl',
    bootstrap: '/lib/bootstrapmin',
    DataTable: '/lib/DataTables-1.10.15/media/js/jquery.dataTables.min'
  }
});
require(['jquery', 'Cookies', 'step', 'api', 'tpl', 'bootstrap', 'DataTable'], function($, Cookies, step, api, tpl, bootstrap, DataTable) {
  $(document).ready(function() {
    api.teacherProblem(function(datas) {
      $('.big-table').html(tpl('iframeTable', {}));
      console.log(datas);
      $('.myTable').DataTable({
        data: datas,
        columns: [
          { data: 'id' },
          { data: 'type1' },
          { data: 'type2' },
          { data: 'type3' },
          { data: 'whether' },
          { data: 'action' }
        ],
        'language': { // 设置文字
          'sLengthMenu': '显示 _MENU_ 项结果',
          'sInfo': '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
          'oPaginate': {
            'sFirst': '首页',
            'sPrevious': '上页',
            'sNext': '下页',
            'sLast': '末页'
          },
          'oAria': {
            'sSortAscending': ': 以升序排列此列',
            'sSortDescending': ': 以降序排列此列'
          },
          'sSearch': '搜索:'
        },
        'columnDefs': [{
          'searchable': false,
          'orderable': true,
          'targets': 0
        }],
        'order': [[1, 'asc']]
      });
    });
  });
});
