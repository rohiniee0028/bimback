const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
    name:String,
    email:String,
    password:String
},{ timestamps: true })

const userModel = mongoose.model("user",UserScheme)

module.exports={
    userModel
}