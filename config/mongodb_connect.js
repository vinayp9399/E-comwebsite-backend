const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/newkart",{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const usersSchema = {
    firstname:String,
    lastname:String,
    email:String,
    phoneno:String,
    password:String
};

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
