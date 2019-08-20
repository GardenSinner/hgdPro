const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat'); // 可以合并编译的css和原本的sass文件
const autoprefixer = require('gulp-autoprefixer'); // 可以自动添加前缀
const cleanCss = require('gulp-clean-css'); // 可以缩小css
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const img = require('gulp-imagemin');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const collector = require('gulp-rev-collector');
const htmlmin = require('gulp-htmlmin');
const sequence = require('gulp-run-sequence');
const clean = require('gulp-clean');
const open = require('gulp-open');
const connect = require('gulp-connect');
const modRewrite = require('connect-modrewrite');
const configRevReplace = require('gulp-requirejs-rev-replace');
const tmodjs = require('gulp-tmod');
const replace = require('gulp-replace');

gulp.task('tpl', function() {
  gulp.src('src/template/*.html')
    .pipe(tmodjs({
      templateBase: 'src/template/',
      runtime: 'tpl.js',
      compress: false
    }))
    .pipe(replace('var String = this.String;', 'var String = window.String;'))
    .pipe(gulp.dest('src/lib/template'));
});
gulp.task('order', function() {
  sequence('clean', 'tpl', 'style', 'boot', 'js', 'revjs', 'htmlmin', 'copy', 'picmin');
});

gulp.task('revjs', function() {
  // return gulp
  //   .src(['./dist/*.js', '!./dist/lib/**/*.js'])
  //   .pipe(
  //     configRevReplace({
  //       manifest: gulp.src('./src/js/rev-manifest.json')
  //     })
  //   )
  //   .pipe(uglify())
  //   .pipe(gulp.dest('./dist/'));

  return gulp
    .src('./dist/js/**/*.js')
    .pipe(configRevReplace({
      manifest: gulp.src('./src/js/rev-manifest.json')
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('clean', function() {
  gulp.src(['dist/style/**', 'dist/js/**', 'dist/*.js'], {
    read: false
  })
    .pipe(clean({
      force: true
    }));
});

gulp.task('htmlmin', function() {
  return gulp.src(['src/**/*.json', 'src/**/*.html'])
    // - 读取 rev-manifest.json 文件以及需要进行css名替换的
    .pipe(collector({
      replaceReved: true
    })) // - 执行html文件内css文件名的替换和js文件名替换
    .pipe(
      htmlmin({
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        // collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
      })
    )
    .pipe(gulp.dest('dist/'));
});

gulp.task('picmin', function() {
  return gulp.src('src/assets/**/*.{png,jpg,gif,ico}')
    .pipe(img({
      optimizationLevel: 5, // 类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true,
      // 类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true // 类型：Boolean
      // 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('dist/assets/'));
});

gulp.task('js', function() {
  return gulp.src(['./src/**/*.js', '!./src/style/**/*.js', '!./src/lib/**/*.js'])
    .pipe(eslint()) // 进行校验
    .pipe(eslint.format()) // 错误消息进行格式化输出
    .pipe(eslint.failAfterError()) // 如果校验失败，结束当前输出
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify()) // 压缩js
    .pipe(rev())
    .pipe(gulp.dest('./dist/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/js/'));
});

gulp.task('copy', function() { // api src创建了一个流，这个流指向一个文件或者文件路径
  return gulp.src(['./src/assets/**/*.*', './src/lib/**', './src/fonts/**', './src/style/**/*.css', '!./src/style/main.css', '!./src/style/boot.css'], {
    read: true,
    base: './src'
  })
    // base是相对路径关系，原来文件相对src的全部复制到dist里时也是一样的相对路径
    .pipe(gulp.dest('./dist/'));
  // dest方法表示把上一个流保存到这一个流的路径里来
});

gulp.task('style:dev', function() { // 表示在开发阶段使用的
  //  两个星表示子级孙子级所有的文件
  return gulp.src(['./src/style/scss/**/*.{scss,css}', './src/style/css/**/*.{scss,css}'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // 通过插件一个方法编译，最后再保存到另外的目录里
    .pipe(
      autoprefixer({
        // 兼容css3
        browsers: ['last 2 versions'], // 浏览器版本
        cascade: true, // 美化属性，默认true
        add: true, // 是否添加前缀，默认true
        remove: true, // 删除过时前缀，默认true
        flexbox: true // 为flexbox属性添加前缀，默认true
      })
    )
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write()) // 可以在浏览器显示样式的css文件在哪个文件夹里
    .pipe(gulp.dest('./src/style/'));
});
// 开发阶段bootstrap的css的合并
gulp.task('boot:dev', function() { // 表示在开发阶段使用的
  //  两个星表示子级孙子级所有的文件
  return gulp.src(['./src/style/bootstrapcss/scss/**/*.{scss,css}', './src/style/bootstrapcss/css/**/*.{scss,css}'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // 通过插件一个方法编译，最后再保存到另外的目录里
    .pipe(
      autoprefixer({
        // 兼容css3
        browsers: ['last 2 versions'], // 浏览器版本
        cascade: true, // 美化属性，默认true
        add: true, // 是否添加前缀，默认true
        remove: true, // 删除过时前缀，默认true
        flexbox: true // 为flexbox属性添加前缀，默认true
      })
    )
    .pipe(concat('boot.css'))
    .pipe(sourcemaps.write()) // 可以在浏览器显示样式的css文件在哪个文件夹里
    .pipe(gulp.dest('./src/style/'));
});
gulp.task('boot', function() { // 表示在开发阶段使用的
  //  两个星表示子级孙子级所有的文件
  return gulp.src(['./src/style/bootstrapcss/scss/**/*.{scss,css}', './src/style/bootstrapcss/css/**/*.{scss,css}'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // 通过插件一个方法编译，最后再保存到另外的目录里
    .pipe(
      autoprefixer({
        // 兼容css3
        browsers: ['last 2 versions'], // 浏览器版本
        cascade: true, // 美化属性，默认true
        add: true, // 是否添加前缀，默认true
        remove: true, // 删除过时前缀，默认true
        flexbox: true // 为flexbox属性添加前缀，默认true
      })
    )
    .pipe(concat('boot.css'))
    .pipe(rev())
    .pipe(gulp.dest('./dist/style/')) // 输出目标文件到dist目录
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/style/css/'));
});
gulp.task('style', function() { // 这是最终使用的
  return gulp.src(['./src/style/scss/**/*.{scss,css}', './src/style/css/**/*.{scss,css}']) // 两个星表示子级孙子级所有的文件
    .pipe(sass().on('error', sass.logError)) // 通过插件一个方法编译，最后再保存到另外的目录里
    .pipe(
      autoprefixer({
        // 兼容css3
        browsers: ['last 2 versions'], // 浏览器版本
        cascade: true, // 美化属性，默认true
        add: true, // 是否添加前缀，默认true
        remove: true, // 删除过时前缀，默认true
        flexbox: true // 为flexbox属性添加前缀，默认true
      })
    )
    .pipe(
      cleanCss({
        // 压缩css
        compatibility: 'ie8',
        // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        keepSpecialComments: '*'
      })
    )
    .pipe(concat('main.css'))
    .pipe(rev())
    .pipe(gulp.dest('./dist/style/')) // 输出目标文件到dist目录
    .pipe(rev.manifest())
    .pipe(gulp.dest('./src/style/'));
});
gulp.task('dev', ['open'], function() {
  gulp.watch(['src/style/css/**', 'src/style/scss/**'], ['style:dev'], function() {
    connect.reload();
  }); // 不能加.或者/ 如果在当前路径下就直接写
  // 监听bootstrapcss文件夹的变化执行bootstrap的合并任务
  gulp.watch(['src/style/bootstrapcss/css/**', 'src/style/bootstrapcss/scss/**'], ['boot:dev']);
  // 监听两个文件夹下面的变化，变化了就执行style任务
  gulp.watch('src/template/**/*.html', ['tpl']);
});
gulp.task('devServer', function() {
  connect.server({
    root: ['./src'], // 网站根目录
    port: 38900, // 端口
    livereload: true,
    middleware: function(connect, opt) {
      return [
        modRewrite([
          // 设置代理
          '^/api/(.*)$ http://192.168.1.71:8080/mockjsdata/1/api/$1 [P]'
        ])
      ];
    }
  });
});

// 启动浏览器打开地址
gulp.task('open', ['devServer'], function() {
  gulp.src(__filename).pipe(open({
    uri: 'http://localhost:38900/login.html'
  }));
});
