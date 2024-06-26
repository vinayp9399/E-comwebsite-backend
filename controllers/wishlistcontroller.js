// const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const wishlist = mongo.wishlist;
exports.wishlist = async(request, response) =>{
    // db.query('select * from product_list1',[],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await wishlist.find({userid:request.params.userid});
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singlewish = async(request, response) =>{
    // db.query('select * from product_list1 where ?',[product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await wishlist.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.addwish = (request, response) =>{
    let wishData = request.body
    // db.query('insert into product_list1 set ?',[productData],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
            
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    const wish = new wishlist(wishData)
    wish.save();
}

exports.deletewish = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    // db.query('delete from product_list1 where ?',[product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    const result = await wishlist.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'wish deleted sucessfully'}))
}

exports.updatewish = async(request, response) =>{
    let product_id = {product_id:request.params.id}
    // db.query('update product_list1 set ? where ?',[request.body,product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':"Product Updated Succesfully!"}))
    //     }
    // })
    const result = await wishlist.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'wish updated sucessfully'}))
}

exports.findwish = async(request, response) =>{
    // let product_id = {product_id:request.params.id}
    // db.query('update product_list1 set ? where ?',[request.body,product_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':"Product Updated Succesfully!"}))
    //     }
    // })
    const result = await wishlist.find({category:request.params.category})
    response.send(JSON.stringify({'error':'','message':result}))
}
