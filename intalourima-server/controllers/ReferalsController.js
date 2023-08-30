const { Referal } = require("../models");
const createErrors = require("http-errors");

class ReferalsController {
  static referalRegister = async (req, res, next) => {
    try {
      const { nama, alamat, no_telp, no_rek } = req.body;
      if (!nama || !alamat || !no_telp || !no_rek) {
        throw createErrors(400, "All fields required");
      }
      const dataReferal = { nama, alamat, no_telp, no_rek };
      await Referal.create(dataReferal);
      res.status(201).json({ nama, alamat, no_telp, no_rek, msg: "Referal registered" });
    } catch (error) {
      next(error);
    }
  };

  static referalDelete = async (req, res, next) => {
    try {
      const referalData = await Referal.findOne({ where: { id: req.params.id } });
      if (!referalData) {
        throw createErrors(404, "User not found");
      }
      await Referal.destroy({ where: { id: req.params.id } });
      res.status(200).json({ msg: `${referalData.nama} Deleted` });
    } catch (error) {
      next(error);
    }
  };

  static referalGetId = async (req, res, next) => {
    try {
      const referalData = await Referal.findOne({ where: { id: req.params.id } });
      if (!referalData) {
        throw createErrors(404, "Referal not found");
      }
      res.status(200).json(referalData);
    } catch (error) {
      next(error);
    }
  };

  static referalGetAll = async (req, res, next) => {
    try {
      console.log("iniiii");
      const allReferal = await Referal.findAll();
      res.status(200).json(allReferal);
    } catch (error) {
      next(error);
    }
  };

  static referalUpdate = async (req, res, next) => {
    try {
      const { nama, alamat, no_telp, no_rek } = req.body;
      const { id } = req.params;
      const referalData = await Referal.findOne({ where: { id } });
      if (!referalData) {
        throw createErrors(404, "User not found");
      }
      let query = { nama, alamat, no_telp, no_rek };
      let option = { where: { id } };
      console.log(query);
      await Referal.update(query, option);
      res.status(200).json({ msg: "Referal updated" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ReferalsController;
