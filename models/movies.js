'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies.hasMany(models.Bookmarks, {
        foreignKey: 'movieId',
      });
    }
  }
  Movies.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};