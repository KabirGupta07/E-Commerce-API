const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    products: [
        {
            productId:{
                type:String
            },
            quantity:{
                type: String,
                default: 1
            }
        }
    ],
    amount:{type:Number , required: true, unique: true},
    address: {type: Object, required: true},
    status: { type :String, default: "pending"}
    }, 
    { timestamps : true}

);

module.exports = mongoose.model("Order",UserSchema);