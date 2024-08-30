const { hash, genSalt, compareSync } = require("bcrypt");
const { Users } = require("../models");
const { Op} = require("sequelize");
const { sign } = require("jsonwebtoken");
const Unauthenticationerror = require("../errors/UnauthenticationError");


exports.register = async(req, res, next) => {
    const { name, username, email, password, role, address, phoneNumber } = req.body;

    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const user = await Users.create({
            name, 
            username, 
            email, 
            password: hashedPassword, 
            role, 
            address, 
            phoneNumber});
        res.status(201).json({
            message: "Success creating new user",
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            address: user.address
        });
    } catch (error) {
        next(error);
    }
}

exports.login = async(req, res, next) => {
    const { email,username, password } = req.body;
    try {
        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    email ? { email : email} : null,
                    username ? { username : username} : null,
                ].filter(condition => condition !== null)
            } 
        });

        if (!user) throw new Unauthenticationerror.UserError();
        if (!compareSync(password, user.password)) throw new Unauthenticationerror.Unauthorized;

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }

        const token = sign(payload, process.env.JWT_SECRET);

        res.status(200).json({
            accessToken: token,
            name: user.name,
            role: user.role,
            id: user.id
        });
    } catch (error) {
        next(error);
    }


}