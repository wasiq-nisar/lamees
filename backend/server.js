const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require("cors");
let path = require('path')

// Routes
const productRoutes = require("./routes/product")
const emailRoutes = require("./routes/email")
const stripeRoute = require("./routes/stripe")
const orderRoute = require("./routes/order")
const userRoute = require('./routes/user')

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/product", productRoutes)
app.use('/api/sendEmail', emailRoutes)
app.use('/api/create-payment-intent', stripeRoute)
app.use('/api/order', orderRoute)
app.use('/api/user', userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT

const start = async() => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(port, () => {
        console.log('Connected to DB');
        console.log(`Server is listening on Port# ${port}`)
      })
    })
    .catch((error) => {
      console.log(error);
    })
}

start()