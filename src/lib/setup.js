// 所有请求发送前设置默认的参数
$.ajaxSetup({
  headers: { 'Authorizontion': Cookies.get('Authorizontion') },
  // 用户没有登陆后台返回401，提醒用户返回登录页面
  statusCode: {
    401: function() {
      $.messager.alert('登录失败', '用户没有登录跳转到登录页!', 'warning', function() {
        window.location.href = './login.html';
      });
    }
  }
});
