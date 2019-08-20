require.config({
  shim: {
    easyui: ['jquery'],
    ealangpack: ['jquery'],
    formjs: ['jquery']
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
    formjs: 'http://malsup.github.com/jquery.form'
  }
});
require(['jquery', 'Cookies', 'step', 'easyui', 'ealangpack', 'api', 'tpl', 'common'], function($, Cookies, step, easyui, ealangpack, api, tpl, common) {
  $(document).ready(function() {
    $('.sub-header').html(tpl('subheader', {}));
    api.createCourse(function(datas) {
      var thisID = parseInt(window.location.search.split('=')[1]);
      // 返回的一个数组，第一个元素是 ?id，第二个元素是设置的id
      var seledata = datas.find(function(item, ind) {
        return parseInt(item.id) === thisID;// 这个接口数组的元素中id和地址栏一样的元素拿出来
      });
      $('.container[special]').html(tpl('courseSetting', { setting: seledata }));

      $('a[oid]').on('click', function() {
        var oid = $('a[oid]').attr('oid');
        console.log(oid);
      });
      $('#file').on('change', function() {
        console.log('执行！');
        var reads = new FileReader();
        var f = $('#file')[0].files[0];
        // var xhr = new XMLHttpRequest();

        // // new一个FormData实例
        // var formData = new FormData();

        // // 将file对象添加到FormData实例
        // formData.append('file', f);
        reads.readAsDataURL(f);
        reads.onload = function(e) {
          $('.pict').attr('src', this.result).css('display', 'block');
          $('.vision').css('display', 'none');
        };

        $('#frm').ajaxForm({
          success: function(data) {
            $('.res').html(data.img);
          },
          dataType: 'json'
        });

        // xhr.open('POST', '/views/teacher/courseSetting.html', true);
        // xhr.send(formData);

        // xhr.onreadystatechange = function() {
        //   if (xhr.readyState === 4) {
        //     if (xhr.status === 200) {
        //       // doSomeThing(this)
        //       console.log('上传成功！');
        //     } else {
        //       // error(this)
        //       console.log('失败！');
        //     }
        //   }
        // };
      });
      $('.select-file').on('click', function() {
        $('#file').click();
      });
    });

    $('.footer').html(tpl('footer', {}));
  });
});
