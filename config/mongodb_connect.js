const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://vinayp9399:mechanic%4093@vinaycluster.03uocxi.mongodb.net/?retryWrites=true&w=majority&appName=VinayCluster",{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
const usersSchema = {
    firstname:String,
    lastname:String,
    email:String,
    phoneno:String,
    password:String
}

const productSchema = {
    productname:String,
    description:String,
    price:String,
    quantity:String,
    rating:String,
    imageurl:String,
    category:String,
}
const wishlistSchema = {
    userid:String,
    productname:String,
    description:String,
    price:String,
    quantity:String,
    rating:String,
    imageurl:String,
    category:String,
}
const cartSchema = {
    userid:String,
    productname:String,
    description:String,
    price:String,
    quantity:String,
    rating:String,
    imageurl:String,
    category:String,
}
const users = mongoose.model("Users",usersSchema);
const products = mongoose.model("Product",productSchema);
const wishlist = mongoose.model("wishlist",wishlistSchema);
const cart = mongoose.model("cart",cartSchema);
module.exports = {products, users, wishlist, cart};
// module.exports = users;
