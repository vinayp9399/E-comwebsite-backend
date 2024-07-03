//const db = require('../config/db');
const mongo = require('../config/mongodb_connect');
const users = mongo.users;
//const users = require('../config/mongodb_connect');
exports.userlist = async(request, response) =>{
    // db.query('select * from users',[],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await users.find();
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singleuserlist = async (request, response) =>{
    let users_id = {users_id:request.params.id}
    // db.query('select * from users where ?',[users_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })
    let result = await users.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.registration = async (request, response) =>{
    let userData = request.body
    console.log(userData)
    // db.query('insert into users set ?',[userData],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.message, 'message':result}))
    //     }
    //     else{
    //         const user = new users(userData)
    //         user.save();
    //         response.send(JSON.stringify({'error':'', 'message':result}))
    //     }
    // })

    const user = await users(userData)
    user.save();
    response.send(JSON.stringify({'error':'','message':userData}));
    
    
}

exports.login = async(request,response)=>{
   
    const Password = request.body.password;
    let result = await users.findOne({email:request.body.email});
    //console.log(hashPassword)
    //console.log(result.password);
    if(!result){
        response.send(JSON.stringify({'error':'','message':'email or password does not match'}))
    }
    else if(Password != result.password){
        response.send(JSON.stringify({'error':'','message':'email or password does not match'}))
    }else{
        response.send(JSON.stringify({'error':'','message':result}))
    }
}

exports.deleteuser = async (request,response) =>{
    let users_id = {users_id:request.params.id}
    // db.query('delete from users where ?',[users_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.sqlMessage,'message':''}))
    //     }else{
    //         response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
    //     }
    // })
    const result = await users.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
}

exports.updateuser = async (request,response) =>{
    // let users_id = {users_id:request.params.id}
    // db.query('update users set ? where ?',[request.body,users_id],(error,result)=>{
    //     if(error){
    //         response.send(JSON.stringify({'error':error.sqlMessage,'message':''}))
    //     }else{
    //         response.send(JSON.stringify({'error':'','message':'User Updated sucessfully'}))
    //     }
    // })

    const result = await users.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'User updated sucessfully'}))

}
