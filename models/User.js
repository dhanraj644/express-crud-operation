var mongoose = require('mongoose');
const {Schema} =mongoose;
//table schema
const userschema = new Schema({
    uname:String,
    ugender:String,
    umobile:Number,

})

var userModel = mongoose.model("user",userschema);
module.exports = userModel;