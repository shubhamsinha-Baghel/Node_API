let mongoose = require('mongoose')
const mongo = require('mongodb').MongoClient;
format =require('util').format;
const url = 'mongodb://localhost:27017/customers';
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};
mongoose.connect(url, {'useNewUrlParser': true})
mongoose.set('useCreateIndex', true);

let Schema = new mongoose.Schema({
  name:{
type:String,
required:true


  } ,
  email: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Customer', Schema)
