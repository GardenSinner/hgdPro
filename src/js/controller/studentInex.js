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
    api: '/js/service/api',
    tpl: '/lib/template/tpl',
    Swiper: '/lib/swiper.min',
    common: '/lib/common',
    step: '/js/service/step'

  }
});
require(['jquery', 'Cookies', 'easyui', 'ealangpack', 'step', 'api', 'tpl', 'common'], function($, Cookies, easyui, ealangpack, step, api, tpl, common) { // 设置依赖的模块，就是jQuery文件
  $(document).ready(function() {
    $.parser.parse();
    $('.header').html(tpl('header', {}));
    common.initHead();

    $('.navi').html(tpl('studentnav', { }));

    api.studentaddswiper(function(datas) {
      $('.swiper-container').html(tpl('carousel', { carousel: datas }));
      common.initSwiper();
    });
    api.studentuserList(function(datas) {
      // 找到属于推荐的数据
      var recommend = datas.filter(function(item, index) {
        return item.isrecommend === true;
      });
      // 找到属于热门的数据
      var hot = datas.filter(function(item, index) {
        return item.isHot === true;
      });
      $('.recommed').append(tpl('list', { data: recommend }));
      $('.hot').append(tpl('list', { data: hot }));
      $('.img_list').on('click', 'a', function() {
        var uid = $(this).attr('uid');
        window.location.href = './coursedetail.html?id=' + uid;
      });
    });

    $('.footer').html(tpl('footer', {}));
  });
});
