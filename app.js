require('dotenv').config();
//async errors


const express = require('express');
const app = express();
const productRouter = require('./routes/products');
const notFoundMiddle = require('./middleware/notFound');
const errMiddle = require('./middleware/error-handler');
//connecting to db

const connectDB = require('./db/connect');


//routes

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products?featured=true">Produtcs</a>')
})

app.use('/api/v1/products', productRouter);

//products route

app.use(notFoundMiddle);
app.use(errMiddle);
const port = process.env.PORT || 3000;
const start = async()=>{
    try {
        //connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is Listening to ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();