const jwt = require("jsonwebtoken");
const User = require("../models/register");

const auth = async (req, res, next) =>{
    try{
        const token = req.cookies.NAEcommercetoken;
        //if token is verified then only user can access the secret page
        const verifyUser = jwt.verify(token, "mynameisnadeemahmadiamawebdevloper");
        //console.log(verifyUser);
        //print user detail in console
        const user = await User.findOne({_id: verifyUser._id});
        req.token = token;
        req.user = user;
        next();
    }
    catch (error){
        res.status(401).send(error);
    }
}
module.exports = auth;