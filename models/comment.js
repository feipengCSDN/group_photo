var mongoose = require('../common/db')

var comment = new mongoose.Schema({
  movie_id:String,
  username:String,
  context:String,
  check:Boolean
})

var commentModel = mongoose.model('comment',comment)

module.exports = commentModel