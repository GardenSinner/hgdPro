require.config({
  shim: {
    easyui: ['jquery'],
    ealangpack: ['jquery'],
    pagination: ['jquery']
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
    pagination: '/lib/jquery.simplePagination',
    getpage: '/lib/getpage'

  }
});
require(['jquery', 'Cookies', 'step', 'easyui', 'ealangpack', 'api', 'tpl', 'common', 'pagination', 'getpage'], function($, Cookies, step, easyui, ealangpack, api, tpl, common, pagination, getpage) { // 设置依赖的模块，就是jQuery文件
  $(document).ready(function() {
    $.parser.parse();
    $('.header').html(tpl('header', {}));
    common.initHead();
    $('.navi').html(tpl('studentnav', { }));

    api.studentcourse_category(function(datas) {
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
      $('.course_list').prepend(tpl('courseList', {
        data: newArr
      }));
      var h = document.querySelectorAll('.course_list_left .content_h');
      var b = document.querySelectorAll('.course_list_left .content_b');
      for (var k = 0; k < h.length; k++) {
        h[k].index = k;
        // true: 隐藏
        h[k].collapsed = true;

        h[k].onclick = function() {
          // 循环所有的h2和ul
          for (var m = 0; m < h.length; m++) {
            // 判断当前循环中获取到的h2和当前点击的h2是不是同一个
            if (h[m] === this) {
              // 当前是显示还是隐藏
              if (this.collapsed) {
                b[m].style.display = 'block';
              } else {
                b[m].style.display = 'none';
              }

              h[m].collapsed = !h[m].collapsed;
            } else {
              // 和当前点击的不相等，则隐藏
              h[m].collapsed = true;
              b[m].style.display = 'none';
            }
          }
        };
      }

      // 分页的实现,初始化数据
      function initData(page, size) {
        var pages = page || 1;
        var sizes = size || 20;
        // 发送请求
        api.studentuserList(function(imgs) {
          // 把数据转化为模板需要的数据
          var current = getpage.getpage(pages, sizes, imgs);
          // 求总页数一页显示20条
          var pageCount = Math.ceil(current.total / 20);
          // 总页码数
          current.pageCount = pageCount;
          current.page = pages;
          // console.log(current);
          // 渲染当前页的数据添加到页面上
          $('.course_list_right').html(tpl('coursePage', {
            data: current
          }));
          $('.paging').page({
            items: current.total,
            itemsOnPage: 20,
            // 当前页
            currentPage: pages,
            prevText: '上一页',
            nextText: '下一页',
            cssStyle: 'compact-theme',
            // 点击按钮的时候把当前的page值付给pages重新发ajax请求
            onPageClick: function(pageNum) {
              pages = pageNum;
              initData(pages);
            }
          });
          $('.nextpage').on('click', function() {
            $('.paging').page('nextPage');
          });
          $('.backpage').on('click', function() {
            $('.paging').page('prevPage');
          });
          $('.imgList').on('click', 'a', function() {
            var uid = $(this).attr('uid');
            window.location.href = './coursedetail.html?id=' + uid;
          });
        });
      }
      initData();
      // 点击每个分类把对应的列表显示出来
      $('.course_list_left').find('p').on('click', function() {
        // 拿到自定义属性的uid的值
        var uid = parseInt($(this).attr('uid'));
        // 调用api接口
        function initData(page, size) {
          var pages = page || 1;
          var sizes = size || 20;
          // 发送请求
          api.studentuserList(function(imgs) {
            // 把数据转化为模板需要的数据
            // 遍历imgs的数据找出数据中的id和所点击的uid的相同的数据
            var newdata = imgs.filter(function(item, index) {
              return item.catId === uid;
            });
            console.log(newdata);
            var current = getpage.getpage(pages, sizes, newdata);
            // 求总页数一页显示20条
            var pageCount = Math.ceil(current.total / 20);
            // 总页码数
            current.pageCount = pageCount;
            current.page = pages;
            // console.log(current);
            // 渲染当前页的数据添加到页面上
            $('.course_list_right').html(tpl('coursePage', {
              data: current
            }));
            $('.paging').page({
              items: current.total,
              itemsOnPage: 20,
              // 当前页
              currentPage: pages,
              prevText: '上一页',
              nextText: '下一页',
              cssStyle: 'compact-theme',
              // 点击按钮的时候把当前的page值付给pages重新发ajax请求
              onPageClick: function(pageNum) {
                pages = pageNum;
                initData(pages);
              }
            });
            $('.nextpage').on('click', function() {
              $('.paging').page('nextPage');
            });
            $('.backpage').on('click', function() {
              $('.paging').page('prevPage');
            });
            $('.imgList').on('click', 'a', function() {
              var uid = $(this).attr('uid');
              window.location.href = './coursedetail.html?id=' + uid;
              console.log(window.location.href);
            });
          });
        }
        initData();
      });
    });

    $('.footer').html(tpl('footer', {}));
  });
});
