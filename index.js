let express = require('express')
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
let app = express();
mongoose.connect('mongodb://localhost/login',{ useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));
app.use(express.json())
let personRoute = require('./Rest_api/src/routes/person')
let customerRoute = require('./Rest_api/src/routes/customer')
let productRoute = require('./Rest_api/src/routes/product')
let userRoute = require('./Rest_api/src/routes/users')
let postroute =require('./Rest_api/src/routes/post')
let favouriteroute=require('./Rest_api/src/routes/favourite')
let bookmarkroute=require('./Rest_api/src/routes/bookmark')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next()
})
app.use(personRoute)
app.use(customerRoute)
app.use(productRoute)
//app.use(postroute)
app.use('/api/users', userRoute)
app.use('/api/post',postroute)
app.use('/api/favourite',favouriteroute)
app.use('/api/bookmark',bookmarkroute)
app.use(express.static('public'))
exports.app = functions.https.onRequest(app);
// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).send('We think you are lost!')
})

// Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))
//http://localhost:3000/api/users/
// http://localhost:3000/api/post/


//app.listen(PORT, "172.30.24.50")

// exports.sample = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
//  });