define([
  'jquery'
], function($) {
  return {
    // 登陆接口
    userLogin: function(userinfo, callback) {
      $.ajax({
        url: '/userlogin',
        type: 'POST',
        data: userinfo,
        success: callback
      });
    },
    // 教师端推荐课程热门课程接口
    teacheruserList: function(callback) {
      $.ajax({
        url: '/api/teacher/teacherlist',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 学生端列表接口
    studentuserList: function(callback) {
      $.ajax({
        url: '/api/student/student_course',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 学生端端轮播图接口
    studentaddswiper: function(callback) {
      $.ajax({
        url: '/api/student/carousel',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 学生端课程分类接口
    studentcourse_category: function(callback) {
      $.ajax({
        url: '/api/student/course_category',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 教师端轮播图接口
    addswiper: function(callback) {
      $.ajax({
        url: '/api/teacher/carousel',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 教师端教材详情接口
    teacherDetails: function(callback) {
      $.ajax({
        url: '/api/teacher/details',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 教材接口
    teacherbook: function(callback) {
      $.ajax({
        url: '/api/student/teacherbook',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 建立课程数据接口
    createCourse: function(callback) {
      $.ajax({
        url: '/api/teacher/teaching_material',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 编辑端树状菜单接口
    editmenu: function(callback) {
      $.ajax({
        url: '/api/student/edit',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // teacher编辑端提醒数据接口
    teacherProblem: function(callback) {
      $.ajax({
        url: '/api/teacher/problem',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 编辑端资源管理表格的接口
    resource: function(callback) {
      $.ajax({
        url: '/api/student/btTable',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 編輯端小題型選擇的接口
    small: function(callback) {
      $.ajax({
        url: '/api/student/small',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 編輯端小題型選擇的接口
    large: function(callback) {
      $.ajax({
        url: '/api/student/large',
        type: 'GET',
        data: '',
        success: callback
      });
    },
    // 添加题型接口
    addTypes: function(data, callback) {
      $.ajax({
        url: '/api/student/btTable',
        type: 'POST',
        data: data,
        success: callback
      });
    },
    // 删除题型接口
    remove: function(id, callback) {
      $.ajax({
        url: '/api/student/btTable/' + id,
        type: 'DELETE',
        success: callback
      });
    },
    // 删除接口
    deleJson: function(id, callback) {
      $.ajax({
        url: '/api/teacher/problem/' + id,
        type: 'DELETE',
        success: callback
      });
    },
    // 修改题型接口
    amend: function(id, callback) {
      $.ajax({
        url: '/api/student/btTable/' + id,
        type: 'PUT',
        success: callback
      });
    }

  };
});
