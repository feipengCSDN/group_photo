var mongoose = require('mongoose')
var url = 'mongodb://127.0.0.1:27017/movieServer'
mongoose.connect(url)

module.exports = mongoose