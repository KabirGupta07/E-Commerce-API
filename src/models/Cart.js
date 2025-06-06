const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: String,
                default: 1
            }
        }
    ]
},
    { timestamps: true }

);

module.exports = mongoose.model("Cart", UserSchema);