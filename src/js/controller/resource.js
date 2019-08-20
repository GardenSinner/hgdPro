require.config({
  shim: {
    strap: ['jquery'],
    validate: ['jquery', 'strap'],
    pagenation: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    Cookies: '/lib/jscookie',
    api: '/js/service/api',
    tpl: '/lib/template/tpl',
    step: '/js/service/step',
    strap: '/lib/bootstrapmin',
    validate: '/lib/bootstrapValidator.min',
    getpage: '/lib/getpage',
    pagenation: '/lib/zxf_page'

  }
});
require(['jquery', 'Cookies', 'step', 'api', 'tpl', 'strap', 'validate', 'getpage', 'pagenation'], function($, Cookies, step, api, template, strap, validate, getpage, pagenation) {
  $(document).ready(function() {
    api.editmenu(function(datas) {
      var arrdata = datas;
      var newArr = [];
      for (var i = 0; i < arrdata.length; i++) {
        arrdata[i].children = [];
        for (var j = 0; j < arrdata.length; j++) {
          if (arrdata[j].pid === arrdata[i].id) {
            arrdata[i].children.push(arrdata[j]);
          }
        }
        if (arrdata[i].children.length > 0) {
          newArr.push(arrdata[i]);
        }
      }
      // console.log(newArr);
      $('.edit_list_aside').html(template('bootaside', { data: newArr }));
      $('.panelClick').on('click', '.list-group-item', function() {
        // console.log($(this).html());
        var aloneurl = $(this).attr('url');
        // console.log(aloneurl);
        $('#myiframe').attr('src', '/views/compile/' + aloneurl);
      });
    });
  });
});
