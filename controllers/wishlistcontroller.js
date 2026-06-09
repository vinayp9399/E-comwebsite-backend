// const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const wishlist = mongo.wishlist;
exports.wishlist = async(request, response) =>{
    let result = await wishlist.find({userid:request.params.userid});
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singlewish = async(request, response) =>{
    let result = await wishlist.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addwish = (request, response) =>{
    let wishData = request.body
    const wish = new wishlist(wishData)
    wish.save();
}

exports.deletewish = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    const result = await wishlist.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'wish deleted sucessfully'}))
}

exports.updatewish = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    const result = await wishlist.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'wish updated sucessfully'}))
}

exports.findwish = async(request, response) =>{
    const result = await wishlist.find({category:request.params.category})
    response.send(JSON.stringify({'error':'','message':result}))
}
