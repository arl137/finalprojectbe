'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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