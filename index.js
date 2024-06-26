const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json({origin:"http://e-comwebsite-frontend.vercel.app"}));
app.use('/users',require('./routes/useroutes'))
app.use('/products',require('./routes/productroutes'))
app.use('/wishlist',require('./routes/wishlistroutes'))
app.use('/cart',require('./routes/cartroutes'))

app.get("/", (req,res)=>{
   res.status(200).send("Server started");
});

app.listen(port,(error)=>{
    console.log(`server has started at ${port}`)
})