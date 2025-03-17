'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.hasMany(models.BorrowedBook, { foreignKey: "bookId" });
    }
  }
  Book.init({
    books_count: DataTypes.INTEGER,
    isbn: DataTypes.STRING,
    authors: DataTypes.STRING,
    publication_year: DataTypes.INTEGER,
    title: DataTypes.STRING,
    average_rating: DataTypes.FLOAT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};