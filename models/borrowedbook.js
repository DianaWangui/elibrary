'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BorrowedBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BorrowedBook.belongsTo(models.User, { foreignKey: "id" });
      BorrowedBook.belongsTo(models.Book, { foreignKey: "id" });    }
  }
  BorrowedBook.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    borrowedAt: DataTypes.DATE,
    returnBy: DataTypes.DATE,
    returnedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BorrowedBook',
  });
  return BorrowedBook;
};