const Product = require("../database-mongo/Product.model");
const Cart = require("../database-mongo/Cart.model.js");
const cloudinary = require("../utils/cloudinary");


var add = function (req, res) {
  let { title, description, quantite ,user_id} = req.body;
  
  Product.insertMany({ title, description, quantite, user_id })
    .then((product) => {
      console.log(product)
      res.status(200).send(product);
    })
    .catch((error) => {
      // console.log(error)
      res.status(500).send(error);
    });
};

let addProduct = async (req, res) => {
  const { image } = req.body;
  await cloudinary.uploader.upload(image, (err, result) => {
    if (err) {
      res.send(err);
      
    } else {
      const url = result.secure_url;
      console.log(url);
      res.send(url);

      let product = new Product({
        title: req.body.title,
        image_url: url,
        description: req.body.description,
        quantite: req.body.quantite,
        price: req.body.price,
        user_id: req.body.user_id,
      });

      // Save product
      product
        .save()
        .then((product) => {
        //  res.json(product);
        
        })
        .catch((err) => console.log(err));
    }
  });
};

var getProducts = (req, res) => {
  Product.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.send(err);
    });
};
///////////
var getProductsByUserId = function (req, res) {
  let { user_id } = req.params;
  console.log(user_id);
  Product.find({ user_id })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.send(err);
    });
};

var deleteProduct = function (req, res) {
  let id = req.params.id;
  Product.findByIdAndRemove(id)
    .then(() => {
      res.send("deleted");
    })
    .catch((err) => {
      res.send(err);
    });
};
var updateProduct = function (req, res) {
  let id = req.params.id;
  let up = req.body;
  Product.findByIdAndUpdate(id, up)
    .then(() => {
      res.send("updated");
    })
    .catch((err) => {
      res.send(err);
    });
};

// let addProdToCart = (req,res)=>{

// }

module.exports = {
  add,
  addProduct,
  getProducts,
  getProductsByUserId,
  deleteProduct,
  updateProduct,
};
