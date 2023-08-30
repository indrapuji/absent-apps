"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Record.init(
    {
      user_id: DataTypes.INTEGER,
      event: DataTypes.STRING,
      long: DataTypes.STRING,
      lat: DataTypes.STRING,
      loc: DataTypes.STRING,
      tanggal: DataTypes.STRING,
      masuk: DataTypes.STRING,
      keluar: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Record",
    }
  );
  return Record;
};
