var express = require('express');
var user = require('../models/user')
var comment = require('../models/comment')
var crypto = require('crypto');
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'login2021'

var md5 =require("md5");

var router = express.Router();

//注册接口
router.post('/register', function(req, res, next){
  if (!req.body.username) {
    res.json({status: 1, message: "用户名为空"})
    return
  }
  if (!req.body.password) {
      res.json({status: 1, message: "密码为空"})
      return
  }
  if (!req.body.userMail) {
      res.json({status: 1, message: "用户邮箱为空"})
      return
  }
  if (!req.body.userPhone) {
      res.json({status: 1, message: "用户手机为空"})
      return
  }
  user.findOne({
    username:req.body.username
  }).then(data=>{
    console.log(data)
    if(data != null){
      res.json({status: 1, message: "用户已注册"})
      console.log('用户已注册')
    }else{
      user.create({
        username:req.body.username,
        password:req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
      })
      res.json({status: 200, message: "注册成功"})
    }
  }).catch(res=>{
    console.log(res)
  })
})

//登录接口
router.post('/login', function(req, res ,next) {
  if (!req.body.username) {
    res.json({status: 1, message: "用户名为空"})
    return
  }
  if (!req.body.password) {
      res.json({status: 1, message: "密码为空"})
      return
  }
  user.findOne({username:req.body.username}).then(data=>{
    console.log(data)
    if(data == null){
      res.json({status: 200, message: "用户名错误"})
      return
    }else if (data.password != req.body.password){ 
      res.json({status: 200, message: "密码错误"})
      return
    }else {
      console.log(md5(data.password))
      token = jwt.sign(
        { user: { name: req.body.username, password: req.body.password } },
        SECRET_KEY,
        { expiresIn: '12h' }
      )
      console.log('🚀 → token', token)

      res.json({status: 200, message: "登录成功", token})
      return
    }
  }).catch(res=>{
    console.log(res)
  })
})

//返回登录用户信息
router.get('/userInfo',(req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const tokenDate = jwt.decode(token);
  console.log(tokenDate.user.name)
  user.findOne({'username':tokenDate.user.name}).then(data=>{
    console.log(data)
    res.json({status:200,message:'获取个人信息成功',data:data})
  }).catch(res => {
    console.log(res)
  })
})

//用户提交评论
router.post('/postComment',(req, res, next) => {
  let token = req.headers.authorization.split(' ')[1]
  // console.log(token)
  const tokenDate = jwt.decode(token);
  // console.log(tokenDate)
  // console.log(tokenDate.user.name)
  if(!req.body.context){
    res.json({status:1, message:'评论内容为空'})
    return
  }
  comment.create({
    username: tokenDate.user.name,
    context: req.body.context,
    check: 0
  })
  res.json({status:200, message:'评论成功'})
  // console.log(req.headers.authorization)
  // console.log(req.headers.authorization.split(' '));
})

module.exports = router 
