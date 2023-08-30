const { User } = require("../models");
const createErrors = require("http-errors");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const serverUrl = require("../helpers/serverUrl");

class UserController {
  static superAdminRegister = async (req, res, next) => {
    try {
      const { nama, email, password } = req.body;
      if (!nama || !email || !password) {
        throw createErrors(400, "all field required");
      }
      const userValidation = await User.findOne({
        where: { email },
      });
      if (userValidation) {
        throw createErrors(400, "Email already exist");
      }

      await User.create({
        nama: nama,
        email: email,
        password: hashPassword(password),
        role: "super-admin",
        user_status: true,
        status_password: true,
      });

      res.status(201).json({
        nama: nama,
        email: email,
        role: "super-admin",
        msg: "User registered",
      });
    } catch (error) {
      next(error);
    }
  };

  static userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw createErrors(400, "all field required");
      }
      const userValidation = await User.findOne({ where: { email } });
      if (!userValidation) {
        throw createErrors(400, "wrong email / password");
      }
      if (!userValidation.user_status) {
        throw createErrors(400, "user not active, contact your administrator");
      }
      const passwordValidation = await comparePassword(password, userValidation.password);
      if (!passwordValidation) {
        throw createErrors(400, "wrong email / password");
      }
      const accessToken = await generateToken({
        id: userValidation.id,
      });
      res.status(200).json({
        nama: userValidation.nama,
        img_url: userValidation.img_url,
        role: userValidation.role,
        status: userValidation.status_password,
        event: userValidation.event,
        accessToken: accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  static userValidation = async (req, res, next) => {
    try {
      const { password } = req.body;
      if (!password) {
        throw createErrors(400, "Fill the password");
      }
      const { id } = req.UserData;
      const userData = await User.findOne({ where: { id } });

      const passwordValidation = await comparePassword(password, userData.password);

      if (!passwordValidation) {
        throw createErrors(400, "wrong password");
      }
      res.status(200).json({
        msg: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  static userRegister = async (req, res, next) => {
    try {
      let {
        nama,
        alamat,
        email,
        no_telp,
        ttl,
        no_rek,
        pengawas_id,
        leader_id,
        koordinator_id,
        referal,
        role,
        event,
      } = req.body;
      if (!nama || !alamat || !email || !no_telp || !ttl || !no_rek || !referal || !role) {
        throw createErrors(400, "Input all require field");
      }
      const userValidation = await User.findOne({
        where: { email },
      });
      if (userValidation) {
        throw createErrors(400, "Email already exist");
      }
      let img_url = null;
      if (req.file) img_url = serverUrl + req.file.path;
      let query = {
        nama,
        alamat,
        email,
        password: hashPassword("Jakarta2016"),
        img_url,
        no_telp,
        ttl,
        no_rek,
        pengawas_id: JSON.parse(pengawas_id),
        koordinator_id: JSON.parse(koordinator_id),
        leader_id: JSON.parse(leader_id),
        role,
        event,
        referal,
        user_status: true,
        status_password: false,
      };

      await User.create(query);
      res.status(201).json({
        nama,
        email,
        role,
        referal,
        event,
        status: true,
        msg: "User registered",
      });
    } catch (error) {
      next(error);
    }
  };

  static getUserProfile = async (req, res, next) => {
    try {
      console.log("Tets");
      const { id } = req.UserData;
      const userData = await User.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "pengawas",
            required: false,
          },
          {
            model: User,
            as: "koordinator",
            required: false,
          },
          {
            model: User,
            as: "leader",
            required: false,
          },
        ],
      });
      res.status(200).json({
        nama: userData.nama,
        alamat: userData.alamat,
        email: userData.email,
        img_url: userData.img_url,
        no_telp: userData.no_telp,
        ttl: userData.ttl,
        no_rek: userData.no_rek,
        pengawas: userData.pengawas ? userData.pengawas : null,
        koordinator: userData.koordinator ? userData.koordinator : null,
        leader: userData.leader ? userData.leader : null,
        role: userData.role,
        referal: userData.referal,
        status: userData.user_status,
      });
    } catch (err) {
      next(err);
    }
  };

  static changeUserStatus = async (req, res, next) => {
    try {
      const { user_status } = req.body;
      const userData = await User.findOne({ where: { id: req.params.id } });
      if (!userData) {
        throw createErrors(404, "User not found");
      }
      let input = { user_status };
      let option = { where: { id: userData.id } };
      await User.update(input, option);
      res.status(200).json({ msg: "status updated" });
    } catch (error) {
      next(error);
    }
  };

  static changeUserEvent = async (req, res, next) => {
    try {
      const { event } = req.body;
      const userData = await User.findOne({ where: { id: req.params.id } });
      if (!userData) {
        throw createErrors(404, "User not found");
      }
      let input = { event };
      let option = { where: { id: userData.id } };
      await User.update(input, option);
      res.status(200).json({ msg: "event updated" });
    } catch (error) {
      next(error);
    }
  };

  static userUpdate = async (req, res, next) => {
    try {
      let {
        nama,
        alamat,
        email,
        no_telp,
        ttl,
        no_rek,
        pengawas_id,
        leader_id,
        koordinator_id,
        referal,
        role,
        event,
        user_status,
      } = req.body;

      const userData = await User.findOne({ where: { id: req.params.id } });
      if (!userData) {
        throw createErrors(404, "User not found");
      }
      let input = {
        nama,
        alamat,
        email,
        no_telp,
        ttl,
        no_rek,
        pengawas_id,
        leader_id,
        koordinator_id,
        referal,
        role,
        event,
        user_status,
      };
      let option = { where: { id: userData.id } };
      await User.update(input, option);
      res.status(200).json({ msg: "User updated" });
    } catch (error) {
      next(error);
    }
  };

  static changePassword = async (req, res, next) => {
    try {
      const { id } = req.UserData;
      const { new_password } = req.body;
      const memberData = await User.findOne({ where: { id } });
      if (!memberData) {
        throw createErrors(404, "User not found");
      }
      await User.update({ password: hashPassword(new_password), status_password: true }, { where: { id } });

      res.status(200).json({ msg: "Update password success" });
    } catch (error) {
      next(error);
    }
  };

  static resetPassword = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = await User.findOne({ where: { id } });
      if (!userData) {
        throw createErrors(404, "User not found");
      }
      await User.update({ password: hashPassword("Jakarta2016"), status_password: false }, { where: { id } });
      res.status(200).json({ msg: "Reset password success" });
    } catch (error) {
      next(error);
    }
  };

  static getUserbyId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = await User.findOne({ where: { id } });
      if (!userData) {
        throw createErrors(404, "User not found");
      }
      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  };

  static getAllUser = async (req, res, next) => {
    try {
      let { role, filter, user_status } = req.query;

      let query = {
        where: {},
        order: [["id", "ASC"]],
      };
      if (role) {
        query.where.role = role;
      }
      if (user_status) {
        query.where.user_status = user_status;
      }
      let result = await User.findAll(query);
      if (filter) {
        const newresult = result.filter((user) => user.role !== filter);
        result = newresult;
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
