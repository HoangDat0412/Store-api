const express = require("express");
require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/connect')
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products')
// middleware 

app.use(express.json());

// rootes 
app.get('/',(req,res)=>{
    res.send('<h1>Store API </h1> <a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',productsRouter)
// products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)
const port = process.env.PORT || 3000;
const start = async ()=>{
    try {
        //connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server is listening ${port} ...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()