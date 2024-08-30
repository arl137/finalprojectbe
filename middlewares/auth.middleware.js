const { verify } = require('jsonwebtoken');
const { Users } = require("../models");
const { UserError } = require('../errors/UnauthenticationError');
const { where } = require('sequelize');


const auth = async(req, res, next) =>{
    const token = req.headers['accesstoken'];
    if (!token) {
        return res.status(401).json({ 
            error: "Unauthorized",
            message: "Please Login First" });
    }

    try {
        const decode = verify(token, process.env.JWT_SECRET);
        console.log(decode);
        const user = await Users.findOne({where:{email: decode.email}});
        if (!user) throw new UserError();
    } catch (error) {
        return res.status(401).json( {message: "Invalid Token"});
    }

    next();
}

module.exports = auth;