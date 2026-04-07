const { default: mongoose } = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    first_name:{
        type : String,
        require : true
    },
    last_name:{
        type : String
    },
    email:{
        type : String,
        require : true,
        unique : true,
    }
});

const usermodal = mongoose.model("users", userSchema);

module.exports = usermodal;