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
    $('.header').html(tpl('header', {}));
    common.initHead();
    $('.navi').html(tpl('navi', {}));
    api.teacheruserList(function(datas) {
      var curId = parseInt(window.location.search.split('=')[1]);
      // 返回的一个数组，第一个元素是 ?id，第二个元素是设置的id
      var seledata = datas.find(function(item, ind) {
        return parseInt(item.id) === curId;// 这个接口数组的元素中id和地址栏一样的元素拿出来
      });
      console.log(seledata);
      $('.main-con').html(tpl('details', { data: seledata }));
    });
    $('.footer').html(tpl('footer', {}));
  });
});
