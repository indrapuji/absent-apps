"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.User, { foreignKey: "pengawas_id" });
      User.hasOne(models.User, { foreignKey: "koordinator_id" });
      User.hasOne(models.User, { foreignKey: "leader_id" });
      User.belongsTo(models.User, { foreignKey: "pengawas_id", as: "pengawas" });
      User.belongsTo(models.User, { foreignKey: "koordinator_id", as: "koordinator" });
      User.belongsTo(models.User, { foreignKey: "leader_id", as: "leader" });
      User.hasOne(models.Record, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      img_url: DataTypes.STRING,
      no_telp: DataTypes.STRING,
      ttl: DataTypes.STRING,
      no_rek: DataTypes.STRING,
      pengawas_id: DataTypes.INTEGER,
      koordinator_id: DataTypes.INTEGER,
      leader_id: DataTypes.INTEGER,
      event: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["super-admin", "pengawas", "koordinator", "leader", "security", "cs"]],
            msg: "Invalid Role",
          },
        },
      },
      referal: DataTypes.STRING,
      user_status: DataTypes.BOOLEAN,
      status_password: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
