const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const _=require('lodash');
let UserSchema = new mongoose.Schema( {
    email: {
        type: String,
    },
    username:{
        type: String
    },
    password:{
        type:String
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required: true
        }
    }
    ]
});
UserSchema.methods.toJSON=function(){
  let user=this;
  let userObject=user.toObject();
  return _.pick(userObject,['_id','email','username']);
};
UserSchema.methods.generateAuthToken=function(){
    let user=this;
    let access="auth";
    let token=jwt.sign({_id:user._id.toHexString(),access},"abc123").toString();
    user.tokens=user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
        return token;
    })

};
let User = mongoose.model('User',UserSchema);
module.exports={User};