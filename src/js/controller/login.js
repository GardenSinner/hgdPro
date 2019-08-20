require.config({
  shim: {
    easyui: ['jquery'],
    ealangpack: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery-easyui-1.7.0/jquery.min',
    api: '/js/service/api',
    tpl: '/lib/template/tpl',
    easyui: '/lib/jquery-easyui-1.7.0/jquery.easyui.min',
    // 语言包
    ealangpack: '/lib/jquery-easyui-1.7.0/locale/easyui-lang-zh_CN',
    sh1: '/lib/sha1',
    Cookies: '/lib/jscookie'
  }
});
require(['jquery', 'api', 'tpl', 'easyui', 'ealangpack', 'sh1', 'Cookies'], function($, api, tpl, easyui, ealangpack, sh1, Cookies) { // 设置依赖的模块，就是jQuery文件
  $(document).ready(function() {
    $.parser.parse();
    // 拿到用户输入的用户名密码
    $('.login').on('click', function() {
      // 获取用户输入的数据
      var userinfo = $('#login').serializeArray();
      // 给password加密
      // eslint-disable-next-line no-undef
      userinfo[1].value = b64_sha1(userinfo[1].value);
      // 判断用户输入的用户名和密码是否符合规范
      var formvalidate = $('#login').form('validate');
      // 如果验证通过发送ajax请求,如果没有提示用户名或者密码错误
      if (formvalidate) {
        api.userLogin(userinfo, function(datas) {
          // code为1跳转到学生端首页
          if (datas.code === 1) {
            // 设置cookie token登录成功后台返回前端页面的凭证
            Cookies.set('Authorizontion', datas.token);
            window.location.href = '../../views/student/index.html';
            // code为2跳转到教师端首页
          } else if (datas.code === 2) {
            // 设置cookie token登录成功后台返回前端页面的凭证
            Cookies.set('Authorizontion', datas.token);
            window.location.href = '../../views/teacher/index.html';
            // code为3跳转到编辑端首页
          } else if (datas.code === 3) {
            Cookies.set('Authorizontion', datas.token);
            window.location.href = '../../views/compile/resource.html';
            // code为4跳转到编辑端首页
          } else if (datas.code === 4) {
            Cookies.set('Authorizontion', datas.token);
            window.location.href = '../../views/compile/teacherCompile.html';
          } else {
            $.messager.alert('提示消息', '用户名密码格式错误', 'warning');
          }
        });
      }
    });
    // api.userLogin(data, function() {

    // });
  });
});
