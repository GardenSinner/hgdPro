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
define([
  'jquery',
  'Swiper',
  'api'
], function($, Swiper,api) {
  return {
    initHead: function() {
      $('.sp1').hover(function() {
        $('.sp1 .dial1').css('display', 'block');
      }, function() {
        $('.sp1 .dial1').css('display', 'none');
      });
      $('.sp2').hover(function() {
        $('.sp2 .dial2').css('display', 'block');
      }, function() {
        $('.sp2 .dial2').css('display', 'none');
      });
    },
    initSwiper: function() {
      // eslint-disable-next-line no-unused-vars
      var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
          disableOnInteraction: false
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      });
    },
    initClick:function(){
      $('table').on('click', '.remove', function() {
        if (!confirm('您确认删除吗？')) {
          return;
        }
        var id = parseInt($(this).parent().parent().find('td:first-child').html());
        api.remove(id, function() {
          window.location.reload();
        });
      });
    },
    initTab:function(){
      api.resource(function(data){
        $('.addtable').html(tpl('btTable', {
          data: data
        }));
      })
    }
  };
});
