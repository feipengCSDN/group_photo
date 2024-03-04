var mongoose = require('../common/db')

var user = new mongoose.Schema({
  username:String,
  password:String,
  userMail: String,
  userPhone: String,
})

var userModel = mongoose.model('user', user)
module.exports = userModel