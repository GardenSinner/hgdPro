const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('teacher.json');
const router2 = jsonServer.router('student.json');
const multer = require('multer');
const path = require('path');
const middlewares = jsonServer.defaults();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, 'public/upload')); // 文件存储的路径
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname); // 调整文件的保存地址
  }
});
const upload = multer({ storage: storage });
server.use(middlewares);
server.use(jsonServer.bodyParser);
// 所有的api的请求都要求登陆后才能获取到对应的数据
server.use('/api/teacher', (req, res, next) => {
  if (req.get('Authorizontion')) {
    next();
  } else {
    res.status(401).jsonp({
      code: 8,
      msg: '用户没有登录，不能访问'
    });
  }
});// 所有的api的请求都要求登陆后才能获取到对应的数据
server.use('/api/student', (req, res, next) => {
  if (req.get('Authorizontion')) {
    next();
  } else {
    res.status(401).jsonp({
      code: 8,
      msg: '用户没有登录，不能访问'
    });
  }
});

// 用户登录成功
server.post('/userlogin', (req, res) => {
  console.log(req.body);
  if (req.body.username === 'liuhao' && req.body.password === '1aG9+c6Yn9YWEGPpS5K96suU7SM') {
    res.jsonp({
      code: 1,
      msg: '登录请求成功,即将跳转到学生端页面',
      token: 'jfksdjfldsjflk'
    });
  } else if (req.body.username === 'gusyu' && req.body.password === 'fEqNCco3Yq9h5ZUglD3CZJT4lBs') {
    res.jsonp({
      code: 2,
      msg: '登录请求成功，即将跳转到学生端页面',
      token: 'dgfdgdfgdfgdfsgdsfg'
    });
  } else if (req.body.username === 'admin' && req.body.password === '1aG9+c6Yn9YWEGPpS5K96suU7SM') {
    res.jsonp({
      code: 3,
      msg: '登录请求成功，即将跳转到编辑端',
      token: 'jsdklfjdsklfjsal'
    });
  } else if (req.body.username === 'admin' && req.body.password === 'fEqNCco3Yq9h5ZUglD3CZJT4lBs') {
    res.jsonp({
      code: 4,
      msg: '登录请求成功，即将跳转到编辑端',
      token: 'sdfhdjksfsdflfsdfsdf'
    });
  } else {
    res.jsonp({
      code: 0,
      msg: '用户名或者密码错误'
    });
  }
});
server.use('/api/teacher', router);
server.use('/api/student', router2);

// 文件上传

server.all('/api/upload', upload.single('imgF'), function(req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  var file = req.file;
  console.log(file);

  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  res.json({ img: `<img src="/upload/${file.filename}">` });
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
