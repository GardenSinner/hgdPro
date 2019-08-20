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
    common: '/lib/common'

  }
});
require(['jquery', 'Cookies', 'step', 'easyui', 'ealangpack', 'api', 'tpl', 'common'], function($, Cookies, step, easyui, ealangpack, api, tpl, common) { // 设置依赖的模块，就是jQuery文件
  $(document).ready(function() {
    $.parser.parse();// 解析ui组件
    $('.header').html(tpl('header', {}));
    common.initHead();
    $('.navi').html(tpl('navi', {}));
    api.addswiper(function(datas) {
      $('.swiper-container').html(tpl('carousel', { carousel: datas }));
      common.initSwiper();
    });
    api.teacheruserList(function(datas) {
      $('.list').html(tpl('teacherList', { teacherList: datas }));
      $('.imgwrap').on('click', 'a', function() {
        var uid = $(this).attr('uid');
        window.location.href = './courseDetails.html?id=' + uid;
      });
    });
    $('.footer').html(tpl('footer', {}));
  });
});
