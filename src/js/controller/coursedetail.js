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
    $('.navi').html(tpl('studentnav', {}));

    api.teacherDetails(function(datas) {

    });
    // 获取要渲染的ID
    var currentId = parseInt(window.location.search.split('=')[1]);
    api.studentuserList(function(datas) {
      var data = datas.find(function(value, index) {
        return value.id === currentId;
      });
      // 根据catid找出相似的课程
      var catid = data.catId;
      var similarity = datas.filter(function(item, index) {
        return item.catId === catid;
      });
      var similaritydata = similarity.slice(0, 2);
      $('.m_header').append(tpl('detailTop', { data: data }));
      $('.m_wrap').append(tpl('courseInfo', { data: data }));
      // 调用教材接口找到teacherid和教材id相同的
      api.teacherbook(function(books) {
        var teacherbook = books.filter(function(item, index) {
          return item.id === data.teacherId;
        });
        // console.log(teacherbook);
        $('.aside_top .aside_b').append(tpl('imgwrap', { data: teacherbook }));
      });
      // 相关课程找到和它的catid相同的数据截取前面2个数据
      $('.aside_bottom .aside_b').append(tpl('imgwrap', { data: similaritydata }));
    });
    $('.footer').html(tpl('footer', {}));
  });
});

// curl --silent --location https://rpm.nodesource.com/setup_10.x | bash -
