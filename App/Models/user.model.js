const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    password : String,
    email: String,
    phone : String,
    create_by:String,
    create_time:Date
})

module.exports = mongoose.model('User', UserSchema)