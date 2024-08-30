const { where } = require("sequelize");
const { Bookmarks, Users, Movies } = require("../models");
const { verify } = require('jsonwebtoken');





exports.addBookmark = async (req, res, next) => {
  const { user} = req;
  const { id } = req.params;

  try {
    const movie = await Movies.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const cekDuplicate = await Bookmarks.findOne({
      where : {movieId : id, userId : user.id}
    });
    if (cekDuplicate) {
      return res.status(409).json({
        error: "Conflict",
        message: "Bookmark already added",
      });
    }
    const bookmark = await Bookmarks.create({ movieId:id, userId:user.id });

    res.status(200).json({
      message : "Success adding new bookmark",
      id : bookmark.id,
      userId : user.id,
      movieId : movie.id,
      movieTitle : movie.title
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteBookmark = async (req, res, next) => {
  const { user} = req;
  const { id } = req.params;


  try {
    const delbookmark = await Bookmarks.destroy({
      where : {movieId : id, userId : user.id}
    });
    if (!delbookmark) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json({
      message : "Success deleting bookmark"
    });
    
  } catch (error) {
    next(error);
  }
};

exports.myBookmarks = async (req, res, next) => {
  const { user} = req;

  try {
    const myBookmarks = await Bookmarks.findAll({
      where:{userId : user.id},
      include: ["movies"]
    })
    res.status(200).json(myBookmarks);
  } catch (error) {
    next(error);
  }
};

