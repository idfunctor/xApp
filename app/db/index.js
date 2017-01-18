'use strict';
const config = require('../configDev');
const Mongoose = require('mongoose');
//mongoose promise lib deprecated, so use default ES6 promise library
Mongoose.Promise = global.Promise;
Mongoose.connect(config.dbURI);
Mongoose.connection.on('error',error=>{
  console.log(error);
});
const chatUser = new Mongoose.Schema({
  fbid: String,
  name: String,
  dp: String
});
let userModel = Mongoose.model('chatUser', chatUser);
module.exports = {
  Mongoose,
  userModel
}
