const { User } = require("../models");
const createErrors = require("http-errors");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.UserData;
    const userData = await User.findOne({ where: { id } });
    if (userData.role !== "super-admin") {
      throw createErrors(401, "Unauthorized");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
