let express = require('express');
let bodyParser = require('body-parser');
let {User} = require('./models/User');
let {mongoose} = require('./db/mongoose');
let jwt = require('jsonwebtoken');
let app = express();
const port=process.env.PORT||3000;
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    let user = new User({
        email: req.body.email,
        username:req.body.username,
        password:jwt.sign(req.body.password,'abaz5393')
    });
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
        }
    ).catch((e) => {
        res.status(400).send(e);
    })
});
app.get('/users/:email&&:password',(req,res)=>{
    let email = req.params.email;
    let password=jwt.sign(req.params.password,'abaz5393');

    User.find(({
        email:email,
        password:password
    })).then((user)=>{
        if (!user){
            return  res.status(404).send();
        }
        res.send({user});
    }).catch((e)=>{
        res.status(400).send();
    })
});
app.get('/users',(req,res)=>{
    User.find().then((user)=>{
        res.send({user});
    },(e)=>{
        res.status(400).send(e)
    });
});

app.listen(port, () => {
    console.log('app is running on port ',port);
});

