var mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/expressdb');

mongoose.connect('mongodb+srv://expressdv:yr89EtTemcq3la8z@cluster0.i5050sb.mongodb.net/myblog?retryWrites=true&w=majority');

var mongoosedb = module.exports = mongoose;
