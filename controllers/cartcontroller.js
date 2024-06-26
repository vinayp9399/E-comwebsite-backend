// const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const cart = mongo.cart;
exports.cartlist = async(request, response) =>{
    // db.query('select * from product_list1',[],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await cart.find({userid:request.params.userid});
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singlecartlist = async(request, response) =>{
    // db.query('select * from product_list1 where ?',[product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await cart.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addcart = (request, response) =>{
    let cartData = request.body
    // db.query('insert into product_list1 set ?',[productData],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
            
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    const cart1 = new cart(cartData)
    cart1.save();
}

exports.deletecart = async(request, response) =>{
    // db.query('delete from product_list1 where ?',[product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    const result = await cart.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'Cart item deleted sucessfully'}))
}

exports.updatecart = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    // db.query('update product_list1 set ? where ?',[request.body,product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':"Product Updated Succesfully!"}))
    //     }
    // })
    const result = await cart.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'Cart item updated sucessfully'}))
}

exports.findcart = async(request, response) =>{
    // let product_id = {product_id:request.params.id}
    // db.query('update product_list1 set ? where ?',[request.body,product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':"Product Updated Succesfully!"}))
    //     }
    // })
    const result = await cart.find({category:request.params.category})
    response.send(JSON.stringify({'error':'','message':result}))
}
