const mongo = require('../config/mongodb_connect');
const users = mongo.users;
const jwt = require('jsonwebtoken')

exports.userlist = async(request, response) =>{
    let result = await users.find();
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.singleuserlist = async (request, response) =>{
    let users_id = {users_id:request.params.id}
    let result = await users.findById(request.params.id)
    response.send(JSON.stringify({'error':'', 'message':result}))
}

exports.registration = async (request, response) =>{
    let userData = request.body
    console.log(userData)
    const user = await users(userData)
    user.save();
    response.send(JSON.stringify({'error':'','message':userData}));
}

exports.login = async (request, response) => {
    const Password = request.body.password;
    let result = await users.findOne({ email: request.body.email });
    if (!result) {
        response.send(JSON.stringify({ 'error': '', 'message': 'email or password does not match' }))
    } else if (Password != result.password) {
        response.send(JSON.stringify({ 'error': '', 'message': 'email or password does not match' }))
    } else {
        const accessToken = jwt.sign({ id: result._id, name: result.firstname }, process.env.jwtsecretkey, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: result._id, name: result.firstname }, process.env.jwtrefreshtokenkey, { expiresIn: '7d' });
        response.send(JSON.stringify({ 'error': '', 'message': result, 'token': accessToken, 'refreshToken': refreshToken }))
    }
}

exports.deleteuser = async (request,response) =>{
    let users_id = {users_id:request.params.id}
    const result = await users.findByIdAndDelete(request.params.id)
    response.send(JSON.stringify({'error':'','message':'User deleted sucessfully'}))
}

exports.updateuser = async (request,response) =>{
    const result = await users.findByIdAndUpdate(request.params.id,request.body)
    response.send(JSON.stringify({'error':'','message':'User updated sucessfully'}))
}

exports.refreshtoken = (request, response) => {
    const refreshToken = request.body.refreshToken;
    if (!refreshToken) {
        return response.json({ message: "refresh token not available" })
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.jwtrefreshtokenkey)
        const newAccessToken = jwt.sign({ id: decoded.id, name: decoded.name }, process.env.jwtsecretkey, { expiresIn: '15m' })
        response.json({ token: newAccessToken })
    } catch (err) {
        return response.json({ message: "refresh token invalid or expired" })
    }
}
