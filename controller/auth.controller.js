const { hash, genSalt, compareSync } = require("bcrypt");
const { Users } = require("../models");
const { Op } = require("sequelize");
const { sign } = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/errorHandler"); // Import custom error handler
const Unauthenticationerror = require("../errors/UnauthenticationError");

exports.register = async(req, res, next) => {
    const { name, username, email, password, role, address, phoneNumber } = req.body;

    try {
        // Check if the user already exists (by email or username)
        const existingUser = await Users.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });

        if (existingUser) {
            // If user exists, throw validation error
            throw new ErrorHandler(400, 'User with this email or username already exists');
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        const user = await Users.create({
            name,
            username,
            email,
            password: hashedPassword,
            role,
            address,
            phoneNumber
        });

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
        next(error); // Passes the error to global error handler
    }
}

exports.login = async(req, res, next) => {
    const { email, username, password } = req.body;
    try {
        // Check if the user exists by email or username
        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    email ? { email: email } : null,
                    username ? { username: username } : null,
                ].filter(condition => condition !== null)
            }
        });

        if (!user) {
            // User not found, throw unauthorized error
            throw new ErrorHandler(401, 'Invalid username/email or password');
        }

        // Compare provided password with stored hashed password
        if (!compareSync(password, user.password)) {
            throw new ErrorHandler(401, 'Invalid username/email or password');
        }

        // Generate JWT token
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            accessToken: token,
            name: user.name,
            role: user.role,
            id: user.id
        });
    } catch (error) {
        next(error); // Passes the error to global error handler
    }
}
