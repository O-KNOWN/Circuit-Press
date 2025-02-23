const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);
