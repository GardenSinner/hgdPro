/* eslint-disable no-useless-return */
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
    common: '/lib/common',
    getpage: '/lib/getpage',
    pagenation: '/lib/zxf_page',
    validate: '/lib/bootstrapValidator.min'
  }
});
require(['jquery', 'Cookies', 'step', 'api', 'tpl', 'strap', 'validate', 'common', 'getpage', 'pagenation'], function($, Cookies, step, api, tpl, strap, validate, common, getpage, pagenation) {
  $(document).ready(function() {
    formValidator();
    $('#myModal').on('show.bs.modal', function() {
      window.parent.$('#myiframe').css({
        'zIndex': 99999,
        'opacity': 0.5
      });
    });
    $('#myModal').on('hidden.bs.modal', function() {
      window.parent.$('#myiframe').css({
        'zIndex': 100,
        'opacity': 1
      });
      // 关闭模态框要重新校验规则之前写的内容清空
      $('#defaultForm').data('bootstrapValidator').destroy();
      $('#defaultForm').data('bootstrapValidator', null);
      formValidator();
    });
    // 添加table的模板到页面上
    function initpage(cur, intro) {
      api.resource(function(datas) {
        var page = cur || 1; // 第一次调用initPagenation时，没有传入形参cur，所以page是1
        var size = 5;
        var current = getpage.getpage(page, size, intro);
        var data = current.currentData;
        var pageCount = Math.ceil(current.total / size);
        $('.addtable').html(tpl('btTable', {
          data: data
        }));
        $('tbody td[isedit="false"] a:first-child').attr('disabled', true).css({
          'pointer-events': 'none',
          'color': '#ccc'
        });
        common.initClick();
        $('.zxf_pagediv').createPage({
          pageNum: pageCount,
          current: page, // 第一次page是1
          backfun: function(e) {
            // console.log(e.current); // 回调
            page = e.current;
            initpage(e.current, intro); // 当前选择的页数传入
          }
        });
      });
    };
    var currentData;
    api.resource(function(datas) {
      currentData = datas;
      initpage(1, currentData);
    });

    // 添加大小題型的選擇到model
    $('#inputText2').on('change', function() {
      formValidator();
      var selectOption = this.options[this.selectedIndex];
      var html = $(selectOption).html();
      if (html === '小题') {
        api.small(function(data) {
          $('.addContent').html(tpl('questionType', {
            data: data
          }));
          $('.last').html('');
        });
      } else if (html === '大题') {
        api.large(function(data) {
          $('.addContent').html(tpl('questionType', {
            data: data
          }));
          $('.addContent .radio-inline').on('click', function(e) {
            // 判断当前点击是是不是最后一个元素
            // console.log(e.target);
            // console.log($('.addContent .radio-inline:last').find('input')[0]);
            if (e.target === $('.addContent .radio-inline:last').find('input')[0]) {
              api.small(function(data) {
                $('.last').html(tpl('assembly', {
                  data: data
                }));
              });
            } else {
              $('.last').html('');
            }
          });
        });
      }
    });
    $('#inputText2').triggerHandler('change');
    // 表单验证
    $('#btn-test').on('click', function() {
      // 是否通过校验
      $('#defaultForm').data('bootstrapValidator').validate();
      if (!$('#defaultForm').data('bootstrapValidator').isValid()) {
        return;
      };
      var arr = $('#defaultForm').serializeArray();
      arr.push({
        'name': 'id',
        'value': Date.now()
      });
      // 合并inlineCheckbox属性
      var newarr = [];
      var postdata = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === 'inlineCheckbox') {
          newarr.push(arr[i].value);
        } else {
          // 过滤掉inlineCheckbox的数据
          postdata.push(arr[i]);
        }
      }
      if (newarr.length > 0) {
        postdata.push({
          'name': 'inlineCheckbox',
          'value': newarr.join()
        });
      }
      postdata.push({
        'name': 'correlation',
        'value': '是'
      }, {
        'name': 'edit',
        'value': "<a href='javascript:;'>编辑</a>&nbsp;&nbsp;<a href='javascript:;' class='remove'>删除</a>"
      });
      //  如果 postdata里面inlineCheckbox存在或者postdata.value==="小题"添加isEdit：true否则false
      var value = postdata.find(function(item, index) {
        return item.value === '小题';
      });
      var name = postdata.find(function(item, index) {
        return item.name === 'inlineCheckbox';
      });
      if (value || name) {
        postdata.push({
          'name': 'isEdit',
          'value': 'true'
        });
      } else {
        postdata.push({
          'name': 'isEdit',
          'value': 'false'
        });
      }
      $('#myModal').modal('hide');
      window.parent.$('#myiframe').css({
        'zIndex': 100,
        'opacity': 1
      });
      api.addTypes(postdata, function() {
        window.location.reload();
        // common.initTab();
      });
    });
    // 选项卡
    $('.tabs').on('click', 'input', function() {
      var clickValue = $(this).val();
      // console.log(clickValue);
      api.resource(function(data) {
        if (clickValue === '全部') {
          // var all = data;
          // $('.addtable').html(tpl('btTable', {
          //   data: all
          // }));
          initpage(1, currentData);
        } else if (clickValue === '小题') {
          var little = data.filter(function(item, index) {
            return item.type === '小题';
          });
          initpage(1, little);
          common.initClick();
        } else if (clickValue === '大题') {
          var bigData = data.filter(function(item, index) {
            return item.type === '大题';
          });
          initpage(1, bigData);
        }
      });
    });
    // 根据题型搜索
    $('.grabble').on('click', function() {
      // 拿到用户输入的题型
      var type = $(this).parent().siblings().val().trim();
      api.resource(function(datas) {
        var newdata = datas.filter(function(item, index) {
          return item.questionNname === type;
        });
        initpage(1, newdata);
      });
    });
    function formValidator() {
      $('#defaultForm').bootstrapValidator({
        // 表单框里右侧的icon
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          questionNname: {
            validators: {
              notEmpty: {
                message: '题型不能为空'
              },
              stringLength: { // 长度限制
                min: 3,
                max: 18,
                message: '题型长度必须在3到18位之间'
              }
            }
          },
          type: {
            validators: {
              notEmpty: {
                message: '选择不能为空'
              }
            }
          },
          basicsQuestion: {
            validators: {
              notEmpty: {
                message: '选择不能为空'
              }
            }
          },
          inlineCheckbox: {
            validators: {
              choice: {
                min: 1,
                message: '请选择最少1项'
              }
            }
          }

        }
      });
    };
  });
});
