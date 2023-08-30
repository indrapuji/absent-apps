"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      nama: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      start: DataTypes.STRING,
      end: DataTypes.STRING,
      event_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
