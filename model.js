var mongoose = require('./common/db')

var BookSchema = new mongoose.Schema({
  title:String,
  author:String,
  price:Number,
})

let BookModel = mongoose.model('song', BookSchema)
module.exports = BookModel;