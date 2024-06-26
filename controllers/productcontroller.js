// const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const products = mongo.products;
exports.productlist = async(request, response) =>{
    // db.query('select * from product_list1',[],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await products.find();
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singleproductlist = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    // db.query('select * from product_list1 where ?',[product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await products.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addproduct = (request, response) =>{
    let productData = request.body
    // db.query('insert into product_list1 set ?',[productData],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
            
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    const product = new products(productData)
    product.save();
}

exports.deleteproduct = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    // db.query('delete from product_list1 where ?',[product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    const result = await products.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
}

exports.updateproduct = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    // db.query('update product_list1 set ? where ?',[request.body,product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':"Product Updated Succesfully!"}))
    //     }
    // })
    const result = await products.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'User updated sucessfully'}))
}

exports.findproducts = async(request, response) =>{
    // let product_id = {product_id:request.params.id}
    // db.query('update product_list1 set ? where ?',[request.body,product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':"Product Updated Succesfully!"}))
    //     }
    // })
    const result = await products.find({category:request.params.category})
    response.send(JSON.stringify({'error':'','message':result}))
}

