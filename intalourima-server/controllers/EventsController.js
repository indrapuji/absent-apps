const { Event } = require("../models");
const createErrors = require("http-errors");

class EventsController {
  static eventRegister = async (req, res, next) => {
    try {
      const { nama, lokasi, start, end } = req.body;
      if (!nama || !lokasi || !start || !end) {
        throw createErrors(400, "All fields required");
      }
      let event_status = null;
      const dataEvent = { nama, lokasi, start, end, event_status: true };
      await Event.create(dataEvent);
      res.status(201).json({ nama, lokasi, start, end, event_status, msg: "Event Created" });
    } catch (error) {
      next(error);
    }
  };

  static eventDeleted = async (req, res, next) => {
    try {
      const eventData = await Event.findOne({ where: { id: req.params.id } });
      if (!eventData) throw createErrors(404, "Event not found");
      await Event.destroy({ where: { id: req.params.id } });
      res.status(200).json({ msg: `${eventData.nama} Deleted` });
    } catch (error) {
      next(error);
    }
  };

  static eventGetAll = async (req, res, next) => {
    try {
      let { event_status } = req.query;
      let query = {
        where: {},
        order: [["id", "DESC"]],
      };
      if (event_status) {
        query.where.event_status = event_status;
      }
      const allEvent = await Event.findAll(query);
      res.status(200).json(allEvent);
    } catch (error) {
      next(error);
    }
  };

  static eventGetId = async (req, res, next) => {
    try {
      const eventData = await Event.findOne({ where: { id: req.params.id } });
      if (!eventData) {
        throw createErrors(404, "Referal not found");
      }
      res.status(200).json(eventData);
    } catch (error) {
      next(error);
    }
  };

  static eventUpdate = async (req, res, next) => {
    try {
      const { event_status, nama, lokasi, start, end } = req.body;
      console.log(req.body);
      const eventData = await Event.findOne({ where: { id: req.params.id } });
      if (!eventData) throw createErrors(404, "Event not found");
      await Event.update({ event_status, nama, lokasi, start, end }, { where: { id: req.params.id } });
      res.status(200).json({ msg: "Event Updated" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = EventsController;
