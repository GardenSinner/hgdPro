/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = window.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('assembly',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,index=$data.index,$escape=$utils.$escape,$out='';$out+='<div class="form-group">\n  <label class="col-sm-4 issue control-label">组合题（请选择组合成该题型的小题）</label>\n  <div>\n    ';
$each(data,function(item,index){
$out+='\n    <label class="checkbox-inline">\n      <input type="checkbox" name="inlineCheckbox" id="inlineCheckbox';
$out+=$escape(index);
$out+='" value="';
$out+=$escape(item.name);
$out+='">';
$out+=$escape(item.name);
$out+='\n    </label>\n    ';
});
$out+='\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('bootaside',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,index=$data.index,$escape=$utils.$escape,value=$data.value,$out='';$out+='<div class="panel-group panel" id="accordion" role="tablist" aria-multiselectable="true">\n  ';
$each(data,function(item,index){
$out+='\n  <div class="panel panel-default panelClick">\n    <div class="panel-heading" role="tab" id="heading';
$out+=$escape(index);
$out+='">\n      <h4 class="panel-title">\n        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse';
$out+=$escape(index);
$out+='" aria-expanded="false"\n          aria-controls="collapse';
$out+=$escape(index);
$out+='">\n          ';
$out+=$escape(item.name);
$out+='\n        </a>\n      </h4>\n    </div>\n    <div id="collapse';
$out+=$escape(index);
$out+='" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading';
$out+=$escape(index);
$out+='">\n      <ul class="list-group">\n        ';
$each(item.children,function(value,index){
$out+='\n        <li class="list-group-item" url="';
$out+=$escape(value.url);
$out+='">';
$out+=$escape(value.name);
$out+='</li>\n        ';
});
$out+='\n      </ul>\n    </div>\n  </div>\n  ';
});
$out+='\n</div>\n';
return new String($out);
});/*v:1*/
template('btTable',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,index=$data.index,$escape=$utils.$escape,$string=$utils.$string,$out='';$out+='<div class="table-responsive">\n    <table class="table">\n      <thead>\n        <tr>\n          <th>ID</th>\n          <th>题型名称</th>\n          <th>类型</th>\n          <th>基础类型</th>\n          <th>是否关联题库</th>\n          <th>操作</th>\n        </tr>\n      </thead>\n      <tbody>\n        ';
$each(data,function(item,index){
$out+='\n        <tr>\n          <td>';
$out+=$escape(item.id);
$out+='</td>\n          <td>';
$out+=$escape(item.questionNname);
$out+='</td>\n          <td>';
$out+=$escape(item.type);
$out+='</td>\n          ';
if(item.inlineCheckbox){
$out+='\n          <td>';
$out+=$escape(item.basicsQuestion);
$out+='(';
$out+=$escape(item.inlineCheckbox);
$out+=')</td>\n          ';
}else{
$out+='\n          <td>';
$out+=$escape(item.basicsQuestion);
$out+='</td>\n          ';
}
$out+='\n          <td>';
$out+=$escape(item.correlation);
$out+='</td>\n          <td isEdit="';
$out+=$escape(item.isEdit);
$out+='">';
$out+=$string(item.edit);
$out+='</td>\n        </tr>\n        ';
});
$out+='\n      </tbody>\n    </table>\n    <div class="zxf_pagediv"></div>\n  </div>\n';
return new String($out);
});/*v:1*/
template('carousel',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,carousel=$data.carousel,val=$data.val,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="swiper-wrapper">\n  ';
$each(carousel,function(val,$index){
$out+='\n  <div class="swiper-slide"><img src="';
$out+=$escape(val.bgUrl);
$out+='"></div>\n  ';
});
$out+='\n</div>\n<!-- 如果需要分页器 -->\n<div class="swiper-pagination"></div>\n';
return new String($out);
});/*v:1*/
template('courseInfo',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,data=$data.data,$out='';$out+='<div class="con-bd-main" info>\n  <div class=\'info\'>\n    <h3>课程介绍</h3>\n    ';
$out+=$string(data.textbook);
$out+='\n  </div>\n  <div class=\'info\'>\n    <h3>教师介绍</h3>\n    ';
$out+=$string(data.aboutauthor);
$out+='\n  </div>\n  <div class=\'info catalog\'>\n    <h3>课程目录</h3>\n    ';
$out+=$string(data.catalog);
$out+='\n  </div>\n\n</div>\n';
return new String($out);
});/*v:1*/
template('courseList',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,index=$data.index,$escape=$utils.$escape,value=$data.value,$out='';$out+='<ul class="course_list_left" course_list>\n  ';
$each(data,function(item,index){
$out+='\n  <li>\n    <div class="content_h clearfix">\n      <i></i>\n      <span>';
$out+=$escape(item.name);
$out+='</span>\n    </div>\n    <div class="content_b">\n      ';
$each(item.children,function(value,index){
$out+='\n      <p uid="';
$out+=$escape(value.id);
$out+='">';
$out+=$escape(value.name);
$out+='</p>\n      ';
});
$out+='\n    </div>\n  </li>\n  ';
});
$out+='\n</ul>\n';
return new String($out);
});/*v:1*/
template('coursePage',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$each=$utils.$each,item=$data.item,index=$data.index,$out='';$out+='<div class="c_r_h clearfix">\n  <h3>共<span>';
$out+=$escape(data.total);
$out+='</span>个课程</h3>\n  <div class=\'right\'>\n    <i class=\'backpage\'>&lt;</i>\n    <span>';
$out+=$escape(data.page);
$out+='</span>\n    <span>/</span>\n    <span>';
$out+=$escape(data.pageCount);
$out+='</span>\n    <i class=\'nextpage\'>&gt;</i>\n  </div>\n</div>\n<ul class="imgList">\n  ';
$each(data.currentData,function(item,index){
$out+='\n  <li>\n    <a href="javascript:;" uid="';
$out+=$escape(item.id);
$out+='">\n      <img src="';
$out+=$escape(item.img);
$out+='" alt="">\n    </a>\n    <p>';
$out+=$escape(item.title);
$out+='</p>\n    <p class=\'clearfix\'><span class=\'author\'>';
$out+=$escape(item.author);
$out+='</span><span class=\'press\'>';
$out+=$escape(item.press);
$out+='</span></p>\n  </li>\n  ';
});
$out+='\n</ul>\n<div class="page">\n  <h3>共<span>';
$out+=$escape(data.total);
$out+='</span>个课程</h3>\n  <div class="paging" page></div>\n</div>\n';
return new String($out);
});/*v:1*/
template('courseSetting',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,setting=$data.setting,$out='';$out+='<div class="process" dollar>\n  <div class="step-first" dollar>\n    <div class="ball-first">1</div>\n    <p class="p1">选择教材</p>\n  </div>\n  <div class="step-second" dollar>\n    <div class="ball-second">2</div>\n    <p class="p2">课程设置</p>\n  </div>\n  <div class="step-third">\n    <div class="ball-third">3</div>\n    <p class="p3">建立成功</p>\n  </div>\n</div>\n<div class="selected-course">\n  <div class="selected-hd">\n    <span>选用的教材</span>\n    <a href="/createCourse.html" oid="';
$out+=$escape(setting.id);
$out+='">更换教材</a>\n  </div>\n  <div class="selected-bd">\n    <img src="';
$out+=$escape(setting.img);
$out+='">\n    <div class="msg">\n      <h4>';
$out+=$escape(setting.tit);
$out+='</h4>\n      <p>';
$out+=$escape(setting.author);
$out+='</p>\n      <p>';
$out+=$escape(setting.content);
$out+='</p>\n      <p>';
$out+=$escape(setting.date);
$out+='</p>\n    </div>\n  </div>\n</div>\n<div class="info-submit">\n  <div class="info-submit-tit">\n    <h3>基本信息</h3>\n  </div>\n  <form id="frm" action="/api/upload" method="POST" enctype="multipart/form-data">\n    <div class="info-sumbit-bd">\n      <ul class="alllist">\n        <li class="t1" table>\n          <span>课程名称</span>\n          <input type="text" class="class-name">\n        </li>\n        <li class="t2" table>\n          <span start>开课时间</span>\n          <input type="radio" id="set" name="setting" checked>\n          <label for="set">设置</label>\n          <input type="radio" id="set-no" name="setting">\n          <label for="set-no">不设置</label>\n        </li>\n        <li class="t3" table>\n          <span>开始时间</span>\n          <input type="date">\n          <span endtime>截止时间</span>\n          <input type="date">\n        </li>\n        <li class="t4-1" table>\n          <span front>课程封面</span>\n          <input type="file" id="file">\n          <a href="javascript:void(0);" class="select-file">浏览</a>\n        </li>\n        <li class="t4-2">\n          <div class="vision">\n            <h3>预览图片</h3>\n          </div>\n          <img class="pict" src="">\n        </li>\n        <li class="t5 clearfix" table>\n          <div confirm>报名权限</div>\n          <ul class="confirm-option">\n            <li>\n              <input type="radio" id="every" name="permit" checked>\n              <label for="every">允许任何人假如课程</label>\n            </li>\n            <li>\n              <input type="radio" name="permit" id="confirm">\n              <label for="confirm">需要验证后才可假如课程</label>\n            </li>\n            <li>\n              <input type="radio" name="permit" id="noone">\n              <label for="noone">暂不开放报名</label>\n            </li>\n          </ul>\n        </li>\n        <li class="t6">\n          <span quit>学生自主退出课程</span>\n          <input class="rad1" type="radio" id="able" name="quit" checked>\n          <label for="able">允许</label>\n          <input class="rad2" type="radio" id="unable" name="quit">\n          <label for="unable">不允许</label>\n        </li>\n      </ul>\n    </div>\n    <input give type="submit" value="提交">\n  </form>\n</div>\n';
return new String($out);
});/*v:1*/
template('createCourse','<div class="process">\n  <div class="step-first">\n    <div class="ball-first">1</div>\n    <p class="p1">选择教材</p>\n  </div>\n  <div class="step-second">\n    <div class="ball-second">2</div>\n    <p class="p2">课程设置</p>\n  </div>\n  <div class="step-third">\n    <div class="ball-third">3</div>\n    <p class="p3">建立成功</p>\n  </div>\n</div>\n<div class="choose">\n  <div class="choose-hd">\n    <input type="text" placeholder="教材名称/ISBN/作者">\n    <a href="javascript: void(0);" class="magnify">\n      <i class="iconfont icon-search ic"></i>\n    </a>\n    <select aria-placeholder="全部分类">\n      <option selected style="display: none">全部分类</option>\n      <option value="aaa">aaa</option>\n      <option value="aaa">aaa</option>\n      <option value="aaa">aaa</option>\n    </select>\n  </div>\n  <div class="page-roof">\n    <span>共<span class="special">30</span>个教材</span>\n    <div class="page-num">\n      <a href="#">&lt;</a>\n      <span><span class="special">1</span>/10</span>\n      <a href="#" class="next-button">&gt;</a>\n    </div>\n  </div>\n  <div class="independent clearfix"></div>\n</div>\n');/*v:1*/
template('details',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$string=$utils.$string,$each=$utils.$each,str=$data.str,$index=$data.$index,$out='';$out+='<div class="container clearfix">\n  <div class="con-hd">\n    <span>首页</span>\n    <span>&gt;</span>\n    <span>课程资源</span>\n    <span>&gt;</span>\n    <span>课程包名称</span>\n  </div>\n  <div class="sub-con">\n    <div class="sub-con-pic">\n      <img src="';
$out+=$escape(data.imginfo);
$out+='">\n      <div>\n        <i class="iconfont icon-wode"></i>\n        <span class="icon">200</span>\n      </div>\n    </div>\n    <div class="sub-con-txt">\n      <h3>';
$out+=$escape(data.titlemain);
$out+='</h3>\n      <h6>';
$out+=$escape(data.author);
$out+='</h6>\n      <h4>';
$out+=$escape(data.price);
$out+='</h4>\n      <p>';
$out+=$escape(data.titlesmall);
$out+='</p>\n      <p>';
$out+=$escape(data.info);
$out+='</p>\n      <p>';
$out+=$escape(data.info);
$out+='</p>\n      <p>';
$out+=$escape(data.info);
$out+='</p>\n      <p>';
$out+=$escape(data.info);
$out+='</p>\n      <a class="gain" href="javascript:void(0);">获取</a>\n      <a class="immediate" href="javascript:void(0);">立即开课</a>\n    </div>\n  </div>\n  <div class="con-bd-main">\n    <h3>';
$out+=$escape(data.firsttitle);
$out+='</h3>\n    ';
$out+=$string(data.intro);
$out+='\n    <h3>';
$out+=$escape(data.secondtitle);
$out+='</h3>\n    ';
$out+=$string(data.intro);
$out+='\n    <h3>';
$out+=$escape(data.thirdtitle);
$out+='</h3>\n    ';
$each(data.outline,function(str,$index){
$out+='\n    <p>';
$out+=$escape(str.tit);
$out+=': ';
$out+=$escape(str.cont);
$out+='</p>\n    ';
});
$out+='\n  </div>\n  <div class="con-bd-aside">\n    <div class="con-bd-aside-hd">\n      <span>相关教材</span>\n      <a href="javascript:void(0);">more...</a>\n    </div>\n    <div class="con-bd-aside-main">\n      <a href="javascript:void(0);">\n        <img src="';
$out+=$escape(data.imgaside);
$out+='">\n      </a>\n      <p>超越普里瓦洛夫无穷乘积与它对解析函数的应用卷</p>\n      <a href="javascript:void(0);">\n        <img src="';
$out+=$escape(data.imgaside);
$out+='">\n      </a>\n      <p>超越普里瓦洛夫无穷乘积与它对解析函数的应用卷</p>\n    </div>\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('detailTop',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$out='';$out+='<div class="m_t clearfix" datailtop>\n  <img src="';
$out+=$escape(data.bgimg);
$out+='" alt="">\n  <div class="m_t_aside">\n    <div class="aside_top">\n      <h2>';
$out+=$escape(data.title);
$out+='</h2>\n      <p>\n        <span>课程邀请码</span>\n        <span>';
$out+=$escape(data.invitecode);
$out+='</span>\n      </p>\n    </div>\n    <div class="aside_bottom">\n      <ul class=\'clearfix\'>\n        <li>\n          <span>任课老师</span>\n          <span>';
$out+=$escape(data.author);
$out+='</span>\n          <span>';
$out+=$escape(data.college);
$out+='</span>\n        </li>\n        <li>\n          <span>开课时间</span>\n          <span>';
$out+=$escape(data.studytime);
$out+='</span>\n        </li>\n        <li>\n          <span>报名权限</span>\n          <span>所有用户都可以报名</span>\n        </li>\n        <li>\n          <span>学生人数</span>\n          <span>';
$out+=$escape(data.studycount);
$out+='</span>\n        </li>\n      </ul>\n      <div class="btn">加入课程</div>\n    </div>\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('footer','<p>Copyrignt © 2004-2016 哈尔滨工业大学出版社&nbsp; 版权所有&nbsp;&nbsp; 京ICP备11017824号-7</p>\n');/*v:1*/
template('header','<link rel="stylesheet" href="//at.alicdn.com/t/font_1126978_wvbiqde6smn.css">\n<div class="container1 clearfix">\n  <div class="logo">\n    <a href="javascript:void(0);">哈尔滨工业大学</a>\n  </div>\n  <div class="info">\n    <ul class="clearfix">\n      <li class="item"><i class="iconfont icon-xinxi"></i></li>\n      <li class="item"><img src="../../assets/touxiang.png"></li>\n      <li class="sp1 item">张三\n        <ul class="dial1">\n          <li><a href="javascript:void(0);">我的资源</a></li>\n          <li><a href="javascript:void(0);">我的订单</a></li>\n          <li><a href="javascript:void(0);">个人资料</a></li>\n          <li><a href="javascript:void(0);">退出登录</a></li>\n        </ul>\n      </li>\n      <li class="sp2 item">教师端\n        <ul class="dial2">\n          <li><a href="javascript:void(0);">学生端</a></li>\n          <li><a href="javascript:void(0);">教师端</a></li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n  <div class="search">\n    <input class="sear" type="text" placeholder="请输入关键字">\n    <i class="iconfont icon-search"></i>\n  </div>\n</div>\n');/*v:1*/
template('iframeTable','<table class="myTable">\n  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">添加教材</button>\n  <thead>\n    <tr>\n      <th>ID</th>\n      <th>题型名称</th>\n      <th>类型</th>\n      <th>基础题型</th>\n      <th>是否关联题库</th>\n      <th>操作</th>\n    </tr>\n  </thead>\n  <tbody>\n\n  </tbody>\n</table>\n');/*v:1*/
template('imgwrap',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,index=$data.index,$escape=$utils.$escape,$out='';$each(data,function(item,index){
$out+='\n<li imgwrap>\n  <a href="javascript:;">\n    <img src="';
$out+=$escape(item.simimg);
$out+='" alt="">\n  </a>\n  <p>';
$out+=$escape(item.title);
$out+='</p>\n</li>\n';
});
$out+='\n';
return new String($out);
});/*v:1*/
template('list',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,value=$data.value,index=$data.index,$escape=$utils.$escape,$out='';$out+='<ul class="img_list clearfix">\n  ';
$each(data,function(value,index){
$out+='\n  <li>\n    <div class="imgwrap">\n      <a uid="';
$out+=$escape(value.id);
$out+='" href=\'javascript:;\'>\n        <img src="';
$out+=$escape(value.img);
$out+='" alt="">\n      </a>\n      <p>';
$out+=$escape(value.title);
$out+='</p>\n    </div>\n  </li>\n  ';
});
$out+='\n</ul>\n';
return new String($out);
});/*v:1*/
template('navi','<div class="container2">\n  <div class="le">\n    <a href="javascript:void(0)">首页</a>\n    <a href="javascript:void(0)">教材</a>\n    <span></span>\n    <a href="javascript:void(0)">我的教学</a>\n  </div>\n  <div class="ri">\n    <a class="course-crea" href="./createCourse.html">建立课程</a>\n    <span></span>\n    <a href="javascript:void(0)">通过序列号获取资源权限</a>\n  </div>\n</div>\n');/*v:1*/
template('pageIndependent',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,pagedata=$data.pagedata,arr=$data.arr,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="page-data">\n  <ul class="course-details">\n    ';
$each(pagedata,function(arr,$index){
$out+='\n    <li class="clearfix">\n      <img src="';
$out+=$escape(arr.img);
$out+='">\n      <div class="main-detail">\n        <h3 class="arr-tit">';
$out+=$escape(arr.tit);
$out+='</h3>\n        <h4 class="arr-author">';
$out+=$escape(arr.author);
$out+=' 著</h4>\n        <p class="arr-content">';
$out+=$escape(arr.content);
$out+='</p>\n        <p class="arr-date">';
$out+=$escape(arr.date);
$out+='</p>\n        <a class="btn1" href="javascript:void(0);">查看详情</a>\n        <a class="btn2" pid="';
$out+=$escape(arr.id);
$out+='" href="javascript:void(0);">使用该教材建立课程</a>\n      </div>\n    </li>\n    ';
});
$out+='\n  </ul>\n</div>\n<div class="page-base clearfix">\n  <div class="sum">\n    <span>共<span class="data-num">30</span>个教材</span>\n  </div>\n  <div class="zxf_pagediv" independ></div>\n</div>\n';
return new String($out);
});/*v:1*/
template('questionType',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,index=$data.index,$escape=$utils.$escape,$out='';$out+='<label class="col-sm-4 issue control-label">基础题型:</label>\n<div class="col-sm-8">\n  ';
$each(data,function(item,index){
$out+='\n  <label class="radio-inline">\n    <input type="radio" name="basicsQuestion" id="basicsQuestion';
$out+=$escape(index);
$out+='" value="';
$out+=$escape(item.name);
$out+='">';
$out+=$escape(item.name);
$out+='\n  </label>\n  ';
});
$out+='\n</div>\n';
return new String($out);
});/*v:1*/
template('sDetailAside',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,details=$data.details,key=$data.key,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="con-bd-aside">\n  <div class="con-bd-aside-hd">\n    <span>相关教材</span>\n    <a href="javascript:void(0);">more...</a>\n  </div>\n  <div class="con-bd-aside-main">\n    ';
$each(details,function(key,$index){
$out+='\n    <a href="javascript:void(0);">\n      <img src="';
$out+=$escape(key.imgaside);
$out+='">\n    </a>\n    ';
});
$out+='\n    <p>超越普里瓦洛夫无穷乘积与它对解析函数的应用卷</p>\n    ';
$each(details,function(key,$index){
$out+='\n    <a href="javascript:void(0);">\n      <img src="';
$out+=$escape(key.imgaside);
$out+='">\n    </a>\n    ';
});
$out+='\n    <p>超越普里瓦洛夫无穷乘积与它对解析函数的应用卷</p>\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('studentdetails',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,details=$data.details,val=$data.val,$index=$data.$index,$escape=$utils.$escape,key=$data.key,$out='';$out+='<div class="container clearfix">\n  <div class="con-hd">\n    <span>首页</span>\n    <span>&gt;</span>\n    <span>课程资源</span>\n    <span>&gt;</span>\n    <span>课程包名称</span>\n  </div>\n  <div class="sub-con">\n    <div class="sub-con-pic">\n      ';
$each(details,function(val,$index){
$out+='\n      <img src="';
$out+=$escape(val.imginfo);
$out+='">\n      ';
});
$out+='\n      <div>\n        <i class="iconfont icon-wode"></i>\n        <span class="icon">200</span>\n      </div>\n    </div>\n    <div class="sub-con-txt">\n      <h3>';
$out+=$escape(val.titlemain);
$out+='</h3>\n      <h6>';
$out+=$escape(val.author);
$out+='</h6>\n      <h4>';
$out+=$escape(val.price);
$out+='</h4>\n      <a class="gain" href="javascript:void(0);">获取</a>\n      <a class="immediate" href="javascript:void(0);">立即开课</a>\n    </div>\n  </div>\n  <div class="con-bd-aside">\n    <div class="con-bd-aside-hd">\n      <span>相关教材</span>\n      <a href="javascript:void(0);">more...</a>\n    </div>\n    <div class="con-bd-aside-main">\n      ';
$each(details,function(key,$index){
$out+='\n      <a href="javascript:void(0);">\n        <img src="';
$out+=$escape(key.imgaside);
$out+='">\n      </a>\n      ';
});
$out+='\n      <p>超越普里瓦洛夫无穷乘积与它对解析函数的应用卷</p>\n      ';
$each(details,function(key,$index){
$out+='\n      <a href="javascript:void(0);">\n        <img src="';
$out+=$escape(key.imgaside);
$out+='">\n      </a>\n      ';
});
$out+='\n      <p>超越普里瓦洛夫无穷乘积与它对解析函数的应用卷</p>\n    </div>\n  </div>\n</div>\n';
return new String($out);
});/*v:1*/
template('studentnav','<div class="container2">\n  <div class="le">\n    <a href="./index.html">首页</a>\n    <a href="./course.html">课程</a>\n    <a href="javascript:void(0)">教材</a>\n    <span></span>\n    <a href="javascript:void(0)">我的学习</a>\n  </div>\n  <div class="ri">\n    <a href="javascript:void(0)">通过课程邀请码加入课程</a>\n    <span></span>\n    <a href="javascript:void(0)">通过序列号获取资源权限</a>\n  </div>\n</div>\n');/*v:1*/
template('subheader','<div class="container1 clearfix">\n  <div class="logo">\n    <a href="javascript:void(0);">哈尔滨工业大学</a>\n  </div>\n  <div class="info">\n    <ul class="clearfix">\n      <li class="item"><img src="../../assets/touxiang.png"></li>\n      <li class="user item">张三</li>\n    </ul>\n  </div>\n  <h2 class="sub-title">建立课程</h2>\n</div>\n');/*v:1*/
template('teacherCompileTable','<div class="asidee" special>\n  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">\n    <div class="panel panel-default">\n      <div class="panel-heading" role="tab" id="headingOne">\n        <h4 class="panel-title">\n          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true"\n            aria-controls="collapseOne">\n            资源管理\n          </a>\n        </h4>\n      </div>\n      <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">\n        <div class="panel-body">\n          <a href="javascript:void(0);" class="disp">题型管理</a>\n          <a href="javascript:void(0);">知识体系管理</a>\n        </div>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-heading" role="tab" id="headingTwo">\n        <h4 class="panel-title">\n          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"\n            aria-expanded="false" aria-controls="collapseTwo">\n            Collapsible Group Item #2\n          </a>\n        </h4>\n      </div>\n      <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">\n        <div class="panel-body">\n          Anim pariatur cliche reprehenderit\n        </div>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-heading" role="tab" id="headingThree">\n        <h4 class="panel-title">\n          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"\n            aria-expanded="false" aria-controls="collapseThree">\n            Collapsible Group Item #3\n          </a>\n        </h4>\n      </div>\n      <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">\n        <div class="panel-body">\n          Anim pariatur cliche reprehenderit\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<iframe class="iframe-list" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>\n');/*v:1*/
template('teacherList',function($data,$filename
) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,teacherList=$data.teacherList,tea=$data.tea,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div class="container clearfix">\n  <div class="list-item recommed">\n    <div class="list_item-h">\n      <h3>推荐课程</h3>\n      <a href="#">more</a>\n    </div>\n    <ul class="img_list clearfix">\n      ';
$each(teacherList,function(tea,$index){
$out+='\n      <li>\n        <div class="imgwrap">\n          <a uid="';
$out+=$escape(tea.id);
$out+='" href="javascript:void(0);">\n            <img src="';
$out+=$escape(tea.img);
$out+='">\n          </a>\n          <p>';
$out+=$escape(tea.course);
$out+='</p>\n        </div>\n      </li>\n      ';
});
$out+='\n    </ul>\n  </div>\n  <div class="list-item hot">\n    <div class="list_item-h">\n      <h3>热门课程</h3>\n      <a href="#">more</a>\n    </div>\n    <ul class="img_list clearfix">\n      ';
$each(teacherList,function(tea,$index){
$out+='\n      <li>\n        <div class="imgwrap">\n          <a uid="';
$out+=$escape(tea.id);
$out+='" href="javascript:void(0);">\n            <img src="';
$out+=$escape(tea.img);
$out+='" alt="">\n          </a>\n          <p>';
$out+=$escape(tea.course);
$out+='</p>\n        </div>\n      </li>\n      ';
});
$out+='\n    </ul>\n  </div>\n</div>\n';
return new String($out);
});

}()