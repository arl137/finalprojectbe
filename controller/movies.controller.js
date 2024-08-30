const { Movies } = require("../models");


exports.index = async(req, res, next) => {
    try {
        const movies = await Movies.findAll();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
}

exports.show = async(req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movies.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.status(200).json(movie);
        }
    catch (error) {
        next(error);
    }
}