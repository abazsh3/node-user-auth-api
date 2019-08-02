let express = require('express');
let bodyParser = require('body-parser');
let {User} = require('./models/User');
let {mongoose} = require('./db/mongoose');
let app = express();
const port=process.env.PORT||3000;
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    let user = new User({
        email: req.body.email,
        username:req.body.username,
        password:req.body.password
    });
    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});
app.get('/users/:email&&:password',(req,res)=>{
    let email = req.params.email;
    let password=req.params.password;

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

