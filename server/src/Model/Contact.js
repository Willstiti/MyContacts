const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName:{
        type : String,
    },
    phoneNumber:{
        type : String,
        required : true
    },
    user:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

module.exports = mongoose.model("Contact", contactSchema);