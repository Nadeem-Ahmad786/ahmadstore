const jwt = require("jsonwebtoken");
const User = require("../models/register");

function authAdmin(role){
    return (req, res, next) =>{
        if(req.user.role !== role){
            return res.status(401).send({message: "Only admin can access it!"});
        }
        next();
    }
}
module.exports = authAdmin;