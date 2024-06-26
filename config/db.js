const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'newkart'
})

db.connect((error)=>{
    if(error){
        console.log(error.message);
    }
    else{
        console.log("Database connected");
    }
})
module.exports = db;