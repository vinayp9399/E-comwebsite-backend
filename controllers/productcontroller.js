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
    // const {category, secondarycategory, brand, price} = request.query;
    // console.log(category, secondarycategory, brand, price);
    // const result = await products.find({
    // category: category,
    // $and: [
    //     { secondarycategory: {$regex: secondarycategory, $options: "i"} },
    //     { brand: {$regex: brand, $options: "i"} },
    //     { price: { $lt: Number(price) } },
    // ],
    // });
    // response.send(JSON.stringify({'error':'','message':result}))

    const { category, secondarycategory, brand, price } = request.query;
    console.log(category, secondarycategory, brand, price);

    // Build query dynamically
    const query = {};

    if (category && category !== "") {
      query.category = category;
    }

    if (secondarycategory && secondarycategory !== "" && secondarycategory !== "none") {
      query.secondarycategory = { $regex: secondarycategory, $options: "i" };
    }

    if (brand && brand !== "" && brand !== "none") {
      query.brand = { $regex: brand, $options: "i" };
    }

    if (price && price !== "" && price !== "none") {
      query.price = { $lt: Number(price) }; // filter prices less than the given value
    }

    // Fetch results
    const result = await products.find(query);

    response.json({ error: "", message: result });
}