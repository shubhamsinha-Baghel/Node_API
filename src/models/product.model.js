let mongoose = require('mongoose')
const mongo = require('mongodb').MongoClient;
format = require('util').format;

//LocalPath of your db for server mention your usernm,pwd,key
const url = 'mongodb://localhost:27017/product';
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};
mongoose.connect(url, { 'useNewUrlParser': true })
mongoose.set('useCreateIndex', true);

let Schema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
   
})

module.exports = mongoose.model('Product', Schema)