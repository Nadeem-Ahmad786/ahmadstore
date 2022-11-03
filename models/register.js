const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { stringify } = require("querystring");
const userSchema =new mongoose.Schema({
    role: String,
    name: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: { type: String, required: true },
    cart: [{
        productid: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    address: {type: String},
    }, 
    { timestamps: true }
);

userSchema.methods.generateToken = async function(){
    try{
        const token = jwt.sign({_id: this._id.toString()}, "mynameisnadeemahmadiamawebdevloper");
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;
    }
    catch (error){
        console.log("the error" + error);
    }
};
userSchema.pre("save", async function(next) {
    if( this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;