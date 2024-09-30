const { UserError } = require("../errors/UnauthenticationError");
const { Users, Movies} = require("../models");
const { verify } = require("jsonwebtoken");


const getMovieIdUser = async(req, res, next) => {
    try {
        const token = req.headers['accesstoken'];
        const decode = verify(token, process.env.JWT_SECRET);
        const user = await Users.findOne({where : {id: decode.id}});
        
        if (!user) throw new UserError();
        req.user = user;
    } catch (error) {
        return res.status(401).json( {message: error.message});
    }   

    next();
};

module.exports = getMovieIdUser;