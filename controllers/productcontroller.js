// const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const products = mongo.products;

exports.productlist = async(request, response) =>{
    let result = await products.find();
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singleproductlist = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    let result = await products.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addproduct = (request, response) =>{
    let productData = request.body
    const product = new products(productData)
    product.save();
}

exports.deleteproduct = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    const result = await products.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
}

exports.updateproduct = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    const result = await products.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'User updated sucessfully'}))
}

exports.findproducts = async(request, response) =>{
    const result = await products.find({category:request.params.category})
    response.send(JSON.stringify({'error':'','message':result}))
}

exports.searchproducts = async(request, response) =>{
    const result = await products.find({productname:{$regex: request.params.input, $options: "i"}})
    response.send(JSON.stringify({'error':'','message':result}))
}

exports.sidesearchproducts = async(request, response) =>{
    const {category, secondarycategory, brand, price} = request.query;
    const result = await products.find({
    category: category,
    $or: [
        { secondarycategory: {$regex: secondarycategory, $options: "i"} },
        { brand: {$regex: brand, $options: "i"} },
        { price: { $lt: price } },
    ],
    });
    response.send(JSON.stringify({'error':'','message':result}))
}

