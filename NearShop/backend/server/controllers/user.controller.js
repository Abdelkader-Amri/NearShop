const User = require('../database-mongo/User.model.js');
const Cart = require("../database-mongo/Cart.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cloudinary = require("../utils/cloudinary");


var selectAll = function (req, res) {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var add = function (req, res){
      let {name,password,email}=req.body
      User.insertMany({name, password,email})
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
}

let signup = async (req,res)=>{
  // const { image } = req.body;
  // await cloudinary.uploader.upload(image, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   } 
  //   else {
  //     console.log("inside else signup")
  //     const url = result.secure_url;
  //     console.log(url);
  //     res.send(url);
  
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        // image:url,
        // address: req.body.address,
        // phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10)
      })
      newUser
      .save()
      .then(user =>{
        console.log(user)
        // let cart = new Cart({
        //   user_id: user._id ,
        //   listProduct: [] ,
        //   total: 0,
        //   status: "vide",
        //   })
        // cart
        // .save()
        // .then(cart=>res.send('cart added'))
     })
      .catch(err=>res.send(err))
    }
  //});
//};

  var login = function (req, res){
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      //incorrect password
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          tite: 'login failed',
          error: 'invalid credentials'
        })
      }
      // create a token and send to frontend
      let token = jwt.sign({ userId: user._id}, 'secretkey');
      return res.status(200).json({
        title: 'login sucess',
        token: token
      })
    })
  }
  
  var getUserById = function (req, res) {
    let {id}=req.params
    User.findOne({_id:id}).then((user)=>{
      res.send(user)
    }).catch((err)=>{
      res.send(err)
    })
  }

  var updateUser=function(req,res){
    let id=req.params.id
    let up=req.body
    User.findByIdAndUpdate(id,up).then(()=>{
      res.send('updated')
    }).catch((err)=>{
      res.send(err)
    })
  }

    var logOut= (req,res)=>{
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      User.findOne({ _id: decoded.userId }, (err, user) => {
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            email: user.email,
            username: user.username,
            address: user.address,
            phone: user.phone,
            image:user.image,
            id:user.id
          }
        })
      })
  
    })
  }
module.exports = { selectAll , add , signup , login , logOut,getUserById,updateUser};
