var mongoose = require('mongoose');

var express = require('express')
const multer = require('multer')
var app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.json());
var url = 'mongodb://127.0.0.1:27017/bilibili'
var birds = require('./birds')
var users = require('./routes/users')
var model = require('./model')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //上传目录
    cb(null, './tmp')
  },
  //上传文件名
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })

const fs = require('fs')
const pathLib = require('path')
// 导入校验token的模块, 解析JWT字符串, 还原成 JSON 对象 的模块
const { expressjwt:jwt } = require('express-jwt')
const SECRET_KEY = 'login2021' // 与生成token的密钥要一致!
app.use(
  jwt({
    secret:SECRET_KEY,
    algorithms: ['HS256'], // 使用何种加密算法解析
  }).unless({path:['/users/login','/users/register']})
)
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
// app.use(multer({ dest: './tmp/' }).any())

app.use('/birds',birds)
app.use('/users',users)
//中间件
// app.use('/mongooseTest',(request, response, next)=> {
//   console.log('定义第一个中间件');
//   next();
// })

app.get('/',function(req, res){
  console.log(model)
  res.send('连接成功')
})

app.get('/mongooseTest', function(req ,res){
  mongoose.connect(url)
  mongoose.connection.on('open', ()=>{
    console.log('连接成功~~')
    let BookSchema =new mongoose.Schema({
      title:String,
      author:String,
      price:Number,
      
    })
    let BookModel = mongoose.model('song', BookSchema)
    
    // 增加数据
    BookModel.create(
      [
        {
          title: '呐喊',
          author: '鲁迅',
          price: 19.9
        },
        {
          title: '静夜思',
          author: '李白',
          price: 19.9
        }
      ]
    ).then((data)=>{
      console.log(data)
    }).catch((res)=>{
      console.log(res)
    })
    
    //删除一个数据
    // BookModel.deleteOne({_id:'65d2fe5014f3be25ab8e3928'}).then((data)=> {
    //   console.log(data)
    // }).catch((res)=>{
    //   console.log(res)
    // })

    //删除多个数据
    // BookModel.deleteMany({title:'西游记2'}).then((data)=> {
    //   console.log(data)
    // }).catch((res)=>{
    //   console.log(res)
    // })

    //跟新一个数据
    // BookModel.updateOne({title:'西游记1'}, {title:'西游记2'}).then((data) => {
    //   console.log(data)
    // }).catch((res)=>{
    //   console.log(res)
    // })

    //更新多个数据
    // BookModel.updateMany({author:'吴承恩'}, {title:'承恩吴'}).then((data) => {
    //   console.log(data)
    // }).catch((res)=>{
    //   console.log(res)
    // })


    // 查询一个数据
    // BookModel.findOne({author:'吴承恩1'}).then((data) => {
    //   console.log(data)
    // }).catch((res)=>{
    //   console.log(res)
    // })
    // BookModel.findById('65d311ee967bba97f9d42ded').then((data) => {
    //   console.log(data)
    // }).catch((res)=>{
    //   console.log(res)
    // })

    //查询多个数据
    // BookModel.find({author:'吴承恩'}).then(data => {
    //   console.log(data)
    // }).catch(res => {
    //   console.log(res)
    // })
    // BookModel.find().then(data => {
    //   console.log(data)
    // }).catch(res => {
    //   console.log(res)
    // })

    // BookModel.find().sort({author:-1}).then(data => {
    //   console.log(data)
    // }).catch(res => {
    //   console.log(res)
    // })
  })

  mongoose.connection.on('error', ()=> {
    console.log('连接错误~~')
  })

  mongoose.connection.on('close', ()=> {
    console.log('连接关闭~~')
  })

  res.send('连接成功')
})

// 文件上传接口
app.post('/fileUpload', upload.array('files', 3), (req, res) => {
  console.log(req.body)
  console.log(req.files)
  res.end('上传成功')
})

app.post('/file/download', function (request, response) {
  // console.log(request)
  var name = "18f886373282a6da5dc3b0e5ee634d1b.pdf";// 待下载的文件名
  var path = __dirname + "/tmp/" +  name;// 待下载文件的路径，指定为当前项目目录下的hello.txt文件
  console.log(__dirname)
  console.log(path)
  var f = fs.createReadStream(path);
  response.writeHead(200, {
      'Content-Type': 'application/force-download',
      'Content-Disposition': 'attachment; filename=' + name
  });
  f.pipe(response);
  // response.send('download successfully')
  // return;
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

// mongoose.connect(url);
// mongoose.connection.on('open', () => {
//   console.log('连接成功')
// })
// mongoose.connection.on('error', () => {
//   console.log('连接失败')
// })
// mongoose.connection.on('close', () => {
//   console.log('连接关闭')
// })
