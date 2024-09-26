'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmarks extends Model {
    static associate(models) {
      Bookmarks.belongsTo(models.Movies, {
        as : "movies",
        foreignKey: 'movieId'
      });
      Bookmarks.belongsTo(models.Users, {
        as : "users",
        foreignKey: 'userId'
      });
    }
  }
  Bookmarks.init({
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmarks',
  });
  return Bookmarks;
};