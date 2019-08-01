let mongoose = require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb+srv://abaz:<abazabaz>@cluster0-tvwfm.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});

module.exports={mongoose};