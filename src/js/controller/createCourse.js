require.config({
  shim: {
    easyui: ['jquery'],
    ealangpack: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery-1.12.4.min',
    Cookies: '/lib/jscookie',
    easyui: '/lib/jquery-easyui-1.7.0/jquery.easyui.min',
    // 语言包
    ealangpack: '/lib/jquery-easyui-1.7.0/locale/easyui-lang-zh_CN',
    step: '/js/service/step',
    api: '/js/service/api',
    tpl: '/lib/template/tpl',
    Swiper: '/lib/swiper.min',
    common: '/lib/common',
    pagenation: '/lib/zxf_page'
  }
});
require(['jquery', 'Cookies', 'step', 'easyui', 'ealangpack', 'api', 'tpl', 'common', 'pagenation'], function($, Cookies, step, easyui, ealangpack, api, tpl, common, pagenation) { // 设置依赖的模块，就是jQuery文件
  $(document).ready(function() {
    $('.sub-header').html(tpl('subheader', {}));

    function initPagenation(cur) {
      api.createCourse(function(datas) {
        var page = cur || 1; // 第一次调用initPagenation时，没有传入形参cur，所以page是1
        var size = 3;
        var data = getpage(page, size, datas);
        $('.container').html(tpl('createCourse', {
          createCourse: datas
        }));
        $('.independent').html(tpl('pageIndependent', { pagedata: data }));
        $('.zxf_pagediv').createPage({
          pageNum: 10,
          current: page, // 第一次page是1
          backfun: function(e) {
            console.log(e.current); // 回调
            page = e.current;
            initPagenation(e.current); // 当前选择的页数传入
          }
        });
        $('.btn2').on('click', function() {
          var num = $(this).attr('pid');
          window.location.href = './courseSetting.html?id=' + num;
        });
      });
    }

    initPagenation();

    function getpage(page, size, datas) {
      return datas.slice((page - 1) * size, page * size);
    }

    $('.footer').html(tpl('footer', {}));
  });
});
