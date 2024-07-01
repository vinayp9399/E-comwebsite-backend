const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
app.use('/users',require('./routes/useroutes'))
app.use('/products',require('./routes/productroutes'))
app.use('/wishlist',require('./routes/wishlistroutes'))
app.use('/cart',require('./routes/cartroutes'))

app.get("/", (req,res)=>{
   res.status(200).send({name:"Big commerce", status:"Server started"});
});

app.listen(port,(error)=>{
    console.log(`server has started at ${port}`)
})