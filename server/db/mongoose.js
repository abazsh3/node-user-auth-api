let mongoose = require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONOLAB_URI||"mongodb+srv://abaz:abazabaz@cluster0-tvwfm.mongodb.net/test?retryWrites=true&w=majority"
    ,()=>{}
    ,{useNewUrlParser:true})
    .catch(err=>{
        console.log(err);
    });

module.exports={mongoose};