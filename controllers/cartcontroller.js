// const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const cart = mongo.cart;
exports.cartlist = async(request, response) =>{
    let result = await cart.find({userid:request.params.userid});
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singlecartlist = async(request, response) =>{
    let result = await cart.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addcart = (request, response) =>{
    let cartData = request.body
    const cart1 = new cart(cartData)
    cart1.save();
}

exports.deletecart = async(request, response) =>{
    const result = await cart.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'Cart item deleted sucessfully'}))
}

exports.updatecart = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    const result = await cart.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'Cart item updated sucessfully'}))
}

exports.findcart = async(request, response) =>{
    const result = await cart.find({category:request.params.category})
    response.send(JSON.stringify({'error':'','message':result}))
}
